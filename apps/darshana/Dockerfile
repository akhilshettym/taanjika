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
RUN pnpm --filter @taanjika/darshana build

FROM node:26-alpine AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
WORKDIR /app
RUN apk add --no-cache dumb-init \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs nextjs
COPY --from=builder --chown=nextjs:nodejs /app/apps/darshana/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/darshana/.next/static ./apps/darshana/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/darshana/public ./apps/darshana/public
USER nextjs
EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "apps/darshana/server.js"]
