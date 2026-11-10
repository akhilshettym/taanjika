## Taanjika — Architecture & Authentication

> This README describes the repository as inspected and the authentication/configuration fixes applied in this working copy. It is written for a developer taking over the project, not just for someone running the UI.

## 1. What Taanjika is

Taanjika is a pnpm monorepo with two deployable applications:

- **Darshana** (`apps/darshana`) — the web application. It is built with `Next.js`, `React` and `TypeScript`. It owns the screens, forms, client-side Firebase Authentication SDK and user experience.
- **Moola** (`apps/moola`) — the API. It is built with `NestJS` and `TypeScript`. It verifies Firebase ID tokens, stores Taanjika-specific profile/role/consent data in PostgreSQL and exposes versioned HTTP endpoints.

**Firebase Authentication is the identity provider. PostgreSQL is the application-profile store.** These are deliberately separate responsibilities. Passwords are never stored by Taanjika's PostgreSQL database.

The intended local topology is:

```text
Browser
  |
  | Darshana (Next.js :3000)
  |-- Firebase Client SDK: create account / sign in / send verification email
  |
  | HTTPS/HTTP + Firebase ID token in Authorization: Bearer <token>
  v
Moola (NestJS :4000, /api/v1)
  |-- Firebase Admin SDK: verify token, revocation and email_verified claim
  |
  v
PostgreSQL (:5432)
  |-- users, user_roles, user_consents, artist_applications, admin_bootstrap_state
```

## 2. Authentication: intended end-to-end behaviour

### 2.1 Registration

1. The visitor fills in first name, last name, email, password, confirmation, account intent and consent choices.
2. Darshana validates the form with React Hook Form and Zod. The password is checked against the application's complexity rule and Firebase's configured password policy.
3. Firebase Client SDK creates the email/password identity. Firebase owns the credential and password lifecycle.
4. Darshana asks Moola to create the corresponding application profile using the Firebase ID token.
5. Moola verifies that token with Firebase Admin, validates the profile DTO, stores the profile and consent records in PostgreSQL, assigns the default `CUSTOMER` role, and creates a pending artist application if the user selected the artist intent.
6. Darshana sends a Firebase verification email and routes the user to `/verify-email`.
7. The account exists in Firebase and the profile exists in PostgreSQL, but the user is not allowed into verified-only application capabilities until Firebase reports `email_verified: true`.

Creating the profile before verification is intentional: it preserves the onboarding information while the user checks their inbox. It does **not** mean the email is considered verified.

### 2.2 Email verification

- `sendEmailVerification()` sends Firebase's email action link with `/verify-email` as its continue URL.
- Firebase's hosted action handler processes the verification action. After successful verification, it returns the browser to the continue URL.
- The verification screen offers a resend action and an **I've verified my email** action.
- That action calls `reload(user)` so the Firebase client fetches the current account state, then calls `getIdToken(true)` so a fresh token contains the updated `email_verified` claim.
- Darshana then calls `GET /api/v1/auth/me`.
- Moola verifies the fresh token and synchronizes `users.email_verified_at` when the verified claim is true.
- Only after that does the frontend route the user to the appropriate application destination.

**Important Firebase Console configuration:** enable Email/Password under Authentication → Sign-in method; configure the Email address verification template; add the local and production web domains under Authentication → Settings → Authorized domains. Confirm that the verification email's continue URL is allowed for the Firebase project. Test the actual email link end-to-end in the target environment—source code cannot configure deliverability, SPF/DKIM, template wording, Firebase quotas or domain authorization.

### 2.3 Login

1. Darshana calls Firebase `signInWithEmailAndPassword`.
2. If Firebase says the email is not verified, Darshana routes the user to `/verify-email`; no application profile access is granted through this flow.
3. For a verified user, Darshana calls `GET /api/v1/auth/me` with the Firebase ID token.
4. Moola verifies the token, synchronizes the verification timestamp and returns the PostgreSQL profile.
5. Darshana checks account status and role/application state before routing.

