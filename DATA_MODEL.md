# Financial Tracker - Data Model

> All monetary values stored as integers in centavos (R$ 15,99 = 1599) to avoid floating point issues.
> All timestamps in UTC. Display converted to user's timezone.

---

## Entity Relationship Diagram

```
┌──────────┐       ┌──────────────────┐       ┌────────────────┐
│  User    │──1:N──│ BankConnection   │──1:N──│ Account        │
└──────────┘       └──────────────────┘       └───────┬────────┘
     │                                                │
     │                                           1:N  │
     │                                                ▼
     │              ┌──────────────┐         ┌────────────────┐
     │──1:N────────│ Budget       │         │ Transaction    │
     │              └──────────────┘         └───────┬────────┘
     │                     │                         │
     │                     │ N:1                N:1   │
     │                     ▼                         ▼
     │              ┌──────────────┐         ┌────────────────┐
     │──1:N────────│ Category     │◀────────│                │
     │              └──────────────┘         └────────────────┘
     │
     │              ┌──────────────┐
     │──1:N────────│ Debt         │
     │              └──────────────┘
     │
     │              ┌──────────────┐         ┌────────────────┐
     │──1:N────────│ Investment   │──N:1────│ Asset          │
     │              │ Holding      │         │                │
     │              └──────────────┘         └────────────────┘
     │
     │              ┌──────────────┐
     │──1:N────────│ Installment  │──N:1──── Transaction
     │              │ Plan         │
     │              └──────────────┘
     │
     │              ┌──────────────┐
     └──1:N────────│ Goal         │
                    └──────────────┘
```

---

## Core Entities

### User

```sql
users
├── id                  UUID        PK
├── email               TEXT        UNIQUE, NOT NULL
├── name                TEXT        NOT NULL
├── password_hash       TEXT        NOT NULL
├── avatar_url          TEXT
├── timezone            TEXT        DEFAULT 'America/Sao_Paulo'
├── currency            TEXT        DEFAULT 'BRL'
├── subscription_tier   TEXT        DEFAULT 'free'  -- free, pro, premium
├── onboarding_complete BOOLEAN     DEFAULT false
├── created_at          TIMESTAMP   NOT NULL
└── updated_at          TIMESTAMP   NOT NULL
```

### BankConnection

Represents a connection to a financial institution via the aggregator API.

```sql
bank_connections
├── id                  UUID        PK
├── user_id             UUID        FK → users
├── aggregator          TEXT        NOT NULL  -- 'pluggy', 'belvo', 'manual'
├── aggregator_item_id  TEXT        -- external ID in the aggregator
├── institution_name    TEXT        NOT NULL  -- 'Nubank', 'Itaú', etc.
├── institution_logo    TEXT        -- URL
├── status              TEXT        NOT NULL  -- 'active', 'error', 'expired', 'disconnected'
├── last_sync_at        TIMESTAMP
├── error_message       TEXT
├── consent_expires_at  TIMESTAMP   -- when the user needs to re-authorize
├── created_at          TIMESTAMP   NOT NULL
└── updated_at          TIMESTAMP   NOT NULL
```

### Account

A single bank account, credit card, or investment account within a connection.

```sql
accounts
├── id                  UUID        PK
├── user_id             UUID        FK → users
├── connection_id       UUID        FK → bank_connections (nullable for manual accounts)
├── external_id         TEXT        -- ID from the aggregator
├── type                TEXT        NOT NULL  -- 'checking', 'savings', 'credit_card', 'investment', 'other'
├── name                TEXT        NOT NULL  -- user-editable display name
├── official_name       TEXT        -- name from the bank
├── currency            TEXT        DEFAULT 'BRL'
├── current_balance     BIGINT      -- in centavos
├── available_balance   BIGINT      -- in centavos (for credit cards: available limit)
├── credit_limit        BIGINT      -- for credit cards only
├── is_hidden           BOOLEAN     DEFAULT false  -- user can hide accounts from totals
├── group_name          TEXT        -- user-defined grouping
├── color               TEXT        -- hex color for UI
├── last_sync_at        TIMESTAMP
├── created_at          TIMESTAMP   NOT NULL
└── updated_at          TIMESTAMP   NOT NULL

INDEX: (user_id), (connection_id), (user_id, type)
```

