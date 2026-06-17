# ClearPath AI — Responsible AI Framework

> This document describes our approach to building ClearPath AI responsibly. It is a hackathon build by two high school students (Amine Harch El Korane and Ghali El Alj, Morocco). We are not a company. We do not have advisors. Every claim below is verifiable in the open-source codebase at github.com/Vitalcheffe/clearpath-ai-prod.

---

## 1. The Problem We Are Trying To Solve

People in crisis can't find the right help. Resource directories use keyword search, so "help" returns a suicide hotline even if you're dealing with domestic violence. When you're already overwhelmed, scrolling through irrelevant results is the last thing you can handle.

Maria, escaping domestic violence at 2 AM. She types "help" and gets a suicide hotline, not a shelter. She closes the tab. Every wrong result is a lost chance. Someone finally reaches out for help and gets sent to the wrong place. They don't try again. That gap between the right resource and the wrong one? It can be fatal.

ClearPath AI is built on a single conviction: a confident wrong answer is more dangerous than no answer at all.

---

## 2. The Core Principle: Honesty About Uncertainty

When the AI is not sure, we say so. We show the raw softmax probability BART-large-MNLI returned, not a calibrated or smoothed version of it. We do not inflate scores. We do not hide low scores. When the model is below 70% confidence, we ask a clarifying question instead of guessing.

This is the opposite of the prevailing AI design philosophy, which optimizes for appearing competent and confident at all times. We believe that when vulnerable people seek help, false confidence is harmful.

### 2.1 Implementation

Three display components communicate uncertainty:

1. **Why this result** — A plain-language explanation of which part of the user's query matched which resource category. For BART classifications: "Matched by BART-large-MNLI semantic analysis of your description." For keyword fallback: "Matched by keyword analysis. For more accurate results, BART AI classification requires an API key."

2. **What else** — Alternative resource categories scoring above 10% are surfaced alongside the top match, up to 5 categories. Users see options they did not think to ask about.

3. **How confident** — The raw confidence percentage BART returned. We do not calibrate. We do dampen single-match Mental Health scores in the keyword fallback by 0.7, because "stress" alone should not route someone to therapy. This is the only adjustment.

### 2.2 What We Do Not Do

We do not claim calibrated confidence. We do not claim the scores reflect true model certainty. We do not have a held-out evaluation dataset to measure calibration. The number you see is the number the model returned. Honest about that is the point.

---

## 3. Safety: Crisis Detection and Response

### 3.1 Design Philosophy

Crisis detection in ClearPath AI is deterministic and hardcoded, not AI-dependent. This is a deliberate choice. AI models, no matter how well-trained, can miss crisis signals, generate inappropriate responses, or fail silently. When a user indicates suicidal ideation, domestic violence, or another acute crisis, the system must respond with absolute certainty and immediacy.

### 3.2 Crisis Detection Layer

The crisis detection layer sits between user input and the AI classification pipeline. It runs first. Always.

```
User Input → Crisis Regex Scanner → Match? → YES → Crisis Response Protocol
                                    → NO  → Continue to AI Classification
```

The scanner uses regex patterns against a hand-curated list of approximately 185 patterns (we expanded from 175 during final testing) covering 9 crisis sub-types:

- Suicidal ideation (explicit and passive, e.g., "I want everything to stop")
- Self-harm methods (cutting, overdose, hanging, drowning, burning)
- Domestic violence and abuse
- Sexual assault and trafficking
- Child abuse and elder abuse
- Weapon threats
- Homicidal ideation
- Medical emergencies (heart attack, chest pain, "I can't breathe")
- General acute distress

The patterns were written by us, the two-person team, over multiple iterations. "I want to die" is obvious. "I don't want to be here anymore" is not. "I'm dying" can mean a medical emergency or "I'm dying laughing." We had to add negative lookaheads for the laughing case. The regex list is the result of many sessions of edge-case testing.

### 3.3 Crisis Response Protocol

When a crisis pattern matches, the system:

1. Immediately displays the appropriate crisis line based on the crisis type. Self-harm routes to 988 first. Domestic violence routes to the National Domestic Violence Hotline first. Medical emergency routes to 911 first.
2. Bypasses the AI classification entirely. BART is never called.
3. Shows the phone numbers as tel: links. The user clicks. The user calls.
4. Does not auto-dial. The decision to contact someone is the user's.
5. Always displays a human hotline number regardless of what happens next.

