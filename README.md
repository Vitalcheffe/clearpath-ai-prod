# ClearPath AI — Community Resource Navigator

> **"When it matters most, honesty is the safest answer."**

**USAII Global AI Hackathon 2026 — Community Track**

A multi-city community resource navigator that shows calibrated confidence instead of hiding uncertainty. Because a confident wrong answer is more dangerous than no answer at all.

---

## The Problem

73% of community resource searches lead to dead ends. Not because the resources don't exist — because the systems connecting people to them are broken. Search engines give confident answers. Directories give long lists. Neither asks what you actually need. Neither tells you when it's not sure.

## The Solution

ClearPath AI is a 6-layer community resource navigator:

1. **Free-text input** → User describes their situation in their own words
2. **Crisis detection** → Hardcoded keyword check, AI-proof, runs first
3. **Multi-label classification** → Zero-shot NLP (BART-large-MNLI) with calibrated confidence scores
4. **Clarification questions** → When confidence < 70%, ask don't guess
5. **Transparent display** → Why + What Else + How Confident for every result
6. **Human escalation** → 211 navigator connection when AI can't help

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

- **Amine Harch El Korane** (Morocco) — Project Lead, AI Pipeline, Pitch
- **Harshit Singh** (India) — Full-Stack Engineer, DevOps

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
