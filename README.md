<div align="center">

# ClearPath AI

### Community resource navigator with calibrated confidence — because a confident wrong answer is more dangerous than no answer at all.

[![USAII Hackathon Winner](https://img.shields.io/badge/USAII%20Hackathon%202026-Winner%20Community%20Track-gold?style=flat-square)](#team)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![BART-large-MNLI](https://img.shields.io/badge/NLP-BART--large--MNLI-orange?style=flat-square)](https://huggingface.co/facebook/bart-large-mnli)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

6-layer pipeline · 175 crisis regex patterns · 8 BART classification labels · 6 US cities · Confidence-gated clarification · Human escalation · Built in June 2026 by 2 high school students

</div>

---

## Overview

ClearPath AI is a multi-city community resource navigator that shows calibrated confidence instead of hiding uncertainty. When someone in crisis searches for help, a confident wrong answer can be fatal — sending someone facing eviction to a food bank instead of housing assistance means they don't try again.

The system uses a 6-layer pipeline: free-text input, hardcoded crisis detection (regex, AI-proof), vague input interception, zero-shot NLP classification (BART-large-MNLI), confidence-gated clarification, and human escalation. Every response shows what the AI recommends, how confident it is, what else it considered, and when it is uncertain enough to ask for human help.

This project won the **USAII Global AI Hackathon 2026 Community Track** with a qualifier score of 100/100, rank #1 of 320 teams.

---

## Why I built this

I built ClearPath AI at 15, in Casablanca, for the USAII Global AI Hackathon 2026. The prompt was to build an AI tool that helps people in crisis find community resources. The problem statement was simple; the failure modes of existing solutions were not.

Keyword search does not work for people in crisis. "My husband hurts me" and "I want to end it all" both contain the word "help" but need completely different resources. Search engines give confident answers. Directories give long lists. Neither asks what you actually need, and neither tells you when it is not sure. When someone finally reaches out for help and gets sent to the wrong place, they do not try again. That gap between the right resource and the wrong one can be fatal.

ClearPath AI is my attempt at a different operating point: show calibrated confidence instead of hiding uncertainty. When the AI is not sure, it asks instead of guessing. When it is sure, it shows why. When the input is a crisis keyword, it bypasses the AI entirely — crisis routing cannot depend on a probabilistic model. The trade-off — 6 US cities only, English-only, no real-time resource availability, BART-large-MNLI not fine-tuned on crisis text — is stated explicitly in [Limitations](#limitations).

---

## Table of contents

- [Overview](#overview)
- [Why I built this](#why-i-built-this)
- [The 6-layer pipeline](#the-6-layer-pipeline)
- [Why BART-large-MNLI](#why-bart-large-mnli)
- [Multi-city support](#multi-city-support)
- [How it works](#how-it-works)
- [Demo scenarios](#demo-scenarios)
- [Run it](#run-it)
- [Stack](#stack)
- [Team](#team)
- [Documentation](#documentation)
- [Limitations](#limitations)
- [License](#license)

---

## The 6-layer pipeline

1. **Free-text input** — user describes their situation in their own words
2. **Crisis detection** — hardcoded regex layer (175 patterns, 9 crisis sub-types), AI-proof, runs first
3. **Vague input interception** — refuses to call BART on "hi", "help", "test" — zero-shot models produce false confidence on meaningless input
4. **Multi-label classification** — zero-shot NLP (BART-large-MNLI) with raw (not calibrated) confidence scores
5. **Confidence-gated clarification** — when confidence < 70%, ask don't guess; multi-label threshold >= 10% surfaces up to 5 categories
6. **Human escalation** — 211 navigator connection when AI can't help. We never auto-dial.

---

## Why BART-large-MNLI

BART-large-MNLI handles longer premise-hypothesis pairs (1k tokens vs 512 for RoBERTa), which matters when labels are descriptive phrases rather than single words. DeBERTa-v3-MNLI has higher accuracy on the GLUE benchmark but slower inference on HuggingFace free tier. We chose BART for the balance of context length, inference speed, and reliability under load. The 3-tier fallback (raw fetch → HuggingFace SDK → keyword match) ensures the tool still works when the model is unavailable.

The 8 BART classification labels were derived from the 211.org directory's top-level taxonomy, cross-referenced with the most frequent request types reported in publicly available 211 impact reports. The labels are descriptive strings, not single words — for example, the housing label is `"rent help, emergency shelter, facing eviction, homeless, housing assistance, can't afford rent, mortgage help"`. BART scores the input against the full semantic of each label, then the label is mapped back to a short display name like `"Housing Assistance"`.

**Edge cases where a user's situation spans multiple categories** are handled via multi-label classification: any category scoring >= 10% is surfaced alongside the top match, up to 5 categories. "I lost my job and can't pay rent. My kids need food." is not one problem — it shows Employment + Housing + Food simultaneously, so no need is silently dropped.

Crisis Support is **NOT** a BART category — it is handled by the separate hardcoded regex layer that runs before BART is invoked, because crisis routing cannot depend on a probabilistic model.

---

## Multi-city support

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

---

## How it works

1. **User types** a free-text description of their situation
2. **Crisis check** — 175 regex patterns scan for crisis keywords. If matched, crisis resources (988, Crisis Text Line) are surfaced immediately, AI is bypassed
3. **Vague input check** — if input is too short or generic ("hi", "help", "test"), the system asks for more detail instead of running BART
4. **BART classification** — zero-shot NLP scores the input against 8 descriptive labels, producing raw confidence scores
5. **Confidence gate** — if top confidence < 70%, the system asks a clarification question instead of guessing
6. **Multi-label surface** — any category scoring >= 10% is surfaced alongside the top match, up to 5 categories
7. **Display** — results show: what was recommended, how confident the AI is, what else it considered, and why
8. **Human escalation** — if AI confidence is too low or the user requests it, connect to 211 navigator (never auto-dial)

---

## Demo scenarios

| Scenario | What it shows |
|----------|---------------|
| **Multi-Need** | "I lost my job and can't pay rent. My kids need food." → 3 classified resources |
| **Crisis** | "I can't take this anymore. I want it all to end." → Immediate 988/211 response, AI bypassed |
| **Low Confidence** | "I need help with my situation" → Clarification flow, 43% → 83% |
| **Senior** | "I'm 78 and need groceries delivered" → 94% confidence, Meals on Wheels |
| **Veteran** | "I'm a veteran with PTSD and housing issues" → VA-specific programs prioritized |
| **Multi-City** | Select "New York" → NYC-specific resources (NYCHA, Coalition for the Homeless, NYC Well) |

---

## Run it

```bash
# Clone
git clone https://github.com/Vitalcheffe/clearpath-ai-prod.git
cd clearpath-ai-prod

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript (Next.js 16, App Router) |
| Backend | Next.js API Routes |
| AI pipeline | HuggingFace Inference API (BART-large-MNLI) with 3-tier fallback |
| Crisis detection | Hardcoded regex (175 patterns, 9 crisis sub-types) — AI-proof |
| Database | SQLite via Prisma ORM |
| Deployment | Vercel |
| Geolocation | Browser API → nearest city auto-detection |

---

## Team

- **Amine Harch El Korane** (Morocco, high school) — Co-Founder, AI Pipeline Lead, Pitch (qualifier score: 100/100, rank #1 of 320)
- **Ghali El Alj** (Morocco, high school) — Co-Founder, Full-Stack Engineer, DevOps

No advisory board. No external partners. No formal data-sharing agreements. No publications submitted. The two of us built everything you see here in June 2026.

---

## Documentation

| Document | Purpose |
|----------|---------|
| [CHARTER.md](./CHARTER.md) | Team rules and disqualification risks |
| [OBJECTIVES.md](./OBJECTIVES.md) | Quality standards (Level 0-3) |
| [RESPONSIBLE_AI.md](./RESPONSIBLE_AI.md) | Ethical framework (hackathon deliverable) |
| [docs/API_CONTRACT.md](./docs/API_CONTRACT.md) | Backend to AI pipeline interface |
| [docs/BRAND.md](./docs/BRAND.md) | Visual identity and voice |
| [docs/CRISIS_KEYWORDS.md](./docs/CRISIS_KEYWORDS.md) | Crisis keyword database |
| [docs/SCENARIOS.md](./docs/SCENARIOS.md) | 7 user scenarios |
| [docs/DECISIONS.md](./docs/DECISIONS.md) | Architecture Decision Records |
| [docs/JUDGE_MAP.md](./docs/JUDGE_MAP.md) | INFORMS scoring alignment |
| [docs/DEMO_SCRIPT.md](./docs/DEMO_SCRIPT.md) | Demo scenarios script |
| [docs/PITCH_SCRIPT.md](./docs/PITCH_SCRIPT.md) | Pitch video script |
| [docs/ONBOARDING.md](./docs/ONBOARDING.md) | Team onboarding guide |

---

## Limitations

Stated explicitly, because a research project that hides its limitations is not a research project:

1. **6 US cities only.** The system currently serves Houston, New York, Los Angeles, Chicago, Dallas, and Miami. Resource databases for other cities are not integrated. Expanding to new cities requires manual curation of local resources — there is no automated ingestion pipeline.

2. **English-only.** The BART-large-MNLI model and the crisis regex patterns are English-only. A Spanish or Arabic version would require a multilingual NLI model (XNLI) and translated crisis keywords. The architecture supports this, but the data does not yet exist.

3. **No real-time resource availability.** The system shows resource contact information but does not check whether the resource is currently accepting clients, has waitlist space, or is operational. Users may be directed to resources that are full or closed.

4. **BART-large-MNLI is not fine-tuned on crisis text.** The zero-shot model works well for general community resource classification but has not been fine-tuned on crisis-specific language. Edge cases involving non-standard crisis phrasing may be misclassified. The hardcoded regex layer is the safety net for known crisis patterns, but novel phrasings could slip through.

5. **No outcome tracking.** The system does not track whether users successfully connected with the recommended resources. Without outcome data, the confidence calibration cannot be validated against real-world effectiveness. A follow-up survey mechanism would be needed for proper validation.

These limitations are documented to ensure the system is understood as a hackathon prototype with real architectural value, not a production crisis response system.

---

## License

MIT — see [LICENSE](./LICENSE). The license applies to the source code. The BART-large-MNLI model retains its own license (ProsusAI, Apache 2.0). Crisis resource data is sourced from publicly available 211 directories and retains their respective terms of use. The system is not affiliated with 211.org, the 988 Suicide and Crisis Lifeline, or any resource provider listed.

---

<div align="center">
<sub>Built by Amine Harch El Korane and Ghali El Alj · Casablanca, Morocco · June 2026</sub><br>
<sub>"When it matters most, honesty is the safest answer."</sub>
</div>
