# CLEARPATH AI — ARCHITECTURE DECISION RECORDS

**Every major technical choice documented with context, alternatives, and rationale.**

---

## ADR-001: Zero-Shot Classification Instead of Fine-Tuned Model

**Date:** June 2026  
**Status:** Decided  
**Context:** We need to classify user-described situations into resource categories. We have two options: (A) Fine-tune a classification model on labeled resource data, or (B) Use a zero-shot classification model that works without labeled training data.

**Decision:** We chose zero-shot classification using the HuggingFace Inference API with `facebook/bart-large-mnli`.

**Rationale:**
- We have NO labeled training data. Collecting and labeling a dataset of real crisis situations would take weeks and raises serious privacy concerns.
- Zero-shot classification works out of the box with custom category labels. We can define our categories ("Legal Aid", "Food Assistance", "Housing Assistance", etc.) and the model classifies against them immediately.
- The hackathon build period is 7 days. Fine-tuning is not feasible in that timeline.
- Zero-shot confidence scores are naturally calibrated (they represent how well the premise matches the hypothesis), which aligns with our transparency requirement.
- Using the HuggingFace Inference API means we don't need to run the model locally — no Python runtime, no GPU, no model downloads. The API call handles everything.
- If we need better accuracy post-hackathon, we can fine-tune on collected data later. Zero-shot is our MVP foundation.

**Consequences:**
- Zero-shot accuracy will be lower than a fine-tuned model, especially for domain-specific language. We accept this and mitigate with the clarification mechanism.
- Confidence scores may be systematically over- or under-confident. We apply temperature scaling for calibration.
- We are dependent on HuggingFace's model quality and API availability. If the base model has biases, our classifications will reflect them.
- API latency adds to classification time (typically 1-3 seconds per request).

**Alternatives Considered:**
- OpenAI GPT-4 API: Better accuracy, but paid, and violates our "free tools only" philosophy. Also a black box — we can't inspect or calibrate confidence scores.
- Fine-tuned BERT: Better accuracy, but requires labeled data we don't have and time we don't have.
- Rule-based classification (keyword matching): No AI reasoning, which would hurt our AI Reasoning score (25% of total). Also can't handle paraphrases or indirect descriptions.

---

## ADR-002: Single Next.js Application with HuggingFace Inference API

**Date:** June 2026  
**Status:** Decided  
**Context:** We need to serve a web frontend, API routes, crisis detection, and AI classification. We could split these into separate services (e.g., a Python AI pipeline + a Node.js backend) or unify them in a single application.

**Decision:** A single Next.js application (App Router) handles everything: frontend pages, API routes, crisis detection, and AI classification via the HuggingFace Inference API. No separate Python pipeline or Express backend.

**Rationale:**
- **Simplicity:** One codebase, one `package.json`, one deployment. No inter-service communication, no API contracts between microservices, no CORS issues.
- **HuggingFace Inference API eliminates the need for Python.** We call `facebook/bart-large-mnli` via the hosted API (`@huggingface/inference` npm package) from our Next.js API route. No Python runtime, no model downloads, no GPU required.
- **Crisis detection is regex-based** — it runs as synchronous JavaScript in the classify API route before the HuggingFace call. No separate service needed.
- **Faster development:** One team member can work on frontend while the other works on API routes, all in the same repo. No need to coordinate deployments across services.
- **Single deployment target:** Deploy everything to Vercel as one unit. No separate GPU server for the AI pipeline.
- **Lower latency for crisis detection:** Crisis keywords are checked inline in the same request, with no inter-service HTTP call needed. Crisis detection fires in < 1ms.

**Consequences:**
- We depend on the HuggingFace Inference API being available. If it goes down, classification won't work (though crisis detection still works — it's local regex).
- The HuggingFace Inference API has rate limits on the free tier. For a hackathon demo, this is acceptable.
- All classification logic lives in `src/app/api/classify/route.ts`. This file handles both crisis detection and BART classification. It's a larger module but keeps the request flow simple and linear.

