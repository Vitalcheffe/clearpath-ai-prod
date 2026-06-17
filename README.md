# ClearPath AI — Community Resource Navigator

> **"When it matters most, honesty is the safest answer."**

**USAII Global AI Hackathon 2026 — Community Track**

A multi-city community resource navigator that shows calibrated confidence instead of hiding uncertainty. Because a confident wrong answer is more dangerous than no answer at all.

---

## The Problem

Keyword search doesn't work for people in crisis. "My husband hurts me" and "I want to end it all" both contain the word "help" but need totally different resources. When someone finally reaches out for help and gets sent to the wrong place, they don't try again. That gap between the right resource and the wrong one can be fatal. Search engines give confident answers; directories give long lists; neither asks what you actually need, and neither tells you when it isn't sure.

## The Solution

ClearPath AI is a 6-layer community resource navigator:

1. **Free-text input** → User describes their situation in their own words
2. **Crisis detection** → Hardcoded regex layer (175 patterns, 9 crisis sub-types), AI-proof, runs first
3. **Vague input interception** → Refuses to call BART on "hi", "help", "test" — zero-shot models produce false confidence on meaningless input
4. **Multi-label classification** → Zero-shot NLP (BART-large-MNLI) with **raw** (not calibrated) confidence scores
5. **Confidence-gated clarification** → When confidence < 70%, ask don't guess; multi-label threshold ≥10% surfaces up to 5 categories
6. **Human escalation** → 211 navigator connection when AI can't help. We never auto-dial.

## Why these 8 categories?

The 8 BART classification labels were derived from the 211.org directory's top-level taxonomy, cross-referenced with the most frequent request types reported in publicly available 211 impact reports. The labels are descriptive strings, not single words — for example, the housing label is `"rent help, emergency shelter, facing eviction, homeless, housing assistance, can't afford rent, mortgage help"`. BART scores the input against the full semantic of each label, then the label is mapped back to a short display name like `"Housing Assistance"`.

**Edge cases where a user's situation spans multiple categories** are handled via multi-label classification: any category scoring ≥10% is surfaced alongside the top match, up to 5 categories. "I lost my job and can't pay rent. My kids need food." is not one problem — it shows Employment + Housing + Food simultaneously, so no need is silently dropped.

Crisis Support is **NOT** a BART category — it is handled by the separate hardcoded regex layer that runs before BART is invoked, because crisis routing cannot depend on a probabilistic model.

## Why BART-large-MNLI (and not RoBERTa-MNLI or DeBERTa-v3-MNLI)?

BART-large-MNLI handles longer premise-hypothesis pairs (1k tokens vs 512 for RoBERTa), which matters when labels are descriptive phrases rather than single words. DeBERTa-v3-MNLI has higher accuracy on the GLUE benchmark but slower inference on HuggingFace free tier. We chose BART for the balance of context length, inference speed, and reliability under load. The 3-tier fallback (raw fetch → HuggingFace SDK → keyword match) ensures the tool still works when the model is unavailable.

## Multi-City Support

ClearPath AI serves **6 major U.S. cities** with auto-detection via geolocation:

| City | ID | Metro Radius |
|------|----|-------------|
| Houston, TX | `houston` | 25 mi |
| New York, NY | `newyork` | 20 mi |
| Los Angeles, CA | `losangeles` | 25 mi |
| Chicago, IL | `chicago` | 20 mi |
| Dallas, TX | `dallas` | 20 mi |
| Miami, FL | `miami` | 20 mi |

**How it works:**
- User's browser geolocation → nearest supported city (auto-detected)
- User can manually select any city via the "Change city" dropdown
- National resources (988, Crisis Text Line, VA Benefits, etc.) are shown regardless of location
- Users outside all service areas still get national resources + nearest city resources

## Core Differentiator

**Calibrated Transparency** — We show not just what the AI recommends, but how confident it is, why it recommends this, what else it considered, and when it's uncertain enough to ask for human help.

## Tech Stack

- **Frontend**: React + TypeScript (Next.js 16)
- **Backend**: Next.js API Routes (App Router)
- **AI Pipeline**: HuggingFace Inference API (BART-large-MNLI) with dual fallback (raw fetch → SDK → keyword)
- **Database**: SQLite via Prisma ORM
- **Deployment**: Vercel

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Demo Scenarios

| Scenario | What It Shows |
|----------|--------------|
| Multi-Need | "I lost my job and can't pay rent. My kids need food." → 3 classified resources |
| Crisis | "I can't take this anymore. I want it all to end." → Immediate 988/211 response, AI bypassed |
| Low Confidence | "I need help with my situation" → Clarification flow, 43% → 83% |
| Senior | "I'm 78 and need groceries delivered" → 94% confidence, Meals on Wheels |
| Veteran | "I'm a veteran with PTSD and housing issues" → VA-specific programs prioritized |
| Multi-City | Select "New York" → NYC-specific resources (NYCHA, Coalition for the Homeless, NYC Well) |

## Team

- **Amine Harch El Korane** (Morocco, high school) — Co-Founder, AI Pipeline Lead, Pitch (qualifier score: 100/100, rank #1 of 320)
- **Ghali El Alj** (Morocco, high school) — Co-Founder, Full-Stack Engineer, DevOps

No advisory board. No external partners. No formal data-sharing agreements. No publications submitted. The two of us built everything you see here in June 2026.

## Documentation

| Document | Purpose |
|----------|---------|
| [CHARTER.md](./CHARTER.md) | Team rules and disqualification risks |
| [OBJECTIVES.md](./OBJECTIVES.md) | Quality standards (Level 0-3) |
| [RESPONSIBLE_AI.md](./RESPONSIBLE_AI.md) | Ethical framework (hackathon deliverable) |
| [API_CONTRACT.md](./docs/API_CONTRACT.md) | Backend ↔ AI pipeline interface |
| [BRAND.md](./docs/BRAND.md) | Visual identity and voice |
| [CRISIS_KEYWORDS.md](./docs/CRISIS_KEYWORDS.md) | Crisis keyword database |
| [SCENARIOS.md](./docs/SCENARIOS.md) | 7 user scenarios |
| [DECISIONS.md](./docs/DECISIONS.md) | Architecture Decision Records |
| [JUDGE_MAP.md](./docs/JUDGE_MAP.md) | INFORMS scoring alignment |
| [DEMO_SCRIPT.md](./docs/DEMO_SCRIPT.md) | Demo scenarios script |
| [PITCH_SCRIPT.md](./docs/PITCH_SCRIPT.md) | Pitch video script |
| [ONBOARDING.md](./docs/ONBOARDING.md) | Team onboarding guide |

## License

MIT