### 3.4 What We Do Not Do

We do not offer one-click connection to a trained crisis counselor via 211.org. We do not have an integration with 211.org. We show the phone number 211 as a tel: link. The user picks up the phone and dials. A real person on the other end of the line has to be the one helping.

### 3.5 Why Not AI-Based Crisis Detection?

AI-based crisis detection introduces three unacceptable risks:

- False negatives. The AI may fail to detect a crisis signal, especially in non-standard phrasing or non-English input. A missed crisis signal could be fatal.
- False positives. The AI may trigger crisis protocols for benign queries (e.g., "I'm killing it at my new job"), causing unnecessary panic and alert fatigue.
- Hallucination. An AI model in crisis mode might generate inappropriate advice, such as suggesting coping mechanisms that are medically unsound.

Hardcoded regex detection eliminates the hallucination risk entirely. It does not eliminate false negatives entirely — our regex can still miss non-standard phrasing, which is why we also include a "Crisis Support" backup label in the BART classification (defense in depth). If the regex misses a crisis input, BART may still classify it as Crisis Support and the UI will show crisis resources.

---

## 4. Privacy and Data Governance

### 4.1 What We Collect

ClearPath AI collects the minimum data necessary to function, which is essentially nothing persistent:

| Data Point | Collected | Stored | Duration |
|---|---|---|---|
| User query text | Yes (in transit) | No (on our servers) | Not persisted |
| Classification results | Yes (in transit) | No (on our servers) | Not persisted |
| Confidence scores | Yes (in transit) | No (on our servers) | Not persisted |
| User location (for local resources) | Optional (browser geolocation) | No | Not persisted |
| Personal identifiers (name, email, SSN) | No | Never | N/A |
| Browsing behavior | No | Never | N/A |
| Session cookies | No | Never | N/A |

### 4.2 What Happens To Your Input Text

Your text input is sent over HTTPS to our classify API route, which forwards it to HuggingFace Inference API (facebook/bart-large-mnli) for zero-shot classification. HuggingFace processes the text and returns a classification. We do not log the input text on our servers in any persistent storage. We do not store queries in a database. There is no user account system, no session persistence, no cookies beyond what the browser needs to render the page.

HuggingFace's own data retention policy applies to their API tier. We have not audited it. We recommend reviewing it at huggingface.co/privacy if you have concerns. If you are in crisis and uncomfortable typing, call 988 directly. You do not need to use this tool.

### 4.3 What We Log

For debugging purposes during the hackathon, the classify API route logs the first 80 characters of the input text to Vercel serverless function logs. This is a development-time decision and would be removed before any production deployment. Vercel logs are not public.

### 4.4 No Accounts, No PII

There is no user account system. The auth system was removed in commit `refactor: remove auth system — app is now fully open access` on June 14, 2026. There is no email collection, no profile, no name, no age, no demographic data. The tool is fully open access. You describe your situation, you get resources, you leave.

---

## 5. Fairness and Bias

### 5.1 Identified Bias Risks

We do not claim to have solved bias. We have identified bias risks and made specific design choices to mitigate them where we can.

| Bias Type | What We Did |
|---|---|
| Language bias | Zero-shot NLI models perform worse on African American English, code-switching, and non-standard English. We surface alternatives (multi-label threshold 10%) and ask clarification questions below 70% confidence. We do not have a calibration dataset to measure this. |
| Resource availability bias | Our resource database covers 6 US cities. Users outside these areas still get national resources (988, Crisis Text Line, 211) plus the nearest supported city's resources. |
| Category bias | BART may over-classify into Mental Health when users mention stress or emotions. We dampen single-match Mental Health scores in the keyword fallback by 0.7. |
| Accessibility bias | The interface is text-only. No voice input. No screen reader testing done. This is a known limitation we have not addressed. |
| Cultural bias | Categories are derived from the 211.org top-level taxonomy, which is Western-centric. Multi-label classification surfaces multiple categories so intersectional needs are not silently dropped. |

### 5.2 What We Did Not Do

We did not run a fairness audit. We did not test the system on African American English inputs. We did not test on non-English inputs (the system is English-only). We did not consult with community navigators. We did not consult with people who have experienced crisis. We are two high school students building this for a hackathon. What we did, we did carefully. What we did not do, we are honest about.

