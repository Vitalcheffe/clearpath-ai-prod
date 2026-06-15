# CLEARPATH AI — ONBOARDING GUIDE

**Read this. All of it. Then you're ready to contribute.**

---

## WHO WE ARE

ClearPath AI is a community resource navigator for the USAII Global AI Hackathon 2026. Our thesis: **a confident wrong answer is more dangerous than no answer at all.** We build AI that shows uncertainty instead of hiding it.

**Team:**
- **Amine Harch El Korane** (Morocco) — Founder & Lead Developer

**Hackathon Timeline:**
- June 7–10: Qualifier (written assessment, 30 min)
- June 14: Kickoff (challenge briefs revealed)
- June 14–21: Build week
- June 21: Submit by 11:59 PM ET
- June 27: Awards

---

## WHAT WE'RE BUILDING

A 6-layer community resource navigator:

```
1. Free-text input          → User describes situation in their own words
2. Crisis detection         → Hardcoded regex keyword check, AI-proof
3. Multi-label classification→ Zero-shot NLP (BART-large-MNLI) with confidence scores
4. Clarification questions   → When confidence < 70%, ask don't guess
5. Transparent display       → Why + What Else + How Confident
6. Human escalation          → 211 navigator when AI can't help
```

**Core differentiator:** We show calibrated confidence instead of hiding uncertainty. This is our entire competitive advantage.

---

## REPO STRUCTURE

```
clearpath-ai/
├── README.md
├── CHARTER.md           ← Team rules (READ THIS FIRST)
├── OBJECTIVES.md        ← Quality standards by level
├── RESPONSIBLE_AI.md    ← Ethical framework (deliverable)
├── BRAND.md             ← Visual identity + voice
├── DECISIONS.md         ← Architecture Decision Records
├── CRISIS_KEYWORDS.md   ← Crisis keyword database
├── API_CONTRACT.md      ← API interface documentation
├── .env.example         ← Environment variables template
├── .gitignore
├── next.config.ts       ← Next.js configuration
├── package.json         ← Single package.json for the whole app
├── tailwind.config.ts   ← Tailwind CSS configuration
├── tsconfig.json        ← TypeScript configuration
│
├── prisma/              ← Database schema and seed
│   ├── schema.prisma    ← SQLite schema (Resource, User, Conversation, Message)
│   └── seed.ts          ← Seed data script
│
├── src/
│   ├── app/             ← Next.js App Router pages
│   │   ├── page.tsx     ← Landing / home page
│   │   ├── layout.tsx   ← Root layout
│   │   ├── app/         ← Main app page (navigator)
│   │   ├── about/       ← About page
│   │   ├── team/        ← Team page
│   │   ├── privacy/     ← Privacy policy
│   │   ├── terms/       ← Terms of service
│   │   ├── how-it-works/← How it works page
│   │   ├── contact/     ← Contact page
│   │   ├── api-docs/    ← API documentation page
│   │   ├── blog/        ← Blog page
│   │   ├── pricing/     ← Pricing page
│   │   ├── responsible-ai/ ← Responsible AI page
│   │   ├── verification/← Verification page
│   │   ├── not-found.tsx← 404 page
│   │   ├── globals.css  ← Global styles
│   │   ├── sitemap.ts   ← Sitemap generator
│   │   ├── robots.ts    ← Robots.txt generator
│   │   │
│   │   └── api/         ← Next.js API routes
│   │       ├── route.ts         ← API index
│   │       ├── classify/        ← Crisis detection + BART classification
│   │       │   └── route.ts     ← POST /api/classify (crisis check + zero-shot)
│   │       │   └── test-bart/   ← BART model test endpoint
│   │       ├── community-resources/ ← GET community resources
│   │       │   └── route.ts
│   │       └── contact/         ← POST contact form
│   │           └── route.ts
│   │
│   ├── components/      ← React components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ui/          ← shadcn/ui component library
│   │
│   ├── data/            ← Static data
│   │   └── resources.ts ← Houston community resource database
│   │
│   ├── hooks/           ← Custom React hooks
│   │   ├── use-mobile.ts
│   │   └── use-toast.ts
│   │
│   ├── lib/             ← Shared utilities
│   │   ├── db.ts        ← Prisma client singleton
│   │   ├── utils.ts     ← Utility functions
│   │   └── animations.ts ← Framer Motion variants
│   │
│   └── types/           ← TypeScript type declarations
│       └── framer-motion.d.ts
│
└── docs/                ← Shared documents
    ├── JUDGE_MAP.md
    ├── QUALIFIER_PREP.md
    ├── DEMO_SCRIPT.md
    ├── PITCH_SCRIPT.md
    └── SCENARIOS.md
```