**Alternatives Considered:**
- Python AI pipeline (Flask/FastAPI) + Node.js backend: More traditional separation, but adds complexity (two codebases, two deployments, inter-service latency). The HuggingFace Inference API makes the Python runtime unnecessary.
- All Python (FastAPI for everything): Simpler for AI work, but Harshit is less productive in Python. We'd lose Next.js's excellent developer experience and Vercel's zero-config deployment.
- All Node.js with TensorFlow.js: Possible but TF.js has fewer pre-trained zero-shot models than HuggingFace's ecosystem. Would limit our AI capability.

---

## ADR-003: Temperature Scaling for Confidence Calibration

**Date:** June 2026  
**Status:** Decided  
**Context:** Zero-shot classification models return raw scores that may not be well-calibrated. A score of 0.78 does not necessarily mean there's a 78% chance the classification is correct. We need calibrated confidence scores for our transparency requirement.

**Decision:** Apply temperature scaling (Platt scaling) to the model's output scores before displaying them to the user.

**Rationale:**
- Temperature scaling is the simplest calibration method: divide logits by a learned temperature parameter T before applying softmax. It preserves the ranking of predictions while improving calibration.
- It requires minimal computational overhead (single scalar parameter).
- It's well-studied and effective (Guo et al., "On Calibration of Modern Neural Networks," ICML 2017).
- For the hackathon, we can start with T=1.0 (no calibration) and tune it during testing if time permits. Even uncalibrated scores are better than no confidence display.

**Consequences:**
- Without a validation dataset, we cannot properly learn the temperature parameter T. We may use a default or heuristic value.
- The calibration may not be perfect. We mitigate this by labeling scores as "AI Confidence" (not "Accuracy") and documenting this limitation.

**Alternatives Considered:**
- Isotonic regression: More flexible calibration but requires more data and complexity. Not justified for our scale.
- No calibration (raw scores): Simpler but potentially misleading. A score of 0.95 might correspond to 70% actual accuracy, creating false confidence.
- Discrete confidence levels (High/Medium/Low): Simpler for users but loses granularity. We can add this as a visual layer on top of numerical scores.

---

## ADR-004: SQLite via Prisma for Resource Data

**Date:** June 2026  
**Status:** Decided  
**Context:** We need to store resource listings (name, category, phone, address, eligibility, hours). The data is semi-structured — some resources have many fields, others have few.

**Decision:** SQLite via Prisma ORM for resource data storage.

**Rationale:**
- **Zero setup:** SQLite is file-based. No database server to configure, no cloud account to create, no connection strings to manage. `DATABASE_URL=file:./dev.db` is all we need.
- **Prisma ORM** gives us type-safe database access, schema migrations via `prisma db push`, and a seed script for initial data. Perfect for a hackathon where speed matters.
- **Single deployment unit:** The SQLite file lives alongside the app. No external database service means one less thing to break during the demo.
- **Prisma schema** defines our models (Resource, User, Conversation, Message, SavedResource, UserSettings) with proper relationships and types. TypeScript type generation is automatic.
- **Adequate for hackathon scale:** We're serving resources for one city (Houston, TX). SQLite handles this easily.

**Consequences:**
- SQLite is not ideal for concurrent writes. For a hackathon demo, this is fine. For production with real users, we'd migrate to PostgreSQL.
- No built-in full-text search. We use in-memory filtering in the API route instead.
- The Prisma schema uses comma-separated strings for lists (e.g., `services`, `languages` fields on Resource). This is a denormalization trade-off for simplicity.

**Alternatives Considered:**
- MongoDB (Atlas free tier): Flexible schema for varying resource attributes, but adds an external dependency and cloud service. Overkill for our scale and adds setup complexity.
- PostgreSQL: More robust for production, but requires a running database server. Prisma supports it, and we could migrate later if needed.
- Static JSON files only (no database): Simplest possible approach. We partially do this with `src/data/resources.ts`, but Prisma gives us persistence for conversations, users, and saved resources.

