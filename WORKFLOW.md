# AI Prompting Workflow Comparison

## Branch Comparison Summary
- **Round 1 (`round-1-vague`):** Built using a single minimal prompt. Generated basic state-based input fields without schema enforcement, automated unit tests, or clear error boundary handling.
- **Round 2 (`round-2-precise`):** Built using a precise prompt with strict architectural boundaries. Added `src/schemas/contactFormSchema.js` using Zod, integrated `react-hook-form` via `@hookform/resolvers/zod`, and added full unit test coverage (`ContactForm.test.jsx`, `SubmittedEntries.test.jsx`, `App.test.jsx`).

## Correctness & Edge Cases
Looking at the explicit diff between the two branches:
1. **Schema Validation:** Round 1 relied on standard browser validation and primitive component state. Round 2 delegates state parsing to a dedicated Zod schema (`contactFormSchema.js`), ensuring strict type casting and validation on blur and submit.
2. **Safe ID Generation:** In `ContactForm.jsx`, the helper `createFormEntry` includes a safe fallback for unique ID creation:
   ```javascript
   const id = typeof crypto !== 'undefined' && crypto.randomUUID
     ? crypto.randomUUID()
     : Math.random().toString(36).slice(2);