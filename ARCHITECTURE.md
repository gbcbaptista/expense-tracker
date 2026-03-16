# Financial Tracker - Architecture

> **Status**: Draft — Some decisions are final (see "Decided" section at bottom). Tech stack choices are still proposals to evaluate during implementation.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (PWA)                            │
│              Next.js — mobile + desktop                       │
│                                                              │
│   Plan Status │ Transactions │ Cards │ Debts │ Investments   │
└──────────────────────┬───────────────────────────────────────┘
                       │ HTTPS / REST
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Layer                               │
│                (Auth, Rate Limiting, CORS)                    │
└──────────────────────┬───────────────────────────────────────┘
                       │
          ┌────────────┼─────────────┐
          ▼            ▼             ▼
   ┌────────────┐ ┌──────────┐ ┌──────────────┐
   │  Core API  │ │  Sync    │ │ AI Service   │
   │            │ │  Worker  │ │              │
   │ Plans      │ │          │ │ AIProvider   │
   │ Accounts   │ │ Pluggy   │ │ abstraction  │
   │ Txns       │ │ webhooks │ │              │
   │ Budgets    │ │ + poll   │ │ Categorize   │
   │ Debts      │ │ fallback │ │ Advise       │
   │ Goals      │ │          │ │ Suggest      │
   └─────┬──────┘ └────┬─────┘ └──────┬───────┘
         │              │              │
         └──────────────┼──────────────┘
                        ▼
              ┌──────────────────┐      ┌──────────────────┐
              │    PostgreSQL    │      │   Claude API     │
              │                  │      │   (via AIProvider │
              │ + pgboss         │      │    abstraction)   │
              │   (job queue)    │      └──────────────────┘
              └──────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │      Pluggy      │
              │   (Bank Data)    │
              └──────────────────┘
