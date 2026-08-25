# ClearPath AI

Community resource navigator with calibrated confidence — because a confident wrong answer is more dangerous than no answer at all.

Winner — USAII Global AI Hackathon 2026 (Community Track). Rank #1 of 320 teams.

## What it does

When someone in crisis searches for help, ClearPath shows what the AI recommends, how confident it is, what else it considered, and when it is uncertain enough to ask for human help.

6-layer pipeline: free-text input, hardcoded crisis detection (regex), vague input interception, zero-shot NLP classification (BART-large-MNLI), confidence-gated clarification, human escalation.

## Why it exists

Keyword search does not work for people in crisis. "My husband hurts me" and "I want to end it all" both contain "help" but need completely different resources. When someone finally reaches out and gets sent to the wrong place, they don't try again.

## Stack

Next.js 16, TypeScript, BART-large-MNLI, 6 US cities, 175 crisis regex patterns.

## License

MIT — see `LICENSE`.
