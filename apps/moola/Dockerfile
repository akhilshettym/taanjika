# syntax=docker/dockerfile:1.7
FROM node:26-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install --global pnpm@12.16.1
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/darshana/package.json ./apps/darshana/package.json
COPY apps/moola/package.json ./apps/moola/package.json
RUN pnpm install --frozen-lockfile

FROM deps AS builder
COPY . .
RUN pnpm --filter @taanjika/moola build

FROM base AS prod-deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/darshana/package.json ./apps/darshana/package.json
COPY apps/moola/package.json ./apps/moola/package.json
RUN pnpm install --prod --filter @taanjika/moola... --frozen-lockfile

FROM node:26-alpine AS runner
ENV NODE_ENV=production
ENV PORT=4000
WORKDIR /app
RUN apk add --no-cache dumb-init
COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=prod-deps --chown=node:node /app/apps/moola/node_modules ./apps/moola/node_modules
COPY --from=prod-deps --chown=node:node /app/apps/moola/package.json ./apps/moola/package.json
COPY --from=builder --chown=node:node /app/apps/moola/dist ./apps/moola/dist
USER node
EXPOSE 4000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "apps/moola/dist/main.js"]
