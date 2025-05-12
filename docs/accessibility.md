# ♿ Accessibility Compliance – Project-Sage

This document outlines the accessibility strategies used in Project-Sage to ensure conformance with **WCAG 2.1 AA** and **Section 508** standards. All features were designed with inclusive, keyboard-friendly, and screen reader-accessible experiences in mind.

---

## 🔍 Accessibility Audit Tools

- **Lighthouse** (Chrome DevTools)
- **axe-core** (browser extension & CLI)
- **VoiceOver** (macOS/iOS)
- **NVDA** (Windows)

---

## 📐 Layout & Structure

- **Semantic HTML5** structure with `<main>`, `<section>`, `<nav>`, and `<header>` elements.
- Logical document flow, consistent heading hierarchy (`<h1>` to `<h3>`).
- Skip-to-content link for quick keyboard navigation.

---

## 🎹 Keyboard Navigation

- All interactive elements (buttons, modals, forms) are keyboard-operable using `Tab`, `Shift+Tab`, `Enter`, and `Esc`.
- Custom modals and dropdowns (via Radix UI) support:
  - Focus trapping within modals
  - Return focus to trigger after modal close
  - Escape key for dismissal
- No keyboard-only traps or inaccessible interactions.

---

## 🗣 Screen Reader Support

- Proper use of ARIA roles:
  - `role="dialog"`, `aria-labelledby`, `aria-describedby` on modals
  - `aria-live="polite"` for dynamic content updates (e.g., chat responses)
- Labels on all inputs via `label`, `aria-label`, or `aria-labelledby`.
- Descriptive button text — no unlabeled icons.

---

## 🌈 Visual & Color Contrast

- All foreground/background contrast ratios meet or exceed **4.5:1**.
- No information conveyed by color alone — status indicators include icons or text labels.
- Custom focus styles applied for clarity and visibility.

---

## 🧩 Dynamic Content

- Conversations update via WebSocket but follow ARIA live-region practices to ensure screen readers announce new content.
- Modals and tooltips are non-intrusive and do not interrupt focus unexpectedly.

---

## 🧪 Manual Testing Coverage

Tested across:

- Keyboard-only navigation flows
- Screen reader sessions (NVDA and VoiceOver)
- High-contrast mode (Windows)
- Mobile screen readers (iOS VoiceOver)

---

## 📝 Known Gaps or Limitations

> _Currently tracking any limitations or planned enhancements here._

- [ ] Add region landmarks to page containers for clearer assistive navigation.
- [ ] Implement visual indicators for current focus in mobile modals.

---

## 📎 References

- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [Section 508 Standards](https://www.section508.gov/manage/laws-and-policies/)
- [Deque University](https://dequeuniversity.com/)