A Firebase account can therefore authenticate successfully while still lacking a Taanjika profile. In that case the UI routes to profile completion rather than treating the Firebase identity as a fully onboarded application user.

### 2.4 Google sign-in

Google sign-in is implemented with Firebase popup authentication. A Google identity whose email is verified by Google can proceed to profile lookup. If it has no Taanjika profile, the user is routed to profile completion. The completion form can link an email/password credential to the same Google identity.

### 2.5 Password reset

The forgot-password screen uses Firebase's `sendPasswordResetEmail`. Firebase sends and processes the password-reset action; Taanjika does not handle or store reset tokens itself.

## 3. Authentication code map

### Darshana — browser/client side

| File                                                         | Responsibility                                                                                                                                                                                             |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/firebase/client.ts`                                 | Lazily initializes the Firebase browser app/Auth instance. Fails early with the names of missing public Firebase settings.                                                                                 |
| `src/providers/auth-provider.tsx`                            | Subscribes to Firebase `onAuthStateChanged`, exposes the current Firebase user and loading state through React context, and provides sign-out.                                                             |
| `src/features/auth/hooks/use-auth.ts`                        | Small typed hook for consuming the auth context.                                                                                                                                                           |
| `src/features/auth/services/firebase-auth.service.ts`        | Encapsulates Firebase client operations: password validation, email/password account creation, credential linking, sign-in, Google popup, verification email, resend, password reset, reload and sign-out. |
| `src/features/auth/services/auth-api.service.ts`             | Calls Moola endpoints and attaches the Firebase ID token as a Bearer token. Converts non-2xx API responses into `AuthApiError`.                                                                            |
| `src/features/auth/schemas/auth.schema.ts`                   | Zod schemas for registration, sign-in and forgot-password forms.                                                                                                                                           |
| `src/features/auth/types/auth.types.ts`                      | Shared frontend types for profile, roles, registration input and auth context.                                                                                                                             |
| `src/features/auth/components/register-form.tsx`             | Registration UI and orchestration of Firebase identity creation, profile registration and verification-email dispatch.                                                                                     |
| `src/features/auth/components/sign-in-form.tsx`              | Email/password login, verified-email check, profile lookup and role-aware routing.                                                                                                                         |
| `src/features/auth/components/google-auth-button.tsx`        | Google popup flow and profile completion routing.                                                                                                                                                          |
| `src/features/auth/components/verify-email-content.tsx`      | Resend/check-verification UI; refreshes Firebase user and ID token before profile synchronization.                                                                                                         |
| `src/features/auth/components/email-verification-notice.tsx` | Reusable verification message and resend affordance.                                                                                                                                                       |
| `src/features/auth/components/forgot-password-form.tsx`      | Password-reset form and Firebase request.                                                                                                                                                                  |
| `src/features/auth/components/password-input.tsx`            | Reusable password field with visibility toggle.                                                                                                                                                            |
| `src/features/auth/components/password-requirements.tsx`     | Displays the password policy to the user.                                                                                                                                                                  |
| `src/features/auth/components/auth-field.tsx`                | Shared labelled input/error presentation.                                                                                                                                                                  |
| `src/features/auth/components/auth-card.tsx`                 | Shared visual shell for authentication pages.                                                                                                                                                              |
| `src/features/auth/components/account-intent-selector.tsx`   | Chooses collector or artist onboarding intent.                                                                                                                                                             |

### Moola — API/server side

| File                                                     | Responsibility                                                                                                                                      |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/modules/auth/auth.controller.ts`                    | Declares `/auth/register`, `/auth/sync` and `/auth/me` routes. All are protected by `FirebaseAuthGuard`.                                            |
| `src/modules/auth/auth.service.ts`                       | Auth use-case layer; delegates profile operations to `UsersService`.                                                                                |
| `src/modules/auth/auth.module.ts`                        | Wires the auth controller/service, Firebase module and users module.                                                                                |
| `src/modules/auth/guards/firebase-auth.guard.ts`         | Requires a Bearer Firebase ID token; verifies signature, expiry, revocation and decoded identity with Firebase Admin. Builds the request principal. |
| `src/modules/auth/guards/email-verified.guard.ts`        | Reusable guard for routes that must reject unverified Firebase identities. Apply it to verified-only controllers/routes as they are added.          |
| `src/modules/auth/guards/roles.guard.ts`                 | Reads required roles, requires verified email, loads the user's profile and checks active status/role membership.                                   |
| `src/modules/auth/decorators/current-user.decorator.ts`  | Makes the verified Firebase principal available to controller methods.                                                                              |
| `src/modules/auth/decorators/roles.decorator.ts`         | Declares role metadata consumed by `RolesGuard`.                                                                                                    |
| `src/modules/auth/dto/register-profile.dto.ts`           | Server-side validation for onboarding fields and consent flags.                                                                                     |
| `src/modules/users/users.service.ts`                     | Enforces required Terms/Privacy acknowledgement and configured document versions; synchronizes verified email state when loading a profile.         |
| `src/modules/users/users.repository.ts`                  | PostgreSQL queries/transactions for profiles, roles, consents, artist applications and admin bootstrap state.                                       |
| `src/modules/users/users.module.ts`                      | Provides and exports user repository/service.                                                                                                       |
| `src/modules/firebase/firebase-admin.service.ts`         | Initializes Firebase Admin using Application Default Credentials and the configured Firebase project ID.                                            |
| `src/modules/firebase/firebase.module.ts`                | Exposes Firebase Admin globally to backend modules.                                                                                                 |
| `src/modules/database/database.service.ts`               | Owns the PostgreSQL pool, query helper, transaction helper, health ping and shutdown.                                                               |
| `src/modules/database/database.module.ts`                | Configures and exports the PostgreSQL pool/service.                                                                                                 |
| `src/modules/database/database.constants.ts`             | Shared dependency-injection token and advisory-lock key.                                                                                            |
| `src/modules/admin-bootstrap/admin-bootstrap.service.ts` | Optional controlled server-side admin identity bootstrap; guarded by explicit environment configuration and a PostgreSQL advisory lock.             |
| `src/modules/admin-bootstrap/admin-bootstrap.module.ts`  | Wires the admin bootstrap service.                                                                                                                  |
| `src/modules/health/health.controller.ts`                | Database-backed health endpoint.                                                                                                                    |
| `src/modules/health/health.module.ts`                    | Wires the health controller.                                                                                                                        |
| `src/app.module.ts`                                      | Root Nest module; loads environment configuration and feature modules.                                                                              |
| `src/main.ts`                                            | Starts Nest, applies `/api/v1`, CORS, Helmet, validation pipe and shutdown hooks.                                                                   |
| `database/migrations/001_authentication_schema.sql`      | Creates the PostgreSQL tables, constraints and indexes used by auth/onboarding.                                                                     |

