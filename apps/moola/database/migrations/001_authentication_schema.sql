BEGIN;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80),
  display_name VARCHAR(161) NOT NULL,
  email_verified_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_unique ON users (LOWER(email));
CREATE INDEX IF NOT EXISTS users_status_idx ON users (status);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('CUSTOMER', 'ARTIST', 'ADMIN')),
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  assigned_by UUID REFERENCES users(id) ON DELETE SET NULL,
  PRIMARY KEY (user_id, role)
);
CREATE INDEX IF NOT EXISTS user_roles_role_idx ON user_roles (role);

CREATE TABLE IF NOT EXISTS artist_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  artist_name VARCHAR(160) NOT NULL,
  biography TEXT,
  art_forms TEXT[] NOT NULL DEFAULT '{}',
  portfolio_url TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  review_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX IF NOT EXISTS artist_applications_one_pending_per_user ON artist_applications (user_id) WHERE status = 'PENDING';
CREATE INDEX IF NOT EXISTS artist_applications_status_created_idx ON artist_applications (status, created_at DESC);

CREATE TABLE IF NOT EXISTS user_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  consent_type TEXT NOT NULL CHECK (consent_type IN ('TERMS', 'PRIVACY', 'MARKETING')),
  version TEXT NOT NULL,
  accepted BOOLEAN NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, consent_type, version)
);
CREATE INDEX IF NOT EXISTS user_consents_user_type_created_idx ON user_consents (user_id, consent_type, created_at DESC);

CREATE TABLE IF NOT EXISTS admin_bootstrap_state (
  id TEXT PRIMARY KEY CHECK (id = 'primary'),
  firebase_uid TEXT NOT NULL,
  password_version TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMIT;
