# CORNERSTONE — About Page Presentation

Author: Project Team
Date: 2025-12-07

---

## Quick Summary
- Purpose: Explain the `about.html` page — its purpose, structure, accessibility improvements, and next steps.
- Goal of presentation: show what changed, why it matters, and be ready to answer technical and product questions.

---

## Slide-by-Slide Outline (slides & speaker notes)

### Slide 1 — Title
- Title: "About — CORNERSTONE"
- Speaker: One-line elevator pitch: "This page tells our story, shows our values, and introduces the people behind CORNERSTONE."

Speaker script (30s):
"Welcome — the About page is designed to build trust and invite visitors to engage with our mission. I'll walk through structure, recent improvements, and recommended next steps."

---

### Slide 2 — Page Purpose
- Bullet points:
  - Build trust and credibility
  - Communicate mission and values
  - Encourage users to get involved

Script (20s):
"This page's primary role is storytelling — it explains who we are, why we exist, and provides clear next steps for the visitor."

---

### Slide 3 — Header & Navigation
- Show header markup: `<header class="header"><nav class="nav-container">...`
- Visual-only mobile hamburger added (no JS)

Script (20s):
"Header is consistent across pages. For mobile we added a visual hamburger button via CSS; it's intentionally non-functional to avoid new JS dependencies."

Talking point: `aria-label` used on the hamburger; `aria-expanded` left `false` until a functional toggle is added.

---

### Slide 4 — Hero Section
- Elements: subtitle, H1, supporting paragraph
- Recent change: stronger dark overlay and increased text-shadow to improve color contrast (pure CSS)
- Background image loaded via external URL for portability

Script (30s):
"To ensure readability over a busy background, I increased the overlay opacity and text-shadow in `css/style.css`. This was done with CSS only to keep the site simple and performant."

---

### Slide 5 — Philosophy & Quote
- Contains short narrative and the quote block (Psalm 118:22)
- Semantic HTML ensures screen readers read the quote naturally

Script (15s):
"Short, powerful text supports the emotional connection and frames the organization's values."

---

### Slide 6 — Team
- Title: "The People Behind CORNERSTONE"
- Updated names: Bisrat Beriso; Bethe Bayou; Abreham Nigus; Rachel Pillar
- Photo placeholders: FontAwesome icons (decorative, `aria-hidden="true"`)

Script (30s):
"Team section introduces leaders. Icons are placeholders; if you want, we can replace them with real images and `alt` text."

---

### Slide 7 — Values & Feature Cards
- Three cards: Transparency, Integrity, Sustainability
- Grid layout via CSS Grid

Script (15s):
"Cards follow consistent styling for clear scanning; they emphasize our core principles."

---

### Slide 8 — Call to Action & Footer
- CTA: "Join Our Foundation" links to `involved.html`
- Footer: contact info, quick links, social links

Script (15s):
"CTA and footer are consistent across pages to drive conversions and provide contact paths."

---

### Slide 9 — Technical Notes
- CSS: variables, grid/flex, responsive breakpoints (1024px / 768px / 968px)
- No JS added — site remains static
- External assets: Space Grotesk font, FontAwesome, external images

Script (30s):
"Styling uses CSS variables for consistent theming; layout uses Grid and Flexbox. We deliberately avoided adding JavaScript."

---

### Slide 10 — Accessibility & Performance
- Accessibility: `lang="en"`, `aria-hidden` for decorative icons, improved contrast
- Recommendations: convert content images to `<img alt="...">`, add skip link, test with screen readers
- Performance: optimize images, avoid duplicate imports of FontAwesome

Script (30s):
"We made initial accessibility fixes and have clear next steps to improve coverage and performance."

---

### Slide 11 — Next Steps & Roadmap
- Make mobile menu functional (JS or CSS checkbox hack)
- Integrate forms and donations with a backend or third-party (Stripe/PayPal)
- Replace icon placeholders with real photos (optimized)
- Run Lighthouse and axe accessibility audits

Script (20s):
"Proposed next steps include wiring forms and making the mobile menu functional. I can implement any of these on request."

---

## Live Demo Steps (what to open during the presentation)
1. Open the project folder and open `about.html` in your browser (double-click or use a simple local server).
2. Resize the browser window to show the mobile header with the hamburger icon.
3. Scroll to the Team section to show updated names.
4. Point to the hero and describe the overlay change (explain CSS `::before` overlay).

Optional server command (if you prefer a local server):

```powershell
# from project root (Windows PowerShell)
python -m http.server 8000
# then open http://localhost:8000/web/about.html
```

---

## Anticipated Questions & Suggested Answers

Q: Why use an external image instead of bundling the file?
A: External images keep the repo light and make it easy to swap images without committing large binary files. If preferred, we can download and optimize local copies for reliability.

Q: Why is the mobile hamburger not functional?
A: You requested no JavaScript; the hamburger is visual-only. We can make it functional later with a small JS toggle or a CSS-only checkbox approach (accessibility tradeoffs apply).

Q: Are forms production-ready?
A: Not yet — the sign-up, sign-in, and volunteer forms are static and need backend endpoints or third-party integrations to process and store data securely.

Q: How was contrast improved without JS?
A: By increasing the `.hero::before` overlay opacity and boosting `text-shadow` values in `css/style.css` to ensure readable text over images.

Q: How will you ensure accessibility?
A: Next steps: replace content background images with `<img alt="...">` where appropriate, add a skip link, ensure keyboard navigation for menus, and run automated accessibility checks (axe/Lighthouse).

Q: Any security concerns with external assets?
A: Use HTTPS for external resources (we do). For critical assets or compliance reasons, self-hosting assets is recommended.

---

## Presenter Cheat-sheet (one-line cues for each slide)
1. Title — elevator pitch
2. Purpose — build trust / convert
3. Header — visual-only hamburger
4. Hero — CSS contrast fix
5. Philosophy — quote + narrative
6. Team — updated names, icons as placeholders
7. Values — three cards
8. CTA + Footer — conversions
9. Tech notes — CSS-focused, no JS
10. Accessibility — what we fixed; next steps
11. Next steps — forms, menu, integration

---

## Checklist before presenting
- [ ] Open `about.html` in browser and check hero visuals
- [ ] Resize window to show mobile header
- [ ] Confirm team names visible
- [ ] Ensure network access to external images/fonts
- [ ] (Optional) Start a local server to avoid blocked file:// restrictions

---

## Files changed (for reference)
- `css/style.css` — hero overlay and text shadow changes, mobile hamburger CSS
- `index.html` — updated gallery images and banner background
- `about.html` — updated team names, added nav hamburger
- `involved.html`, `signin.html`, `signup.html` — added nav hamburger

---

## Notes & Contact
- If you want a printable single-page speaker sheet or a slide deck (PowerPoint/Google Slides), tell me which format and I will produce it.

Good luck with your presentation — tell me if you want the one-line script for each slide or a printable single-page sheet next.
