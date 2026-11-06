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

---

# Taanjika — Complete Beginner's Setup & Developer Guide

Let's approach this as though you're opening the Taanjika repository for the very first time and have never worked with a monorepo before.

The goal is not just to get the project running. I want you to understand:

1. What we have created.
2. Why each technology is there.
3. What every important folder and configuration file does.
4. How Darshana (frontend) communicates with Moola (backend).
5. How PostgreSQL runs through Docker.
6. How to start, stop, debug and rebuild the project.
7. How to prepare the foundation for Firebase authentication.
8. How this setup eventually becomes a deployable production application.

I'll explain the existing starter first, then show you exactly what to do on your Mac.

# Part 1 — Understanding what we have built

## 1. What exactly is Taanjika?

Taanjika is going to be an online art marketplace.

There are three principal types of users:

| Role                 | What they will eventually do                                                    |
| -------------------- | ------------------------------------------------------------------------------- |
| Customer / Collector | Explore, purchase and manage artwork                                            |
| Seller / Artist      | Submit artwork, manage listings and view sales                                  |
| Admin                | Approve artists, review paintings, monitor inventory and manage the marketplace |

We are going to build this using two applications inside one repository.

# TAANJIKA

One repository · Modular monolith architecture

01 — DARSHANA

Frontend

# Next.js

What visitors see and interact with.

Pages, forms, loader, login, registration, dashboards and marketplace UI.

HTTP requests · REST API · JSON responses

02 — MOOLA

Backend

# NestJS

The business logic and decision-making layer.

Authentication, users, roles, products, inventory, orders and admin operations.

PostgreSQL

The permanent database that stores Taanjika's application data.

The architecture is a modular monolith, not a microservices architecture.

The monolith is Moola: the backend is one application containing separately organized business modules. Darshana is a separate frontend application.

The repository containing both is called a monorepo.

These are three different concepts:

- Monorepo: how we organize source code.
- Modular monolith: how we organize backend application logic.
- Independent deployment: how we publish the frontend and backend.

You can maintain all three simultaneously.

## 2. Why are we using these technologies?

Let's understand each technology before touching the terminal.

| Technology   | Purpose            | Simple explanation                             |
| ------------ | ------------------ | ---------------------------------------------- |
| Node.js      | Runtime            | Runs JavaScript and TypeScript applications    |
| TypeScript   | Language           | JavaScript with static type checking           |
| Next.js      | Frontend framework | Builds Darshana                                |
| React        | UI library         | Creates interactive components                 |
| Tailwind CSS | Styling            | Styles the frontend using utility classes      |
| NestJS       | Backend framework  | Organizes Moola into modules                   |
| PostgreSQL   | Database           | Permanently stores users and business data     |
| Docker       | Containers         | Runs services in isolated environments         |
| pnpm         | Package manager    | Installs dependencies and manages the monorepo |

### Node.js

Normally, JavaScript is associated with browsers.

Node.js allows JavaScript to run outside the browser, on your computer or a server.

For Taanjika, Node.js runs:

- The Next.js development environment.
- The NestJS API.
- Build commands.
- Other JavaScript-based development tools.

### TypeScript

We are not writing ordinary JavaScript. We are writing TypeScript.

Consider:

```
function greet(name) {
  return "Hello " + name;
}
```

The problem is that JavaScript does not enforce what `name` should contain.

In TypeScript:

```
function greet(name: string): string {
  return `Hello ${name}`;
}
```

Now TypeScript knows:

- `name` must be a string.
- The function must return a string.

This becomes particularly useful when we build the authentication system, user roles and product models.

### Next.js

Next.js is the foundation of Darshana.

It provides:

- Page routing.
- Server rendering.
- Client-side interactivity.
- Image optimization.
- API integration.
- SEO-friendly pages.

We are using the App Router, which organizes pages using folders and files.

### NestJS

NestJS is the foundation of Moola.

Unlike a basic Express application, NestJS provides a structured architecture using:

- Modules.
- Controllers.
- Services.
- Dependency injection.
- Guards.
- DTOs.
- Middleware and interceptors.

This is especially useful for Taanjika because we will eventually have multiple user roles, permissions, protected APIs and marketplace workflows.

### PostgreSQL

PostgreSQL is where the actual information will live.

For example:

```
users
  ├── id
  ├── firebase_uid
  ├── email
  ├── full_name
  └── created_at

user_roles
  ├── id
  ├── user_id
  └── role

artists
  ├── id
  ├── user_id
  ├── approval_status
  └── created_at
```

These are examples of future tables, not tables already created in the starter repository.

### Docker

Docker allows us to run PostgreSQL without installing and configuring PostgreSQL directly on your Mac.

Think of Docker as a system that runs applications inside isolated environments called containers.

We will use Docker for local infrastructure and eventually for production application images.

# Part 2 — Understanding the repository structure

Let's look at the actual repository we generated.

```
taanjika/
│
├── apps/
│   │
│   ├── darshana/
│   │   ├── src/
│   │   │   └── app/
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       └── globals.css
│   │   │
│   │   ├── public/
│   │   ├── Dockerfile
│   │   ├── next.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── moola/
│       ├── src/
│       │   ├── modules/
│       │   │   ├── database/
│       │   │   └── health/
│       │   │
│       │   ├── app.module.ts
│       │   └── main.ts
│       │
│       ├── Dockerfile
│       ├── nest-cli.json
│       ├── tsconfig.json
│       └── package.json
│
├── compose.yaml
├── package.json
├── pnpm-workspace.yaml
├── .env.example
├── .gitignore
├── .dockerignore
├── .editorconfig
├── .npmrc
├── .nvmrc
├── .node-version
└── README.md
```

Let's understand every important part.

## 3. Root directory

The root directory is the main Taanjika project folder.

Everything belongs inside this directory.

You should open this folder in VS Code rather than opening Darshana or Moola individually.

### `package.json`

This is the main package configuration file.

It contains the root project name, package manager, supported Node.js version and scripts.

The current file includes:

```
{
  "name": "taanjika",
  "version": "0.1.0",
  "private": true,
  "packageManager": "pnpm@12.16.1",
  "engines": {
    "node": ">=26.0.0 <27"
  }
}
```

Let's understand this.

- `name`: The repository/project name.
- `version`: Our initial project version.
- `private`: Prevents accidental publication of the root workspace to npm.
- `packageManager`: Specifies the intended pnpm version.
- `engines`: Declares the supported Node.js range.

The most important part is the scripts section:

```
{
  "scripts": {
    "dev": "pnpm --parallel --filter @taanjika/darshana --filter @taanjika/moola dev",

    "dev:darshana": "pnpm --filter @taanjika/darshana dev",

    "dev:moola": "pnpm --filter @taanjika/moola start:dev",

    "build": "pnpm --filter @taanjika/darshana build && pnpm --filter @taanjika/moola build",

    "lint": "pnpm --filter @taanjika/darshana lint",

    "typecheck": "pnpm --filter @taanjika/darshana typecheck && pnpm --filter @taanjika/moola typecheck",

    "db:up": "docker compose up -d postgres",

    "db:down": "docker compose stop postgres"
  }
}
```

This is important because you won't need to enter individual application folders every time.

For example:

```
pnpm dev
```

Starts both applications.

```
pnpm dev:darshana
```

Starts only the frontend.

```
pnpm dev:moola
```

Starts only the backend.

```
pnpm build
```

Builds both applications.

```
pnpm typecheck
```

Checks the TypeScript code in both applications.

```
pnpm db:up
```

Starts PostgreSQL.

```
pnpm db:down
```

Stops PostgreSQL without deleting its data.

