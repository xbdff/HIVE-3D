# Floating Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the sparse full-width navigation with a polished floating capsule using cobalt-blue typography and a filled Paper button.

**Architecture:** Keep the existing semantic header markup and section anchors. Implement the visual change entirely in `app/globals.css`, with contract assertions in the existing Node test file.

**Tech Stack:** React 19, CSS, Node test runner, vinext/Vite static export

## Global Constraints

- Use cobalt blue `#2563eb` for the wordmark and navigation text.
- Preserve sticky behavior and existing mobile navigation hiding.
- Do not change paper content, lightbox behavior, or dependencies.

---

### Task 1: Floating Capsule Navigation

**Files:**
- Modify: `app/globals.css`
- Test: `tests/site-contract.test.mjs`

**Interfaces:**
- Consumes: Existing `.site-header`, `.wordmark`, `.site-header nav`, and `.header-link` classes.
- Produces: A centered sticky capsule with blue navigation text, pale-blue hover feedback, and a filled blue Paper button.

- [ ] **Step 1: Write the failing style contract**

Add assertions requiring `top:12px`, constrained capsule width, rounded corners, blue wordmark/navigation, link hover background, and the filled blue `.header-link`.

- [ ] **Step 2: Verify the contract fails**

Run `npm test`; expect the navigation style test to fail because the existing header is full-width and neutral colored.

- [ ] **Step 3: Implement the header styles**

Update `.site-header` to a centered floating capsule with translucent white background, blur, border, and shadow. Use `#2563eb` for wordmark/navigation, pale blue for hover, and blue background with white text for `.header-link`. Retain the existing mobile rule while reducing padding and width safely.

- [ ] **Step 4: Verify tests and production build**

Run `npm test` and `npm run build`; expect seven passing tests and a successful static export.

- [ ] **Step 5: Publish**

Commit `app/globals.css`, `tests/site-contract.test.mjs`, and this plan, push `main`, then confirm the matching GitHub Pages Actions run completes successfully.
