# Financial Tracker - Features

## Feature Priority Legend

- **P0** — Must have for MVP. Without this, the product doesn't make sense.
- **P1** — Important. Should be in the first usable version.
- **P2** — Nice to have. Adds significant value but can wait.
- **P3** — Future. Cool ideas for later phases.

---

## 1. Bank Account Integration (P0)

### 1.1 Account Connection
- Connect to Brazilian banks via aggregator API (Pluggy, Belvo, or Open Finance Brasil)
- Support for major banks: Nubank, Itaú, Bradesco, Santander, Banco do Brasil, Inter, C6, BTG
- Automatic sync of transactions (at least daily)
- Manual refresh trigger
- Connection health monitoring (alert when a connection breaks)

### 1.2 Account Overview
- List all connected accounts with current balances
- Total net balance across all accounts
- Balance history over time (graph)
- Account grouping (e.g., "Day-to-day", "Savings", "Emergency fund")

### 1.3 Fallback: Manual Import
- CSV/OFX file upload for banks not supported by the aggregator
- Template mapping (map columns to: date, description, amount, etc.)
- Duplicate detection on import

---

## 2. Transaction Management (P0)

### 2.1 Transaction List
- Unified feed of all transactions across all accounts
- Filters: date range, account, category, amount range, type (income/expense)
- Search by description or merchant name
- Pagination / infinite scroll

### 2.2 Automatic Categorization
- Rule-based categorization using merchant name patterns
- Pre-built category tree for Brazilian expenses:
  - Alimentação (Mercado, Restaurante, Delivery)
  - Transporte (Combustível, Uber/99, Estacionamento, Pedágio)
  - Moradia (Aluguel, Condomínio, Luz, Água, Gás, Internet)
  - Saúde (Farmácia, Plano de Saúde, Consultas)
  - Educação
  - Lazer (Streaming, Viagens, Bares)
  - Vestuário
  - Serviços (Assinaturas, SaaS)
  - Transferências (Pix enviados, TED, DOC)
  - Investimentos
  - Impostos e taxas
  - Outros
- User can recategorize; system learns from corrections
- Bulk categorization for similar transactions

### 2.3 Transaction Details
- Original bank description + user-editable notes
- Category (editable)
- Tags (custom labels, e.g., "trip-to-bahia", "wedding")
- Attachments (receipts — P2)
- Split transaction into multiple categories

---

## 3. Credit Card Management (P0)

### 3.1 Card Overview
- List all credit cards with: current invoice total, available limit, closing date, due date
- Invoice timeline: current, future (next 3-6 months with projected installments)

### 3.2 Installment Tracking (Parcelas)
- When a purchase is made in installments, track:
  - Total purchase amount
  - Number of installments (total and remaining)
  - Monthly installment value
  - Which future invoices are affected
- Projection: "Your next 6 invoices will be at least R$ X,XXX because of existing installments"
- Alert when installment commitments approach a % of income

### 3.3 Invoice Breakdown
- Break down each invoice by category
- Compare invoices month over month
- Identify recurring charges on the card

---

## 4. Pix Tracking (P1)

### 4.1 Pix Flow
- Categorize Pix transactions (sent and received)
- Contact/recipient tracking: "You sent R$ 1,200 to João this month"
- Identify recurring Pix payments (e.g., rent paid via Pix)
- Flag unusual Pix activity

### 4.2 Pix Insights
- Top recipients by amount
- Pix volume over time
- Pix vs. other payment methods comparison

---

## 5. Investment Tracking (P1)

### 5.1 Portfolio Overview
- Consolidated view across all brokerages
- Asset allocation breakdown (Renda Fixa, Ações, FIIs, Crypto, etc.)
- Total portfolio value with daily updates
- Benchmark comparison (CDI, Ibovespa, IPCA+)

### 5.2 Asset Details
- Individual asset performance
- Dividends/yield received (JCP, dividendos, rendimentos)
- Cost basis vs. current value (P&L)

### 5.3 Integration Sources
- Brokerages via aggregator API
- B3/CEI integration for stocks/FIIs (P2)
- Manual entry for crypto and non-traditional assets
- Binance/other crypto exchange API (P2)

---

## 6. Debt Tracker (P1)

### 6.1 Debt Registration
- Add debts manually: description, total amount, interest rate, monthly payment, start/end date
- Debt types: Financiamento, Empréstimo pessoal, Cheque especial, Cartão (rotativo), Informal (emprestou pra alguém)
- Auto-detect recurring debt payments from bank transactions (P2)

### 6.2 Debt Dashboard
- Total debt overview
- Payoff timeline with visualization
- Interest cost breakdown ("You'll pay R$ X in interest on this debt")
- Simulation: "What if I pay R$ 200 extra per month?"

### 6.3 Debt vs. Assets
- Net worth calculation: Total assets - Total debts
- Net worth evolution over time

---

## 7. Budgets and Goals (P1)

### 7.1 Monthly Budgets
- Set budget per category (e.g., Alimentação: R$ 1,500/month)
- Progress bars showing spent vs. budget
- Alerts when approaching or exceeding budget
- Rollover unused budget (optional)

### 7.2 Financial Goals
- Define goals: "Save R$ 10,000 for travel by December"
- Link a savings account to a goal
- Progress tracking with projected completion date

---

## 8. Reports and Insights (P1)

### 8.1 Spending Reports
- Monthly/weekly/yearly spending by category (bar chart, pie chart)
- Month-over-month comparison
- Income vs. expenses trend
- Cash flow analysis

### 8.2 Smart Insights
- Anomaly detection: "You spent 3x more on Uber this week"
- Trends: "Your food spending has increased 15% over the last 3 months"
- Forecasting: "Based on your spending pattern, you'll have R$ X left by end of month"

---

## 9. Notifications and Alerts (P2)

- Large transaction alerts
- Budget threshold alerts
- Bill due date reminders
- Bank connection issues
- Weekly/monthly summary digest (email or push)

---

## 10. Multi-user and SaaS Features (P3)

### 10.1 User Management
- User registration with email/password and social login
- Subscription tiers (Free, Pro, Premium)
- Usage limits per tier

### 10.2 Shared Finances
- Invite partner/family to shared workspace
- Split expenses between household members
- Shared budgets and goals

### 10.3 Admin Dashboard
- User analytics
- Subscription management
- System health monitoring

---

## Non-Functional Requirements

### Security
- All financial data encrypted at rest (AES-256) and in transit (TLS 1.3)
- OAuth 2.0 for bank connections (no storing bank passwords)
- JWT + refresh tokens for authentication
- Rate limiting and brute force protection
- LGPD compliance (Brazil's data protection law)

### Performance
- Dashboard load time < 2 seconds
- Transaction sync < 30 seconds
- Support up to 100,000 transactions per user without degradation

### Reliability
- Automatic retry for failed bank syncs
- Graceful degradation when a bank API is down
- Daily backups of all user data

### Observability
- Structured logging
- Error tracking (Sentry or similar)
- Uptime monitoring
