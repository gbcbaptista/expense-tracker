# Financial Tracker - Vision

## The Problem

Managing personal finances in Brazil is fragmented and painful:

- **Money is scattered everywhere**: Nubank, Itaú, Inter, corretoras, exchanges — each with its own app, its own statements, its own format. You have no single place to see the full picture.
- **Credit cards are a black box**: Installment purchases (parcelas) make it nearly impossible to know the real impact of spending across future months.
- **Pix makes money vanish**: Instant transfers happen so fast that tracking where money went becomes a full-time job.
- **Debt management is flying blind**: Multiple debts with different interest rates, and no tool helps you figure out which to pay first or how to get out faster.
- **No one helps you build a PLAN**: Existing apps show you data, but they don't help you decide "I should spend X on food, Y on transport" or tell you when you're off track.

### Why Existing Solutions Fail

Apps like Guiabolso, Mobills, and Organizze all share the same fundamental problems:

1. **Weak integrations** — They either don't connect to your bank, or the connection breaks constantly, forcing you back to manual entry.
2. **Too much manual work** — If you have to register everything by hand, it's no better than a spreadsheet. And people give up after a week.
3. **No plan, no guidance** — They show you where money went (past tense) but never help you build a plan or tell you if you're following it.
4. **No intelligence** — They don't learn your patterns, don't give advice, don't suggest improvements. They're just glorified spreadsheets with a nicer UI.

**The gap**: There is no app that truly connects everything, requires near-zero manual effort, helps you build a financial plan, and actively monitors whether you're on track — adapting its advice as your situation changes.

## The Vision

**A financial health companion that connects all your accounts, builds a personalized plan with you, and actively keeps you on track — with near-zero manual effort.**

This is NOT just a tracker. It's three things in one:

### 1. Complete Financial Visibility (Foundation)
Connect all accounts → see everything in one place → understand where every centavo goes, automatically.

### 2. Personalized Financial Plan (Core Value)
Based on your real data, build a plan: budgets by category, debt payoff strategy, savings goals. The plan is realistic because it's based on what you actually spend, not what you wish you spent.

### 3. Active Financial Copilot (Differentiator)
The app doesn't just record — it watches, learns, and advises:
- **Daily**: "You've spent 60% of your food budget and it's only the 15th. Slow down."
- **When something is off**: "You have a bill due in 3 days and your checking account is low."
- **Strategically**: "If you put R$200 extra on Debt X instead of Debt Y, you'll save R$1,400 in interest and be debt-free 4 months sooner."
- **When things improve**: "You've had R$800 left over each of the last 3 months. Want to allocate that to your emergency fund goal?"

## The User Journey

```
1. CONNECT     → Link all bank accounts, cards, investments (Pluggy)
                  Near-instant: see all balances, all transactions, all debts

2. UNDERSTAND  → AI categorizes everything automatically
                  Dashboard shows: where money is, where it's going, what's owed
                  First "aha moment": seeing the full picture for the first time

3. PLAN        → Based on real data, the app suggests a plan:
                  - Budget per category (based on your actual spending patterns)
                  - Debt payoff order (highest interest first, or smallest balance)
                  - Savings target (what's realistic given your income and expenses)
                  User adjusts the plan to their comfort level

4. FOLLOW      → Daily: open app → see plan status + alerts
                  The app tells you: on track ✓, overspending on X ⚠, bill due ⚠
                  Weekly/monthly: deeper review of trends and progress

5. ADAPT       → Periodically, AI suggests plan adjustments:
                  "You're consistently under budget on transport — reallocate?"
                  "Your income increased — update savings target?"
                  "Debt X is paid off! 🎉 Redirect that payment to Debt Y?"
```

## Target User

### Phase 1: Personal Use
- The founder. Build exactly what you need. Dogfood everything.
- **Active daily accounts**:
  - Itaú: Conta corrente (dia-a-dia)
  - Nubank: Conta corrente + Cartão de crédito + Porquinhos (short-term savings for bills)
  - Inter: Conta corrente + Cartão de débito
