# HIVE-3D Floating Header Design

## Goal

Refine the sparse full-width header into a polished academic-project navigation bar without distracting from the paper content.

## Visual direction

- Use a centered floating capsule with generous but controlled horizontal spacing.
- Keep a translucent white background, subtle blur, fine border, and soft shadow.
- Use bright cobalt blue (`#2563eb`) for the HIVE-3D wordmark and navigation text, matching the supplied reference.
- Give navigation links a pale-blue hover surface and a small animated blue indicator.
- Present the Paper link as a filled cobalt-blue pill button with white text.
- Preserve the sticky behavior while leaving a small gap from the viewport edge.

## Responsive behavior

- Desktop: wordmark, centered section navigation, and Paper button share one row.
- Tablet/mobile: hide the section links as today, retain the wordmark and Paper button, reduce capsule padding, and keep the header within the viewport.

## Scope

Only the header markup and styling are affected. Paper content, section anchors, lightbox behavior, and deployment remain unchanged.

## Verification

- Add contract coverage for the floating capsule, cobalt-blue navigation, hover treatment, and filled Paper button.
- Run the full test suite and production build before publishing.
