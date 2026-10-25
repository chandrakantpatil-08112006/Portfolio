# Chandrakant Patil — Developer Portfolio

React + Vite + Tailwind CSS v4 + Motion + Lucide.

## Run
```bash
npm install
npm run dev      # local dev server
npm run build    # production build in /dist
npm run preview  # serve the production build
```

## Edit content (one file)
Everything lives in `src/config/site.js`: name, links, hero roles, about text, skills,
projects, education, achievements, certifications, LeetCode count, contact copy, nav.

- A link left as `""` hides its button automatically (e.g. a project `repo` or `live`).
- **Photo:** replace `public/photo.jpg` (portrait, ~3:4 works best). It shows in About and the hero JSON card.
- **Hero JSON card:** edit `hero.profileJson`; the `tools` list comes from the `Tools` skill group.
- **Projects:** `projects` is a list; each item uses `demo: 'projectforge'` or `'gesture'` for its interactive preview.
- **LeetCode topics:** edit `leetcode.topics` (name + LeetCode tag slug).
- **ProjectForge screenshots:** put images in `public/screenshots/` and list them in
  `projects.featured.screenshots` as `{ src, alt }`. They appear under the interactive preview.
- **Resume:** replace `public/Chandrakant_Patil_Resume.pdf` (keep the filename, or update `site.resume`).
- **New icons** referenced by name in the config must be added to the map in `src/components/icons.jsx`.

## Research paper + certificate (Achievements section)
Edit `research` in `src/config/site.js`: add `paperTitle`, `conference`, `location`, `year` (blank ones are hidden).
The certificate lives in `public/certificates/`: `ieee-certificate.jpg` is the preview (tilt + click-to-enlarge) and
`ieee-certificate.pdf` is the original, linked as "Open certificate PDF". Swap the files to change them.

## Webathon card (Achievements section)
`webathon` in `src/config/site.js` renders a second featured card right under the research card, using the same layout.
Its certificate is `public/certificates/technotsav-certificate.jpg`. Remove the `webathon` block to hide it.

## Notes
- Contact form has no backend; it opens the visitor's email app with the message pre-filled.
- Motion respects `prefers-reduced-motion` (MotionConfig + CSS fallbacks).
- Deploying under a sub-path (e.g. GitHub Pages)? Set `base` in `vite.config.js`.
