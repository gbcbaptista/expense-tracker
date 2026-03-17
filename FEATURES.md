# Financial Tracker - Features

## Feature Priority Legend

- **P0** — Must have for MVP. Without this, the product doesn't make sense.
- **P1** — Important. Should be in the first usable version.
- **P2** — Nice to have. Adds significant value but can wait.
- **P3** — Future. Cool ideas for later phases.

> **Note on P0 vs. Roadmap phases**: P0 means "essential for the product to make sense" — but some P0 features (like Financial Plan) require data from earlier phases before they can work. See ROADMAP.md for the build order and dependencies.

## Core Philosophy

> **This is NOT a tracker with some AI on top. It's a financial health copilot that happens to track your money.**

The features are organized around the user journey:
1. **Connect** → See everything in one place
2. **Understand** → Know where money goes (auto-categorized)
3. **Plan** → Build a realistic financial plan based on real data
4. **Follow** → Daily visibility: am I on track?
5. **Adapt** → AI suggests adjustments as your situation evolves

---

## 1. Bank Account Integration (P0)

### 1.1 Account Connection
- Connect to Brazilian banks via Pluggy API
- Priority banks: Nubank, Itaú, Inter (user's banks) + all major banks for SaaS
- Automatic sync of transactions (webhook-driven, poll as fallback)
- Manual refresh trigger
- Connection health monitoring (alert when a connection breaks or needs re-auth)

### 1.2 Account Overview
- List all connected accounts with current balances
- Total net balance across all accounts (consolidated)
- Balance history over time (graph)
- Account grouping (e.g., "Dia-a-dia", "Reserva", "Investimentos")

### 1.3 Fallback: Manual Import
- CSV/OFX file upload for banks not supported by Pluggy
- Column mapping UI (map columns to: date, description, amount, etc.)
- Duplicate detection on import
- Auto-categorization applied on import

---

## 2. Transaction Management (P0)

### 2.1 Transaction List
- Unified feed of all transactions across all accounts
- Filters: date range, account, category, amount range, type (income/expense/transfer)
- Search by description or merchant name
- Pagination / infinite scroll

### 2.2 AI-Powered Categorization (P0 — this is core, not a nice-to-have)
- **Layer 1**: Rule-based matching (keywords in description → category)
- **Layer 2**: AI categorization (Claude API or similar) for transactions that rules can't handle
- **Layer 3**: Learn from user corrections — when user recategorizes, create a new rule automatically
- Pre-built category tree for Brazilian expenses (see DATA_MODEL.md)
- Bulk categorization: "Apply this category to all similar transactions"
- Goal: < 5% of transactions need manual correction after 1 month

### 2.3 Transaction Details
- Original bank description + cleaned/normalized version
- Category (editable — corrections feed back into AI learning)
- User notes
- Tags (custom labels, e.g., "viagem-bahia", "casamento")
- Split transaction into multiple categories
- Attachments/receipts (P2)

---

## 3. Credit Card Management (P0)

### 3.1 Card Overview
- List all credit cards with: current invoice total, available limit, closing date, due date
- Invoice timeline: current + future (next 6 months with projected installments)

### 3.2 Installment Tracking — Parcelas (P0 — critical differentiator)
- Auto-detect installments from bank descriptions ("PARCELA 3/12")
- For each installment purchase, track:
  - Total purchase amount
  - Number of installments (total and remaining)
  - Monthly installment value
  - Which future invoices are affected
- **Future invoice projection**: "Your next 6 invoices will be at least R$ X,XXX because of existing installments"
- **Cash flow impact**: Show how installments affect available income in future months
- Alert when installment commitments approach a dangerous % of income
- Simulation: "If you buy this in 12x, your invoices for the next year will be..."

### 3.3 Invoice Breakdown
- Break down each invoice by category
- Compare invoices month over month
- Identify recurring charges on the card

---

## 4. Financial Plan & Budget (P0 — this is the core value, not P1)

### 4.1 Plan Creation (Data-Driven)
The plan is NOT created in a vacuum. It's built AFTER the app has real spending data:

1. App connects accounts and categorizes ~1 month of transactions
2. App shows the user their actual spending patterns:
   - "You spent R$ 2,300 on food last month"
   - "Your fixed costs are R$ 4,500/month"
   - "You have R$ X in active debts with R$ Y in monthly payments"
3. App suggests a realistic budget based on actual income and spending
4. User adjusts the plan to their goals
5. Plan is now active — app monitors adherence

### 4.2 Monthly Budget
- Budget per category (suggested by AI based on real data, adjusted by user)
- Progress bars showing spent vs. budget (real-time)
- Visual status: green (on track), yellow (approaching limit), red (exceeded)
- Rollover unused budget (optional)

### 4.3 Plan Status Dashboard (The Main Screen)
This is what the user sees when they open the app:
- **Plan health score**: overall status (e.g., "82% on track this month")
- **Category breakdown**: which categories are on track, which are over
- **Alerts**: upcoming bills, overspending warnings, anomalies
- **Consolidated balances**: total across all accounts
- **Recent transactions**: quick glance at latest activity

### 4.4 Financial Goals
- Define goals: "Quitar dívida do carro", "Reserva de emergência R$ 20.000", "Viagem Europa"
- Link to a savings account (optional)
- Progress tracking with projected completion date
- AI suggests how to accelerate goals based on spending patterns

---

## 5. Debt Management (P0 — user has active debts, this is urgent)

### 5.1 Debt Registration
- Add debts: description, total amount, interest rate (monthly), monthly payment, start/end date
- Debt types:
  - Financiamento (casa, carro)
  - Empréstimo pessoal
  - Empréstimo consignado
  - Cheque especial
  - Cartão de crédito (rotativo)
  - Informal (emprestou pra alguém / deve pra alguém)
  - Outro
- Auto-detect recurring debt payments from bank transactions (match by amount + frequency)

### 5.2 Debt Dashboard
- Total debt overview with breakdown by type
- Payoff timeline visualization (when will each debt be paid off?)
- Interest cost breakdown: "You'll pay R$ X in total interest on this debt"
- Monthly debt burden: "R$ Y of your income goes to debt payments"

### 5.3 Smart Debt Strategy (AI-Powered)
- **Avalanche method**: Pay highest interest rate first (saves most money)
- **Snowball method**: Pay smallest balance first (psychological wins)
- AI recommendation: "Pay off Debt X first — it has 4.5% monthly interest vs 1.8% on Debt Y. You'll save R$ 3,200."
- Simulation: "What if I pay R$ 200 extra per month on Debt X?" → show new payoff date and interest saved
- Proactive alerts: "You have R$ 800 left over this month. If you put it toward Debt X, you'll be debt-free 3 months sooner."

### 5.4 Net Worth
- Net worth = Total assets (accounts + investments) - Total debts
- Net worth evolution over time (graph)
- Milestone celebrations: "Your net worth turned positive!"

---

## 6. AI Financial Copilot (P0 — this is the differentiator)

### 6.1 Proactive Alerts (Push — app reaches out to you)
- **Overspending**: "You've used 80% of your food budget and it's the 15th."
- **Bill reminders**: "Fatura do Nubank vence em 3 dias — R$ 2,300."
- **Anomalies**: "Gasto de R$ 450 no iFood — isso é 3x mais que sua média semanal."
- **Low balance**: "Conta do Itaú com saldo baixo. Transferir da reserva?"
- **Recurring pattern**: "Você está pagando R$ 49.90/mês no Spotify e R$ 55.90 no Deezer. Precisa dos dois?"
- **Connection issues**: "Conexão com o Inter caiu — reconectar."

### 6.2 Plan Adjustment Suggestions (Periodic — weekly/monthly)
- "Você tem sobrado ~R$ 800/mês nos últimos 3 meses. Sugestões:
  - Aumentar aporte no objetivo 'Reserva de Emergência'
  - Adiantar parcelas da dívida X
  - Criar um novo objetivo?"
- "Seu gasto com transporte caiu 30% (trabalho remoto?). Quer reduzir o orçamento?"
- "Dívida X foi quitada! Redirecionar o pagamento mensal de R$ 500 para Dívida Y?"
- "Sua renda aumentou este mês. Quer ajustar o plano?"

### 6.3 On-Demand Analysis (User asks — future P2)
- Natural language queries: "Quanto gastei com Uber nos últimos 3 meses?"
- Comparisons: "Como foi meu gasto de dezembro vs janeiro?"
- What-if: "Se eu cortar streaming, quanto economizo por ano?"

### 6.4 AI Implementation Strategy
- **Architecture**: Provider-agnostic abstraction layer. Start with Claude API, swap providers without touching business logic.
- **Phase 1**: Rule-based alerts + AI (via abstraction) for categorization and advice
- **Phase 2**: Fine-tuned model based on user correction patterns
- **Phase 3**: Conversational interface (chat with your finances)
- **Important**: AI uses ONLY user's own data. No benchmarks against other users. Privacy first.

---

## 7. Pix Tracking (P1)

### 7.1 Pix Flow
- Auto-detect Pix transactions from bank data
- Categorize Pix sent and received (same categorization engine)
- Contact/recipient tracking: "You sent R$ 1,200 to João this month"
- Identify recurring Pix payments (e.g., rent paid via Pix → auto-categorize as Moradia)
- Flag unusual Pix activity

### 7.2 Pix Insights
- Top recipients by amount
- Pix volume over time
- Pix vs. other payment methods comparison

---

## 8. Investment Tracking (P1)

### 8.1 Portfolio Overview
- Consolidated view across all connected brokerages
- Asset allocation breakdown by type (Renda Fixa, Ações, FIIs, etc.)
- Total portfolio value with daily updates

### 8.2 Asset Details (Meio-termo — not super detailed)
- Current value per asset/position
- Basic performance (gain/loss since purchase)
- Dividends/yield received (JCP, dividendos, rendimentos)
- No deep analysis (not competing with broker apps)

### 8.3 Integration Sources
- Pluggy connectors for brokerages (XP, BTG, Clear, Rico, Genial, B3/CEI)
- Manual entry for unsupported assets

---

## 9. Reports (P1)

### 9.1 Spending Reports
- Monthly/weekly spending by category (bar chart, pie chart)
- Month-over-month comparison
- Income vs. expenses trend
- Cash flow analysis (what came in, what went out, what's left)

### 9.2 Credit Card Reports
- Invoice history and trends
- Installment commitment over time
- Category breakdown per card

### 9.3 Debt Reports
- Debt payoff progress over time
- Total interest paid
- Net worth trend

---

## 10. Notifications System (P1 — not P2, because proactive alerts are core)

### 10.1 Delivery Channels
- In-app notifications (always)
- Push notifications via PWA (daily alerts)
- Email digest (P3 — if needed later)

### 10.2 Notification Types
- Critical: overspending, low balance, bill due, connection broken
- Advisory: plan suggestions, debt strategy, goal progress
- Informational: weekly summary, monthly report ready

### 10.3 User Control
- Per-channel preferences (which alerts go where)
- Quiet hours
- Frequency control (don't spam)

---

## 11. Multi-user and SaaS Features (P3)

### 11.1 User Management
- User registration with email/password and social login
- Subscription tiers (Free, Pro, Premium)
- Usage limits per tier
- Onboarding flow that leads to first bank connection

### 11.2 Shared Finances
- Invite partner/family to shared workspace
- Split expenses between household members
- Shared budgets and goals

### 11.3 Admin Dashboard
- User analytics
- Subscription management (Stripe)
- System health monitoring

---

## Non-Functional Requirements

### Security (SaaS-grade from day one)
- All financial data encrypted at rest (AES-256) and in transit (TLS 1.3)
- OAuth 2.0 for bank connections (no storing bank passwords)
- JWT + refresh tokens for authentication
- Rate limiting and brute force protection
- LGPD compliance (Brazil's data protection law)
- Data export and deletion capabilities
- Security audit before SaaS launch

### Performance
- Dashboard load time < 2 seconds
- Transaction sync < 30 seconds
- Support up to 100,000 transactions per user without degradation
- PWA works well on 4G mobile connections

### Reliability
- Automatic retry for failed bank syncs
- Graceful degradation when a bank API is down
- Daily backups of all user data
- 99.5%+ uptime target for SaaS phase

### Observability
- Structured logging (no PII in logs)
- Error tracking (Sentry or similar)
- Uptime monitoring
- Bank sync success/failure rate tracking
