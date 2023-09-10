FROM node:18-alpine AS base

# Step 1. 필요할 경우에만 소스코드를 다시 빌드합니다.
FROM base AS deps
# 라이브러리 일관성을 위해 컨테이너에 libc6-compat을 설치합니다.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# 디펜던시를 설치합니다. 
COPY package.json yarn.lock* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .

# 개발환경용 서버를 실행합니다.
CMD \
  if [ -f yarn.lock ]; then yarn dev; \
  else yarn dev; \
  fi