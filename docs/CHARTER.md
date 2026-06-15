# CLEARPATH AI — TEAM CHARTER

**Project:** ClearPath AI — Community Resource Navigator  
**Hackathon:** USAII Global AI Hackathon 2026 — Community Track  
**Team:** Amine Harch El Korane (Morocco)  
**Effective:** June 7, 2026  

---

## §1 — DISQUALIFICATION RISKS

These violations can get us **immediately disqualified** from the hackathon. Zero tolerance.

| # | Rule | Why |
|---|------|-----|
| 1.1 | **Never submit work done before June 14, 2026.** All code, design, and documentation must be created during the build phase (June 14–21). Pre-existing boilerplate (Next.js skeleton, auth templates) is allowed. Pre-built AI logic is NOT. | Hackathon rules: all work must be done during the event. |
| 1.2 | **Never use paid AI APIs without disclosing them.** If we use OpenAI, Anthropic, or any paid service, it MUST be listed in our Devpost submission. Prefer free alternatives (Hugging Face, 211.org API). | Judges explicitly do not favor paid tools. Undisclosed paid tools = disqualification risk. |
| 1.3 | **Never copy code from another hackathon project without attribution.** If we use open-source code, the source MUST be credited in README.md and RESPONSIBLE_AI.md. | Plagiarism = disqualification. |
| 1.4 | **Never submit after June 21, 11:59 PM ET.** No extensions. No exceptions. Submit by June 21, 9:00 PM ET at the latest (3-hour safety margin). | Hard deadline. Late = not reviewed. |
| 1.5 | **Never misrepresent our team.** Both members must have contributed. If someone drops out, notify Devpost before submission. | Misrepresentation = disqualification. |
| 1.6 | **Never use the USAII logo, name, or branding in our project without permission.** | Trademark violation. |

---

## §2 — GIT & CODE RULES

These are non-negotiable. Violation = immediate revert + warning.

| # | Rule | Why |
|---|------|-----|
| 2.1 | **NEVER push to `main` directly.** All changes go through a branch + Pull Request. Minimum 1 approval before merge. | Prevents broken deployments. Protects the codebase. |
| 2.2 | **NEVER force-push to a shared branch.** If you need to rebase, create a new branch. | Destroys teammate's work. |
| 2.3 | **NEVER commit on someone else's assigned module without asking first.** Check `ASSIGNMENTS.md` before touching code. If it's not yours, ask. | Prevents merge conflicts and duplicated work. |
| 2.4 | **Branch naming:** `feat/<module>`, `fix/<issue>`, `docs/<section>`. Example: `feat/crisis-detection`, `fix/confidence-score-bug`. | Organization. |
| 2.5 | **Commit messages:** Use conventional commits. `feat: add crisis keyword detection`, `fix: confidence score overflow`, `docs: update README`. No "update stuff" or "fix things". | Readability. Professionalism. |
| 2.6 | **NEVER commit secrets.** API keys, tokens, passwords go in `.env` (which is gitignored). If you accidentally commit a secret, rotate it IMMEDIATELY and alert the team. | Security breach. |
| 2.7 | **Every PR must include a description** of what it does, how to test it, and any known issues. | Accountability. |
| 2.8 | **Delete your branch after merge.** No stale branches. | Clean repo. |

---

## §3 — MODULE OWNERSHIP

Each team member OWNS their modules. The other person can review and suggest, but does NOT rewrite without permission.

### Amine — Founder & Lead Developer
- `src/app/api/classify/` — Crisis detection (regex-based keyword engine) + BART-large-MNLI zero-shot classification with confidence calibration
- `src/data/` — Resource database (Houston community resource data and category mappings)
- `RESPONSIBLE_AI.md` — Ethical framework documentation
- Qualifier responses (June 7–10)
- Pitch video script


- `src/app/` — Next.js App Router pages and UI components (all frontend pages)
- `src/components/` — React + TypeScript UI components (all components)
- `prisma/` — SQLite schema and seed data
- `deployment/` — Vercel configuration
- GitHub Actions / CI pipeline
- Devpost submission formatting

### Shared (both must approve)
- `README.md`
- Architecture decisions
- API route contracts (classify, community-resources, contact)
- Final demo flow
- Any change to the 6-layer architecture

---

## §4 — RESPONSIBLE AI COMMITMENTS

These are NOT optional. They are CORE to our project and our competitive advantage.