```

---

## Tech Stack Proposals

### Frontend

| Option | Pros | Cons |
|--------|------|------|
| **Next.js (App Router)** | SSR, great DX, huge ecosystem, easy deployment (Vercel) | Tied to React, can be heavy |
| **Nuxt.js (Vue)** | Similar benefits, lighter feel | Smaller ecosystem than React |
| **SvelteKit** | Fastest runtime, small bundles, great DX | Smaller community, fewer UI libraries |

**Recommendation**: Next.js — largest ecosystem, most hiring potential for SaaS phase, excellent charting libraries (Recharts, Tremor, shadcn/ui for components).

### UI Component Library

| Option | Pros | Cons |
|--------|------|------|
| **shadcn/ui + Tailwind** | Modern, customizable, great DX | Requires Tailwind knowledge |
| **Chakra UI** | Good defaults, accessible | Heavier bundle |
| **Ant Design** | Enterprise-ready, lots of components | Opinionated style, large |

**Recommendation**: shadcn/ui + Tailwind CSS — flexible, modern, great for dashboards.

### Backend

| Option | Pros | Cons |
|--------|------|------|
| **Next.js API Routes + Server Actions** | Single codebase, simpler deployment | Less separation of concerns, harder to scale independently |
| **NestJS (Node.js)** | Enterprise patterns, great TypeScript, modular | More boilerplate, separate deployment |
| **FastAPI (Python)** | Great for ML/data, fast, good DX | Two languages in the stack |
| **Hono / ElysiaJS** | Ultra-fast, modern, lightweight | Newer, smaller ecosystem |

**Recommendation**: Start with **Next.js API Routes** for speed of development. Extract to a separate backend (NestJS or Hono) only if/when scaling demands it. Background jobs (bank sync) will need a separate worker process regardless.

### Database

| Option | Pros | Cons |
|--------|------|------|
| **PostgreSQL** | Rock solid, great for financial data, JSONB, full-text search | Needs hosting |
| **SQLite (Turso)** | Simple, edge-friendly | Less suitable for concurrent writes, limited ecosystem |

**Recommendation**: **PostgreSQL** — financial data needs ACID guarantees, complex queries, and proven reliability.

**ORM**: Drizzle ORM (type-safe, lightweight, good migration story) or Prisma (more mature, bigger community).

### Cache & Job Queue

| Option | Pros | Cons |
|--------|------|------|
| **Redis + BullMQ** | Battle-tested, great for job queues | Another service to manage |
| **PostgreSQL-based queues (pgboss)** | No extra infra | Less performant for high throughput |

**Recommendation**: Start with **pgboss** (PostgreSQL-based) to avoid extra infra. Move to Redis + BullMQ if queue performance becomes an issue.

### Authentication

| Option | Pros | Cons |
|--------|------|------|
| **NextAuth.js (Auth.js)** | Built for Next.js, many providers | Can be complex for custom flows |
| **Clerk** | Great DX, managed, multi-tenant ready | Paid at scale |
| **Supabase Auth** | Free tier, good integration | Tied to Supabase ecosystem |
| **Custom (JWT)** | Full control | More work, security risks |

**Recommendation**: **Auth.js (NextAuth v5)** for the personal phase (free, flexible). Evaluate Clerk for SaaS phase if multi-tenancy becomes complex.

### Hosting / Infrastructure

| Option | Pros | Cons |
|--------|------|------|
| **Vercel + Supabase (Postgres)** | Easiest deployment, generous free tier | Vendor lock-in, costs at scale |
| **Railway** | Simple, good Postgres hosting, predictable pricing | Smaller ecosystem |
| **AWS (ECS/Lambda + RDS)** | Full control, scalable | Complex, more ops work |
| **VPS (Hetzner/DigitalOcean)** | Cheapest, full control | Manual ops |

**Recommendation**: **Vercel** (frontend + API) + **Supabase** or **Neon** (managed Postgres) for phase 1. Migrate to AWS or Railway for SaaS phase if needed.

---

## Bank Aggregator Integration

### Aggregator Comparison

| Feature | **Pluggy** | **Belvo** | **Open Finance (Direct)** |
|---------|-----------|-----------|--------------------------|
| **How it works** | REST API + embeddable widget. Screen-scraping + Open Finance consent flows | REST API via Open Finance network only (regulated, consent-based) | Direct per-bank FAPI/OAuth2 integration |
| **Bank coverage** | ~90% of BR bank accounts (Nubank, Itaú, Bradesco, Santander, BB, Inter, etc.) | 60+ institutions via Open Finance participants | All BCB-mandated participants (150M+ accounts) |
| **Installments** | Yes — `creditCardMetadata` with installment number, total, amount, card limits, due dates | Yes — credit card bill data with balance breakdowns | In scope, but you build everything |
| **Pix** | Yes — transaction metadata with sender/recipient info. Supports Pix payment initiation | Yes — regulated ITP, single/scheduled/recurring Pix | In scope, but you build everything |
| **Investments** | Yes — direct broker connectors (XP, BTG, Clear, Rico, Genial, B3/CEI) | Only what Open Finance exposes (no direct broker connectors) | In scope, but you build everything |
| **Pricing** | 14-day free trial, then paid (contact sales). Sandbox on all plans | Free sandbox + 25 real links trial. Paid plans require sales meeting | APIs free, but **R$1M minimum capital** + security audits + certifications |
| **SDKs** | Python + Node.js | Node.js + Ruby (Python SDK deprecated) | None |
| **DX** | Self-serve, good docs, Postman collection, YC-backed | Sales-gated production access, good docs | Regulatory specs, 33 GitHub repos, no tutorial-grade docs |
| **Best for** | Startups, personal projects, best overall | Multi-country LatAm, advanced Pix initiation | Regulated financial institutions only |

### Recommendation: **Pluggy**

- **Best coverage**: ~90% of Brazilian banks + direct broker connectors for investments
- **Best installment data**: Detailed credit card metadata out of the box
- **Self-serve**: No sales meetings to start building
- **Risk**: No permanent free tier (must pay after 14-day trial)
- **Mitigation**: Build with a clean abstraction layer so we can swap aggregators later if needed

### Integration Architecture

```
┌─────────────┐     Webhook/Poll     ┌──────────────────┐
│  Aggregator │ ──────────────────▶  │   Sync Worker    │
│  (Pluggy/   │                      │                  │
│   Belvo)    │ ◀──────────────────  │  - Fetch new txns│
│             │    API calls          │  - Deduplicate   │
└─────────────┘                      │  - Categorize    │
       ▲                             │  - Store         │
       │                             └────────┬─────────┘
       │ OAuth consent                        │
       │                                      ▼
