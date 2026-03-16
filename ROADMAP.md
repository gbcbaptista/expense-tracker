# Financial Tracker - Roadmap

> Phased approach. Each phase delivers real value on its own.
> The KEY insight: **tracking is the foundation, but the plan and the copilot are the product.**

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
- [ ] Create basic layout: sidebar navigation, header, responsive PWA shell
- [ ] PWA setup: manifest, service worker, installable on mobile

### Deliverable
A running app with login, an empty dashboard, working database, and installable as PWA on mobile.

---

## Phase 1: Connect Everything

**Goal**: Connect all bank accounts and see everything in one place. This is the "aha moment."

### 1A: Pluggy Integration
- [ ] Integrate Pluggy API (SDK setup, API keys, environment config)
- [ ] Bank connection flow (Pluggy Connect widget embedded in app)
- [ ] Account discovery after connection (list checking, savings, credit cards, investment accounts)
- [ ] Initial historical transaction sync
- [ ] Connection status monitoring and re-auth flow

### 1B: Consolidated Dashboard (v1)
- [ ] List all connected accounts with current balances
- [ ] Total consolidated balance across all accounts
- [ ] Unified transaction feed (all accounts, sorted by date)
- [ ] Basic search and filters (date range, account, amount)

### 1C: AI Categorization Engine
- [ ] Default Brazilian category tree (seeded in database)
- [ ] Rule-based categorization (keyword matching on descriptions)
- [ ] AI categorization via Claude API for unmatched transactions
- [ ] User correction flow: recategorize → auto-create rule for future matches
- [ ] Bulk categorization: "Apply to all similar"
- [ ] Auto-detect Pix transactions and extract recipient info
- [ ] Auto-detect installments from descriptions ("PARCELA 3/12")

### 1D: CSV Import (Fallback)
- [ ] Upload CSV/OFX file
- [ ] Column mapping UI
- [ ] Preview before import
- [ ] Duplicate detection
- [ ] Auto-categorization applied on import

### Deliverable
All bank accounts connected, transactions syncing automatically, AI categorizing everything. User opens the app and sees **where every centavo is going** — without any manual entry.

---

## Phase 2: Credit Cards & Debt

**Goal**: Full visibility into credit card installments and active debts. Know exactly what you owe and when.

### 2A: Credit Card Intelligence
- [ ] Credit card dashboard: current invoice, limit, closing date, due date
- [ ] Installment plan tracking (auto-detected + manual creation)
- [ ] Future invoice projection: "Next 6 months of invoices with installment commitments"
- [ ] Cash flow impact visualization: how installments affect future available income
- [ ] Invoice breakdown by category
- [ ] Invoice month-over-month comparison
- [ ] Alert: installment commitments approaching dangerous % of income

### 2B: Debt Tracker
- [ ] Add debts manually (all types: financing, loans, overdraft, informal, etc.)
- [ ] Debt dashboard: total debt, breakdown by type, monthly payment burden
- [ ] Payoff timeline visualization per debt
- [ ] Interest cost calculation: "You'll pay R$ X total in interest"
- [ ] Auto-detect and link recurring debt payments from transactions

### 2C: Debt Strategy (AI-Powered)
- [ ] Avalanche vs. Snowball recommendation with clear explanation
- [ ] "What if" simulation: extra payments → new payoff date + interest saved
- [ ] Net worth calculation: assets - debts
- [ ] Net worth evolution graph

### Deliverable
User sees all debts + credit card commitments clearly. AI recommends which debt to tackle first. Simulations show the impact of extra payments. Future invoice projections prevent surprises.

---

## Phase 3: The Plan

**Goal**: Build a personalized financial plan based on real data, and monitor it daily.

> This phase comes AFTER the app has 1+ months of real spending data. The plan is data-driven, not guesswork.

### 3A: Plan Builder
- [ ] AI analyzes spending history and suggests budget per category
- [ ] Show user their actual spending patterns vs. suggested budget
- [ ] User adjusts budget amounts to their comfort level
- [ ] Define financial goals (quitar dívida, reserva emergência, viagem, etc.)
- [ ] Link goals to accounts (optional)
- [ ] Set income expectations

### 3B: Plan Status Dashboard (THE Main Screen)
- [ ] **Plan health score**: "82% on track this month"
- [ ] Category budget progress bars (green/yellow/red)
- [ ] Active alerts and warnings
- [ ] Consolidated balances (quick glance)
- [ ] Recent transactions
- [ ] Goal progress
- [ ] Debt payoff progress