## 4. PostgreSQL schema

`001_authentication_schema.sql` defines:

- **`users`** — one Taanjika profile per Firebase UID. `firebase_uid` is unique; email is protected by a case-insensitive unique index; `email_verified_at` is the application's synchronized verification timestamp; `status` is `ACTIVE` or `SUSPENDED`.
- **`user_roles`** — many-to-one role assignments. The allowed values are `CUSTOMER`, `ARTIST` and `ADMIN`. A new profile receives `CUSTOMER`.
- **`artist_applications`** — artist onboarding/review data. A pending application is created when registration intent is `ARTIST`; a partial unique index prevents multiple pending applications for the same user.
- **`user_consents`** — versioned Terms, Privacy and Marketing consent history. Required Terms/Privacy acceptance is checked server-side; marketing is optional.
- **`admin_bootstrap_state`** — tracks the configured bootstrap administrator and password version so controlled password rotation can be performed.

The repository uses parameterized SQL. Registration is wrapped in a transaction so profile, role, consent and artist-application writes succeed or roll back together.

## 5. Findings and changes made in this review

### Fixed in this working copy

1. **Registration no longer masks API failures.** The registration form previously caught _every_ profile-registration error and immediately retried through `/auth/sync`. That could hide the actual cause (bad configuration, database outage, validation error or authorization failure) behind a second request. The profile insert is already idempotent on Firebase UID, so the form now makes one request and surfaces the real error.
2. **The root `.env.example` was incomplete and misleading.** It described `DATABASE_URL` as a Prisma URL even though the API uses `pg`, and omitted Firebase browser/server settings, terms/privacy versions and admin bootstrap settings. It now documents the settings the two applications need.
3. **Docker Compose did not pass Firebase server configuration to Moola.** The API container previously received no `FIREBASE_PROJECT_ID`, no Firebase Admin credentials and no consent document versions. It would fail during startup or first auth request. Compose now passes required values and mounts the service-account file as a read-only Compose secret at `/run/secrets/firebase-admin.json`.
4. **Docker builds did not provide the browser's public Firebase/API variables.** Next.js substitutes `NEXT_PUBLIC_*` variables at build time. The Darshana Dockerfile and Compose build arguments now pass the Firebase web configuration and Moola API URL into the build.
5. **Secret/generated-file ignore rules were too weak.** `.gitignore` now ignores `.env*` files except `.env.example`, Firebase service-account JSON files, build output, dependencies and TypeScript build info.
6. **Google login did not enforce the same active-profile check as password login.** It now rejects a suspended profile and uses the artist-application pending destination consistently.

