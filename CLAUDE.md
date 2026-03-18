# Project Rules

## About This Project
Financial Tracker is a financial health copilot for the Brazilian market. It connects
bank accounts via Pluggy API, auto-categorizes transactions using AI (Claude API behind
a provider-agnostic abstraction), builds personalized financial plans based on real
spending data, and actively monitors adherence with proactive alerts. Core entities:
User, BankConnection, Account, Transaction, Category, Budget, Debt, Goal, FinancialPlan,
InstallmentPlan. Built as a PWA (50/50 mobile/desktop). Serves the founder first
(personal use), then SaaS.

## Tech Stack
- Runtime: Node.js (latest LTS)
- Framework: Next.js 15 (App Router) with TypeScript
- UI: shadcn/ui + Tailwind CSS
- Database: PostgreSQL (Neon — serverless) via Drizzle ORM
- Job Queue: Vercel Cron (migrate to pgboss/EventBridge if needed)
- Auth: Auth.js (NextAuth v5)
- Testing: Vitest + React Testing Library
- Package manager: pnpm
- Linting: ESLint + Prettier
- Hosting: Vercel (frontend + API) + Neon (Postgres) — $0/mo on free tiers
- Bank aggregator: Pluggy API
- AI: Claude API (via provider-agnostic abstraction layer)
- Logging: pino (structured JSON logs)

## Infrastructure Rules
- **No Vercel-specific APIs.** Do not use `@vercel/kv`, `@vercel/blob`, `@vercel/edge-config`, or `@vercel/analytics`. Use standard Postgres, filesystem, and environment variables. This keeps the app portable for future AWS migration.
- All monetary values stored as integers in centavos (R$ 15.99 = 1599)
- All timestamps in UTC. Display converted to user's timezone.
- **Structured logging everywhere.** Use `pino` for all server-side logging. JSON format, log levels (error, warn, info, debug). Never log PII (mask account numbers, emails in non-debug). Every API route and background job must log entry/exit with relevant context (request ID, user ID, duration). No `console.log` — always use the logger.

## Project Structure
```
apps/
  web/                        ← Next.js app (frontend + API routes)
    src/
      app/                    ← App Router pages and layouts
        (auth)/               ← Auth pages (login, register)
        (dashboard)/          ← Protected dashboard pages
        api/                  ← API route handlers
      components/             ← React components
        ui/                   ← shadcn/ui components
      lib/                    ← Shared utilities
        db/                   ← Drizzle client, schema, migrations
          schema/             ← Table definitions (one file per entity group)
          migrations/         ← SQL migration files
        auth/                 ← Auth.js configuration
        ai/                   ← AIProvider abstraction + implementations
        sync/                 ← Bank sync logic (Pluggy integration)
      hooks/                  ← Custom React hooks
      types/                  ← TypeScript type definitions
    public/                   ← Static assets, PWA manifest
    tests/                    ← Test files (mirrors src/ structure)
packages/
  shared/                     ← Shared types, constants, utilities (if needed)
tasks/                        ← Agent queue task files
```

## Agent Queue Pipeline

```
QUEUE → DEV → REVIEWER → QA → DONE
              ↑    |       |
              +----+-------+
           (feedback on failure, max 3 attempts)
```

### Folders
```
tasks/
  queue/    ← Drop new .md task files here
  dev/      ← Agent is implementing the task
  review/   ← Agent is reviewing code quality
  qa/       ← Agent is running tests and validating
  done/     ← Completed tasks
  failed/   ← Tasks that exceeded max attempts
```

### How It Works
1. **QUEUE**: Drop a task `.md` file in `tasks/queue/`
2. **DEV**: Agent reads the task, implements it, writes tests, commits on a branch
3. **REVIEWER**: Agent reviews code quality, maintainability, and correctness
4. **QA**: Agent runs tests and validates acceptance criteria
5. Tasks that fail after 3 total attempts go to `tasks/failed/`

## Coding Standards
- Use descriptive variable names (not single letters except in loops)
- Functions should do one thing, max ~30 lines
- Always handle errors explicitly, never swallow them
- Use early returns instead of deep nesting
- Comments only for WHY, not WHAT

## Git Rules
- Use conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`
- Keep commits atomic (one logical change per commit)
- Write commit messages in imperative mood
- NEVER include "Co-Authored-By" in commit messages
- NEVER include any trailer mentioning Claude, AI, or any assistant
- NEVER mention Claude, AI, or any assistant in commits or code comments

## Testing
```bash
pnpm test
```

- Every new feature needs tests
- Tests must be independent (no shared mutable state)
- Use descriptive test names: "should return 401 when token is expired"
- Always run the full test suite before committing
- If existing tests break, fix them — do not skip or delete them
- Choose the right test type for the job: unit, integration, contract, e2e
- Tests must cover error paths and edge cases, not just happy path

## What NOT To Do
- Do not install new dependencies unless the task spec explicitly allows it
- Do not modify files outside the scope of the task spec
- Do not refactor existing code unless the task specifically asks for it
- Do not add TODO/FIXME comments — either fix it or leave it
- Do not add console.log/print statements for debugging

## Before Committing
- Run the linter
- Run the tests
- Make sure nothing is broken