| # | Commitment | Consequence of Violation |
|---|-----------|------------------------|
| 4.1 | **Confidence scores are ALWAYS visible.** No result is shown without its confidence percentage. | Removes our key differentiator. Violates Responsible AI scoring. |
| 4.2 | **Crisis detection is ALWAYS hardcoded.** The AI layer can NEVER override or skip crisis keywords. If "suicide", "self-harm", "overdose", or "domestic violence" is detected, crisis resources are shown BEFORE any AI classification. | Could cause real harm. Disqualifies us from Best Responsible AI award. |
| 4.3 | **Human escalation is ALWAYS offered when confidence < 70%.** The system NEVER guesses harder when unsure. | Violates our core thesis. Disqualifies us from both special awards. |
| 4.4 | **We NEVER auto-contact services on behalf of the user.** The AI suggests. The human decides. | Privacy violation. Legal risk. |
| 4.5 | **We NEVER store personally identifiable information without consent.** Free-text inputs are processed in-memory and not persisted unless the user explicitly opts in. | GDPR/privacy violation. Disqualification risk. |
| 4.6 | **Known limitations are ALWAYS documented.** In README.md, RESPONSIBLE_AI.md, and in the app UI itself. | Judges penalize hidden limitations. Transparency = points. |
| 4.7 | **We NEVER claim the AI is 100% accurate.** All communications (README, pitch, Devpost, UI) must state that the system is a decision-support tool, not a definitive resource matcher. | Misrepresentation. Disqualification from Responsible AI award. |

---

## §5 — COMMUNICATION & DEADLINES

| # | Rule |
|---|------|
| 5.1 | **Daily standup:** Each member posts a short update in Discord/DM by 10:00 AM their local time. What I did yesterday. What I'm doing today. Any blockers. |
| 5.2 | **Maximum response time: 4 hours** during build week (June 14–21). If you're unavailable for longer, notify in advance. |
| 5.3 | **No ghosting.** If you need to drop out, say it directly. Don't disappear. |
| 5.4 | **Decisions are documented.** Any architecture or design decision goes in `DECISIONS.md` with date, context, and who decided. |
| 5.5 | **Disagreements are resolved by the person who OWNS the module.** The project lead makes final decisions with input from all contributors. |
| 5.6 | **Build week schedule:** |
| | June 14: Architecture finalization + repo setup + API contracts |
| | June 15: Crisis detection + frontend skeleton |
| | June 16: BART-large-MNLI classifier + API routes |
| | June 17: Clarification logic + frontend integration |
| | June 18: Confidence display + human escalation flow |
| | June 19: End-to-end testing + bug fixes |
| | June 20: Polish + README + RESPONSIBLE_AI.md + Devpost |
| | June 21 (morning): Final demo recording + submit by noon ET |

---

## §6 — CODE QUALITY

| # | Rule |
|---|------|
| 6.1 | **TypeScript throughout.** No `any` types unless explicitly justified in a comment. |
| 6.2 | **Strict typing on all API route handlers.** Request/response types must be defined. |
| 6.3 | **Every API endpoint has error handling.** Never return a raw error to the user. |
| 6.4 | **No `console.log` in production.** Use a proper logger or remove before merge. |
| 6.5 | **Crisis detection has 100% test coverage.** This module cannot have a single untested path. People's safety depends on it. |
| 6.6 | **No hardcoded fake data in production.** Seed data for development is fine, clearly marked. |

---

## §7 — THINGS THAT WILL COST US THE WIN

These are strategic anti-patterns. Not disqualifying, but they WILL lose us points.

| # | Anti-Pattern | What to do instead |
|---|-------------|-------------------|
| 7.1 | Saying "AI helps people find resources" without explaining WHY AI specifically | Explain: "AI parses messy free-text descriptions and classifies across multiple categories simultaneously — a static directory cannot do this" |
| 7.2 | Hiding AI uncertainty | Show confidence scores prominently. This IS our differentiator. |
| 7.3 | Saying "AI might be biased" as our only risk | Name the SPECIFIC risk: "AI may classify a complex multi-need situation as a single category, causing the user to miss an urgent legal deadline" |
| 7.4 | Saying "we'll test it" as mitigation | Describe the DESIGN CHOICE: "When confidence < 70%, we force clarification questions before showing results" |
| 7.5 | Submitting a demo that only works on your machine | Deploy to Vercel. Judges must be able to access it. |
| 7.6 | A GitHub repo with 3 commits all on June 21 | Commit regularly. Judges check commit history. Active development = credibility. |
| 7.7 | A pitch video longer than 3 minutes | Keep it under 3 min. Judges have hundreds to watch. |
| 7.8 | Ignoring the INFORMS scoring rubric | Every deliverable must map to: Problem Understanding, AI Reasoning, Solution Coherence, Responsible AI, Human Oversight, Communication Clarity |

---

## §8 — SIGNATURE

By working on ClearPath AI, you agree to this charter. Violations of §1 or §4 are grounds for immediate team discussion and potential removal from the project.

**Amine Harch El Korane** — Founder & Lead Developer  

*Last updated: June 2026*
