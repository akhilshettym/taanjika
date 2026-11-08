# Database migrations

Apply `001_authentication_schema.sql` after the PostgreSQL container is healthy and before starting Moola with `ADMIN_BOOTSTRAP_ENABLED=true`.

From the monorepo root:

```bash
docker compose exec -T postgres sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"' \
  < apps/moola/database/migrations/001_authentication_schema.sql
```

This starter migration is written with `IF NOT EXISTS` so it can be re-run for initial local setup. Production deployments should introduce a migration ledger/tool and run migrations as a controlled release step before API replicas start.