Think of root `package.json` as the central command centre of the repository.

### `pnpm-workspace.yaml`

This file tells pnpm that our repository contains multiple applications.

```
packages:
  - "apps/*"
```

This means pnpm should look inside `apps/` and treat each application folder containing a package manifest as a workspace package.

Currently:

```
apps/darshana
apps/moola
```

Both are independently managed applications, but share one dependency-management workspace.

### What is pnpm?

pnpm is our package manager.

You might already know npm.

For example:

```
npm install
```

pnpm provides similar functionality:

```
pnpm install
```

We are using pnpm because it works well with monorepos and has efficient dependency management.

### `.nvmrc` and `.node-version`

Both files contain:

```
26.13.0
```

They indicate which Node.js version this repository expects.

When using NVM, you can run:

```
nvm use
```

NVM reads `.nvmrc` automatically.

### `.npmrc`

```
engine-strict=true
save-exact=true
```

This does two things:

- `engine-strict`: Enforces declared package runtime compatibility.
- `save-exact`: Saves installed package versions without automatically adding a version range.

### `.gitignore`

This prevents unnecessary files from being committed to Git.

Typical examples include:

```
node_modules/
.next/
dist/
.env
```

We don't want to upload installed dependencies, generated builds or secret environment files to GitHub.

### `.dockerignore`

This controls which files Docker should ignore when building application images.

For example, we don't want Docker to unnecessarily copy:

- Local `node_modules`.
- Git history.
- Local environment secrets.
- Previous build output.

This makes builds cleaner and reduces the risk of leaking local configuration.

### `.editorconfig`

Helps maintain consistent editor settings such as indentation and line endings.

It is useful when multiple developers work on the same repository.

### `.env.example`

This is our environment-variable template.

We will discuss it in detail in Part 4.

# Part 3 — Understanding Darshana (Frontend)

## 4. What is Darshana?

Darshana is the user-facing application.

Everything your customers, collectors, artists and administrators see in their browsers will be built here.

It is built using:

- Next.js.
- React.
- TypeScript.
- Tailwind CSS.

Let's go inside:

```
apps/
└── darshana/
```

### `package.json`

This file contains Darshana's own dependencies and commands.

Its main dependencies are:

```
{
  "dependencies": {
    "next": "16.4.5",
    "react": "19.3.1",
    "react-dom": "19.3.1"
  }
}
```

What are these?

- `next`: The Next.js framework.
- `react`: The UI library.
- `react-dom`: Connects React to the browser DOM.

The development dependencies include TypeScript, ESLint and Tailwind CSS.

### What is the `src` directory?

This is where the actual frontend source code lives.

```
darshana/
└── src/
    └── app/
```

We are using Next.js App Router.

### `page.tsx`

Currently:

```
src/app/page.tsx
```

This is the homepage route.

In Next.js App Router:

```
app/page.tsx
```

represents:

```
/
```

That means:

```
http://localhost:3000/
```

When you open Darshana in your browser, Next.js renders this file.

The starter currently displays:

> A space for art to belong.

It is simply a placeholder to confirm that the frontend is running.

We will replace it with our actual loader, sign-in and registration experience.

### `layout.tsx`

This is the root layout.

It wraps all the pages inside the application.

For example:

```
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

The `children` property represents whatever page is currently being displayed.

For example:

```
Root Layout
    |
    |---- Homepage
    |
    |---- Sign-in
    |
    |---- Register
    |
    |---- Customer Dashboard
    |
    |---- Artist Dashboard
    |
    |---- Admin Dashboard
```

All these pages can use the same root layout.

This becomes particularly useful when we build shared fonts, theme configurations and global providers.

The file also defines the site's metadata:

```
export const metadata = {
  title: {
    default: "Taanjika",
    template: "%s | Taanjika",
  },
};
```

This controls the browser page title.

### `globals.css`

This is our global stylesheet.

It imports Tailwind CSS:

```
@import "tailwindcss";
```

We can add global styles here, such as:

- Typography.
- Default colours.
- Base styles.
- Design tokens.
- Global animations.

Later, we will establish Taanjika's complete design system here and in dedicated theme configuration files.

### `public/`

This is where static files will live.

For example:

```
public/
├── logo.svg
├── favicon.ico
├── images/
│   ├── paintings/
│   └── banners/
└── fonts/
```

Static assets can be referenced by their paths.

Example:

```
<img src="/logo.svg" alt="Taanjika" />
```

For optimized images, we should generally use Next.js `Image` instead.

### `next.config.ts`

This contains Next.js-specific configuration.

The important setting is:

```
const nextConfig = {
  output: "standalone",
};
```

Why?

It produces a smaller deployment bundle containing the server and necessary production dependencies.

This is particularly useful for Docker deployments.

### `tsconfig.json`

This is the TypeScript configuration for Darshana.

An important configuration is:

```
"strict": true
```

This enables strict type checking.

We also have:

```
"paths": {
  "@/*": ["./src/*"]
}
```

This creates an import alias.

Instead of writing:

```
import Button from
  "../../../components/Button";
```

We can write:

```
import Button from
  "@/components/Button";
```

Much cleaner!

One important distinction: the alias is configured, but there is no component library or shared UI package yet. We will build those as the UI takes shape.

### `eslint.config.mjs`

This configures ESLint.

ESLint helps detect programming mistakes, problematic patterns and style issues.

Run:

```
pnpm --filter @taanjika/darshana lint
```

### `postcss.config.mjs`

This connects Tailwind CSS to the PostCSS build pipeline.

You don't need to modify this during normal page development.

# Part 4 — Understanding Moola (Backend)

## 5. What is Moola?

Moola is the application that handles Taanjika's business logic.

Imagine someone registering as an artist.

Darshana collects the form information and sends it to Moola.

Moola will eventually:

1. Verify the user's Firebase identity.
2. Check whether the user already exists.
3. Create or retrieve their user record.
4. Assign the appropriate application role.
5. Return the relevant user information.
6. Allow or deny access to protected API endpoints.

Notice that Darshana displays the interface, but Moola makes the important business decisions.

Let's inspect the current structure:

```
apps/
└── moola/
    └── src/
        ├── modules/
        │   ├── database/
        │   └── health/
        │
        ├── app.module.ts
        └── main.ts
```

## 6. Understanding `main.ts`

This is the entry point of the backend.

Every time Moola starts, this file runs first.

```
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");

  await app.listen(4000, "0.0.0.0");
}
```

There are several important things happening here.

1\. Creating the application

```
NestFactory.create(AppModule)
```

This tells NestJS to initialize the application using our root module.

2\. API versioning

```
app.setGlobalPrefix("api/v1");
```

This ensures that our APIs start with:

```
/api/v1/
```

For example:

```
/api/v1/health
/api/v1/auth/login
/api/v1/users
/api/v1/products
```

Why versioning?

Suppose we eventually have external applications consuming our API.

When we make major changes, we can introduce `/api/v2/` without immediately breaking existing integrations.

3\. CORS

```
app.enableCors({
  origin: [...],
  credentials: true,
});
```

CORS stands for Cross-Origin Resource Sharing.

Your frontend and backend run on different ports:

```
Darshana: localhost:3000
Moola:    localhost:4000
```

Browsers enforce origin restrictions when frontend JavaScript communicates with other domains or ports.

CORS tells the browser which origins are permitted to access Moola.

`credentials: true` allows credentialed requests when the application is configured to use them. It does not itself implement authentication or cookies.

4\. Helmet

```
app.use(helmet());
```

Helmet configures a collection of HTTP security headers.

It provides useful baseline security protection.

5\. ValidationPipe

```
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

