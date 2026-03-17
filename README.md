# Financial Tracker

A financial health copilot for the Brazilian market. Connects all your bank accounts, builds a personalized financial plan based on real spending data, and actively keeps you on track — with near-zero manual effort.

## What This Is

Not just a tracker. Three things in one:

1. **Complete Financial Visibility** — Connect all accounts (Pluggy API), see everything in one place, AI auto-categorizes transactions
2. **Personalized Financial Plan** — Data-driven budgets, debt payoff strategy, savings goals
3. **Active Financial Copilot** — Proactive alerts, plan monitoring, AI-powered advice

## Documentation

Read in this order:

1. **[VISION.md](./VISION.md)** — Problem statement, product vision, target user, core principles
2. **[FEATURES.md](./FEATURES.md)** — Detailed feature breakdown with priorities (P0-P3)
3. **[DATA_MODEL.md](./DATA_MODEL.md)** — Database entities, relationships, key queries
4. **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Tech stack proposals, integrations, security
5. **[ROADMAP.md](./ROADMAP.md)** — Phased delivery plan (Phase 0-6)

## Status

Planning phase. Tech stack decisions are proposals (see ARCHITECTURE.md for what's decided vs. open).

## Key Decisions

- **Bank aggregator**: Pluggy
- **AI**: Claude API behind provider-agnostic abstraction layer
- **Platform**: PWA (50/50 mobile/desktop)
- **Notifications**: Push only
- **Crypto**: Out of scope
- **Tech stack**: Evaluate during implementation (Next.js + PostgreSQL proposed)
