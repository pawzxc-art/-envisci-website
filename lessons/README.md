# Environmental Science Lessons: 1st Sem, A.Y. 2026–2027

A modern, infographic-style website for all uploaded Environmental Science lesson decks.

- **6 topic categories**, **10 lessons**, **11 decks**, **382 slides**
- Infographic summaries (cards, steps, bar charts, donut charts, tables, key terms)
- Full slide-by-slide text view, original PDF viewer, and PPTX/PDF downloads
- Search across lessons, key terms, and slide text
- Light and dark themes, responsive for phones

## Run locally
Open `index.html` in a browser. No build step or install is needed.

## Structure
```
index.html          Page shell
css/styles.css      Design system (palette, layout, components)
js/data.js          All lesson content and slide text (generated)
js/app.js           Routing, search, filters, slide viewer
files/pdf/          PDF versions of each deck (used by the viewer)
files/pptx/         Original PowerPoint files (downloads)
.nojekyll           Tells GitHub Pages to serve files as-is
```

## Publish with GitHub Pages
Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, folder: `/ (root)` → Save.
The site will be live at `https://<your-username>.github.io/<repo-name>/`.
