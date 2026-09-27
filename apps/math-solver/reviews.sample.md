# Sample reviews → website changes

Paste any of these to the QM Slack bot to exercise the loop against `apps/math-solver/`.

> "On mobile the input field is tiny and the Solve button wraps to its own line. Make the form stack vertically on small screens."

> "Users keep typing division like 10/2 and getting an error. Show a hint under the input listing what IS supported, so the error is less surprising."

> "The steps say 'x = -8 ÷ -2 = 4'. Rewrite that last line so the result appears first, then the arithmetic that got there."

## The loop

1. **Preview** — end the message with "show me a mockup first" → agent runs render mode → you get a Superset Pages URL.
2. **Ship** — say "apply it and open a PR" → agent runs build mode → Superset workspace on this repo → coding agent edits `apps/math-solver/` → PR lands via your `GH_TOKEN` → you merge.

Reviews from your factory pipeline (gbrain/tickets) work the same way — hand the agent the review text and the path `apps/math-solver`.