---

## ADR-005: Next.js App Router for Frontend and API

**Date:** June 2026  
**Status:** Decided  
**Context:** We need a fast, modern frontend that works well on mobile devices and can display dynamic confidence indicators, clarification questions, and crisis overlays. We also need API routes for classification and data access.

**Decision:** Next.js 16 with App Router, TypeScript, and Tailwind CSS with shadcn/ui components. Deployed on Vercel.

**Rationale:**
- **Full-stack in one framework:** Next.js App Router gives us both frontend pages (`src/app/`) and API routes (`src/app/api/`) in a single application. No separate backend needed.
- **Harshit's strongest framework.** Maximum development velocity.
- **TypeScript throughout** catches bugs at compile time, which is critical for a 7-day build sprint where we can't afford runtime errors.
- **Tailwind CSS + shadcn/ui** provides a professional, accessible component library with zero custom CSS overhead.
- **Vercel deployment is trivial** for Next.js apps. Zero-config CI/CD.
- **Server Components** for static pages (about, team, privacy) and Client Components for interactive features (navigator, classification results).

**Consequences:**
- Next.js bundle size can be large. We need to be mindful of performance on slow connections. Code splitting and lazy loading are required.
- Vercel's free tier has bandwidth limits. Fine for a hackathon demo but not for real traffic.
- Serverless functions (API routes) have cold-start latency. The first classification request may take an extra 1-2 seconds.

**Alternatives Considered:**
- Separate React frontend + Express backend: More traditional split, but adds complexity. Next.js API routes handle our needs perfectly.
- Vue.js: Lighter bundle size, but Harshit has less experience. Not worth the learning curve for a 7-day sprint.
- Plain HTML/JS: Smallest possible bundle, but harder to manage complex state (classification results, clarification flow, crisis overlay). Not practical.

---

## ADR-006: Hardcoded Crisis Detection (Not AI-Powered)

**Date:** June 2026  
**Status:** Decided  
**Context:** We need to detect when a user is in active crisis (suicidal ideation, domestic violence, substance overdose) and show crisis resources immediately.

**Decision:** Crisis detection is implemented as a hardcoded regex-based keyword-matching module in TypeScript, built directly into the `/api/classify` route. It runs before the HuggingFace classification call. The AI layer CANNOT override or bypass it.

**Rationale:**
- AI-powered crisis detection can fail silently. A language model might not flag an indirect expression of crisis, or worse, classify it as something else entirely.
- Hardcoded keyword matching is deterministic: same input always produces the same output. No model updates, no version changes, no unpredictable behavior.
- The crisis check runs synchronously in the same request handler, before the async HuggingFace API call. Even if the HuggingFace API is down, crisis detection still works.
- This is our strongest argument for the Best Responsible AI award: crisis detection is architecturally separated from AI classification, making it impossible for the AI to interfere with safety-critical functionality.

