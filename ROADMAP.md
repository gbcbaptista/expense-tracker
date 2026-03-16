# Financial Tracker - Roadmap

> Phased approach: build something usable fast, then iterate.

---

## Phase 0: Foundation

**Goal**: Project setup, infrastructure, and the skeleton that everything else builds on.

### Tasks
- [ ] Initialize monorepo (Turborepo or similar)
- [ ] Set up Next.js project with TypeScript
- [ ] Configure Tailwind CSS + shadcn/ui
- [ ] Set up PostgreSQL database + ORM (Drizzle or Prisma)
- [ ] Define database schema and run initial migrations
- [ ] Set up authentication (Auth.js)
- [ ] Set up basic CI/CD (lint, type-check, build)
- [ ] Configure environment variables and secrets management
- [ ] Create basic layout: sidebar navigation, header, responsive shell

### Deliverable
A running app with login, an empty dashboard, and a working database.

---

## Phase 1: Manual Foundation (MVP)

**Goal**: A usable financial tracker even without bank connections. Prove the core value proposition.

### 1A: Accounts & Transactions (Manual)
- [ ] CRUD for manual accounts (checking, savings, credit card, investment)
- [ ] Manual transaction entry (date, description, amount, category)
- [ ] Default category tree (seeded with Brazilian categories)
- [ ] Transaction list with filters (date, category, account, type)
- [ ] Search transactions by description
- [ ] Dashboard: total balance, recent transactions, spending summary

### 1B: Credit Card Basics
- [ ] Credit card account type with limit, closing date, due date
- [ ] Manual installment plan creation
- [ ] Invoice view: current month's transactions for a card
- [ ] Future invoice projection based on installment plans

### 1C: CSV Import
- [ ] Upload CSV/OFX file
- [ ] Column mapping UI
- [ ] Preview before import
- [ ] Duplicate detection
- [ ] Auto-categorization on import (rule-based)

### Deliverable
A fully functional manual financial tracker with CSV import. Users can see where their money goes, track credit card installments, and import bank statements.

---

## Phase 2: Bank Integration

**Goal**: Connect to Brazilian banks and automate everything.

### 2A: Aggregator Integration
- [ ] Choose and integrate bank aggregator (Pluggy, Belvo, or Open Finance)
- [ ] Bank connection flow (OAuth consent in iframe/redirect)
- [ ] Account discovery (list accounts after connecting)
- [ ] Initial transaction sync (historical data)

### 2B: Ongoing Sync
- [ ] Webhook handler for real-time transaction updates
- [ ] Scheduled sync as fallback (every 6-12 hours)
- [ ] Connection health monitoring and alerts
- [ ] Re-authentication flow for expired connections
- [ ] Balance sync and reconciliation

### 2C: Smart Categorization
- [ ] Categorization rule engine (keyword matching)
- [ ] Learn from user corrections
- [ ] Merchant name normalization
- [ ] Bulk re-categorize similar transactions
- [ ] Auto-detect installments from bank descriptions ("PARCELA 3/12")
- [ ] Auto-detect Pix transactions and extract recipient info

### Deliverable
Connect your bank accounts and see all transactions automatically categorized. Credit card installments detected and projected.

---

## Phase 3: Insights & Control

**Goal**: Turn data into actionable insights.

### 3A: Budgets
- [ ] Set monthly budgets per category
- [ ] Budget progress bars on dashboard
- [ ] Alerts when approaching/exceeding budget
- [ ] Budget vs. actual reports

### 3B: Reports
- [ ] Monthly spending by category (bar + pie charts)
- [ ] Month-over-month comparison
- [ ] Income vs. expenses trend
- [ ] Cash flow analysis
- [ ] Credit card invoice breakdown by category

### 3C: Pix Analytics
- [ ] Pix-specific transaction view
- [ ] Top recipients / payers
- [ ] Recurring Pix detection
- [ ] Pix volume over time

### 3D: Smart Insights
- [ ] Anomaly detection ("You spent 3x more on X this week")
- [ ] Spending trends ("Food spending up 15% over 3 months")
- [ ] End-of-month forecast

### Deliverable
Budgets, reports, and insights that help users make better financial decisions.

---

## Phase 4: Investments & Debt

**Goal**: Complete financial picture — not just spending, but net worth.

### 4A: Debt Tracker
- [ ] Add debts manually (financing, loans, informal)
- [ ] Debt dashboard with payoff timeline
- [ ] Interest cost calculation
- [ ] "What if" simulation (extra payments)
- [ ] Net worth calculation (assets - debts)
- [ ] Auto-link debt payments from transactions (P2)

### 4B: Investment Tracking
- [ ] Portfolio overview from aggregator data
- [ ] Asset allocation breakdown
- [ ] Performance tracking (vs. CDI, Ibovespa)
- [ ] Dividend/yield tracking
- [ ] Manual entry for unsupported assets

### 4C: Financial Goals
- [ ] Create savings goals with target amount and date
- [ ] Link to a savings account
- [ ] Progress tracking with projections

### Deliverable
Full financial picture: spending, debt, investments, net worth, and goals in one place.

---

## Phase 5: Polish & SaaS Prep

**Goal**: Make it ready for other users.

### 5A: Notifications
- [ ] In-app notifications
- [ ] Email digest (weekly/monthly summary)
- [ ] Push notifications (PWA)
- [ ] Configurable alert thresholds

### 5B: Multi-user
- [ ] User registration and onboarding flow
- [ ] Subscription tiers (Free / Pro / Premium)
- [ ] Payment integration (Stripe)
- [ ] Usage limits per tier
- [ ] Shared household finances (P3)

### 5C: Production Hardening
- [ ] Security audit
- [ ] LGPD compliance (consent, data export, deletion)
- [ ] Performance optimization
- [ ] Error tracking (Sentry)
- [ ] Monitoring and alerting
- [ ] Landing page and marketing site

### Deliverable
A production-ready SaaS product with subscription billing.

---

## Timeline Estimate (Rough)

| Phase | Scope | Notes |
|-------|-------|-------|
| Phase 0 | Foundation | Project setup, infra |
| Phase 1 | Manual MVP | Usable without bank APIs |
| Phase 2 | Bank Integration | The core differentiator |
| Phase 3 | Insights | Where the real value lives |
| Phase 4 | Investments & Debt | Complete financial picture |
| Phase 5 | SaaS | Monetization ready |

> Each phase should be usable on its own. Don't wait for Phase 5 to start using it — start from Phase 1.

---

## What We're NOT Building (Scope Boundaries)

- **Not a bank**: No money transfers, no payments, no PIX initiation
- **Not a tax calculator**: No IR declaration automation (maybe in the future)
- **Not a financial advisor**: Insights and data, not investment recommendations
- **Not real-time trading**: Portfolio tracking, not a trading platform
