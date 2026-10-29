(function () {
  "use strict";

  const D = window.ENVISCI;
  const CAT = Object.fromEntries(D.categories.map(c => [c.id, c]));
  const LESSONS = D.lessons;
  const app = document.getElementById("app");
  const root = document.documentElement;

  /* ---------- tiny DOM helper (never injects raw HTML) ---------- */
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v === null || v === undefined || v === false) continue;
        if (k === "class") el.className = v;
        else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
        else el.setAttribute(k, v === true ? "" : v);
      }
    }
    for (const kid of kids.flat()) {
      if (kid === null || kid === undefined || kid === false) continue;
      el.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
    }
    return el;
  }
  const catStyle = c => `--c:${c.color};--c2:${c.deep}`;
  const ART = window.ENVISCI_ART;
  /* Art strings are authored in art.js (static), so innerHTML is safe here. */
  function art(cls, svg) { const d = h("div", { class: cls, "aria-hidden": "true" }); d.innerHTML = svg; return d; }
  const PH = window.ENVISCI_PHOTOS || {};
  /* Real photo with the drawn scene as a fallback if the image is missing. */
  function photo(cls, id, alt) {
    const box = art(cls, ART.scenes[id]);
    const img = h("img", { src: "files/img/" + id + ".jpg", alt: alt || "", loading: cls === "hero-photo" ? "eager" : "lazy", decoding: "async" });
    img.addEventListener("load", () => { box.replaceChildren(img); box.classList.add("loaded"); });
    return box;
  }
  const credit = id => PH[id] ? h("a", { class: "credit", href: PH[id].page, target: "_blank", rel: "noopener" },
    "Photo: " + PH[id].artist + " · " + PH[id].license) : null;
  const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;

  /* ---------- theme ---------- */
  function initTheme() {
    try {
      const saved = localStorage.getItem("envisci-theme");
      if (saved === "light" || saved === "dark") root.dataset.theme = saved;
    } catch (e) { /* storage unavailable: fine */ }
  }
  function toggleTheme() {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = root.dataset.theme || (systemDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("envisci-theme", next); } catch (e) { /* ignore */ }
  }
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

  /* ---------- search index ---------- */
  LESSONS.forEach(L => {
    const parts = [L.title, L.summary, ...L.terms.map(t => t.t + " " + t.d)];
    L.sections.forEach(s => {
      parts.push(s.title || "");
      (s.items || []).forEach(it => parts.push(typeof it === "string" ? it : (it.t || "") + " " + (it.d || "") + " " + (it.label || "")));
      if (s.text) parts.push(s.text);
      if (s.rows) s.rows.forEach(r => parts.push(r.join(" ")));
    });
    L._searchText = parts.join(" ").toLowerCase();
  });

  function slideHit(L, q) {
    for (const deck of L.decks) {
      for (const s of deck.slides) {
        const line = s.lines.find(l => l.toLowerCase().includes(q));
        if (line) return { slide: s.n, text: line };
      }
    }
    return null;
  }

  function snippetAround(text, q) {
    const i = text.toLowerCase().indexOf(q);
    if (i < 0) return text.slice(0, 120);
    const start = Math.max(0, i - 50), end = Math.min(text.length, i + q.length + 70);
    return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
  }

  /* ---------- HOME ---------- */
  let homeState = { q: "", cat: "all" };

  function renderHome() {
    document.title = "Environmental Science Lessons | 1st Sem 2026–2027";
    const t = D.totals;

    const hero = h("section", { class: "hero has-art", style: "--c:#1B998B;--c2:#0B5C53" },
      photo("hero-photo", "L1", "Earth seen from space"), credit("L1"),
      h("span", { class: "eyebrow" }, "🌎 " + D.course + " · " + D.term),
      h("h1", null, "Every lesson, turned into a visual guide."),
      h("p", { class: "lede" }, "Browse all " + plural(t.lessons, "lesson") + " and " + plural(t.files, "uploaded deck") +
        " by topic. Read the infographic summaries, flip through each slide, or open the original PowerPoint."),
      h("div", { class: "stats" },
        stat(t.lessons, "Lessons"), stat(t.files, "Decks"), stat(t.slides, "Slides"), stat(D.categories.length, "Topics"))
    );

    const searchInput = h("input", {
      type: "search", id: "q", placeholder: "Search lessons, terms, or slide text (e.g., “ozone”, “Magat”, “RA 9003”)",
      "aria-label": "Search lessons and slides", autocomplete: "off", value: homeState.q
    });
    const counter = h("span", { class: "count", id: "count" });
    searchInput.addEventListener("input", e => { homeState.q = e.target.value; renderResults(); });

    const chipEls = [{ id: "all", name: "All topics", color: "#13231D" }, ...D.categories].map(c =>
      h("button", {
        class: "chip", type: "button", "aria-pressed": String(homeState.cat === c.id),
        style: c.id === "all" ? "--c:#13231D" : `--c:${c.color}`,
        onclick: () => { homeState.cat = c.id; chipEls.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.id === c.id))); renderResults(); },
        "data-id": c.id
      }, c.id === "all" ? "All topics" : `${c.emoji} ${c.name}`)
    );

    const toolbar = h("div", { class: "toolbar" },
      h("label", { class: "search" },
        h("svg", { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, "aria-hidden": "true" },
          h("circle", { cx: 11, cy: 11, r: 7 }), h("path", { d: "M20 20l-3.5-3.5" })),
        searchInput, counter),
      h("div", { class: "chips", role: "group", "aria-label": "Filter by topic" }, chipEls)
    );

    const results = h("div", { id: "results" });
    const library = renderLibrary();

    app.replaceChildren(hero, toolbar, results, library);
    renderResults();
    function renderResults() {
      const q = homeState.q.trim().toLowerCase();
      const list = LESSONS.filter(L => homeState.cat === "all" || L.cat === homeState.cat)
        .map(L => {
          if (!q) return { L, snip: null, ok: true };
          const inMeta = L._searchText.includes(q);
          const hit = slideHit(L, q);
          return { L, snip: hit ? `Found on slide ${hit.slide}: “${snippetAround(hit.text, q)}”` : null, ok: inMeta || !!hit };
        })
        .filter(x => x.ok);
      requestAnimationFrame(() => { prepMotion(); observeReveals(); });
      counter.textContent = q ? `${list.length} of ${LESSONS.length}` : "";
      results.replaceChildren();
      if (!list.length) {
        results.append(h("div", { class: "empty" }, "No lessons match “" + homeState.q + "”. Try another word."));
        return;
      }
      const cats = D.categories.filter(c => list.some(x => x.L.cat === c.id));
      cats.forEach(c => {
        const items = list.filter(x => x.L.cat === c.id);
        results.append(h("section", { class: "cat-block reveal", style: catStyle(c) },
          h("div", { class: "cat-head" },
            art("cat-art", ART.catArt[c.id]),
            h("div", { class: "cat-emoji", "aria-hidden": "true" }, c.emoji),
            h("div", null, h("h2", null, c.name), h("p", null, c.blurb)),
            h("span", { class: "cat-count" }, plural(items.length, "lesson"))),
          h("div", { class: "lessons" }, items.map(x => lessonCard(x.L, x.snip)))));
      });
    }
  }

  function stat(v, l) { return h("div", { class: "stat" }, h("b", null, String(v)), h("span", null, l)); }

  function lessonCard(L, snip) {
    const c = CAT[L.cat];
    return h("a", { class: "lcard", href: "#/lesson/" + L.id, style: catStyle(c) },
      h("div", { class: "lcard-top" },
        photo("lcard-art", L.id, L.title),
        h("span", { class: "lcard-emoji", "aria-hidden": "true" }, L.emoji),
        h("span", { class: "lcard-num" }, "Lesson " + L.num)),
      h("div", { class: "lcard-body" },
        h("h3", null, L.title),
        h("p", { class: "lcard-sum" }, L.summary),
        snip ? h("p", { class: "snip" }, snip) : null),
      h("div", { class: "lcard-foot" },
        h("span", { class: "pill" }, plural(L.slideCount, "slide")),
        L.decks.length > 1 ? h("span", { class: "pill ghost" }, L.decks.length + " versions") : null,
        h("span", { class: "go" }, "Open →")));
  }

  function renderLibrary() {
    const rows = [];
    LESSONS.forEach(L => L.decks.forEach(deck => rows.push({ L, deck })));
    return h("section", { class: "panel section-gap", id: "library" },
      h("h2", null, "All uploaded files"),
      h("p", { class: "panel-sub" }, "Every .pptx you uploaded, with a viewer and a download link."),
      h("div", { class: "tablewrap" },
        h("table", null,
          h("thead", null, h("tr", null,
            h("th", null, "Lesson"), h("th", null, "Deck"), h("th", null, "Slides"), h("th", null, "Open"), h("th", null, "Download"))),
          h("tbody", null, rows.map(({ L, deck }) =>
            h("tr", null,
              h("td", null, L.num + ". " + L.title),
              h("td", null, deck.label === "Slides" ? "Main deck" : deck.label),
              h("td", { class: "num" }, String(deck.slideCount)),
              h("td", null, h("a", { class: "lib-link", href: "#/lesson/" + L.id }, "View lesson")),
              h("td", null,
                h("a", { class: "dl", href: deck.pdf, download: "" }, "PDF"),
                h("a", { class: "dl", href: deck.pptx, download: "" }, "PPTX"))))))));
  }

  /* ---------- LESSON ---------- */
  let deckIndex = 0;
  let viewMode = "slides";
  let slideQuery = "";
  let currentLessonId = null;

  function renderLesson(id) {
    const L = LESSONS.find(x => x.id === id);
    if (!L) return renderHome();
    if (currentLessonId !== id) { deckIndex = 0; viewMode = "slides"; slideQuery = ""; currentLessonId = id; }
    const c = CAT[L.cat];
    document.title = `${L.num}. ${L.title} | EnviSci Lessons`;

    const idx = LESSONS.indexOf(L);
    const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];

    const notice = L.file_note ? h("div", { class: "notice", style: catStyle(c) },
      h("span", { "aria-hidden": "true" }, "ℹ️"),
      h("div", null, h("b", null, "About this file: "), L.file_note)) : null;

    const hero = h("section", { class: "hero has-art", style: catStyle(c) },
      photo("hero-photo", L.id, L.title), credit(L.id),
      h("span", { class: "eyebrow" }, c.emoji + " " + c.name + " · Lesson " + L.num),
      h("h1", { class: "sm" }, L.title),
      h("p", { class: "lede" }, L.summary),
      h("div", { class: "stats" }, L.stats.map(s => stat(s.v, s.l))));

    const crumbs = h("nav", { class: "crumbs", "aria-label": "Breadcrumb" },
      h("a", { href: "#/" }, "← All lessons"), h("span", { class: "muted" }, "/"),
      h("span", null, c.name));

    const sections = h("div", { class: "grid-sections" }, L.sections.map(s => renderSection(s, c)));

    const terms = h("section", { class: "panel" },
      h("h2", null, icon({ title: "key", type: "" }), "Key terms"),
      h("div", { class: "terms" }, L.terms.map(t => h("div", { class: "term", style: catStyle(c) },
        h("h4", null, t.t), h("p", null, t.d)))));

    const library = h("section", { class: "panel section-gap", id: "slides" },
      h("h2", null, "Slides"),
      h("p", { class: "panel-sub" }, "Read every slide as text, view the original layout as PDF, or download the .pptx."),
      h("div", { id: "deck-area" }));

    const pager = h("nav", { class: "pager", "aria-label": "Lesson navigation" },
      prev ? h("a", { href: "#/lesson/" + prev.id },
        h("small", null, "← Previous"), h("span", null, prev.emoji + " " + prev.num + ". " + prev.title)) : h("span"),
      next ? h("a", { href: "#/lesson/" + next.id, class: "next" },
        h("small", null, "Next →"), h("span", null, next.emoji + " " + next.num + ". " + next.title)) : h("span"));

    app.replaceChildren(...[crumbs, hero, notice, sections, terms, library, pager].filter(Boolean));
    app.style.setProperty("--c", c.color);
    renderDeckArea(L, c);
    window.scrollTo(0, 0);
  }

  function renderDeckArea(L, c) {
    const area = document.getElementById("deck-area");
    if (!area) return;
    const deck = L.decks[deckIndex];

    const tabs = L.decks.length > 1 ? h("div", { class: "deck-tabs", role: "tablist", "aria-label": "Lesson versions" },
      L.decks.map((d, i) => h("button", {
        class: "chip", type: "button", role: "tab", "aria-selected": String(i === deckIndex),
        "aria-pressed": String(i === deckIndex),
        onclick: () => { deckIndex = i; viewMode = "slides"; slideQuery = ""; renderDeckArea(L, c); }
      }, `${d.label} (${plural(d.slideCount, "slide")})`))) : null;

    const seg = h("div", { class: "seg", role: "group", "aria-label": "View mode" },
      h("button", { type: "button", "aria-pressed": String(viewMode === "slides"),
        onclick: () => { viewMode = "slides"; renderDeckArea(L, c); } }, "Slide text"),
      h("button", { type: "button", "aria-pressed": String(viewMode === "pdf"),
        onclick: () => { viewMode = "pdf"; renderDeckArea(L, c); } }, "Original (PDF)"));

    const search = h("input", { class: "slide-search", type: "search", placeholder: "Search this deck…",
      "aria-label": "Search slides in this deck", value: slideQuery, autocomplete: "off" });
    search.addEventListener("input", e => { slideQuery = e.target.value; renderSlides(); });

    const downloads = h("div", { class: "btn-row" },
      h("a", { class: "btn primary", href: deck.pptx, download: "" }, "⬇ Download PPTX"),
      h("a", { class: "btn", href: deck.pdf, download: "" }, "⬇ PDF"));

    const tools = h("div", { class: "lib-tools" }, seg, downloads);
    const body = h("div", { id: "deck-body" });

    area.replaceChildren(tabs || "", tools, viewMode === "slides" ? search : "", body);
    area.style.setProperty("--c", c.color);
    area.style.setProperty("--c2", c.deep);
    renderSlides();

    function renderSlides() {
      if (viewMode === "pdf") {
        body.replaceChildren(
          h("iframe", { class: "pdf-frame", src: deck.pdf + "#view=FitH", title: `${L.title}: ${deck.label}`, loading: "lazy" }),
          h("p", { class: "pdf-fallback" }, "Can’t see the preview? ",
            h("a", { href: deck.pdf, target: "_blank", rel: "noopener" }, "Open the PDF in a new tab"), "."));
        return;
      }
      const q = slideQuery.trim().toLowerCase();
      const shown = deck.slides.filter(s => !q || s.lines.join(" ").toLowerCase().includes(q));
      body.replaceChildren(
        shown.length
          ? h("div", { class: "slide-list" }, shown.map(s => slideCard(s)))
          : h("div", { class: "empty" }, "No slides match “" + slideQuery + "”."),
        h("p", { class: "pdf-fallback" }, `Showing ${shown.length} of ${deck.slideCount} slides.`));
    }
  }

  function slideCard(s) {
    const [first, ...rest] = s.lines;
    let content;
    if (!first) {
      content = h("p", { class: "muted" }, "Image-only slide" + (s.pics ? ` (${plural(s.pics, "picture")})` : ""));
    } else if (first.length <= 90 && !first.includes(" | ")) {
      content = [h("h4", null, first), rest.length ? h("ul", null, rest.map(t => h("li", null, t))) : null];
    } else {
      content = h("ul", null, s.lines.map(t => h("li", null, t)));
    }
    return h("article", { class: "slide" },
      h("div", { class: "slide-no", "aria-label": "Slide " + s.n }, String(s.n)),
      h("div", { class: "slide-body" }, content));
  }

  /* ---------- SECTION RENDERERS (infographic blocks) ---------- */
  function icon(s) {
    const i = h("span", { class: "h-icon", "aria-hidden": "true" });
    i.innerHTML = ART.glyphFor(s.title, s.type);
    return i;
  }
  function renderSection(s, c) {
    let body;
    switch (s.type) {
      case "cards":
        body = h("div", { class: "cards" }, s.items.map(it => h("div", { class: "mini", style: catStyle(c) },
          h("h4", null, it.t), h("p", null, it.d))));
        break;
      case "steps":
        body = h("ol", { class: "steps", style: catStyle(c) }, s.items.map((t, i) =>
          h("li", null, h("span", { class: "step-n" }, String(i + 1)), h("span", { class: "step-t" }, t))));
        break;
      case "bars": {
        const max = s.max || Math.max(...s.items.map(i => i.value));
        body = h("div", { class: "bars", style: catStyle(c) }, s.items.map(it => {
          const w = Math.max(2, Math.min(100, (it.value / max) * 100));
          const fill = h("div", { class: "bar-fill" });
          fill.style.setProperty("--w", w + "%");
          return h("div", { class: "bar-row" },
            h("span", { class: "bar-label" }, it.label),
            h("div", { class: "bar-track", role: "img", "aria-label": `${it.label}: ${it.display}` }, fill),
            h("span", { class: "bar-value" }, it.display));
        }));
        break;
      }
      case "donut": {
        const total = s.items.reduce((a, b) => a + b.value, 0);
        let acc = 0;
        const stops = s.items.map(it => {
          const start = (acc / total) * 100; acc += it.value;
          const end = (acc / total) * 100;
          return `${it.color} ${start}% ${end}%`;
        }).join(",");
        body = h("div", { class: "donut-wrap" },
          h("div", { class: "donut", style: `background:conic-gradient(${stops})`, "data-center": s.center, role: "img",
            "aria-label": s.items.map(i => `${i.label} ${i.value}%`).join(", ") }),
          h("div", { class: "legend" }, s.items.map(it => h("div", null,
            h("i", { style: `background:${it.color}` }), h("span", null, it.label), h("b", null, it.value + "%")))));
        break;
      }
      case "table":
        body = h("div", { class: "tablewrap", style: catStyle(c) },
          h("table", null,
            h("thead", null, h("tr", null, s.head.map(x => h("th", null, x)))),
            h("tbody", null, s.rows.map(r => h("tr", null, r.map((cell, i) => h(i === 0 ? "th" : "td", { scope: i === 0 ? "row" : null }, cell)))))));
        break;
      case "pills":
        body = h("div", { class: "pills", style: catStyle(c) }, s.items.map(t => h("span", null, t)));
        break;
      case "callout":
        return h("section", { class: "callout reveal", style: catStyle(c) }, h("strong", null, icon(s), s.title), h("p", null, s.text));
      default:
        body = h("p", null, "");
    }
    return h("section", { class: "panel reveal", style: catStyle(c) },
      h("h2", null, icon(s), s.title), body);
  }

  /* ---------- motion: scroll reveal + reading progress ---------- */
  const bar = document.getElementById("progress");
  window.addEventListener("scroll", () => {
    const m = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${m > 0 ? Math.min(1, scrollY / m) : 0})`;
  }, { passive: true });
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -8% 0px" }) : null;
  function revealAll() { app.querySelectorAll(".reveal:not(.in)").forEach(el => el.classList.add("in")); }
  function observeReveals() {
    setTimeout(revealAll, 1200);   // fail-safe: never leave content hidden
    app.querySelectorAll(".reveal:not(.in)").forEach(el => io ? io.observe(el) : el.classList.add("in"));
  }

  /* Parallax on hero photo */
  window.addEventListener("scroll", () => {
    const p = app.querySelector(".hero-photo");
    if (p && scrollY < 900) p.style.setProperty("--py", (scrollY * 0.18).toFixed(1) + "px");
  }, { passive: true });

  /* Stagger children, and count up hero numbers */
  function prepMotion() {
    app.querySelectorAll(".cards,.terms,.lessons,.pills,.steps,.slide-list").forEach(box =>
      [...box.children].slice(0, 24).forEach((k, i) => { k.classList.add("stag"); k.style.setProperty("--i", i); }));
    app.querySelectorAll(".panel,.cat-block,.lessons").forEach(el => el.classList.contains("reveal") || el.classList.add("reveal"));
  }

  /* ---------- extra motion: header, back-to-top, parallax, card tilt ---------- */
  const topbar = document.querySelector(".topbar");
  const toTop = h("button", { class: "to-top", type: "button", "aria-label": "Back to top",
    onclick: () => window.scrollTo({ top: 0, behavior: "smooth" }) }, "↑");
  document.body.append(toTop);
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      topbar.classList.toggle("scrolled", scrollY > 24);
      toTop.classList.toggle("show", scrollY > 600);
      app.querySelectorAll(".cat-art").forEach(el => {          // drift banner art against scroll
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight) el.style.setProperty("--ty", ((r.top - innerHeight / 2) * -0.08).toFixed(1) + "px");
      });
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (matchMedia("(hover:hover)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    app.addEventListener("pointermove", e => {                  // subtle 3D tilt on cards
      const c = e.target.closest && e.target.closest(".lcard");
      if (!c) return;
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `translateY(-4px) perspective(800px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
    });
    app.addEventListener("pointerout", e => {
      const c = e.target.closest && e.target.closest(".lcard");
      if (c && !c.contains(e.relatedTarget)) c.style.transform = "";
    });
  }

  /* ---------- router ---------- */
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    if (parts[0] === "lesson" && parts[1]) renderLesson(parts[1]);
    else { currentLessonId = null; renderHome(); }
    if (parts.length === 0 || parts[0] !== "lesson") window.scrollTo(0, 0);
    prepMotion();
    observeReveals();
    app.classList.remove("page-in"); void app.offsetWidth; app.classList.add("page-in");
  }
  window.addEventListener("hashchange", route);
  initTheme();
  route();
})();
