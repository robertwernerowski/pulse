# Pulse — Customer Health &amp; Churn-Risk Console

A lightweight Customer Success console that helps a CSM work a portfolio of B2B accounts the way the job actually demands: **spot the accounts at risk, understand *why*, and act before the renewal date.** Each account gets a transparent health score, a breakdown of its health signals, and an **AI-generated next action** with a drafted outreach email.

**Live demo:** _add your GitHub Pages link here_
**Built by:** Robert Wernerowski

---

## Why I built it

Customer Success lives and dies by **Net Revenue Retention** — keeping the accounts you have and growing the healthy ones. But "health" is usually buried across a CRM, a usage tool, and a support inbox. A CSM managing 50+ accounts needs one view that answers three questions fast:

1. **Which accounts are at risk right now?**
2. **Why — what's actually driving the risk?**
3. **What should I do about it, today?**

Pulse is my take on that workflow. It reflects how I managed enterprise accounts for years (onboarding, retention, expansion) — now expressed as a tool, with AI doing the part it's genuinely good at: turning a pile of signals into a clear, specific recommendation.

---

## What it does

- **Portfolio triage.** Accounts are scored 0–100 and sorted worst-first, so the riskiest accounts surface immediately. Filter by health tier (At risk / Watch / Healthy).
- **Portfolio KPIs.** Headline metrics a CS leader cares about: NRR, at-risk ARR, and renewals due in the next 90 days.
- **Signal breakdown.** For each account: product usage and trend, seat utilisation, NPS, support load, sponsor status, and days to renewal — each flagged green / amber / red.
- **AI next action.** One click sends the account's live signals to Claude and returns a structured recommendation: the single biggest risk, a priority, a 2–3 step play, and a ready-to-send draft check-in email.

---

## How the health score works

The score is **not a black box** — it's computed from weighted signals in plain code (`scoreOf()` in `index.html`), so it can be explained and defended:

| Signal | Why it matters |
|---|---|
| Product usage &amp; 8-week trend | The clearest leading indicator of churn |
| Seat utilisation | Paid-for value that isn't being realised |
| Last meaningful contact | A stale relationship is a vulnerable one |
| Support load &amp; trend | Rising friction predicts dissatisfaction |
| Executive sponsor active | Losing a champion is a top churn cause |
| Latest NPS | Direct sentiment signal |
| Days to renewal | Urgency multiplier |

Tiers: **70–100 Healthy · 45–69 Watch · &lt;45 At risk.**

---

## The AI workflow

The interesting part isn't calling an LLM — it's **giving it the right context and constraining the output** so it's useful in a real workflow:

- The prompt passes only the structured account signals, and asks for a fixed format (`RISK / PRIORITY / PLAY / EMAIL`).
- The response is parsed back into UI sections, so the output is consistent and scannable rather than a wall of text.
- The drafted email is specific to the account's situation (renewal urgency, low adoption, expansion opportunity) — not a generic template.

This mirrors how I use AI day to day: not as a novelty, but to compress repetitive analysis-and-drafting work so the human spends time on the relationship.

---

## Running it

**Static demo (zero setup).** Open `index.html`, or host the repo on GitHub Pages. With no backend configured, the AI button returns a realistic, signal-driven **sample** suggestion so the demo is always alive.

**Enabling live AI.** Client-side code can't safely hold an API key, so live calls route through a tiny serverless proxy:

1. Deploy this repo to [Vercel](https://vercel.com) (free) — it auto-detects the function in `/api`.
2. Add an environment variable in Vercel: `ANTHROPIC_API_KEY = sk-ant-...`
3. Put the deployed URL in `config.js`:
   ```js
   window.PULSE_PROXY_URL = "https://your-project.vercel.app/api/suggest";
   ```

The browser then sends only the prompt; the key never leaves the server.

---

## Tech

Plain HTML / CSS / JavaScript — one file, no build step, no framework. AI via the Anthropic Messages API (`claude-sonnet-4-6`) through an optional Vercel serverless proxy. Deliberately dependency-free so it's easy to read, host anywhere, and reason about.

---

## Notes

All account data is **fictional sample data** created for this demo. The scoring logic and AI workflow are the point; the numbers are illustrative.

_Part of a small portfolio of CS / account-management tools. Feedback welcome._