### Transaction

```sql
transactions
├── id                  UUID        PK
├── user_id             UUID        FK → users
├── account_id          UUID        FK → accounts
├── external_id         TEXT        -- ID from the aggregator (for dedup)
├── date                DATE        NOT NULL
├── posted_date         DATE        -- when it actually posted (can differ from transaction date)
├── description         TEXT        NOT NULL  -- original description from bank
├── clean_description   TEXT        -- cleaned/normalized description
├── notes               TEXT        -- user notes
├── amount              BIGINT      NOT NULL  -- in centavos (negative = expense, positive = income)
├── type                TEXT        NOT NULL  -- 'debit', 'credit', 'transfer', 'pix_sent', 'pix_received'
├── category_id         UUID        FK → categories (nullable)
├── is_recurring        BOOLEAN     DEFAULT false
├── is_ignored          BOOLEAN     DEFAULT false  -- excluded from reports
├── pix_recipient       TEXT        -- for Pix: name/key of recipient
├── pix_payer           TEXT        -- for Pix: name/key of payer
├── merchant_name       TEXT        -- normalized merchant name
├── installment_plan_id UUID        FK → installment_plans (nullable)
├── installment_number  INT         -- which installment this is (1 of 12, etc.)
├── tags                TEXT[]      -- array of user-defined tags
├── created_at          TIMESTAMP   NOT NULL
└── updated_at          TIMESTAMP   NOT NULL

INDEX: (user_id, date), (account_id, date), (external_id), (category_id)
INDEX: (user_id, date, type) -- for filtered queries
INDEX: (user_id, merchant_name) -- for categorization rules
```

### Category

Hierarchical categories (parent → child).

```sql
categories
├── id                  UUID        PK
├── user_id             UUID        FK → users (nullable — null = system default)
├── parent_id           UUID        FK → categories (nullable — null = top-level)
├── name                TEXT        NOT NULL
├── icon                TEXT        -- emoji or icon name
├── color               TEXT        -- hex color
├── is_income           BOOLEAN     DEFAULT false
├── sort_order          INT         DEFAULT 0
├── created_at          TIMESTAMP   NOT NULL
└── updated_at          TIMESTAMP   NOT NULL

INDEX: (user_id), (parent_id)
```

**Default Category Tree** (seeded for every user):

```
Alimentação
├── Mercado / Supermercado
├── Restaurante
├── Delivery (iFood, Rappi)
├── Padaria / Café
Transporte
├── Combustível
├── Uber / 99
├── Estacionamento
├── Pedágio
├── Transporte Público
Moradia
├── Aluguel
├── Condomínio
├── Energia (Luz)
├── Água
├── Gás
├── Internet / Telefone
├── Manutenção
Saúde
├── Farmácia
├── Plano de Saúde
├── Consultas / Exames
├── Academia
Educação
├── Cursos
├── Livros
├── Escola / Faculdade
Lazer
├── Streaming (Netflix, Spotify)
├── Viagens
├── Bares / Baladas
├── Jogos / Hobbies
Vestuário
├── Roupas
├── Calçados
├── Acessórios
Serviços e Assinaturas
├── Software / SaaS
├── Seguros
├── Serviços Profissionais
Transferências
├── Pix Enviado
├── TED / DOC
├── Transferência entre contas
Investimentos
├── Aportes
├── Resgate
Impostos e Taxas
├── IR
├── IPTU / IPVA
├── Taxas bancárias
├── IOF
Receitas (is_income = true)
├── Salário
├── Freelance
├── Rendimentos
├── Dividendos
├── Vendas
├── Outros
Outros
```