This prepares the backend to validate incoming request data using DTOs.

For example, imagine a registration request:

```
{
  "email": "artist@example.com",
  "password": "example",
  "unexpectedField": "malicious-data"
}
```

When we implement DTOs, `whitelist` and `forbidNonWhitelisted` help reject unwanted fields rather than silently accepting them.

These protections are configured, but actual registration DTOs do not exist yet.

6\. Port

```
await app.listen(port, "0.0.0.0");
```

This starts Moola on port 4000 by default.

## 7. Understanding `app.module.ts`

This is the root NestJS module.

```
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["../../.env", ".env"],
      ignoreEnvFile: process.env.NODE_ENV === "production",
    }),
    DatabaseModule,
    HealthModule,
  ],
})
export class AppModule {}
```

Think of this as the application assembly point.

It registers:

- Configuration.
- Database functionality.
- Health monitoring.

We will eventually add more modules here:

```
AppModule
│
├── ConfigModule
├── DatabaseModule
├── HealthModule
├── AuthModule
├── UsersModule
├── RolesModule
├── ArtistsModule
├── CatalogModule
├── OrdersModule
└── AdminModule
```

We are not creating all these modules now because the goal is a clean initial foundation.

## 8. Understanding the Database module

Location:

```
moola/src/modules/database/
```

This is responsible for the PostgreSQL connection.

There are three files.

`database.constants.ts`

```
export const PG_POOL = Symbol("PG_POOL");
```

This defines a unique injection token for the PostgreSQL connection pool.

`database.module.ts`

This creates the actual PostgreSQL connection pool.

```
new Pool({
  connectionString:
    config.getOrThrow<string>("DATABASE_URL"),

  max: config.get<number>("DB_POOL_MAX", 10),

  connectionTimeoutMillis: 5000,

  idleTimeoutMillis: 30000,
});
```

What is a connection pool?

Rather than opening a completely new database connection for every request, PostgreSQL connections are reused.

Imagine 100 users accessing Taanjika.

Instead of opening and closing hundreds of connections unnecessarily, the application manages a controlled number of reusable connections.

Our initial maximum is 10.

`database.service.ts`

This exposes database functionality to other NestJS modules.

Currently, it contains:

```
async ping(): Promise<void> {
  await this.pool.query("SELECT 1");
}
```

This is simply a database connectivity test.

It also closes the connection pool when the application shuts down.

## 9. Understanding the Health module

Location:

```
moola/src/modules/health/
```

This contains:

```
health/
├── health.controller.ts
└── health.module.ts
```

The controller exposes:

```
GET /api/v1/health
```

It checks whether PostgreSQL is reachable.

When everything works, you should receive:

```
{
  "status": "ok",
  "service": "moola",
  "database": "connected",
  "timestamp": "2026-11-05T..."
}
```

When PostgreSQL is unavailable, Moola returns HTTP 503.

This is useful because checking whether the server is running is not enough. We also want to know whether its essential database dependency is reachable.

## 10. How Moola's modules will grow

A future version of the repository could look like this:

```
moola/
└── src/
    ├── modules/
    │   │
    │   ├── database/
    │   │
    │   ├── health/
    │   │
    │   ├── auth/
    │   │   ├── auth.module.ts
    │   │   ├── auth.controller.ts
    │   │   ├── auth.service.ts
    │   │   ├── guards/
    │   │   └── strategies/
    │   │
    │   ├── users/
    │   │   ├── users.module.ts
    │   │   ├── users.controller.ts
    │   │   ├── users.service.ts
    │   │   ├── dto/
    │   │   └── entities/
    │   │
    │   ├── roles/
    │   │
    │   ├── artists/
    │   │
    │   ├── catalog/
    │   │
    │   ├── orders/
    │   │
    │   └── admin/
    │
    ├── app.module.ts
    └── main.ts
```

Each module should have a clear responsibility.

For example:

- Auth handles authentication.
- Users handles user profiles.
- Roles handles permissions.
- Artists handles artist-specific workflows.
- Catalog handles product and painting data.
- Admin handles administrative operations.

This is how we keep a monolith modular.

# Part 5 — Understanding Docker and PostgreSQL

## 11. What is Docker Compose?

Our file is:

```
taanjika/compose.yaml
```

Docker Compose lets us define and run multiple containers together.

Currently, it defines three services:

| Service    | Purpose            | Default  |
| ---------- | ------------------ | -------- |
| PostgreSQL | Database           | Running  |
| Moola      | Backend container  | Disabled |
| Darshana   | Frontend container | Disabled |

Why are the other two disabled by default?

Because while developing, we want to edit TypeScript files and see the changes immediately using the development servers.

We do not need to rebuild a Docker image every time we change a frontend component.

So we use this arrangement:

Default development mode

Docker

PostgreSQL

Local Node.js

Darshana

Local Node.js

Moola

Production-container simulation

Docker

PostgreSQL

Docker

Darshana

Docker

Moola

## 12. Understanding the PostgreSQL service

In `compose.yaml`:

```
postgres:
  image: postgres:17-alpine
```

This tells Docker to download and run the PostgreSQL 17 Alpine image.

What is Alpine?

It is a small Linux distribution commonly used as the base of lightweight container images.

The next part:

```
environment:
  POSTGRES_USER: ${POSTGRES_USER:-taanjika}
  POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?Set POSTGRES_PASSWORD in .env}
  POSTGRES_DB: ${POSTGRES_DB:-taanjika}
```

These are environment variables used to initialize PostgreSQL.

It tells the container:

- Create a database user.
- Set the user's password.
- Create the initial database.

We also have:

```
volumes:
  - taanjika-postgres-data:/var/lib/postgresql/data
```

This is extremely important.

A container can be deleted and recreated.

But you don't want your database records to disappear every time that happens.

A Docker volume stores PostgreSQL data separately from the container.

Therefore, restarting PostgreSQL does not automatically erase the database.

### PostgreSQL health check

```
healthcheck:
  test:
    ["CMD-SHELL", "pg_isready ..."]
```

Docker periodically checks whether PostgreSQL is accepting connections.

This is useful because Moola should not start before its database is ready.

Our Compose configuration uses:

```
depends_on:
  postgres:
    condition: service_healthy
```

This means Moola waits for PostgreSQL to pass its health check.

# Part 6 — Configuring your Mac from scratch

## 13. Before starting: install the required software

You need four things installed on your Mac.

