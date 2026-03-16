# Financial Tracker - Vision

## The Problem

Managing personal finances in Brazil is fragmented and painful:

- **Money is scattered everywhere**: Nubank, Itaú, Bradesco, XP, Rico, Binance — each with its own app, its own statements, its own format.
- **Credit cards are a black box**: Installment purchases (parcelas) make it nearly impossible to know the real impact of spending across months.
- **Pix makes money vanish**: Instant transfers happen so fast that tracking where money went becomes a full-time job.
- **No one knows where every centavo goes**: Without automatic categorization, most people give up on tracking after a week of manual entry.
- **Debt tracking is an afterthought**: Loans, financing, and informal debts live in spreadsheets (at best) or nowhere at all.

Existing solutions either require too much manual work (spreadsheets, Mobills, Organizze) or don't integrate deeply enough with Brazilian financial institutions.

## The Vision

**A single dashboard where you connect all your financial accounts — bank accounts, credit cards, investments, and more — and instantly see where every centavo is going, without registering anything manually.**

The system should:

1. **Connect automatically** to Brazilian banks and financial institutions via Open Finance Brasil / aggregator APIs.
2. **Categorize transactions automatically** using smart rules and ML, with the ability to correct and teach the system.
3. **Track credit card installments** properly — showing the full cost of a purchase, remaining installments, and future impact on cash flow.
4. **Consolidate investments** across brokerages, showing a unified portfolio view.
5. **Track Pix flows** with detailed categorization of who you're sending to and why.
6. **Manage debts** with a mix of automatic detection and manual entry for informal debts.
7. **Provide actionable insights** — not just data, but answers: "You spent 40% more on food this month" or "At this rate, you'll exceed your credit card limit in 2 weeks."

## Target User

### Phase 1: Personal Use
- The founder (you). Build exactly what you need. Dogfood everything.

### Phase 2: SaaS Product
- Young Brazilian professionals (25-40) who have accounts across multiple banks/fintechs.
- People who want financial control but hate manual entry.
- Subscription-based model (freemium or tiered).

## Core Principles

1. **Zero manual entry for connected accounts** — If it's connected, it should just work.
2. **Privacy first** — Financial data is the most sensitive data. Encryption at rest and in transit. No selling user data. Ever.
3. **Brazilian-first** — Built for the Brazilian financial system: BRL, CPF, Pix, boletos, parcelas, IOF, CDI benchmarks.
4. **Useful on day one** — Even before connecting bank accounts, the debt tracker and manual entry should provide value.
5. **Progressive complexity** — Simple by default, powerful when needed. Don't overwhelm new users.

## Success Metrics (Personal Phase)

- All bank accounts connected and syncing automatically
- < 5% of transactions need manual recategorization after 1 month of training
- Full visibility into credit card installment impact on future months
- Consolidated investment view updated daily
- Debt payoff timeline accurate and actionable

## Open Questions

- [x] Which bank aggregator API to use? → **Pluggy** (best coverage, self-serve, direct broker connectors). See ARCHITECTURE.md for full comparison.
- [ ] Mobile app, web app, or both? (Progressive Web App could be a good middle ground)
- [x] How to handle banks that aren't available via Open Finance yet? → CSV/OFX import as fallback (Phase 1).
- [x] Investment data: direct API integration with brokerages or via B3/CEI? → Pluggy has direct connectors for XP, BTG, Clear, Rico, Genial, and B3/CEI.
- [ ] What level of AI/ML for categorization vs. simple rule-based matching?
- [ ] Crypto tracking: separate exchange APIs (Binance, Mercado Bitcoin) or manual only?
