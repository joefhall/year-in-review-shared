# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

### Rule 1 — Think Before Coding.

No silent assumptions. State what you're assuming. Surface tradeoffs. Ask before guessing. Be clear about doubt when you're not confident of an assertion. Push back when a simpler approach exists.

### Rule 2 — Simplicity First.

Minimum code that solves the problem. No speculative features. No abstractions for single-use code. If a senior engineer would call it overcomplicated — simplify.

### Rule 3 — Best Practice.

Seek solutions a senior engineer would consider up-to-date best practice. Don't assume every request is a good idea - provide advice on how to improve it and trade-offs of different options.

### Rule 4 — Reliability and Security.

Ensure code is resilient to edge cases, errors, and unexpected inputs. Prioritize correctness and stability over cleverness or optimization. Log errors to Sentry and handle failures gracefully, avoid silent failures. Follow security best practices throughout, especially when handling user input, authentication, and sensitive data.

### Rule 5 — Surgical Changes.

Touch only what you must. Don't "improve" adjacent code, comments, or formatting without seeking approval. Don't refactor what isn't broken. Match existing style.

### Rule 6 — Goal-Driven Execution.

Define success criteria. Loop until verified. Don't tell Claude what steps to follow, tell it what success looks like and let it iterate.

### Rule 7 — Token budgets are not advisory

Per-task budget: 10,000 tokens.
Per-session budget: 30,000 tokens.
If a task can't be described in 3 sentences, break it down before starting. Do not push through.
Surfacing the breach > silently overrunning.

### Rule 8 — Read before you write

Before adding code in a file, read the file's exports, the immediate caller, and any obvious shared utilities.
If you don't understand why existing code is structured the way it is, ask before adding to it.
"Looks orthogonal to me" is the most dangerous phrase in this codebase.

### Rule 9 — Checkpoint after every significant step

After completing each step in a multi-step task: summarize what was done, what's verified, what's left.
Don't continue from a state you can't describe back to me.
If you lose track, stop and restate.

### Rule 10 — Match the codebase's conventions, even if you disagree

If the codebase uses snake_case and you'd prefer camelCase: snake_case.
If the codebase uses class-based components and you'd prefer hooks: class-based.
Disagreement is a separate conversation. Inside the codebase, conformance > taste.
If you genuinely think the convention is harmful, surface it. Don't fork it silently.

### Rule 11 — Fail loud

If you can't be sure something worked, say so explicitly.
"Migration completed" is wrong if 30 records were skipped silently.
"Tests pass" is wrong if you skipped any.
"Feature works" is wrong if you didn't verify the edge case I asked about.
Default to surfacing uncertainty, not hiding it.

## Architecture

This package holds the TypeScript interfaces shared between the parts of the Year in Review app (`../year-in-review`). It contains **types only**: no runtime code, no runtime dependencies, so the compiled `.js` files are effectively empty and only the `.d.ts` files matter.

- The `Viewer*` interfaces describe what the end-user viewer needs to render a year-in-review: a `ViewerScreen` has `ViewerScreenContent` (background, `items`, `timeline`), each item is a `ViewerScreenContentItem` (text/image/share) with `ResponsiveOptions` per screen size, and a `ViewerTimelineItem` says when an item shows or hides.
- Consumers:
  - `../year-in-review/admin` extends these with admin-only fields (e.g. `ScreenContentItem extends ViewerScreenContentItem` adds `conditions`). Admin-only fields belong there, not here.
  - `../year-in-review/functions` uses `ViewerScreen` when reading and writing screens in Firestore (`organisations/.../years/...`).
- Both consumers install this package as a git dependency (`git+ssh://git@github.com/joefhall/year-in-review-shared.git`), not from npm. Their `package-lock.json` pins a specific commit SHA, so they only pick up changes after `npm install year-in-review-shared` is re-run in each consumer.
- These shapes describe data already stored in Firestore. Assume existing documents won't have a new field: add new fields as optional (`?`) unless every stored document is migrated, and treat renaming or removing a field, or narrowing a union, as a breaking change for both consumers.

## Source layout

```
src/
  index.ts                     Re-exports every interface (the package entry point)
  ResponsiveOptions.ts         Font, max width, padding and position for one screen size
  ViewerScreen.ts              A screen: id, name, order, content
  ViewerScreenContent.ts       Background settings, delay, items and timeline for a screen
  ViewerScreenContentItem.ts   A text/image/share item, its animation, font and per-screen-size options
  ViewerTimelineItem.ts        A show/hide event for an item at a given time
dist/                          Compiled output (committed, because consumers install from git)
```

- One interface per file, file named after the interface.
- Every new file must be re-exported from `src/index.ts`, or consumers can't import it.
- `dist/interfaces/` and `dist/utils/` are stale leftovers from v1.0.7 (`tsc` doesn't clean `outDir`). Nothing imports them; delete them only with approval.

## Build and release

There are no tests (`npm test` exits with an error on purpose), so `npm run build` succeeding is the only automated check.

1. Make the change in `src/`.
2. `npm run build` (runs `tsc`, writes `dist/`). Always commit `dist/` together with the `src/` change: consumers use `dist/`, not `src/`.
3. Bump `version` in `package.json` (patch for additive changes) and run `npm install` so `package-lock.json` matches.
4. Commit with a message in the style `v1.0.9 - ViewerScreenContentItem add background colour, ResponsiveOptions add padding`.
5. Tag the commit with the bare version number (e.g. `1.0.9`, no `v` prefix) and create a GitHub release. (Tagging and releasing are pushes, so leave them to me.)
6. In `../year-in-review/admin` and `../year-in-review/functions`, run `npm install year-in-review-shared` to update the pinned commit.

## Coding style

- Always write code that is easy for a mid-level engineer to read and understand. Avoid cleverness, and prefer clarity over brevity.

### TypeScript

- Use 2-space indentation, semicolons, single quotes, trailing commas, 120-character lines (see `.prettierrc.js`)
- End with a newline
- Use `interface`, not `type`, for object shapes, and export every interface
- Put interface properties in alphabetical order
- Use string-literal unions for fixed sets of values (e.g. `'bold' | 'normal'`), with members in alphabetical order
- Put the unit or format of a numeric/string value in a trailing comment (e.g. `// seconds`, `// percentage`, `// pixels`, `// hex`, `// -1 to 1`)
- Use British English spelling for property names and comments (e.g. `backgroundColour`), except where a value mirrors a CSS keyword (e.g. `'center'`)
- `tsconfig.json` has `strict`, `noUnusedLocals` and `noImplicitReturns` on; don't loosen them
- ESLint and Prettier configs exist but neither is installed as a dependency, so don't rely on running them

## Git workflow

- Never stage files for commit; always leave that to me
- Never push; always leave that to me
- Never merge or rebase
- After completing a task, propose a commit message for my approval before committing, in the `vX.Y.Z - description` style above
- Work so far has been committed straight to `main`; ask before creating a branch