### Important issues/limitations that remain operational tasks

- The supplied archive contains real local `.env` files and a Firebase service-account JSON. Treat those credentials as exposed. **Rotate the Firebase service-account private key and any passwords/secrets contained in the archive or its environment files.** Remove those files from Git history if they were ever committed; adding `.gitignore` does not remove an already tracked secret.
- The archive's root `.env` and `apps/moola/.env` did not represent one complete, consistent configuration. Keep local secrets out of source control and maintain one documented source of truth per runtime.
- The current environment sample is a template. Replace every `your-*`/`replace-*` value with values from the _same_ Firebase project and your local database. Do not use the sample values literally.
- Local Next.js development needs the `NEXT_PUBLIC_*` variables in `apps/darshana/.env.local` (Next's app root), or injected into that process. Moola loads the repository root `.env` and `apps/moola/.env` when run from the app workspace. The root `.env` is also what Docker Compose reads by default.
- The SQL migration is present but is not automatically run by Nest or Compose. Apply it before starting Moola.
- Firebase Console setup and actual mailbox delivery cannot be verified from source files. Verify the Firebase project, enabled providers, authorized domains, verification template, sender/domain configuration and redirect behaviour.
- The role guard and email-verified guard are reusable infrastructure; the auth controller currently protects its routes with Firebase authentication, while the frontend enforces verification before its normal profile lookup. Apply `EmailVerifiedGuard` (and role metadata/`RolesGuard`) to every future protected business route on the server. Frontend routing is not a security boundary.
- The submitted Darshana source currently contains only the home and authentication pages. Auth flows also navigate to `/admin`, `/artist` and `/artist/application-status`, but those destination pages are not present in this archive. Until those product routes are implemented, successful authentication may end at a Next.js 404 for those destinations. This is a missing application feature, not a Firebase login failure.
- The archive includes generated `dist` output and TypeScript build-info files. These are build artifacts, not source of truth; rebuild from `src` after changes.

## 6. Environment variables

### Browser / Darshana

| Variable                                   | Purpose                                                                                    |
| ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Firebase web app API key. It is public client configuration, not a service-account secret. |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Firebase Auth domain, usually `<project-id>.firebaseapp.com`.                              |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Firebase project ID. Must match the backend project.                                       |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | Firebase web app ID.                                                                       |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID.                                                                        |
| `NEXT_PUBLIC_MOOLA_API_URL`                | Absolute API base URL including `/api/v1`, e.g. `http://localhost:4000/api/v1`.            |

### Server / Moola

| Variable                                                                        | Purpose                                                                                                                                    |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `FIREBASE_PROJECT_ID`                                                           | Firebase project ID used by Firebase Admin. Must match Darshana.                                                                           |
| `GOOGLE_APPLICATION_CREDENTIALS`                                                | Filesystem path to a service-account JSON or supported ADC credential source. Never expose this path's file to the browser.                |
| `DATABASE_URL`                                                                  | PostgreSQL connection string consumed by `pg`.                                                                                             |
| `DB_POOL_MAX`                                                                   | Maximum PostgreSQL pool size.                                                                                                              |
| `DB_SSL`                                                                        | When `true`, enables TLS with certificate verification.                                                                                    |
| `TERMS_VERSION`                                                                 | Version string recorded for Terms acceptance.                                                                                              |
| `PRIVACY_VERSION`                                                               | Version string recorded for Privacy acknowledgement.                                                                                       |
| `CORS_ORIGINS`                                                                  | Comma-separated exact frontend origins.                                                                                                    |
| `PORT`                                                                          | API listen port; defaults to `4000`.                                                                                                       |
| `ADMIN_BOOTSTRAP_ENABLED`                                                       | Must remain `false` unless intentionally provisioning the configured admin.                                                                |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_DISPLAY_NAME`, `ADMIN_PASSWORD_VERSION` | Required only when admin bootstrap is enabled. Use a unique strong password and increment the password version to intentionally rotate it. |

### PostgreSQL / Compose

`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` and `POSTGRES_PORT` configure the local PostgreSQL container. `FIREBASE_SERVICE_ACCOUNT_FILE` is used by Compose to locate the host-side service-account JSON that it mounts as a secret for Moola. Do not place that JSON inside the repository.

## 7. Local development setup

### Prerequisites

- Node.js **26.x** (the root package declares `>=26 <27`; `.nvmrc` selects the intended version).
- pnpm **12.16.1**.
- Docker with the Compose plugin.
- A Firebase project with Email/Password enabled.
- PostgreSQL 17 (or use the Compose database).

### Configure

1. Copy `.env.example` to `.env` at the repository root.
2. Set PostgreSQL credentials and a matching `DATABASE_URL`.
3. Set `FIREBASE_PROJECT_ID` and all `NEXT_PUBLIC_FIREBASE_*` values from the Firebase web app configuration.
4. Set `NEXT_PUBLIC_MOOLA_API_URL=http://localhost:4000/api/v1`.
5. Set `TERMS_VERSION` and `PRIVACY_VERSION`.
6. For local Moola execution, configure Firebase Admin credentials through Application Default Credentials or set `GOOGLE_APPLICATION_CREDENTIALS` to a service-account JSON stored outside the repository. If using the ignored `apps/moola/.env`, keep it consistent with the root configuration.
7. Create `apps/darshana/.env.local` containing the six `NEXT_PUBLIC_*` values, because Next.js reads environment files from the Darshana app root during local development.

### Start PostgreSQL and apply schema

```bash
pnpm install
pnpm db:up
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f apps/moola/database/migrations/001_authentication_schema.sql
```

If the `psql` command is not installed locally, run the SQL file through your database client against the configured database.

### Start both applications

```bash
pnpm dev
```

Or start them separately:

```bash
pnpm dev:darshana
pnpm dev:moola
```

- Darshana: `http://localhost:3000`
- Moola health endpoint: `http://localhost:4000/api/v1/health`

### Docker Compose application stack

The Compose `apps` profile builds and starts both applications as well as PostgreSQL:

```bash
docker compose --profile apps up --build
```

Before running it, provide all required root `.env` values and set `FIREBASE_SERVICE_ACCOUNT_FILE` to the absolute path of a service-account JSON file outside the repository. Compose mounts that file as a secret. The frontend's public variables are build arguments, so changing them requires rebuilding the Darshana image.

## 8. API endpoints

All routes use the global `/api/v1` prefix.

| Method | Path             | Purpose                                                                     | Authentication    |
| ------ | ---------------- | --------------------------------------------------------------------------- | ----------------- |
| `GET`  | `/health`        | Checks API/database health.                                                 | None              |
| `POST` | `/auth/register` | Creates/synchronizes the application profile and onboarding records.        | Firebase ID token |
| `POST` | `/auth/sync`     | Compatibility alias for profile synchronization.                            | Firebase ID token |
| `GET`  | `/auth/me`       | Returns the current Taanjika profile and synchronizes verified-email state. | Firebase ID token |

For protected auth routes, send:

```http
Authorization: Bearer <Firebase-ID-token>
Content-Type: application/json
```

Registration body:

```json
{
  "firstName": "Ada",
  "lastName": "Lovelace",
  "accountIntent": "COLLECTOR",
  "acceptedTerms": true,
  "acceptedPrivacyPolicy": true,
  "marketingOptIn": false
}
```

The server DTO rejects unknown properties, validates field types/lengths, and independently requires Terms and Privacy acknowledgement.

## 9. Security model and design rationale

- **Firebase owns authentication.** It handles password hashing, credential validation, provider linking, email actions, reset flows and identity lifecycle.
- **Moola trusts verified Firebase ID tokens, not client-supplied user IDs.** The guard verifies the token with Firebase Admin and derives UID/email/verification state from the decoded token.
- **PostgreSQL stores app-specific data only.** Roles, account status, artist application and consent history belong to Taanjika, not Firebase's password store.
- **The browser never receives Firebase Admin credentials.** Only `NEXT_PUBLIC_*` Firebase web config belongs in the browser bundle.
- **The email-verified claim is refreshed after verification.** A stale ID token can continue to say `email_verified=false`; the verification screen explicitly reloads the Firebase user and forces token refresh.
- **Database writes are transactional and parameterized.** Registration data is committed together and SQL values are not interpolated into query strings.
- **CORS and Helmet are configured in Moola.** CORS should be restricted to the real production frontend origin(s).
- **Admin bootstrap is opt-in.** Keep it disabled for ordinary runtime. Store bootstrap secrets in a proper secret manager in production.
- **Frontend checks improve user experience; backend guards enforce security.** Every future business API that requires a verified user or a role must enforce that requirement server-side.

## 10. Recommended manual acceptance test

Use a fresh email address for the first pass.

1. Open `/register`, enter valid details and accept Terms and Privacy.
2. Submit. Confirm Firebase Authentication shows the new user and that a `users` row, `CUSTOMER` role and versioned consent rows exist in PostgreSQL.
3. Confirm the UI routes to `/verify-email` and that the verification email arrives.
4. Before clicking the email link, try sign-in. It should route back to the verification screen, not into the application.
5. Click the verification link. Confirm Firebase marks the user as verified and redirects to the configured continue URL.
6. Return to the verification screen and click **I've verified my email**. Confirm the page refreshes Firebase state, calls `/auth/me`, and `users.email_verified_at` becomes non-null.
7. Sign out and sign in with the same email/password. Confirm the profile is loaded and the user reaches the correct destination.
8. Test resend before verification and confirm it does not send a duplicate after verification.
9. Test forgot-password and complete the Firebase reset action.
10. Test an artist-intent registration and confirm the pending artist application is created.
11. Test a suspended profile and ensure the frontend does not route it as an active account; ensure protected backend routes reject it.
12. Test invalid/expired/revoked Firebase tokens against Moola and confirm they receive `401`.

Also test Google sign-in separately if that provider is enabled.

## 11. Repository / folder guide

```text
.
├── .github/
│   ├── dependabot.yml
│   └── workflows/ci.yml
├── apps/
│   ├── darshana/                 # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/              # App Router pages, layouts and error boundaries
│   │   │   ├── features/auth/    # Auth feature components, hooks, schemas, services and types
│   │   │   ├── lib/              # Shared integrations (Firebase browser client)
│   │   │   └── providers/        # React context providers
│   │   ├── Dockerfile
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── moola/                    # NestJS backend
│       ├── database/migrations/  # Versioned SQL schema changes
│       ├── src/
│       │   ├── modules/          # Nest feature modules (auth, users, Firebase, DB, etc.)
│       │   ├── app.module.ts     # Root dependency graph
│       │   └── main.ts           # HTTP bootstrap
│       ├── Dockerfile
│       ├── nest-cli.json
│       ├── package.json
│       └── tsconfig*.json
├── .env.example                 # Safe configuration template
├── compose.yaml                 # Local database and optional full app stack
├── package.json                 # Workspace scripts and shared tooling
├── pnpm-lock.yaml               # Exact dependency resolution
├── pnpm-workspace.yaml          # pnpm workspace package discovery
└── README.md
```

### Root files

| File                                  | What it does                                                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `package.json`                        | Declares workspace-level scripts, package manager and Node version constraint.                                                        |
| `pnpm-workspace.yaml`                 | Tells pnpm that each directory under `apps/*` is a workspace package and controls dependency build approvals.                         |
| `pnpm-lock.yaml`                      | Locks the exact dependency graph so installs are reproducible. Do not hand-edit it; use pnpm to update it.                            |
| `.nvmrc`                              | Selects the Node version expected by the project.                                                                                     |
| `.env.example`                        | Documents environment variable names and safe placeholders. Copy it to a local ignored `.env`; never put real secrets in the example. |
| `.gitignore`                          | Prevents local secrets, dependencies and generated output from being committed.                                                       |
| `.prettierrc.json`, `.prettierignore` | Formatting preferences and paths excluded from formatting.                                                                            |
| `compose.yaml`                        | Defines PostgreSQL and the optional containerized API/frontend stack.                                                                 |
| `.github/workflows/ci.yml`            | CI workflow for repository checks.                                                                                                    |
| `.github/dependabot.yml`              | Configures automated dependency update proposals.                                                                                     |

### Darshana app files

| File/folder                       | What it does                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| `src/app/layout.tsx`              | Root HTML/document layout and global providers.                                                  |
| `src/app/page.tsx`                | Home route.                                                                                      |
| `src/app/globals.css`             | Global Tailwind/CSS styling.                                                                     |
| `src/app/error.tsx`               | Route-segment runtime error boundary.                                                            |
| `src/app/global-error.tsx`        | Root-level error boundary.                                                                       |
| `src/app/not-found.tsx`           | Not-found UI.                                                                                    |
| `src/app/(auth)/`                 | Route group for auth pages; parentheses group routes without adding a URL segment.               |
| `(auth)/layout.tsx`               | Shared layout for authentication pages.                                                          |
| `(auth)/loading.tsx`              | Loading UI for the auth route segment.                                                           |
| `(auth)/register/page.tsx`        | `/register` page entry point.                                                                    |
| `(auth)/sign-in/page.tsx`         | `/sign-in` page entry point.                                                                     |
| `(auth)/verify-email/page.tsx`    | `/verify-email` page entry point.                                                                |
| `(auth)/forgot-password/page.tsx` | `/forgot-password` page entry point.                                                             |
| `src/features/auth/`              | Feature-first organization keeps auth-specific UI, validation, types and service logic together. |
| `src/lib/firebase/client.ts`      | Browser Firebase initialization.                                                                 |
| `src/providers/auth-provider.tsx` | Global Firebase auth state subscription.                                                         |
| `next.config.ts`                  | Next.js configuration; standalone output is used for the production container.                   |
| `tsconfig.json`                   | TypeScript compiler options and import aliases.                                                  |
| `eslint.config.mjs`               | ESLint rules for the frontend.                                                                   |
| `postcss.config.mjs`              | PostCSS/Tailwind integration.                                                                    |
| `Dockerfile`                      | Multi-stage frontend container build.                                                            |

### Moola app files

| File/folder                            | What it does                                                                                         |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `src/main.ts`                          | Creates the Nest app, configures prefix/CORS/security/validation and listens on the configured port. |
| `src/app.module.ts`                    | Imports configuration and all application modules.                                                   |
| `src/modules/`                         | Nest modules are grouped by business/technical responsibility.                                       |
| `modules/auth/`                        | Firebase-token authentication, current-user decorators, role metadata and auth endpoints.            |
| `modules/users/`                       | User profile business rules and PostgreSQL persistence.                                              |
| `modules/firebase/`                    | Firebase Admin initialization and dependency injection.                                              |
| `modules/database/`                    | PostgreSQL pool, transaction abstraction and shared database provider.                               |
| `modules/health/`                      | Health endpoint and database connectivity check.                                                     |
| `modules/admin-bootstrap/`             | Optional privileged administrator provisioning.                                                      |
| `database/migrations/`                 | SQL migrations that define and evolve persistent schema.                                             |
| `nest-cli.json`                        | Nest CLI project configuration.                                                                      |
| `tsconfig.json`, `tsconfig.build.json` | TypeScript settings for development and production compilation.                                      |
| `eslint.config.mjs`                    | ESLint rules for the backend.                                                                        |
| `Dockerfile`                           | Multi-stage API image; production runtime contains compiled output and production dependencies.      |

## 12. Scripts and common commands

Run from repository root:

| Command             | Purpose                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `pnpm install`      | Install all workspace dependencies from the lockfile.                                                                 |
| `pnpm dev`          | Run Darshana and Moola concurrently.                                                                                  |
| `pnpm dev:darshana` | Run only the frontend.                                                                                                |
| `pnpm dev:moola`    | Run only the API.                                                                                                     |
| `pnpm build`        | Build frontend then backend.                                                                                          |
| `pnpm lint`         | Lint both applications.                                                                                               |
| `pnpm typecheck`    | Run TypeScript checks for both applications.                                                                          |
| `pnpm test`         | Run available workspace tests (the frontend currently has no test script; backend uses Jest with pass-with-no-tests). |
| `pnpm format`       | Format repository files with Prettier.                                                                                |
| `pnpm format:check` | Check formatting.                                                                                                     |
| `pnpm db:up`        | Start the PostgreSQL service.                                                                                         |
| `pnpm db:down`      | Stop PostgreSQL without deleting its volume.                                                                          |

## 13. Known architectural follow-ups

These are worthwhile next engineering tasks; they are not represented as already completed:

1. Add automated unit/integration/e2e tests for registration, login, verification claim refresh, profile synchronization, duplicate registration and revoked-token rejection.
2. Add a migration runner and migration history table so deployments do not rely on manually applying SQL.
3. Add server-side authorization guards to every protected business controller; do not rely on frontend redirects.
4. Decide whether the `/auth/sync` compatibility route is still required; remove it once no older client uses it.
5. Add explicit account recovery UX for a user who has a Firebase identity but whose profile write failed after identity creation.
6. Consider rate limits and abuse monitoring for registration, verification resend, sign-in and password reset (Firebase has its own protections, but application-level observability is still useful).
7. Add structured logging/monitoring while ensuring tokens, passwords, verification links and service-account contents are never logged.
8. Add a production secret manager and separate least-privilege Firebase service identities for deployment environments.
9. Confirm product policy for whether unverified users may create a profile and which exact API actions are allowed before verification.

---

**Status:** The source-level registration/login/verification flow is wired across Firebase, Darshana, Moola and PostgreSQL, and the configuration gaps identified above have been corrected in this working copy. A successful production sign-off still requires installing the correct secrets, applying the migration, configuring Firebase Console/email delivery and completing the manual acceptance test.