### InstallmentPlan

Tracks a purchase made in installments (parcelas).

```sql
installment_plans
├── id                  UUID        PK
├── user_id             UUID        FK → users
├── account_id          UUID        FK → accounts (credit card)
├── description         TEXT        NOT NULL  -- "MacBook Pro - Magazine Luiza"
├── total_amount        BIGINT      NOT NULL  -- total purchase value in centavos
├── installment_amount  BIGINT      NOT NULL  -- each installment in centavos
├── total_installments  INT         NOT NULL  -- e.g., 12
├── paid_installments   INT         DEFAULT 0
├── first_installment   DATE        NOT NULL  -- date of first installment
├── category_id         UUID        FK → categories
├── status              TEXT        DEFAULT 'active'  -- 'active', 'completed', 'cancelled'
├── created_at          TIMESTAMP   NOT NULL
└── updated_at          TIMESTAMP   NOT NULL

INDEX: (user_id, status), (account_id)
```

### Debt

```sql
debts
├── id                  UUID        PK
├── user_id             UUID        FK → users
├── name                TEXT        NOT NULL  -- "Financiamento carro", "Empréstimo João"
├── type                TEXT        NOT NULL  -- 'financing', 'personal_loan', 'overdraft', 'credit_card_revolving', 'informal', 'other'
├── original_amount     BIGINT      NOT NULL  -- in centavos
├── current_balance     BIGINT      NOT NULL  -- remaining balance in centavos
├── interest_rate       DECIMAL     -- monthly rate (e.g., 1.5 = 1.5% per month)
├── interest_type       TEXT        -- 'fixed', 'variable', 'none'
├── monthly_payment     BIGINT      -- expected monthly payment in centavos
├── start_date          DATE
├── expected_end_date   DATE
├── creditor            TEXT        -- who you owe (bank name, person name)
├── notes               TEXT
├── is_owed_to_me       BOOLEAN     DEFAULT false  -- true if someone owes YOU
├── linked_account_id   UUID        FK → accounts (nullable — auto-detect payments)
├── status              TEXT        DEFAULT 'active'  -- 'active', 'paid_off', 'defaulted'
├── created_at          TIMESTAMP   NOT NULL
└── updated_at          TIMESTAMP   NOT NULL

INDEX: (user_id, status)
```

### DebtPayment

```sql
debt_payments
├── id                  UUID        PK
├── debt_id             UUID        FK → debts
├── transaction_id      UUID        FK → transactions (nullable — for auto-linked)
├── amount              BIGINT      NOT NULL  -- in centavos
├── principal           BIGINT      -- how much went to principal
├── interest            BIGINT      -- how much was interest
├── date                DATE        NOT NULL
├── notes               TEXT
├── created_at          TIMESTAMP   NOT NULL
└── updated_at          TIMESTAMP   NOT NULL

INDEX: (debt_id, date)
```

### InvestmentHolding

```sql
investment_holdings
├── id                  UUID        PK
├── user_id             UUID        FK → users
├── account_id          UUID        FK → accounts (investment account)
├── asset_id            UUID        FK → assets
├── quantity            DECIMAL     NOT NULL
├── average_cost        BIGINT      -- average cost per unit in centavos
├── current_price       BIGINT      -- latest price per unit in centavos
├── current_value       BIGINT      -- quantity * current_price in centavos
├── profit_loss         BIGINT      -- current_value - (quantity * average_cost)
├── last_updated        TIMESTAMP
├── created_at          TIMESTAMP   NOT NULL
└── updated_at          TIMESTAMP   NOT NULL

INDEX: (user_id), (account_id), (asset_id)
```

### Asset