---

## SETUP (5 MINUTES)

### Prerequisites

- Node.js 18+
- Git
- VS Code (recommended)

### Step 1: Clone and Install

```bash
git clone https://github.com/[repo-url]/clearpath-ai.git
cd clearpath-ai

# Single install for the entire app
npm install
```

### Step 2: Environment Variables

```bash
cp .env.example .env
# Edit .env with your local values:
# DATABASE_URL=file:./dev.db
# HUGGINGFACE_API_KEY=hf_xxxxx
```

### Step 3: Initialize Database

```bash
npx prisma db push
npx prisma db seed
```

### Step 4: Run Locally

```bash
npm run dev  # Runs on http://localhost:3000
```

That's it. One terminal. One command. The entire app — frontend, API routes, crisis detection, classification — all runs on a single Next.js dev server on port 3000.

### Step 5: Verify

```bash
# Crisis detection (built into the classify endpoint)
curl -X POST http://localhost:3000/api/classify \
  -H "Content-Type: application/json" \
  -d '{"user_input": "I want to hurt myself"}'
# Expected: crisis_detected: true, crisis_resources shown

# Classification
curl -X POST http://localhost:3000/api/classify \
  -H "Content-Type: application/json" \
  -d '{"user_input": "I can not pay my rent anymore"}'
# Expected: categories with confidence scores (9 categories)

# Community resources
curl http://localhost:3000/api/community-resources
# Expected: Houston resource listings grouped by category
```

---

## RULES (NON-NEGOTIABLE)

1. **Read CHARTER.md before your first commit.** It has the team rules, disqualification risks, and module ownership.

2. **Never push to `main`.** All changes through branches + PR. Minimum 1 approval.

3. **Never touch another member's module without asking.** Check ownership in CHARTER.md §3.

4. **Commit messages follow conventional commits.** `feat:`, `fix:`, `docs:`. No "update stuff."

5. **No secrets in commits.** API keys go in `.env` only. If you commit a secret, rotate it immediately and alert the team.

6. **Crisis detection must have 100% test coverage.** This module protects lives. No untested paths.

7. **Confidence scores are ALWAYS visible.** No result without confidence. This is our competitive advantage.

8. **Ask questions.** If you're unsure about anything, ask in the team chat. No silent guessing.

---

## KEY DOCUMENTS (READ IN THIS ORDER)

| Order | Document | Why |
|---|---|---|
| 1 | CHARTER.md | Team rules, disqualification risks, module ownership |
| 2 | OBJECTIVES.md | Quality standards (Level 0-3), daily checklists |
| 3 | BRAND.md | Visual identity, voice, tone, color system |
| 4 | API_CONTRACT.md | How the API routes work |
| 5 | CRISIS_KEYWORDS.md | The crisis keyword list + testing protocol |
| 6 | RESPONSIBLE_AI.md | Our ethical framework (also a hackathon deliverable) |
| 7 | SCENARIOS.md | 7 user scenarios for development and demo |
| 8 | DECISIONS.md | Architecture Decision Records |

---

## DAILY WORKFLOW

1. **Morning standup** (10:00 AM your local time): Post in team chat:
   - What I did yesterday
   - What I'm doing today
   - Any blockers

2. **Pull latest main before starting work:**
   ```bash
   git checkout main && git pull
   git checkout -b feat/your-feature
   ```

3. **Code. Commit often. Push when ready for review.**

4. **Open a PR** with a description of what it does, how to test it, and any known issues.

5. **Review your teammate's PR** within 4 hours. Be constructive. Be specific.

6. **End of day:** Update team chat with progress. Flag anything that might block tomorrow's work.

---

## CONTACT

- **Amine:** [Discord/DM — to be shared]
- **Team chat:** [Discord channel — to be created]

---

## EMERGENCY CONTACTS (FOR THE APP, NOT THE TEAM)

These numbers are hardcoded into our crisis detection module:

- **988 Suicide & Crisis Lifeline:** Call or text 988
- **National Domestic Violence Hotline:** 1-800-799-7233
- **SAMHSA National Helpline:** 1-800-662-4357
- **Childhelp National Child Abuse Hotline:** 1-800-422-4453
- **RAINN National Sexual Assault Hotline:** 1-800-656-4673
- **Poison Control:** 1-800-222-1222
- **National Human Trafficking Hotline:** 1-888-373-7888
- **Emergency Services:** 911

---

*Welcome to ClearPath AI. Let's build something that matters.*
