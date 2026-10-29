(function () {
  "use strict";
  const Q = [
    { q: "What is land subsidence?", o: ["A sudden earthquake", "The gradual or sudden sinking of the Earth's surface", "Rising of the sea only", "A type of typhoon"], a: 1,
      w: "Subsidence is the sinking of the ground surface. It can be natural or made worse by human activity." },
    { q: "Which human activity is most strongly linked to subsidence in Hagonoy and Calumpit?", o: ["Planting trees", "Groundwater extraction", "Fishing with nets", "Building bamboo walkways"], a: 1,
      w: "A satellite-radar study found sinking was fastest near high-extraction zones and pumping stations." },
    { q: "Why does pumping groundwater make land sink in a river delta?", o: ["Pumps create vibrations", "Soft clay and silt compact when water pressure drops", "The sea pulls the land down", "Wells are heavy"], a: 1,
      w: "Water helps hold the sediments apart. Remove it faster than it is replaced and they squeeze together, mostly permanently." },
    { q: "About how fast was the fastest measured sinking in Hagonoy and Calumpit (2015 to early 2021)?", o: ["About 1 mm a year", "About 12 mm a year", "About 125 mm a year", "About 5 metres a year"], a: 2,
      w: "The study reported up to about 124.5 mm per year near high-extraction zones. That is more than 12 cm a year." },
    { q: "What does 'relative sea level rise' mean?", o: ["Sea rises only because of melting ice", "Water level rises compared with the land, partly because the land sinks", "Only the tide changes", "Sea level in other countries"], a: 1,
      w: "If land sinks while the sea stays level or rises, the sea appears higher compared with the ground." },
    { q: "Hagonoy is often described as a 'catch basin'. What does that mean?", o: ["It sells fish", "Low land where river and tidal water gather and drain slowly", "A place with many hills", "A dam"], a: 1,
      w: "The town is low and flat, so floodwater from rivers, rain and tides collects and recedes slowly." },
    { q: "Which of these is a household action that helps reduce pressure on groundwater?", o: ["Leaving taps running", "Fixing leaks and using water wisely", "Digging more private wells", "Paving the whole yard"], a: 1,
      w: "Using less water lowers demand for pumping. Fixing leaks is one of the easiest steps." },
    { q: "Can subsidence usually be reversed by refilling the aquifer?", o: ["Yes, immediately", "No, compacted sediments rarely rebound, so the goal is to slow further sinking", "Only on Sundays", "Yes, with sandbags"], a: 1,
      w: "Compaction is largely permanent. That is why preventing more pumping-driven sinking matters." },
    { q: "How many barangays does Hagonoy have?", o: ["12", "18", "26", "40"], a: 2, w: "Hagonoy has 26 barangays, with a 2020 population of 133,448." },
    { q: "You notice new cracks in a wall and water on the street at high tide on a dry day. What is a good next step?", o: ["Ignore it", "Report it to your barangay and on the community form", "Post only a joke", "Move the wall"], a: 1,
      w: "Reports help the community see patterns. For danger to life, contact your barangay or DRRMO immediately." }
  ];
  const box = document.getElementById("quiz");
  let i = 0, score = 0, locked = false;
  const el = (t, c, txt) => { const e = document.createElement(t); if (c) e.className = c; if (txt != null) e.textContent = txt; return e; };

  function render() {
    box.replaceChildren();
    if (i >= Q.length) return done();
    const q = Q[i]; locked = false;
    const top = el("div", "q-top"); top.append(el("span", "", `Question ${i + 1} of ${Q.length}`), el("span", "", `Score: ${score}`));
    const bar = el("div", "q-bar"); const fill = el("i"); fill.style.width = (i / Q.length * 100) + "%"; bar.append(fill);
    const opts = el("div", "opts");
    const why = el("div", "q-why"); why.setAttribute("role", "status");
    const next = el("button", "btn teal", i === Q.length - 1 ? "See my result" : "Next question"); next.type = "button"; next.hidden = true;
    next.style.marginTop = "16px";
    q.o.forEach((t, k) => {
      const b = el("button", "opt", t); b.type = "button";
      b.addEventListener("click", () => {
        if (locked) return; locked = true;
        const ok = k === q.a; if (ok) score++;
        [...opts.children].forEach((x, n) => { x.disabled = true; if (n === q.a) x.classList.add("right"); });
        if (!ok) b.classList.add("wrong");
        why.append(el("strong", "", ok ? "Correct! " : "Not quite. "), document.createTextNode(q.w));
        next.hidden = false; next.focus();
        fill.style.width = ((i + 1) / Q.length * 100) + "%";
      });
      opts.append(b);
    });
    next.addEventListener("click", () => { i++; render(); });
    box.append(top, bar, el("div", "q-text", q.q), opts, why, next);
  }
  function done() {
    const msg = score >= 9 ? "Excellent! You are ready to teach others." : score >= 6 ? "Good work. Review the topics you missed." : "A good start. Read the About and Causes pages, then try again.";
    const wrap = el("div"); wrap.style.textAlign = "center";
    const s = el("div", "score", `${score}/${Q.length}`);
    const links = el("div", "btns"); links.style.justifyContent = "center";
    const again = el("button", "btn teal", "Try again"); again.type = "button"; again.addEventListener("click", () => { i = 0; score = 0; render(); });
    const a1 = el("a", "btn", "Review causes & effects"); a1.href = "causes-effects.html";
    const a2 = el("a", "btn primary", "Report an observation"); a2.href = "report.html";
    links.append(again, a1, a2);
    wrap.append(s, el("p", "", msg), links);
    box.append(wrap);
  }
  render();
})();
