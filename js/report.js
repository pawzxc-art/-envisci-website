(function () {
  "use strict";
  const KEY = "hag-reports";
  const BRGY = ["Abulalas","Carillo","Iba","Iba-Ibayo","Mercado","Palapat","Pugad","Sagrada Familia","San Agustin","San Isidro","San Jose","San Juan","San Miguel","San Nicolas","San Pablo","San Pascual","San Pedro","San Roque","San Sebastian","Santa Cruz","Santa Elena","Santa Monica","Santo Niño","Santo Rosario","Tampok","Tibaguin"];
  const $ = id => document.getElementById(id);
  const sel = $("brgy");
  BRGY.forEach(b => { const o = document.createElement("option"); o.textContent = b; sel.append(o); });
  $("date").max = new Date().toISOString().slice(0, 10);
  $("date").value = $("date").max;

  const cfg = (window.HAGONOY_CONFIG || {}).googleFormEmbedUrl;
  if (cfg && /^https:\/\/docs\.google\.com\/forms\//.test(cfg)) { $("gform").hidden = false; $("gform-frame").src = cfg; }

  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } };
  const save = a => { try { localStorage.setItem(KEY, JSON.stringify(a)); return true; } catch (e) { return false; } };

  function draw() {
    const list = load(), box = $("saved");
    $("count").textContent = list.length + (list.length === 1 ? " report" : " reports");
    box.replaceChildren();
    list.slice().reverse().forEach(r => {
      const d = document.createElement("div");
      d.style.cssText = "border:1px solid var(--line);border-radius:14px;padding:10px 12px;font-size:14px";
      const t = document.createElement("strong"); t.textContent = r.kind + " · " + r.barangay;
      const m = document.createElement("div"); m.className = "note"; m.textContent = r.date + " · " + r.severity;
      const p = document.createElement("div"); p.textContent = r.description.length > 140 ? r.description.slice(0, 140) + "…" : r.description;
      d.append(t, m, p); box.append(d);
    });
  }
  const setErr = (id, msg) => { $(id).textContent = msg || ""; return !!msg; };

  $("rf").addEventListener("submit", e => {
    e.preventDefault();
    let bad = false;
    bad = setErr("e-brgy", sel.value ? "" : "Please choose a barangay.") || bad;
    bad = setErr("e-date", $("date").value ? "" : "Please pick a date.") || bad;
    bad = setErr("e-kind", $("kind").value ? "" : "Please choose what you observed.") || bad;
    bad = setErr("e-desc", $("desc").value.trim().length >= 10 ? "" : "Please add a few words (at least 10 characters).") || bad;
    bad = setErr("e-consent", $("consent").checked ? "" : "Please tick to agree.") || bad;
    if (bad) { const f = document.querySelector(".err:not(:empty)"); if (f) f.scrollIntoView({ block: "center", behavior: "smooth" }); return; }
    const list = load();
    list.push({
      id: Date.now(), name: $("name").value.trim(), contact: $("contact").value.trim(), barangay: sel.value, date: $("date").value,
      kind: $("kind").value, severity: (document.querySelector("input[name=sev]:checked") || {}).value || "Minor",
      description: $("desc").value.trim(), submitted: new Date().toISOString()
    });
    if (!save(list)) { setErr("e-consent", "Could not save in this browser (storage is blocked)."); return; }
    $("rf").reset(); $("date").value = $("date").max; $("ok").classList.add("show"); $("ok").scrollIntoView({ block: "nearest", behavior: "smooth" });
    draw();
  });
  $("rf").addEventListener("reset", () => { ["e-brgy", "e-date", "e-kind", "e-desc", "e-consent"].forEach(i => setErr(i, "")); $("ok").classList.remove("show"); });

  // Neutralise spreadsheet formulas (=, +, -, @) at the start of a cell
  const cell = v => '"' + String(v == null ? "" : v).replace(/"/g, '""').replace(/^([=+\-@])/, "'$1") + '"';
  $("csv").addEventListener("click", () => {
    const list = load(); if (!list.length) return;
    const cols = ["submitted", "barangay", "date", "kind", "severity", "description", "name", "contact"];
    const csv = [cols.join(",")].concat(list.map(r => cols.map(c => cell(r[c])).join(","))).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    a.download = "hagonoy-observations.csv"; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  $("clear").addEventListener("click", () => { if (load().length && confirm("Delete all reports saved on this device?")) { save([]); draw(); } });
  draw();
})();