- **Debt-only accounts** (don't use actively, exist because of debts):
  - XP, Banco do Brasil, Bradesco, and possibly others
  - Some debts are being paid, some are overdue/paused waiting for reorganization
- **Key financial situation**:
  - Multiple debts across different institutions, some overdue
  - Uses Nubank porquinhos as a short-term buffer (save until bill is due)
  - Needs a clear strategy to organize and pay off debts
  - Wants to go from "scattered debts and no visibility" to "I have a plan, I know my priorities, and I'm making progress"

### Phase 2: SaaS Product
- Young Brazilian professionals (25-40) who:
  - Have accounts across multiple banks/fintechs
  - Have tried other financial apps and given up
  - Want financial control but refuse to do manual data entry
  - May have debts they want to manage strategically
- Subscription-based model (freemium or tiered)

## Core Principles

1. **Near-zero manual effort** — If it can be automated, it must be. The moment you ask users to do manual work, you've lost. Manual entry exists only as a last resort for things that can't be connected.
2. **Plan-first, not tracker-first** — Tracking is the foundation, but the value is in the plan and the guidance. A tracker without a plan is just a fancier bank statement.
3. **AI as copilot, not decoration** — AI categorizes transactions, suggests plans, detects anomalies, and gives actionable advice based on YOUR data. Not generic tips — personalized guidance.
4. **Proactive, not passive** — The app reaches out to you when something needs attention. You shouldn't have to remember to check it.
5. **Privacy and security as product features** — Financial data is the most sensitive data. Encryption everywhere. LGPD compliant. SaaS-grade security from day one, not bolted on later.
6. **Brazilian-first** — Built for BRL, CPF, Pix, boletos, parcelas, IOF, CDI. Not a US app translated to Portuguese.
7. **Mobile and desktop equally** — 50/50 usage pattern. PWA that works perfectly on both. Quick daily checks on mobile, deeper analysis on desktop.

## Success Metrics (Personal Phase)

- All bank accounts connected and syncing automatically
- < 5% of transactions need manual recategorization after 1 month of training
- Financial plan created based on real spending data
- Daily dashboard shows plan status in < 2 seconds
- Debt payoff timeline accurate and actively monitored
- AI proactively alerts on overspending, upcoming bills, and opportunities
- Full visibility into credit card installment impact on future months
- Consolidated investment view (saldo + alocação por tipo)

## Open Questions

- [x] Which bank aggregator API to use? → **Pluggy** (best coverage, self-serve, direct broker connectors). See ARCHITECTURE.md for full comparison.
- [x] Mobile app, web app, or both? → **PWA** (Progressive Web App). 50/50 mobile/desktop usage. Responsive design, works on both.
- [x] How to handle banks that aren't available via Open Finance yet? → CSV/OFX import as fallback.
- [x] Investment data: direct API integration with brokerages or via B3/CEI? → Pluggy has direct connectors for XP, BTG, Clear, Rico, Genial, and B3/CEI.
- [x] What level of AI/ML for categorization vs. simple rule-based matching? → **AI is core**: auto-categorization + financial advice + plan suggestions. Start with rules + Claude API, evolve to fine-tuned models.
- [x] Crypto tracking → **Out of scope**. Not needed.
- [x] AI model choice → **Claude API** to start, but behind a **provider-agnostic abstraction layer**. Can swap to other providers later without changing business logic.
- [x] Notification delivery → **Push notifications (PWA)** only. No email, no WhatsApp.
- [x] User's bank/institution list → See Target User section. Daily: Itaú + Nubank + Inter. Debt-only: XP, BB, Bradesco, others.
- [ ] Tech stack final decisions → Evaluate during implementation. ARCHITECTURE.md has proposals, not commitments.
