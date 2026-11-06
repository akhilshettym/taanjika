## Step 1

```
taanjika/
├── apps/
│   ├── darshana/
│   └── moola/
├── node_modules
├── .env
├── .env.example
├── .gitignore
├── compose.yaml
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
└── README.2md
└── README3.md
```

Important

&#x20;Make sure to open the main `taanjika` folder, not just `darshana` or `moola`.

## Step 2 — Terminal

Run:

```
pwd
```

Make sure the path ends with:

```
/taanjika
```

If it doesn't, navigate to the extracted folder:

```
cd ~/taanjika
```

Adjust the path if you moved the folder somewhere else.

## Step 3 — Verify pre-requisites

Check Node.js:

```
node -v
```

Expected:

```
v26.13.0
```

If you use NVM and have this version installed:

```
nvm use 26.13.0
```

Check pnpm:

```
pnpm -v
```

Expected:

```
12.16.1
```

If it isn't installed:

```
npm install -g pnpm@12.16.1
```

Check Docker:

```
docker --version
```

Then:

```
docker compose version
```

Make sure Docker Desktop is open and its engine is running.

## Step 4 — Create your environment file

Execute:

```
cp .env.example .env
```

This creates local environment configuration.

Open `.env`.

```
POSTGRES_USER=taanjika
POSTGRES_PASSWORD=MyLocalTaanjikaDb2026
POSTGRES_DB=taanjika
POSTGRES_PORT=5432

DATABASE_URL=postgresql://taanjika:MyLocalTaanjikaDb2026@localhost:5432/taanjika

DB_POOL_MAX=10

CORS_ORIGINS=http://localhost:3000
PORT=4000
```

Make sure the password in `DATABASE_URL` matches `POSTGRES_PASSWORD`.

Save the file.

## Step 5 — Install dependencies

Now execute:

```
pnpm install
```

Wait for completion

This installs all dependencies for:

- Darshana (Next.js).
- Moola (NestJS).
- The root workspace.

It will also generate:

```
pnpm-lock.yaml
```

This is expected. Keep this file in your repository.

## Step 6 — Start PostgreSQL

Open Docker Desktop.

Then execute:

```
pnpm db:up
```

This starts only PostgreSQL.

Check whether it's running:

```
docker compose ps
```

You should see PostgreSQL running.

To inspect its logs:

```
docker compose logs -f postgres
```

Look for:

```
database system is ready to accept connections
```

Press `CTRL + C` to exit the logs. PostgreSQL will continue running.

## Step 7 — Start Darshana (Frontend)

Second terminalx.

Execute:

```
pnpm dev:darshana
```

Wait until Next.js starts.

You should see the initial Taanjika placeholder page.

Keep this terminal running.

## Step 8 — Start Moola (Backend)

Open a third terminal in VS Code.

Again, make sure you're in the root directory.

Execute:

```
pnpm dev:moola
```

Wait until NestJS starts.

You should receive a JSON response similar to:

```
{
  "status": "ok",
  "service": "moola",
  "database": "connected",
  "timestamp": "..."
}
```

This confirms that Moola can communicate with PostgreSQL.

## Step 9 — Verify everything is running

Your final development setup should look like this:

## Taanjika — Local environment

- Darshana - Port 3000
- Moola - Port 4000
- PostgreSQL - Port 5432

Your three running services

Darshana and Moola run in two terminal sessions. PostgreSQL runs in Docker in the background.

## Step 10 — What about the next time you open the project?

Every time you want to work on Taanjika:

Terminal 1:

```
cd ~/Projects/taanjika
nvm use
pnpm db:up
```

Terminal 2:

```
pnpm dev:darshana
```

Terminal 3:

```
pnpm dev:moola
```

That's your regular development workflow.

---

## Step 11 - Communication

Before adding features, we'll verify that all three pieces communicate correctly:

1. Darshana — Next.js frontend (`localhost:3000`)
2. Moola — NestJS backend (`localhost:4000`)
3. PostgreSQL — database used by Moola

### Verify the running services

Keep your frontend and backend terminals running. Open these URLs in your browser:

- Darshana: [http://localhost:3000](http://localhost:3000)
- Moola health check: [http://localhost:4000/api/v1/health](http://localhost:4000/api/v1/health)

The health endpoint should report that the API is healthy and the database is connected. The exact response depends on the starter implementation.

In a fourth terminal, run:

```
docker compose ps
```

You should see the PostgreSQL container running. If the health endpoint reports a database error, we'll fix that before moving on.

## Step 2: Confirm the database is healthy

In the fourth terminal, run:

```
docker compose ps
```

Check that the PostgreSQL service shows as running or healthy.

Then check the Moola health URL again:

[http://localhost:4000/api/v1/health](http://localhost:4000/api/v1/health)

If both checks pass, your local foundation is ready.

---
