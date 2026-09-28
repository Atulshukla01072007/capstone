# Project: My Capstone

## Stack
- Node.js

## Conventions
- Commits follow Conventional Commits (feat:, fix:, docs:, chore:)

# Project Rules

1. **Form Handling & Validation:** All forms must use `react-hook-form` paired with `@hookform/resolvers/zod` schemas placed under `src/schemas/`.
2. **Defensive API Checks:** Standard Web APIs like `crypto.randomUUID()` must include runtime existence checks (`typeof crypto !== 'undefined'`) or safe fallback implementations to maintain test runner compatibility.
3. **Verification First:** Every UI component must be accompanied by a co-located Vitest test file (`*.test.jsx`) verifying rendering, error states, and submission flows.