/* Shared shell: header, footer, theme, scroll motion. Markup here is static and authored in this file. */
(function () {
  "use strict";
  const doc = document, root = doc.documentElement;
  root.classList.add("js");

  const PAGES = [
    ["home", "index.html", "Home"], ["about", "about.html", "About"],
    ["causes", "causes-effects.html", "Causes & Effects"], ["impact", "community-impact.html", "Impact"],
    ["solutions", "mitigation.html", "Solutions"], ["map", "map.html", "Map"],
    ["quiz", "quiz.html", "Quiz & FAQ"], ["report", "report.html", "Report"],
    ["refs", "references.html", "References"]
  ];
  const current = doc.body.dataset.page;

  /* theme */
  try { const t = localStorage.getItem("hag-theme"); if (t === "light" || t === "dark") root.dataset.theme = t; } catch (e) {}

  const header = doc.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="wrap bar">
      <a class="brand" href="index.html" aria-label="Sinking Ground, Rising Water: home">
        <span class="brand-mark" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/><path d="M9 15l2 2 4-4"/></svg></span>
        <span>Sinking Ground<small>Land subsidence in Hagonoy, Bulacan</small></span>
      </a>
      <nav class="main" id="nav" aria-label="Main">${PAGES.map(([k, href, label]) =>
        `<a href="${href}"${k === current ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav>
      <button class="icon-btn" id="theme" type="button" aria-label="Toggle light or dark theme">◐</button>
      <button class="icon-btn menu-btn" id="menu" type="button" aria-label="Open menu" aria-expanded="false">☰</button>
    </div>`;
  const prog = doc.createElement("div"); prog.id = "progress"; prog.setAttribute("aria-hidden", "true");
  const skip = doc.createElement("a"); skip.className = "skip"; skip.href = "#main"; skip.textContent = "Skip to content";
  doc.body.prepend(header); doc.body.prepend(prog); doc.body.prepend(skip);

  const footer = doc.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="wrap foot">
      <div><h4>Sinking Ground, Rising Water</h4>
        <p>A community awareness project about land subsidence in Hagonoy, Bulacan. Built for learning; it is not an official hazard advisory.</p></div>
      <div><h4>Explore</h4>${PAGES.slice(1, 6).map(([, h, l]) => `<a href="${h}">${l}</a>`).join("")}</div>
      <div><h4>Take part</h4><a href="quiz.html">Test your knowledge</a><a href="report.html">Report an observation</a><a href="references.html">Sources &amp; credits</a></div>
    </div>
    <div class="wrap" style="margin-top:22px"><span class="note">Environmental Science project · Photos from Wikimedia Commons (credited on each page). Figures come from the cited studies and news reports and may change as new data is published.</span></div>`;
  doc.body.append(footer);

  const toTop = doc.createElement("button");
  toTop.className = "to-top"; toTop.type = "button"; toTop.setAttribute("aria-label", "Back to top"); toTop.textContent = "↑";
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  doc.body.append(toTop);

  doc.getElementById("theme").addEventListener("click", () => {
    const dark = (root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark";
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("hag-theme", root.dataset.theme); } catch (e) {}
  });
  const nav = doc.getElementById("nav"), menu = doc.getElementById("menu");
  menu.addEventListener("click", () => { const o = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", String(o)); });
  nav.addEventListener("click", e => { if (e.target.tagName === "A") nav.classList.remove("open"); });

  /* scroll: progress bar, header shadow, hero parallax, back-to-top */
  let tick = false;
  function onScroll() {
    if (tick) return; tick = true;
    requestAnimationFrame(() => {
      tick = false;
      const m = root.scrollHeight - innerHeight;
      prog.style.transform = `scaleX(${m > 0 ? Math.min(1, scrollY / m) : 0})`;
      header.classList.toggle("scrolled", scrollY > 20);
      toTop.classList.toggle("show", scrollY > 600);
      const hero = doc.querySelector(".hero-img");
      if (hero && scrollY < 900) hero.style.setProperty("--py", (scrollY * 0.16).toFixed(1) + "px");
    });
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* reveal on scroll, with a fail-safe so content is never left hidden */
  const targets = [...doc.querySelectorAll(".reveal, .diagram")];
  doc.querySelectorAll(".grid, .steps, .stats").forEach(g => [...g.children].forEach((c, i) => { c.classList.add("reveal"); c.style.setProperty("--i", Math.min(i, 8)); targets.push(c); }));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    targets.forEach(t => io.observe(t));
  }
  // Fail-safe: if the observer never fires, reveal whatever is on screen. Items further down still animate on scroll.
  setTimeout(() => targets.forEach(t => { if (t.getBoundingClientRect().top < innerHeight * 1.1) t.classList.add("in"); }), 1500);
  if (!("IntersectionObserver" in window)) targets.forEach(t => t.classList.add("in"));
})();
