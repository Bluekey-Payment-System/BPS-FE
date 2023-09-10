FROM node:18-alpine AS base

# Step 1. 필요할 경우에만 소스코드를 다시 빌드합니다.
FROM base AS builder

WORKDIR /app

COPY package.json yarn.lock* ./
# 타입스크립트 devDependencies를 위해 --production 플래그를 생략합니다.
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  # node가 설치되지 않은 환경에서도 실행할 수 있게 lockfile이 없는경우도 허용해 줍니다.
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .

# 빌드시에도 환경변수가 존재해야 합니다.
# https://github.com/vercel/next.js/discussions/14030
ARG BASE_URL
ENV BASE_URL=${BASE_URL}
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

# Nextjs의 원격 데이터 측정을 불허합니다.
ENV NEXT_TELEMETRY_DISABLED 1

# 어플리케이션을 빌드합니다.
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  else yarn build; \
  fi

# Step 2. 프로덕션 이미지 빌드 단계, 이전 단계의 모든 파일들을 복사하고 nextjs앱을 실행합니다.
FROM base AS runner

WORKDIR /app

# 프로덕션 환경에서 루트 사용자로 명령 수행을 지양합니다. 새 유저 그룹과 유저를 만들어 수행합니다.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# 이미지 용량 최적화를 위한 셋팅
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 런타임에 환경변수들을 재정의해줍니다.
ARG BASE_URL
ENV BASE_URL=${BASE_URL}
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

# Nextjs의 원격 데이터 측정을 불허합니다.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "server.js"]