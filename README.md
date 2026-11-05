# Taanjika — starter monorepo

A deliberately small, TypeScript-first foundation for the Taanjika marketplace.

- **Darshana** — Next.js App Router frontend (`apps/darshana`)
- **Moola** — NestJS modular-monolith API (`apps/moola`)
- **PostgreSQL** — the only infrastructure service enabled by default

Redis, Meilisearch, object storage, CMS, payments and Firebase authentication are intentionally not wired in this foundation. They can be introduced when their phase begins.

## Requirements

- Node.js **26 LTS** (see `.nvmrc`)
- pnpm **12.16.1**
- Docker Engine and Docker Compose plugin

Install pnpm once:

```bash
npm install --global pnpm@12.16.1
```

## Start locally

```bash
# 1. Create your local environment file
cp .env.example .env

# 2. Install dependencies (this creates pnpm-lock.yaml; commit it to Git)
pnpm install

# 3. Start PostgreSQL only
pnpm db:up

# 4. Start both TypeScript applications
pnpm dev
```

Open:

- Darshana: http://localhost:3000
- Moola health: http://localhost:4000/api/v1/health
- PostgreSQL: localhost:5432

You can also start either app independently with `pnpm dev:darshana` or `pnpm dev:moola`.

## Run the production containers locally

First run `pnpm install` so the committed workspace lockfile exists. Then:

```bash
cp .env.example .env   # skip if already done
# Change POSTGRES_PASSWORD in .env before starting.
docker compose --profile apps up --build -d
```

This builds both app images and starts them with PostgreSQL. The app containers are behind the optional `apps` profile, so a normal `docker compose up -d` starts **only PostgreSQL**.

Stop containers:

```bash
docker compose --profile apps down
```

Delete the local database volume (destructive):

```bash
docker compose down -v
```

## Repository layout

```text
taanjika/
├── apps/
│   ├── darshana/              # Next.js frontend
│   │   ├── src/app/           # App Router pages and styles
│   │   └── Dockerfile         # Multi-stage production image
│   └── moola/                 # NestJS API / modular monolith
│       ├── src/
│       │   ├── modules/
│       │   │   ├── database/  # PostgreSQL connection lifecycle
│       │   │   └── health/    # Readiness endpoint
│       │   └── main.ts
│       └── Dockerfile         # Multi-stage production image
├── compose.yaml               # PostgreSQL by default; apps are opt-in
├── pnpm-workspace.yaml
└── .env.example
```

## Architecture conventions

- Keep business logic in Moola, not in Next.js route handlers. Darshana is the presentation layer and calls the versioned REST API.
- Add backend domains under `apps/moola/src/modules/<domain>`. Each module should own its controllers, DTOs, services and persistence boundary. Modules should communicate through exported services or events, not one another's internal files.
- Keep identity and authorization separate: Firebase will authenticate the person; Moola/PostgreSQL will own Taanjika roles and marketplace permissions.
- Use the three initial application roles: `CUSTOMER`, `ARTIST`, and `ADMIN`. Do **not** let a public signup request grant `ADMIN`; admin access must be provisioned through a trusted operation.
- Redis, Meilisearch and object storage are not needed to boot this foundation and are not started by Compose.

## Firebase authentication — next phase, not enabled yet

The intended flow is Google sign-in through Firebase Authentication in Darshana. Darshana will send the Firebase ID token to Moola; Moola will verify it with the Firebase Admin SDK and create/resolve the local user and role records in PostgreSQL. Firebase credentials must be supplied at runtime through a secret manager or deployment environment, never copied into an image or committed to Git.

No SMS OTP, payment gateway, Firebase Admin SDK, user schema or protected business routes are included yet. This repository is the base setup only.

## Production deployment notes

The app Dockerfiles use multi-stage builds, non-root runtime users, minimal runtime artifacts and `dumb-init`. Next.js uses standalone output. The Compose file is a **local bootstrap**, not a complete production deployment topology: use managed PostgreSQL with backups/PITR, TLS termination, a secret manager, external monitoring and an explicit deployment/rollback process in production. Replace the local sample password and review image digests and OS/package updates as part of release management.
