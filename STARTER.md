## TAANJIKA Initiator Guide

### 1. Root Directory Setup
Ensure you are operating from the project root directory before executing setup scripts.

```Bash
### Navigate to the project root
cd ~/taanjika

### Verify current working directory
pwd
```

### 2. Verify Prerequisites
Validate tool versions and run auto-install/switch fallbacks where applicable.

```Bash
### Check Node.js version (Target: v26.13.0)
node -v || nvm use 26.13.0 || nvm install 26.13.0

### Check pnpm version (Target: 12.16.1)
pnpm -v || npm install -g pnpm@12.16.1

### Verify Docker engine status
docker --version
docker compose version
```

### 3. Environment Variable Configuration
Copy the configuration template to generate your local .env file.

```Bash
### Copy example template to local environment file
cp .env.example .env

### (Optional) If sub-apps require dedicated environment files:
### cp apps/darshana/.env.example apps/darshana/.env
### cp apps/moola/.env.example apps/moola/.env
```

### 4. Dependency Installation
Install dependencies across all monorepo packages (Darshana frontend, Moola backend, and root).

```Bash
pnpm install
```

### 5. PostgreSQL Database Lifecycle & Migration
Start PostgreSQL Container:

```Bash
pnpm db:up
```

Verify Database Readiness:

```Bash
docker compose ps
docker compose logs -f postgres
```

**Note:** Wait until the logs display database system is ready to accept connections before proceeding. Press Ctrl + C to detach from logs (the database will remain running).

Apply Database Migration:

```Bash
# Load local environment variables and apply schema
export $(grep -v '^#' .env | xargs) &&
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f apps/moola/database/migrations/001_authentication_schema.sql
```

Stop Database (When Finished):

```Bash
pnpm db:down
```

### 6. Launch Local Development Servers
Run the frontend and backend applications in dedicated terminal sessions.

Terminal 1 — Frontend (Darshana / Next.js):

```Bash
pnpm dev:darshana
# Alternative: pnpm --filter darshana dev
```

Terminal 2 — Backend (Moola / NestJS):

```Bash
pnpm dev:moola
# Alternative: pnpm --filter moola dev
```



### 7. Pre-Commit Quality Checks
Execute all linters, type checks, tests, security audits, and builds before staging commits.

```Bash
# 1. Code Format Verification
pnpm format:check

# 2. Linter Verification
pnpm lint

# 3. TypeScript Type Check
pnpm typecheck

# 4. Test Suite Execution
pnpm test

# 5. Security Vulnerability Audit
pnpm audit --audit-level=high

# 6. Production Monorepo Build Check
pnpm build
```