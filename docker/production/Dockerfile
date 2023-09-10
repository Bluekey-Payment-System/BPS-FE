FROM node:18-alpine AS base

# 1. 필요한 경우에만 디펜던시를 재설치합니다.
FROM base AS deps
# 라이브러리 일관성을 위해 컨테이너에 libc6-compat을 설치합니다.
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# 디펜던시를 설치합니다. 
COPY package.json yarn.lock* ./

# Nextjs의 원격 데이터 측정을 불허합니다.
ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 2. 필요한 경우에만 소스코드를 다시 빌드합니다.
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# dev서버용 환경변수를 복사합니다.
COPY .env.production .env.production

# Nextjs의 원격 데이터 측정을 불허합니다.
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# 3. 프로덕션 이미지 빌드 단계, 이전 단계의 모든 파일들을 복사하고 nextjs앱을 실행합니다.
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Nextjs의 원격 데이터 측정을 불허합니다.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# 이미지 용량 최적화를 위한 셋팅
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

CMD ["node", "server.js"]