**Consequences:**
- Keyword matching has limited recall. Indirect expressions ("I don't want to be here anymore") may not trigger detection. We document this as a known limitation.
- The keyword list requires ongoing maintenance. New crisis language patterns emerge over time.
- False positives are possible (e.g., someone discussing a TV show about suicide in an academic context). We mitigate by showing the overlay non-intrusively (it doesn't lock the app — the user can dismiss it).

**Alternatives Considered:**
- AI-based crisis detection: More nuanced understanding but less reliable. Can fail unpredictably. Violates our principle of keeping safety-critical functions deterministic.
- Hybrid (keyword + AI): Could improve recall but adds complexity and potential for AI override. Too risky for a safety-critical feature.
- No crisis detection: Would eliminate the safety net entirely. Not acceptable for a product dealing with vulnerable populations.

---

## ADR-007: No User Accounts or Data Persistence (By Default)

**Date:** June 2026  
**Status:** Decided  
**Context:** Users describe personal, often sensitive situations. Storing this data creates privacy risks, legal obligations, and security requirements.

**Decision:** No user accounts required. Guest mode is the default. All user input is processed and discarded after the session. Optional accounts exist for saving resources and conversation history, but are not required for core functionality.

**Rationale:**
- Privacy by design: we can't leak data we don't store (for guest users).
- Simpler architecture for the core flow: no authentication required to use the navigator.
- Aligns with our brand: "We forget what you tell us. That's a feature, not a bug."
- Optional accounts add value (saved resources, conversation history) without compromising the privacy-first default.

**Consequences:**
- Guest session continuity: if the user refreshes the page, their classification results are lost.
- No personalization for guests: the system can't learn from past interactions or improve over time based on user feedback.
- No analytics for guests: we can't measure how many people we helped or which resources were most useful.

**Alternatives Considered:**
- Mandatory accounts: More features (save resources, revisit past results) but adds significant friction and privacy concerns for vulnerable users.
- Anonymous sessions with expiry: Session data stored temporarily (24h expiry). Adds some continuity without permanent storage. Could implement post-hackathon.

---

## ADR-008: Multi-City Support with Auto-Detection via Geolocation

**Date:** June 2026  
**Status:** Decided  
**Context:** ClearPath AI initially served only Houston, TX. For the hackathon, multi-city support would demonstrate scalability and make the product more impressive to judges. However, curating resource data for multiple cities requires significant effort, and there is no free, reliable API for real-time community resource data by city.

**Decision:** Expand to 6 major U.S. cities (Houston, New York, Los Angeles, Chicago, Dallas, Miami) with auto-detection via browser geolocation, plus national resources as a universal fallback.

**Rationale:**
- **Scalability demonstration**: Judges value products that can scale beyond a single city. Multi-city support shows ClearPath AI is not a Houston-only prototype but a nationally deployable platform.
- **Geolocation already exists**: The app already uses `navigator.geolocation` for distance calculations. Extending this to auto-detect the nearest supported city is a natural evolution.
- **National resources are universal**: Crisis lines (988, DV Hotline), federal programs (SNAP, VA Benefits, Healthcare.gov), and national organizations (NAMI, United Way 211) work everywhere in the US. These serve as a meaningful fallback for unsupported areas.
- **Curated data over API dependency**: There is no free, reliable API for community resource data by city. 211 APIs are not publicly available. Curating real, verified resources for 6 cities is more honest and reliable than depending on an external API that could fail during the demo.
- **6 cities cover ~15% of the US population**: Houston, NYC, LA, Chicago, Dallas, and Miami together serve over 50 million people. This is a meaningful coverage for an MVP.
- **Manual city selector as fallback**: If geolocation fails or is denied, users can manually select their city from a dropdown. This ensures the product is usable even without GPS.

**Consequences:**
- Resource data must be curated manually for each city. Currently ~10-12 resources per city + 10 national resources = ~80 total. This is manageable but not scalable to hundreds of cities without automation.
- No real-time verification of resource availability. Hours, phone numbers, and eligibility could change. We mitigate by dating each resource's "verified" field.
- The `findNearestCity()` function uses Haversine distance to city centers, which may assign users to a city whose metro area they're technically outside of (e.g., someone in Newark might be assigned to NYC). This is acceptable for the MVP.
- Users in rural areas or unsupported cities see national resources + the nearest city's resources. The "outside service area" warning is shown with a prompt to dial 211 for local help.

**Alternatives Considered:**
- Single city (Houston only): Simpler but less impressive for a hackathon. Does not demonstrate scalability.
- API-based resource lookup (211.org, Aunt Bertha): No free, reliable API available. Would add external dependency that could fail during demo.
- All US cities via zip code lookup: Would require a massive database of 300,000+ resources. Not feasible for a 7-day hackathon.
- Dynamic city addition (user-submitted resources): Quality control risk. Unverified resources could harm vulnerable users. Violates our "verified resources only" principle.

---

*As new decisions are made during the build week, they should be documented here using the same format. Every decision must include: context, decision, rationale, consequences, and alternatives considered.*
