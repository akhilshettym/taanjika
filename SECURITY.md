## Accepted security findings

### GHSA-gcqx-w48m-w2h4 — deepmerge

- Package: deepmerge
- Installed version: 4.3.1
- Severity: Low (GitHub Advisory)
- Dependency path: jest-config → deepmerge
- Application: Moola
- Dependency classification: Development dependency
- Status: Monitoring upstream remediation

Reason:
The dependency is introduced through the Jest testing toolchain.
No patched release is currently listed in the GitHub Advisory Database.

Mitigation:

- Keep the package out of production runtime dependencies.
- Do not process untrusted input through this dependency.
- Continue running pnpm audit.
- Review the advisory periodically.
- Remove this exception when a patched version becomes available.