### 3C: Reports
- [ ] Monthly spending by category (charts)
- [ ] Month-over-month comparison
- [ ] Income vs. expenses trend
- [ ] Cash flow analysis
- [ ] Credit card invoice trends
- [ ] Debt payoff progress over time

### Deliverable
User opens the app and immediately sees: "Am I on track?" Budget progress, alerts, goals — all in one screen. The app is now a true financial copilot, not just a tracker.

---

## Phase 4: The Copilot

**Goal**: AI becomes proactive — alerts, suggestions, and plan adjustments without the user asking.

### 4A: Proactive Alerts
- [ ] Overspending alerts: "80% of food budget used, it's only the 15th"
- [ ] Bill reminders: "Fatura vence em 3 dias"
- [ ] Anomaly detection: "Gasto 3x acima da média com iFood"
- [ ] Low balance warnings
- [ ] Duplicate subscription detection
- [ ] Connection health alerts

### 4B: Plan Adjustment Suggestions
- [ ] "You've had R$ 800 surplus for 3 months — allocate to goal/debt?"
- [ ] "Spending on X category dropped — reduce budget?"
- [ ] "Debt X paid off — redirect payment to Debt Y?"
- [ ] "Income change detected — update plan?"

### 4C: Notification System
- [ ] In-app notification center
- [ ] Push notifications (PWA)
- [ ] Email digest (weekly summary, monthly report)
- [ ] User preferences: which alerts, which channels, quiet hours

### Deliverable
The app actively watches your finances and tells you when something needs attention. You don't have to remember to check — it comes to you.

---

## Phase 5: Investments & Polish

**Goal**: Complete the financial picture with investment tracking. Polish everything for daily use.

### 5A: Investment Tracking
- [ ] Portfolio overview from Pluggy broker connectors
- [ ] Asset allocation breakdown (Renda Fixa, Ações, FIIs, etc.)
- [ ] Total portfolio value + basic gain/loss
- [ ] Dividends/yield tracking
- [ ] Manual entry for unsupported assets

### 5B: Pix Deep-Dive
- [ ] Pix-specific transaction view
- [ ] Top recipients / payers ranking
- [ ] Recurring Pix detection
- [ ] Pix volume over time

### 5C: Quality of Life
- [ ] Performance optimization (dashboard < 2s load)
- [ ] Offline support (PWA cache for dashboard)
- [ ] Account grouping and customization
- [ ] Dark mode
- [ ] Data export (CSV, PDF reports)

### Deliverable
Complete financial picture: spending + debts + investments + net worth. App is polished and pleasant to use daily.

---

## Phase 6: SaaS

**Goal**: Make it ready for other users to pay for.

### 6A: Production Hardening
- [ ] Security audit
- [ ] LGPD compliance (consent flows, data export, data deletion)
- [ ] Error tracking (Sentry)
- [ ] Monitoring and alerting (uptime, sync health)
- [ ] Rate limiting and abuse prevention

### 6B: User Onboarding
- [ ] Registration flow
- [ ] Guided onboarding: connect first bank → see data → create plan
- [ ] Subscription tiers (Free / Pro / Premium)
- [ ] Payment integration (Stripe)

### 6C: Marketing
- [ ] Landing page
- [ ] Feature comparison vs. competitors
- [ ] Blog / content marketing

### 6D: Future Ideas (P3)
- [ ] Shared household finances
- [ ] WhatsApp bot for alerts
- [ ] Conversational AI: "Quanto gastei com Uber?"
- [ ] Tax preparation helpers

### Deliverable
A production-ready SaaS product with subscription billing, onboarding, and marketing.

---

## Phase Dependencies

```
Phase 0 (Foundation)
    │
    ▼
Phase 1 (Connect + Categorize)  ← "aha moment": see everything
    │
    ▼
Phase 2 (Cards + Debt)          ← know what you owe
    │
    ▼
Phase 3 (The Plan)              ← needs 1+ month of data from Phase 1
    │
    ▼
Phase 4 (The Copilot)           ← needs the plan from Phase 3
    │
    ├──▶ Phase 5 (Investments + Polish)  ← can be parallel with Phase 4
    │
    ▼
Phase 6 (SaaS)                  ← after personal use validates the product
```

---

## What We're NOT Building (Scope Boundaries)

- **Not a bank**: No money transfers, no payments, no PIX initiation
- **Not a tax calculator**: No IR declaration automation (maybe P3+)
- **Not a financial advisor**: AI gives data-driven suggestions, not regulated investment advice
- **Not a trading platform**: Portfolio tracking, not trading
- **Not a social app**: No "compare with friends" or leaderboards (privacy first)