```sql
assets
├── id                  UUID        PK
├── ticker              TEXT        -- 'PETR4', 'ITUB3', 'BTC', 'TESOURO-SELIC-2029'
├── name                TEXT        NOT NULL
├── type                TEXT        NOT NULL  -- 'stock', 'fii', 'etf', 'fixed_income', 'crypto', 'treasury', 'other'
├── currency            TEXT        DEFAULT 'BRL'
├── current_price       BIGINT      -- in centavos
├── price_updated_at    TIMESTAMP
├── created_at          TIMESTAMP   NOT NULL
└── updated_at          TIMESTAMP   NOT NULL

INDEX: (ticker), (type)
```

### Budget

```sql
budgets
├── id                  UUID        PK
├── user_id             UUID        FK → users
├── category_id         UUID        FK → categories
├── amount              BIGINT      NOT NULL  -- monthly budget in centavos
├── period              TEXT        DEFAULT 'monthly'  -- 'weekly', 'monthly', 'yearly'
├── rollover            BOOLEAN     DEFAULT false  -- carry unused budget to next period
├── is_active           BOOLEAN     DEFAULT true
├── created_at          TIMESTAMP   NOT NULL
└── updated_at          TIMESTAMP   NOT NULL

INDEX: (user_id, is_active)
```

### Goal

```sql
goals
├── id                  UUID        PK
├── user_id             UUID        FK → users
├── name                TEXT        NOT NULL  -- "Viagem para Europa"
├── target_amount       BIGINT      NOT NULL  -- in centavos
├── current_amount      BIGINT      DEFAULT 0
├── target_date         DATE
├── linked_account_id   UUID        FK → accounts (nullable — savings account for this goal)
├── icon                TEXT
├── color               TEXT
├── status              TEXT        DEFAULT 'active'  -- 'active', 'completed', 'cancelled'
├── created_at          TIMESTAMP   NOT NULL
└── updated_at          TIMESTAMP   NOT NULL

INDEX: (user_id, status)
```

### CategorizationRule

User-defined and system-learned rules for auto-categorizing transactions.

```sql
categorization_rules
├── id                  UUID        PK
├── user_id             UUID        FK → users (nullable — null = global rule)
├── pattern             TEXT        NOT NULL  -- regex or keyword to match
├── match_field         TEXT        DEFAULT 'description'  -- 'description', 'merchant_name'
├── category_id         UUID        FK → categories
├── priority            INT         DEFAULT 0  -- higher = checked first
├── is_active           BOOLEAN     DEFAULT true
├── created_at          TIMESTAMP   NOT NULL
└── updated_at          TIMESTAMP   NOT NULL

INDEX: (user_id, is_active, priority DESC)
```

---

## Key Queries (Performance Considerations)

### Dashboard Load
```sql
-- Total balance across all accounts
SELECT SUM(current_balance) FROM accounts WHERE user_id = ? AND is_hidden = false;

-- This month's spending by category
SELECT c.name, SUM(ABS(t.amount))
FROM transactions t JOIN categories c ON t.category_id = c.id
WHERE t.user_id = ? AND t.date >= ? AND t.amount < 0
GROUP BY c.id;

-- Recent transactions
SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC LIMIT 20;
```

### Credit Card Future Projections
```sql
-- Future installment impact per month
SELECT
  DATE_TRUNC('month', first_installment + (generate_series(paid_installments, total_installments - 1) || ' months')::interval) as month,
  SUM(installment_amount) as projected_amount
FROM installment_plans
WHERE user_id = ? AND status = 'active'
GROUP BY month
ORDER BY month;
```

---

## Data Flow: Transaction Sync

```
1. Sync Worker triggers (webhook or schedule)
2. Fetch new transactions from aggregator API
3. For each transaction:
   a. Check if external_id already exists → skip if duplicate
   b. Clean/normalize description
   c. Run categorization rules (user rules first, then global)
   d. Detect if it's an installment (parse "PARCELA 3/12" from description)
   e. Detect if it's Pix (parse recipient info)
   f. Insert into transactions table
4. Update account balance
5. Recalculate budget usage for affected categories
6. Send notifications if thresholds are crossed
```
