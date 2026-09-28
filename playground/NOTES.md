# Accessibility Comparison: Custom vs. shadcn/ui (Radix UI)

## Overview
This document compares custom hand-written W3C APG-compliant React components against `shadcn/ui` implementations (built on Radix Primitives).

---

## Key Differences & Gaps Missed in Custom Implementation

### 1. Dynamic Focus & Body Scroll Locking (Modal Dialog)
- **Custom Implementation:** Implemented a manual event-listener focus trap checking `Tab` / `Shift+Tab`. Background page scrolling remains active behind the fixed overlay backdrop.
- **shadcn/ui Difference:** `shadcn/ui` utilizes Radix's `@radix-ui/react-dialog`, which injects `pointer-events: none` on the `body` element and sets `overflow: hidden` to lock background scrolling completely. Furthermore, Radix uses `@radix-ui/react-focus-scope` to intercept external screen reader focus shifts and automatically marks background tree elements as inert (`aria-hidden="true"`).

### 2. Multi-Directional Arrow Navigation & Orientation Support (Tabs)
- **Custom Implementation:** Hardcoded horizontal arrow key handlers (`ArrowLeft` / `ArrowRight`). Moving to vertical orientations would break keyboard navigation.
- **shadcn/ui Difference:** `shadcn/ui` (via `@radix-ui/react-tabs`) dynamically senses the `orientation` prop (`horizontal` vs `vertical`). It automatically rebinds navigation to `ArrowUp` and `ArrowDown` for vertical tab lists, while maintaining support for Home/End and automatic vs manual selection activation states seamlessly.

### 3. Portal Support & Z-Index Stacking Context
- **Custom Implementation:** Rendered directly inline inside the DOM tree. Nested relative parents with `overflow: hidden` or lower `z-index` values clipping the modal overlay bounds.
- **shadcn/ui Difference:** `shadcn/ui` renders dialog contents via `Radix.Portal`, hoisting the DOM nodes directly to `document.body`. This guarantees proper z-index stacking layers and isolates focus management from parent DOM constraints.

---

## Conclusion
Building components by hand enforces a deep understanding of W3C APG ARIA semantics (roles, states like `aria-expanded` and `aria-selected`, and keyboard listeners). However, production-grade libraries like `shadcn/ui` handle critical edge cases around DOM portals, scroll containment, screen reader tree isolation, and fluid orientation states that are difficult to manage manually.