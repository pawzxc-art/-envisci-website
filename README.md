# Sinking Ground, Rising Water

A community-based environmental awareness website about **land subsidence in Hagonoy, Bulacan**.
Plain HTML, CSS and JavaScript: no build step. Open `index.html` or publish with GitHub Pages.

## Pages
| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Overview of land subsidence in Hagonoy, key numbers |
| About | `about.html` | Definition, why deltas are vulnerable, Hagonoy profile, rates |
| Causes & Effects | `causes-effects.html` | Groundwater extraction, flooding, infrastructure damage |
| Community Impact | `community-impact.html` | Daily life, livelihoods, barangay budget |
| Solutions | `mitigation.html` | Community actions, government initiatives, sustainable practices, checklist |
| Map | `map.html` | Google Maps embed + areas named in sources |
| Quiz & FAQ | `quiz.html` | 10-question quiz and FAQ (interactive feature) |
| Report | `report.html` | Community feedback form (prototype, optional Google Form embed) |
| References | `references.html` | Sources and photo credits |

## Connect a Google Form
Edit `js/config.js` and paste the embed URL of your Google Form. It then appears on the Report page.
Until then, reports are saved only in the visitor's browser (prototype) and can be exported as CSV.

## Structure
```
*.html            Pages
css/site.css      Design system
js/site.js        Shared header, footer, theme, scroll motion
js/quiz.js        Quiz
js/report.js      Report form (prototype storage + CSV export)
js/config.js      Google Form embed setting
img/              Photos (CC0, Wikimedia Commons) + credits.json
lessons/          Earlier Environmental Science lesson summaries site (kept for reference)
```

## Sources
Figures come from published studies and news reports listed on `references.html`. This is a student
awareness project, not an official hazard advisory.