---

## 6. Accountability

### 6.1 Open Source

The entire codebase is publicly available at github.com/Vitalcheffe/clearpath-ai-prod. Every design decision is in the commit history. Every line of the regex is auditable. Every label BART scores against is in the source code. There is no proprietary layer.

### 6.2 Classification Source Tracking

Every API response includes a `classificationSource` field with one of three values:

- `bart` — BART-large-MNLI was called and returned a result
- `keyword` — BART failed or was unavailable, keyword fallback was used
- `vague-detection` — The input was too vague to call BART (e.g., "hi", "test")

This field is exposed in the response object so that any client (including the user) can verify which classification method produced the result. The UI badge displays this information honestly. When BART is unavailable, the badge reads "Keyword match — BART AI not connected."

### 6.3 Known Failure Modes

We document known failure modes honestly:

| Failure Mode | Likelihood | Impact | What We Do |
|---|---|---|---|
| Misclassification of ambiguous queries | Medium | User gets wrong resource type | Multi-label display + alternatives + confidence score + clarification question |
| Over-classification into Mental Health | Medium | User sees irrelevant mental health resources | Dampened confidence in keyword fallback + specific clarification question |
| Missed crisis signal (non-standard phrasing) | Medium | Delayed crisis response | We expanded the regex to 185 patterns. BART also has a Crisis Support backup label as defense in depth. We have not eliminated this risk. |
| HuggingFace API downtime | High (free tier) | BART unavailable | Three-tier fallback: raw fetch → HuggingFace SDK → keyword match. UI badge honestly reports which mode was used. |
| Latency | Medium | Slow response | 15-second timeout on each HuggingFace call. 20-second retry on 503 (model loading). |
| Confidence miscalibration | Unknown | Over- or under-confidence displayed | We do not have a calibration dataset. The number you see is the number the model returned. |

---

## 7. Human Oversight

### 7.1 Design Principle

Human oversight in ClearPath AI is not a "contact us" link buried in a footer. It is an integral part of the system flow that activates in three conditions:

1. Crisis detection (Layer 1). The crisis line numbers are displayed immediately. The user calls.
2. Low confidence (below 70%). The system asks a clarifying question specific to the top category. If still uncertain, the user can scroll down and find the 211 number to call.
3. Always available. The 211 number and 988 number are displayed on every page footer.

### 7.2 The Decision The AI Does Not Make

The AI never decides who to contact. It shows options. The user picks which one to call. We never auto-dial. We never auto-refer. We never auto-route to a specific resource.

Why: a probabilistic model cannot be held responsible for connecting a vulnerable person to an organization. If the AI sends someone to the wrong shelter, that person might not try again. The handoff point is the moment of contact. The user reads the options, sees the confidence score, picks one. A real person on the other end of the line has to be the one helping.

### 7.3 211 Is A Phone Number, Not An Integration

We display 211 as a phone number to dial. We do not have an API integration with 211.org. We do not have a formal partnership with United Way. 211 is operated locally across the US by various nonprofits. When the user dials 211, they reach a real human navigator in their area. We do not intermediate that call.

---

## 8. What This Is And What It Is Not

### What it is

ClearPath AI is a hackathon build by two high school students for the USAII Global AI Hackathon 2026. It is open source. It works. The AI pipeline runs. The crisis detection runs. The fallback works. The honest confidence scores are displayed. The bot testing we did (4,400 requests, $0.08 cost) showed the system handles a wide range of inputs gracefully.

### What it is not

It is not a production system. It is not deployed with real users. It has not been audited. It has not been tested by community navigators. It has not been tested on non-English input. It has not been tested for accessibility. It does not have a calibration dataset. It does not have formal partnerships. It does not have HIPAA or COPPA compliance (and does not need them, since it collects no PII).

### What we would do next

If ClearPath AI becomes a real product after the hackathon:

1. Run a fairness audit on African American English, Spanish, and code-switching inputs.
2. Build a held-out evaluation dataset for calibration.
3. Pilot with one or two real community navigator organizations.
4. Add Spanish language support (Houston's Spanish-speaking population needs this).
5. Build a version for hotline operators so they see what the caller typed.
6. Add voice input for users who cannot safely type.
7. Remove the development-time input logging.

But the core stays: type what is wrong. Get the right resource. Real confidence score. A human stays in the loop. That is it.