┌──────┴──────┐                      ┌──────────────────┐
│    User     │                      │   PostgreSQL     │
│   Browser   │                      └──────────────────┘
└─────────────┘
```

### Key Design Decisions

1. **Never store bank credentials** — Use OAuth/token-based connections via the aggregator.
2. **Idempotent sync** — Each transaction has a unique external ID; re-syncing the same data is safe.
3. **Webhook-first, poll as fallback** — Prefer push notifications from the aggregator; poll on a schedule as backup.
4. **Connection recovery** — Auto-detect broken connections and prompt user to re-authenticate.

---

## Categorization Engine

### Phase 1: Rule-Based
```
Rules (ordered by priority):
1. User-defined rules: "UBER" → Transporte > Uber/99
2. Merchant mapping: known merchant names → categories
3. Keyword matching: description contains "SUPERMERCADO" → Alimentação > Mercado
4. Default: "Outros"
```

### Phase 2: AI-Assisted (P0 — core feature)
- **Provider-agnostic abstraction layer**: All AI calls go through an `AIProvider` interface
- Start with **Claude API** as the first implementation
- Can swap to OpenAI, Gemini, local models, or any other provider without changing business logic
- Use for: transaction categorization, financial advice, plan suggestions, anomaly detection
- Train on user corrections to improve accuracy over time

```typescript
// Conceptual abstraction — details during implementation
interface AIProvider {
  categorizeTransaction(description: string, amount: number, context: TransactionContext): Promise<Category>
  generateFinancialAdvice(userData: UserFinancialSnapshot): Promise<Advice[]>
  suggestPlanAdjustments(plan: FinancialPlan, recentData: SpendingData): Promise<Suggestion[]>
}
```

---

## Security Architecture

### Data at Rest
- PostgreSQL column-level encryption for sensitive fields (account numbers, balances)
- Application-level encryption key management (not database-level)
- Encrypted backups

### Data in Transit
- TLS 1.3 everywhere
- Certificate pinning for aggregator API calls (P2)

### Authentication & Authorization
- JWT access tokens (short-lived, 15 min)
- Refresh tokens (HTTP-only cookie, 30 days)
- RBAC for future multi-user support

### LGPD Compliance
- Explicit consent for data collection
- Data export (user can download all their data)
- Data deletion (user can request full account deletion)
- Privacy policy and terms of service
- Data processing records

---

## Monitoring and Observability

### Logging
- Structured JSON logs
- Log levels: ERROR, WARN, INFO, DEBUG
- No PII in logs (mask account numbers, amounts in non-debug)

### Error Tracking
- Sentry for error capture and alerting
- Source maps for frontend errors

### Metrics (P2)
- Request latency, error rates
- Sync success/failure rates
- Active connections per bank

---

## Decided

- [x] **AI Provider** → Claude API behind a provider-agnostic abstraction layer. Swap providers without touching business logic.
- [x] **Bank aggregator** → Pluggy (best coverage, self-serve, installment data).
- [x] **Mobile strategy** → PWA. 50/50 mobile/desktop. No native app.
- [x] **Notifications** → Push notifications (PWA) only.
- [x] **Crypto** → Out of scope.

## Open Decisions (evaluate during implementation)

- [ ] **Monorepo vs. separate repos?** — Turborepo monorepo recommended for shared types and faster dev.
- [ ] **Drizzle vs. Prisma?** — Both are solid. Drizzle is lighter and closer to SQL; Prisma has better tooling.
- [ ] **Real-time updates?** — WebSocket for live balance updates, or just poll on page load?
- [ ] **Hosting** — Vercel + Supabase vs. Railway vs. VPS. Evaluate when deploying.