[precis0x (@precisox) on X](https://images.openai.com/static-rsc-4/6UGebdew9WxthPsgkQBRJ_JmTfWW_y7agnczvltWrIQT3Fya6scbDbI6iPx5bLk5AYaAZn6vZ0m2arJ8MWgkkjeh-UTDFj7T_xmY-oHzvDmme3uha0Wp-xi3VPGSmRx9jEKG5QFBxu5oc1sgdei7nH2rGCbyU3I1ifuv0lVXmu0?purpose=inline)

1\. Visual Studio Code

This is where you will write and manage the code.

Download: [Visual Studio Code](https://code.visualstudio.com/?utm_source=chatgpt.com)

[swz22 (John Kim) · GitHub](https://images.openai.com/static-rsc-4/yhb6L_zHD89hq9StVnKJSbhV5YpcjpuXaUiwKe3Yd0Q3p8qLiwTo4xoM6cgkONkAC2R8lMT8_9O1FOAg1f3t88UK4wnh_g7GSnUoengav4u4Cuy4V1KWDeoEr_8EXAvRqrXtBzD4mBtIunoq3hjYaw1TePJfYx8Vj52vuhBOF50?purpose=inline)

2\. Node.js 26.13.0

This is our JavaScript runtime.

Download: [Node.js 26.13.0](https://nodejs.org/en/download/archive/v26.13.0?utm_source=chatgpt.com)

[Docker Desktop - Download and install on Windows | Microsoft Store](https://images.openai.com/static-rsc-4/b7gTgu5g7MNN_S0rVhTqsFBDolg55r2MIyJUcxHLmjxv7fxQYjrd6OAdH80vAOKIkdD-4U1iiHC0XBYfvXN-RJ9HvILfLay8mSvwkWjW5F6DWWVFa6Ry8PBV5YtrMvyWmivrX3-JwARHIHsNQFlhNh1PI9pBnP7Ne3zp5MH7-78?purpose=inline)

3\. Docker Desktop

This will run PostgreSQL in a container.

Download: [Docker Desktop](https://www.docker.com/products/docker-desktop/?utm_source=chatgpt.com)

[Pnpm Logo PNG Vectors Free Download](https://images.openai.com/static-rsc-4/VSJpwuuPEvSYzx-L3RzrZ1-wC5ClEuXxBvR6pfCKCdt0RGNT371dvGWvje6mGdWXHesc_gGgGTOVd4SNkmkmUBK-X_EtEf0REMFhry369rJOOOztYFMwD6SOdRAEPYJfEAL5W2f4s3K14uSe4L9ewM0N81e-n30y6zxPO6CDK8U?purpose=inline)

4\. pnpm 12.16.1

This manages our dependencies.

We will install this through the terminal.

### Why Node 26.13.0?

Our project specifically specifies Node 26.

Node.js 26.13.0 entered LTS on October 28, 2026, and is supported through April 2029. The current NestJS CLI documentation also lists Node 26 as a supported version for its generators.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://nodejs.org&sz=32)

Node.js 26.13.0 (LTS)+1

Our `.nvmrc` already specifies this version.

### Install Node.js

You can install the official macOS installer from the link above.

Alternatively, I recommend using NVM (Node Version Manager). It lets you switch Node versions between projects.

After installing NVM, enter:

```
nvm install 26.13.0
nvm use 26.13.0
```

Verify:

```
node -v
```

Expected:

```
v26.13.0
```

Also check npm:

```
npm -v
```

### Install pnpm

Once Node.js is installed, open your terminal:

```
npm install --global pnpm@12.16.1
```

Verify:

```
pnpm -v
```

Expected:

```
12.16.1
```

pnpm 12 supports Node 26.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://pnpm.io&sz=32)

pnpm

### Install Docker Desktop

Install Docker Desktop and open it.

Wait until Docker reports that its engine is running.

Open Terminal and execute:

```
docker --version
```

Then:

```
docker compose version
```

You should get version information for both commands.

Important: Installing Docker Desktop is not enough. Docker Desktop must actually be running before we try starting PostgreSQL.

## 14. Download and extract the Taanjika ZIP

Download the starter:

Download Taanjika Starter ZIP

Once it is downloaded:

1. Open your Downloads folder.
2. Double-click `taanjika-starter.zip`.
3. macOS will extract a folder called `taanjika`.
4. Move that folder to your preferred development directory.

For example:

```
Macintosh HD
    └── Users
        └── YourUser
            └── Projects
                └── taanjika
```

You should have:

```
Projects/
└── taanjika/
    ├── apps/
    ├── compose.yaml
    ├── package.json
    ├── pnpm-workspace.yaml
    └── README.md
```

## 15. Open the project in VS Code

Open Terminal.

Navigate to your project:

```
cd ~/Projects/taanjika
```

Check your current directory:

```
pwd
```

It should end with:

```
/Projects/taanjika
```

Now run:

```
code .
```

This opens the entire Taanjika repository in VS Code.

If `code` isn't recognized, open VS Code manually and select:

File → Open Folder → Select taanjika.

Do not open only the `darshana` folder. Do not open only the `moola` folder.

We want the entire monorepo open.

# Part 7 — Configure environment variables

## 16. What is an environment variable?

Suppose your database has the following credentials:

```
Username: taanjika
Password: MySecretPassword
Database: taanjika
```

Should you write those credentials directly inside your backend source code?

Absolutely not.

Why?

Because source code can be pushed to GitHub. If database credentials are written directly in the code, somebody who accesses the repository might gain access to your database.

Instead, we use environment variables.

Environment variables allow us to configure applications without hardcoding sensitive information.

Our root directory contains:

```
.env.example
```

This is a template.

We need to create our own:

```
.env
```

### Step 1 — Create the environment file

Inside the root project folder, execute:

```
cp .env.example .env
```

Now your repository will contain:

```
taanjika/
├── .env
├── .env.example
├── apps/
└── ...
```

### Step 2 — Open `.env`

The initial file contains:

```
POSTGRES_USER=taanjika
POSTGRES_PASSWORD=local_dev_only_change_me
POSTGRES_DB=taanjika
POSTGRES_PORT=5432

DATABASE_URL=postgresql://taanjika:local_dev_only_change_me@localhost:5432/taanjika

DB_POOL_MAX=10

CORS_ORIGINS=http://localhost:3000
PORT=4000
```

Let's understand every variable.

| Variable            | Explanation                            |
| ------------------- | -------------------------------------- |
| `POSTGRES_USER`     | PostgreSQL username                    |
| `POSTGRES_PASSWORD` | PostgreSQL password                    |
| `POSTGRES_DB`       | Initial database name                  |
| `POSTGRES_PORT`     | Local port exposed by Docker           |
| `DATABASE_URL`      | Backend's PostgreSQL connection string |
| `DB_POOL_MAX`       | Maximum connection-pool size           |
| `CORS_ORIGINS`      | Frontend origin Moola permits          |
| `PORT`              | Backend application port               |

### Step 3 — Change the local password

For example:

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

Notice something important.

The password inside `DATABASE_URL` must match `POSTGRES_PASSWORD`.

Otherwise, Moola won't be able to connect to PostgreSQL.

For simplicity, use an alphanumeric password for this local example. Special characters in a database URL password must be URL-encoded.

Never push `.env` to GitHub. The repository's `.gitignore` is intended to exclude it.

For now, we don't need:

- Firebase credentials.
- Redis credentials.
- Meilisearch configuration.
- Object storage credentials.
- Payment gateway credentials.

Those will be added when the respective functionality is introduced.

# Part 8 — Install project dependencies

## 17. What are dependencies?

When you build an application, you rarely write every feature yourself.

For example, Next.js is an existing framework. NestJS is another existing framework.

We install them as project dependencies.

Our package manifests specify which packages Darshana and Moola need.

In a monorepo, pnpm manages these dependencies across the different applications.

Navigate to your project root:

```
cd ~/Projects/taanjika
```

Now run:

```
pnpm install
```

This will:

1. Read the root `package.json`.
2. Read `pnpm-workspace.yaml`.
3. Find Darshana and Moola.
4. Read their respective `package.json` files.
5. Download the required dependencies.
6. Link the dependencies to the workspace applications.
7. Generate the `pnpm-lock.yaml` file.

### An important detail about your ZIP

The ZIP contains 34 project files, but it does not contain `pnpm-lock.yaml`.

That means the first `pnpm install` is mandatory.

This is especially important because both Dockerfiles contain:

```
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
```

Without the lockfile, Docker cannot execute those instructions successfully.

After installation, your root directory should look like this:

```
taanjika/
├── apps/
├── node_modules/
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── .env
└── ...
```

The lockfile records the resolved dependency versions.

This ensures that other developers and deployment environments install the same dependency tree.

Commit `pnpm-lock.yaml` to GitHub. Do not commit `node_modules`.

# Part 9 — Start PostgreSQL using Docker

## 18. What exactly happens when we start PostgreSQL?

We are not installing PostgreSQL directly on macOS.

Instead, we are asking Docker to run a PostgreSQL container.

Open the terminal at the root of the Taanjika repository.

Execute:

```
pnpm db:up
```

This runs:

```
docker compose up -d postgres
```

Let's break it down:

- `docker compose`: Interacts with the services defined in `compose.yaml`.
- `up`: Creates and starts the requested containers.
- `-d`: Runs the containers in the background.
- `postgres`: Starts only the PostgreSQL service.

Why only PostgreSQL?

Because Redis, Meilisearch and object storage are not required for our initial foundation.

There is no reason to consume system resources running services we aren't using.

### 18.1 Verify that PostgreSQL is running

Execute:

```
docker compose ps
```

You should see a service named:

```
taanjika-postgres-1
```

The status should indicate that it is running and healthy.

You can also execute:

```
docker compose logs -f postgres
```

This displays PostgreSQL logs.

When you see a message indicating that the database system is ready to accept connections, PostgreSQL has successfully started.

Press:

```
CTRL + C
```

This exits the log display. It does not stop PostgreSQL.

### 18.2 Where is the database stored?

Remember this section in `compose.yaml`?

```
volumes:
  - taanjika-postgres-data:/var/lib/postgresql/data
```

Docker creates a persistent volume called:

```
taanjika-postgres-data
```

PostgreSQL stores its database files there.

This is important because the container itself can be recreated without deleting the persistent database files.

### 18.3 Can I access PostgreSQL directly?

Yes.

You can enter PostgreSQL's terminal using:

```
docker compose exec postgres \
  psql -U taanjika -d taanjika
```

You should see a prompt similar to:

```
taanjika=#
```

Now you can execute SQL statements.

For example:

```
SELECT version();
```

To list available tables:

```
\dt
```

Currently, it should not show our business tables because we haven't implemented a database schema or migrations.

To exit:

```
\q
```

You can also use a database GUI such as [DBeaver](https://dbeaver.io/?utm_source=chatgpt.com) to inspect PostgreSQL visually.

For its connection configuration, use:

| Field    | Value                |
| -------- | -------------------- |
| Host     | localhost            |
| Port     | 5432                 |
| Database | taanjika             |
| Username | taanjika             |
| Password | Your `.env` password |

# Part 10 — Start Darshana and Moola

## 19. Start both applications together

Now comes the most important step.

We have:

- Installed Node.js.
- Installed pnpm.
- Installed project dependencies.
- Configured environment variables.
- Started PostgreSQL.

We can now start the applications.

From the repository root, run:

```
pnpm dev
```

Remember the root script?

```
"dev": "pnpm --parallel --filter @taanjika/darshana --filter @taanjika/moola dev"
```

This command tells pnpm:

1. Find the Darshana workspace.
2. Find the Moola workspace.
3. Execute each application's `dev` script.
4. Run them in parallel.

Darshana's development command is:

```
next dev --hostname 0.0.0.0
```

Moola's development command is:

```
nest start --watch
```

### What does watch mode mean?

Suppose you open:

```
apps/moola/src/main.ts
```

You change something and save the file.

NestJS detects the change and restarts the development application automatically.

The same applies to Darshana. Next.js provides automatic recompilation and browser updates during development.

This is why we use development servers instead of rebuilding Docker images for every code change.

## 20. What should you see?

Both development servers should start.

Running

Darshana

# localhost:3000

Next.js development server

Running

Moola

# localhost:4000

NestJS REST API

Running

PostgreSQL

# localhost:5432

PostgreSQL database

### Open Darshana

Visit:

[http://localhost:3000](http://localhost:3000?utm_source=chatgpt.com)

You should see the placeholder homepage.

It should display:

> A space for art to belong.

You should also see:

> Darshana is running.

This confirms that the Next.js frontend is responding.

### Open Moola

Visit:

[http://localhost:4000/api/v1/health](http://localhost:4000/api/v1/health?utm_source=chatgpt.com)

You should receive:

```
{
  "status": "ok",
  "service": "moola",
  "database": "connected",
  "timestamp": "..."
}
```

This is a very important test.

It confirms three things:

1. NestJS has successfully started.
2. The health endpoint is accessible.
3. Moola has successfully executed a database query against PostgreSQL.

You now have the initial Taanjika development environment running.

# Part 11 — How does the frontend communicate with the backend?

## 21. Understanding the actual communication flow

This is something you should understand before we implement authentication.

Let's consider a future login scenario.

A customer opens Darshana.

They click the Sign In button.

Darshana eventually sends a request to Moola.

The communication looks like this:

Step 1 — User

Clicks Sign In in the browser.

Step 2 — Darshana

Sends an HTTP request to Moola.

POST /api/v1/auth/...

Step 3 — Moola

Processes the request and applies authentication, permissions and business rules.

Step 4 — PostgreSQL

Reads or updates the user's application record.

Step 5 — Response

Moola returns a response, and Darshana updates the UI accordingly.

For example, later, Darshana may call:

```
const response = await fetch(
  "http://localhost:4000/api/v1/auth/me",
  {
    credentials: "include",
  }
);
```

The actual authentication endpoint and cookie strategy still need to be implemented.

But this is the general communication pattern.

We want to keep business logic in Moola rather than putting everything in Darshana.

That separation is important for maintainability and security.

# Part 12 — Understanding the Dockerfiles

## 22. Why are there two Dockerfiles?

We have:

```
apps/
├── darshana/
│   └── Dockerfile
│
└── moola/
    └── Dockerfile
```

Why?

Because these are two separate deployable applications.

Each application needs its own Docker image.

### What is a Docker image?

Think of an image as a packaged application.

For example:

```
darshana-image
    ├── Node.js runtime
    ├── Next.js server
    └── Required production files
```

And:

```
moola-image
    ├── Node.js runtime
    ├── NestJS compiled application
    └── Required production dependencies
```

Docker creates containers from these images.

### 22.1 What is a multi-stage Docker build?

Both Dockerfiles use multi-stage builds.

For Moola, the stages are:

```
Base
  |
  v
Dependencies
  |
  v
Builder
  |
  v
Production dependencies
  |
  v
Runner
```

Let's understand each.

Base stage

```
FROM node:26-alpine AS base
```

This establishes the base Node.js environment and installs pnpm.

Dependencies stage

```
FROM base AS deps
```

This installs all required dependencies using the lockfile.

Builder stage

```
FROM deps AS builder
```

This compiles the NestJS TypeScript source code.

TypeScript is not directly what Node executes in this setup. The build produces JavaScript files in `dist/`.

Production dependencies

The Moola Dockerfile separately installs production dependencies.

Development packages such as TypeScript and Nest CLI are not required by the production runtime.

Runner stage

```
FROM node:26-alpine AS runner
```

This is the final runtime image.

It receives the compiled application and production dependencies, not the entire development environment.

It also runs as a non-root user.

That is a useful security practice.

### 22.2 Why do we use `dumb-init`?

Containers need to handle operating-system signals properly.

For example, when a hosting platform stops a container, it sends a termination signal.

`dumb-init` helps forward these signals and manage child processes correctly.

This improves shutdown behaviour.

### 22.3 What about Darshana's Dockerfile?

Darshana follows a similar concept.

However, Next.js has a special feature called standalone output.

Our `next.config.ts` contains:

```
output: "standalone";
```

This enables Next.js to prepare a reduced production server bundle.

The Dockerfile copies this standalone bundle instead of copying all development dependencies and source files.

This helps keep the final frontend image smaller.

# Part 13 — Run the entire project through Docker

## 23. Development mode vs production-container mode

There is a difference between:

```
pnpm dev
```

and:

```
docker compose --profile apps up --build -d
```

The first runs Next.js and NestJS directly through Node.js on your machine.

The second builds Docker images and runs all three services as containers.

The Compose file uses an optional profile:

```
profiles: ["apps"]
```

This is why a normal:

```
docker compose up -d
```

starts PostgreSQL only.

When you explicitly provide:

```
--profile apps
```

Docker also starts Darshana and Moola.

### Step 1 — Make sure dependencies and lockfile exist

Run:

```
pnpm install
```

### Step 2 — Make sure `.env` exists

```
cp .env.example .env
```

Skip this command if you already created `.env`.

Check that your local database password has been changed.

### Step 3 — Build the images and start the services

```
docker compose --profile apps up --build -d
```

Docker will:

1. Build the Moola image.
2. Build the Darshana image.
3. Start PostgreSQL.
4. Wait for PostgreSQL's health check.
5. Start Moola.
6. Wait for Moola's health check.
7. Start Darshana.

This is a useful local simulation of your production containers.

### Step 4 — Check container status

```
docker compose --profile apps ps
```

You should see:

```
postgres
moola
darshana
```

Each should eventually report healthy status.

### Step 5 — View the logs

For PostgreSQL:

```
docker compose logs -f postgres
```

For Moola:

```
docker compose logs -f moola
```

For Darshana:

```
docker compose logs -f darshana
```

### Step 6 — Open the applications

Darshana:

[http://localhost:3000](http://localhost:3000?utm_source=chatgpt.com)

Moola:

[http://localhost:4000/api/v1/health](http://localhost:4000/api/v1/health?utm_source=chatgpt.com)

If both work, the production-style Docker builds are running locally.

# Part 14 — How to stop, restart and reset Taanjika

## 24. Stop the development servers

When you run:

```
pnpm dev
```

Both applications share the terminal session.

To stop them, press:

```
CTRL + C
```

This stops the development servers.

It does not delete your code or database.

## 25. Stop PostgreSQL

Execute:

```
pnpm db:down
```

This stops the PostgreSQL container.

Your stored database information remains in the Docker volume.

To start it again:

```
pnpm db:up
```

## 26. Stop the complete Docker stack

When running the three Docker containers, execute:

```
docker compose --profile apps down
```

This removes the containers and Compose network.

It preserves the PostgreSQL volume.

There is one particularly important command you should understand:

```
docker compose down -v
```

The `-v` flag removes the persistent database volume as well.

Destructive operation

This means you can lose all your locally stored PostgreSQL data.

Do not run this command casually.

# Part 15 — Development commands you should know

Here is a reference for your day-to-day work.

| Command                           | What it does                   |
| --------------------------------- | ------------------------------ |
| `pnpm install`                    | Installs project dependencies  |
| `pnpm dev`                        | Starts Darshana and Moola      |
| `pnpm dev:darshana`               | Starts only Darshana           |
| `pnpm dev:moola`                  | Starts only Moola              |
| `pnpm build`                      | Builds both applications       |
| `pnpm lint`                       | Runs frontend ESLint           |
| `pnpm typecheck`                  | Checks TypeScript in both apps |
| `pnpm db:up`                      | Starts PostgreSQL              |
| `pnpm db:down`                    | Stops PostgreSQL               |
| `docker compose ps`               | Shows container status         |
| `docker compose logs -f postgres` | Displays PostgreSQL logs       |
| `docker compose logs -f moola`    | Displays backend logs          |
| `docker compose logs -f darshana` | Displays frontend logs         |

## 27. What is the difference between build and dev?

This is something every developer should understand.

During development:

```
pnpm dev
```

The application runs in development mode.

It provides:

- Automatic reloading.
- Developer-friendly errors.
- Development debugging.
- Faster iteration.

During production:

```
pnpm build
```

The application is compiled and optimized.

Then the applications can be started using their production commands.

For example:

```
pnpm --filter @taanjika/darshana start
```

And:

```
pnpm --filter @taanjika/moola start:prod
```

These commands require their respective builds to have completed first.

You generally don't run development mode on a production server.

# Part 16 — What is already implemented versus what isn't?

I want you to understand this distinction very clearly.

The ZIP is an initial foundation, not the completed marketplace.

Here is the actual implementation status.

## Implemented in the starter

Present in codebase

Monorepo with pnpm workspaces

Darshana Next.js App Router setup

Darshana TypeScript strict mode

Tailwind CSS initial integration

Moola NestJS application setup

Moola modular directory foundation

Versioned REST API prefix

CORS configuration

Helmet security headers

Global validation pipeline configuration

PostgreSQL Docker container

PostgreSQL connection pool

Database connectivity health endpoint

Persistent PostgreSQL Docker volume

Production-oriented multi-stage Dockerfiles

Non-root application container users

Docker Compose health checks

Environment variable templates

## Not implemented yet

Future development

Firebase project configuration and SDK

Google Sign-in

Loader page UI

Sign-in page UI

Registration page UI

Customer / Collector registration

Artist / Seller registration and approval

Admin authentication and provisioning

PostgreSQL user and role tables

Database schema and migrations

Firebase Admin token verification

Authentication guards

Role-based access control

Protected frontend routes

Customer dashboard

Artist dashboard

Admin dashboard

Redux Toolkit and RTK Query

Product catalogue and inventory

Redis

Meilisearch

Object storage

CMS

Payment gateway

Automated tests and CI/CD pipelines

### A few particularly important clarifications

1\. PostgreSQL is running, but our application schema doesn't exist yet.

We have created the database connection and connectivity check.

We haven't created the users, roles, artists or other business tables.

2\. Firebase isn't integrated yet.

There is no Firebase SDK or Firebase Admin SDK in the current dependencies.

The repository is prepared for that implementation, but authentication is not working yet.

3\. Redux isn't installed.

Our initial frontend is deliberately minimal. We can decide on the final state-management implementation when we start building the UI.

4\. There is no Prisma integration yet.

The current backend uses the native PostgreSQL `pg` package.

We will need to introduce a migration and data-access strategy before implementing persistent user and role records. Prisma is one option from the original architecture.

5\. The Dockerfiles are prepared, but the entire deployment lifecycle is not.

Production-oriented image construction is present. We have not yet created CI/CD, monitoring, production secrets management, database backup automation or deployment-provider configuration.

This distinction is important: the repository is a good starting foundation, but I would not call the application production-ready today.

# Part 17 — How we will implement Firebase authentication

## 28. Understanding the Firebase authentication architecture

You specifically said that we will use Firebase and Google Sign-in, without mobile OTP.

This is the architecture I recommend.

[User Auth | Starter Code V2](https://images.openai.com/static-rsc-4/o4rUNmZdZY3rFrHvlcpdTKnGGQ3O2H8GTezOgM96HlLDYtSM9l75TZur9b88OcFhEBSA1cFgzZvbn2U67fy6AqJaH7qky-ZafiR8iFC_39f0VEh4YOzQNiKXui-yrulbsGaueMex_MBrCkuLi8lg9lfC17ogTV30xVCjMdtIS2Q?purpose=inline)

[uwblueprint.github.io](https://uwblueprint.github.io/starter-code-v2/docs/user-auth/?utm_source=chatgpt.com)

The flow will work like this:

Step 1 — User signs in through Darshana.

The user clicks:

```
Continue with Google
```

Darshana opens the Firebase Google authentication flow.

Step 2 — Firebase authenticates the user.

Firebase handles Google identity verification.

It establishes who the user is and provides a Firebase ID token.

Step 3 — Darshana sends the token to Moola.

The token is sent securely to our backend.

Step 4 — Moola verifies the token.

Moola uses Firebase Admin SDK to verify the ID token.

It should never blindly trust a user identity or role provided by the browser.

Step 5 — Moola communicates with PostgreSQL.

The backend finds or creates the corresponding Taanjika user record.

For example:

```
users
  ├── id
  ├── firebase_uid
  ├── email
  ├── full_name
  └── created_at
```

The Firebase UID uniquely associates the external identity with the local account.

Step 6 — Moola determines the user's application role.

We will use:

```
CUSTOMER
ARTIST
ADMIN
```

These are Taanjika roles, not Firebase roles.

The important security rule is that an ordinary registration request must never grant administrative privileges.

An artist registration should also have an approval status, for example:

```
PENDING
APPROVED
REJECTED
```

Being authenticated as an artist and being approved to sell artwork are two separate things.

Step 7 — Protected pages and redirects.

The application decides which destination the user is allowed to access.

| Role            | Destination             |
| --------------- | ----------------------- |
| Customer        | Customer dashboard      |
| Approved Artist | Artist dashboard        |
| Pending Artist  | Application status page |
| Admin           | Admin dashboard         |

We will enforce authorization on the backend as well as protect frontend navigation. Hiding a page in Next.js alone is never sufficient protection.

## 29. Why are we not running Redis now?

Because Firebase authentication does not require Redis.

PostgreSQL will initially store our local user records and roles.

Later, Redis can be introduced for:

- Caching.
- Rate limiting.
- Temporary holds.
- Background jobs.
- Session-related support, if our final session strategy requires it.

Likewise, Meilisearch will serve the catalogue search functionality, not authentication.

Object storage will eventually hold painting images and private artist documents. Cloudflare R2 or AWS S3 are options we can evaluate.

There is no need to start these services now.

# Part 18 — Common errors and how to fix them

When you start working with a new codebase, errors are normal. Here's how to troubleshoot the most likely problems with this particular repository.

## 30. Node.js version error

Suppose you execute:

```
pnpm install
```

And you get an error mentioning an unsupported Node.js engine.

First check:

```
node -v
```

The repository expects:

```
v26.13.0
```

Switch to it:

```
nvm use 26.13.0
```

Then try:

```
pnpm install
```

## 31. pnpm command not found

If you see:

```
command not found: pnpm
```

Install pnpm:

```
npm install --global pnpm@12.16.1
```

Restart your terminal and check:

```
pnpm -v
```

## 32. Docker is not running

If you see:

```
Cannot connect to the Docker daemon
```

Open Docker Desktop.

Wait until its engine is running.

Then:

```
docker compose ps
```

Try starting PostgreSQL again:

```
pnpm db:up
```

## 33. PostgreSQL password authentication failed

You might see something like:

```
password authentication failed for user "taanjika"
```

Check:

1. Is the password in `POSTGRES_PASSWORD` correct?
2. Does `DATABASE_URL` contain the same password?
3. Is your Moola process reading the intended `.env`?

There is another Docker-specific detail to understand.

PostgreSQL uses its persistent volume to preserve the initial database setup.

Changing `POSTGRES_PASSWORD` in `.env` after the database has already been initialized does not automatically change the password inside PostgreSQL.

For an existing database, you can change it from the PostgreSQL console:

```
docker compose exec postgres \
  psql -U taanjika -d taanjika
```

Then:

```
ALTER USER taanjika
WITH PASSWORD 'YourNewPassword';
```

Exit with:

```
\q
```

Also update `DATABASE_URL` in `.env`.

## 34. Port already in use

Suppose PostgreSQL reports that port 5432 is already allocated.

You may already have another PostgreSQL installation running.

One option is to change:

```
POSTGRES_PORT=5433
```

And update:

```
DATABASE_URL=postgresql://taanjika:YourPassword@localhost:5433/taanjika
```

Restart PostgreSQL:

```
docker compose up -d postgres
```

Notice that Moola running directly on your Mac uses port 5433, but Moola running inside Docker still connects to:

```
postgres:5432
```

Why?

Because inside Docker, containers communicate using their Compose service names and internal container ports.

This is a fundamental Docker networking concept.

## 35. Moola says database unavailable

First:

```
docker compose ps
```

Check whether PostgreSQL is healthy.

Then:

```
docker compose logs postgres
```

Check the environment variables.

Finally, restart Moola:

```
pnpm dev:moola
```

If you are testing the Docker containers instead, use:

```
docker compose logs moola
```

## 36. Frontend or backend port conflict

Check whether ports are occupied:

```
lsof -i :3000
lsof -i :4000
lsof -i :5432
```

These commands show which processes are using the respective ports.

Don't terminate a process until you know what it is.

If you change Darshana's port, remember to update Moola's `CORS_ORIGINS` accordingly.

# Part 19 — Git and GitHub: maintaining the repository

## 37. Initialize Git

The starter already has a `.gitignore`.

From the project root:

```
git init
```

Set your default branch:

```
git branch -M main
```

Stage your files:

```
git add .
```

Before committing, inspect what will be included:

```
git status
```

Make sure `.env` and `node_modules` are not being committed.

Your `pnpm-lock.yaml` should be included.

Commit:

```
git commit -m "chore: initialize Taanjika monorepo"
```

Then create an empty repository on GitHub named:

```
taanjika
```

Connect it:

```
git remote add origin https://github.com/YOUR_USERNAME/taanjika.git
```

Push:

```
git push -u origin main
```

From now on, whenever you make a meaningful change:

```
git add .
git commit -m "feat: add initial Darshana foundation"
git push
```

### A Git convention worth following

Use commit prefixes such as:

| Prefix      | Meaning                       |
| ----------- | ----------------------------- |
| `feat:`     | New functionality             |
| `fix:`      | Bug fix                       |
| `chore:`    | Maintenance and configuration |
| `refactor:` | Code restructuring            |
| `docs:`     | Documentation                 |
| `test:`     | Tests                         |

This keeps the project history readable.

# Part 20 — How will Taanjika be deployed?

## 38. Understanding local development versus hosting

Your Mac is currently the development environment.

When you eventually deploy Taanjika, the applications will run on remote hosting infrastructure.

The architecture will look like this:

## Taanjika — Hosting architecture

Customer's browser

[https://taanjika.com](https://taanjika.com?utm_source=chatgpt.com)

Darshana

[Netlify Logo Png | Netlify Logo Vector | Netlify: The Web's Deployment Backbone | Infinite Scalability | Modern Jamstack Architecture - freepng](https://images.openai.com/static-rsc-4/oU2zs2AAmLB1d0oyzk9IEpKQAJ3GsYJ6c5wjUhOuJ576LADV7nx6kj9bgunvf7P2Vr4bY7sekvuv3DKTvuQ1lng--337pP61kBYVstr3c0EqJ-wB__cE_zLB38dgVEEPMOUByc6lXMfhMR6r_kQKjAxGKYat2uuq4d6w3lwDSYg?purpose=inline)

Netlify

Frontend hosting

Next.js application

HTTPS API requests

Moola

[Render: $100 Million Series C Extension At $1.5 Billion Valuation Raised For Modern Cloud Platform](https://images.openai.com/static-rsc-4/XQ8Itzkko2ukMle7Uxpew8KfTJDML0AFQIELfD8nzBWnDbB2buV_-AsF1NxFDv08z8p-iC-K-GzCon6hOvM1io703iDnnCW5d-XUwc-1wQc1rJI4dj2LRKYXQ0fbQIER6RcL5ZHsIaa7bzs3Cm8EBYEEKdiNbKqTe6vIudIBfWQ?purpose=inline)

Render

API hosting

NestJS application

PostgreSQL

[Cloudflare D1 vs Neon vs Supabase](https://images.openai.com/static-rsc-4/tlFs0r3FPzK22EYDgBLmp_22ciqjxiCOpgrq5Ig1DYvzAuYAP_JcQphWoYXx5KC_-j8N9f87UKezm0qDIpXJQ1JSLcjLaq0kP6SLyb-UYaOVewWY3tAppGbMW8sUihP-5WpVbweR7z0GsD8kji6m183a6oQk44zkTwwTaDvc8XU?purpose=inline)

Neon

Managed database

Authentication

[Firebase color icon in PNG, SVG](https://images.openai.com/static-rsc-4/MScrU19a-6I0F9eIY3ff1kxhMI_Tqi3DFdtN_dAbwVeHoQxGal7bodxHIdsCFKPLrPuqNhWUkHnL_NqraUSAdx9qq4lENsG8hNPWK3Me1HkXeo6aVX32P5AsLsol0hpEoSNSwtNY5fgB411ph-L7PJWi6gdW5F-YADYNHO_aNZE?purpose=inline)

Firebase

Google identity authentication

This is the deployment direction we discussed, not a provider configuration already included in the ZIP.

### What will happen during deployment?

Darshana:

We connect the GitHub repository to the frontend hosting provider.

The provider builds the Next.js application and publishes it.

Moola:

We connect the same repository to the backend hosting provider.

We configure its build context as the repository root and select:

```
apps/moola/Dockerfile
```

This is important because the Dockerfile needs the monorepo's root package files and workspace dependencies.

PostgreSQL:

We create a managed PostgreSQL database and copy its connection string into the backend hosting environment.

We do not deploy our local PostgreSQL container as the production database.

Firebase:

We register Darshana's production domain in the Firebase project's authorized domains and configure the backend's Firebase Admin credentials through its secret-management system.

### Can we do this initially for free?

Yes, for development and an early preview.

Neon's current free plan includes 1 GB of PostgreSQL storage per project and 100 compute-hours per month, although compute can scale to zero.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://neon.com&sz=32)

Neon+1

Render's free web services sleep after 15 minutes without incoming traffic and take approximately a minute to wake. Its free PostgreSQL databases expire after 30 days, so I would not use one for Taanjika's permanent data.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://render.com&sz=32)

Render Docs+1

For a commercial marketplace, treat free tiers as a development and validation budget, not a guarantee of production availability.

# Part 21 — Your everyday development workflow

## 39. What should you do every time you want to work on Taanjika?

Once the initial setup is complete, you don't need to repeat everything.

Your regular routine will be:

Step 1 — Open Docker Desktop.

Make sure Docker is running.

Step 2 — Open the project.

```
cd ~/Projects/taanjika
```

Step 3 — Switch to the correct Node.js version.

```
nvm use
```

Step 4 — Start PostgreSQL.

```
pnpm db:up
```

Step 5 — Start Darshana and Moola.

```
pnpm dev
```

Step 6 — Open your browser.

Darshana:

[http://localhost:3000](http://localhost:3000?utm_source=chatgpt.com)

Moola:

[http://localhost:4000/api/v1/health](http://localhost:4000/api/v1/health?utm_source=chatgpt.com)

That's it. You're ready to develop.

You do not need to run `pnpm install` every time. Only run it when you first set up the repository or when dependencies change.

## 40. What should you do before pushing code?

I recommend developing the habit of checking your application before committing changes.

Run:

```
pnpm typecheck
```

This checks TypeScript.

Then:

```
pnpm lint
```

This checks frontend code using ESLint.

Finally:

```
pnpm build
```

This compiles both applications.

Only commit after fixing any errors.

# Part 22 — Our implementation roadmap

Now that you understand the foundation, let's establish what comes next.

I would follow this order rather than developing everything simultaneously.

1. Phase 0 — Foundation

   Starter created
   - Monorepo setup.
   - Darshana Next.js initialization.
   - Moola NestJS initialization.
   - TypeScript configurations.
   - PostgreSQL Docker setup.
   - Dockerfiles.
   - Initial health endpoint.

2. Phase 1A — Darshana UI

   Next implementation
   - Loader page.
   - Sign-in page.
   - Registration page.
   - Customer / Collector entry.
   - Artist / Seller entry.
   - Admin entry and access restrictions.
   - Responsive design.
   - Shared UI components.

3. Phase 1B — Authentication
   - Firebase project configuration.
   - Google authentication.
   - Firebase Admin SDK in Moola.
   - User database schema.
   - Role management.
   - Artist approval status.
   - Authentication guards.
   - Protected frontend routes.
   - Role-specific redirects.
   - Authentication tests.
4. Phase 1C — User dashboards and home page
   - Customer dashboard.
   - Artist dashboard.
   - Admin dashboard foundation.
   - Homepage.
   - Headers and footers.
   - Explore by.
   - CMS integration planning.
5. Phase 2 — Marketplace backend
   - Product and painting catalogue.
   - Artist profiles.
   - Inventory.
   - Product details.
   - Media uploads.
   - Search.
   - Redis caching.
   - Admin listing approvals.
6. Later phases
   - Cart and checkout.
   - Orders.
   - Shipping.
   - Payments, only when required.
   - Notifications.
   - Analytics and monitoring.

# Part 23 — Final checklist

Before we start designing Darshana, I want you to reach this state.

Taanjika setup checklist

# 0/13

Node.js 26.13.0 installed

pnpm 12.16.1 installed

Docker Desktop installed and running

Taanjika ZIP extracted

Entire Taanjika folder opened in VS Code

Root .env created and password configured

pnpm install completed successfully

pnpm-lock.yaml generated

PostgreSQL container running and healthy

Darshana opens at localhost:3000

Moola health endpoint returns database connected

pnpm typecheck succeeds

pnpm build succeeds

Reset checklist

## My final architectural advice

There are three things I particularly want us to maintain as the codebase grows.

1\. Keep Darshana and Moola separate.

Darshana should handle the presentation layer. Moola should handle the business logic, authentication verification and authorization.

2\. Don't overengineer the foundation.

We don't need Redis, Meilisearch, Kubernetes, Kafka or multiple backend services on day one.

Introduce infrastructure when an actual requirement justifies it.

3\. Treat authentication and authorization as different responsibilities.

Firebase tells us who the person is. Taanjika's database tells us what they are allowed to do.

That separation will be central to having a secure customer, artist and admin experience.

Your immediate next milestone should be getting the initial setup checklist completed. Once Darshana and Moola both run successfully on your Mac and Moola reports `database: connected`, we'll have a verified foundation to begin designing the three authentication screens.

One final thing: keep the original ZIP untouched as a backup until your extracted repository is running successfully.

Useful references for learning while working:

- [Next.js App Router documentation](https://nextjs.org/docs/app/getting-started/installation?utm_source=chatgpt.com)
- [NestJS fundamentals](https://docs.nestjs.com/first-steps?utm_source=chatgpt.com)
- [pnpm documentation](https://pnpm.io/installation?utm_source=chatgpt.com)
- [Docker Compose documentation](https://docs.docker.com/compose/?utm_source=chatgpt.com)
- [PostgreSQL documentation](https://www.postgresql.org/docs/?utm_source=chatgpt.com)

The objective is to build Taanjika properly from the foundation, not just make it run.
