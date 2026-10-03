# Fixture provenance

Synthetic test data only. No production database or credentials were used.

- Source configuration: repository commit `935aab5` (the pre-update `payload.config.ts`, all seven collections, Lexical editor, Payload Cloud and S3 plugins).
- Installed baseline: Payload / PostgreSQL adapter / Lexical / Payload Cloud / S3 **3.24.0**, as resolved by that commit's lockfile. Do not install the old package.json without its lockfile: its ranges can resolve newer packages.
- Database: disposable Docker `postgres:17`, database `neotic_test`, published on `127.0.0.1` only.
- Initialized through the actual baseline PostgreSQL adapter's development schema push. Created an admin and an Editor through Payload's Local API with a randomly generated test password; both logged in successfully under 3.24.0. Created the synthetic Messages record through Payload.
- `populated.sql`: `pg_dump --no-owner --no-privileges --inserts --exclude-table-data=public.payload_migrations`. Only the development migration ledger data is excluded; all application tables, constraints, sequences, indexes and content remain. The test substitutes `public.` with its random private schema and strips psql meta-commands before loading it.
- `users.json`: the disposable generated password and message ID needed to exercise the preserved baseline credentials. This is public test-only data, never suitable for an application account.
- `schema.json`: baseline adapter `requireDrizzleKit().generateDrizzleJson(payload.db.schema)` output. Used as the previous snapshot when running the 3.90.2 adapter's `createMigration` against the complete updated application configuration.

The generated UP/DOWN DDL is retained in `migrations/`. The only DDL adaptation selects the adapter's schema via transaction-local `search_path` and qualifies the session FK accordingly, so the same migration supports the default production `public` schema and isolated test schemas. The latest generated 3.90.2 snapshot is checked in beside the migration for future schema diffs.

To regenerate, check out the source commit into an isolated directory, install its frozen lockfile, point it at a new disposable loopback database with generated secrets, initialize the full config, create the same synthetic users/message and verify baseline login, then produce the dump/snapshot above. Do not regenerate from the current config, a users-only config, or an existing development database.
