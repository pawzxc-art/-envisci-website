/* Original SVG illustrations: one scene per lesson, one glyph per section topic.
   All markup here is static and authored in this file (safe to inject). */
(function () {
  "use strict";
  const W = "rgba(255,255,255,", SUN = "#FFD479", LEAF = "#8EE3C2", AQUA = "#7CC4FF", CLAY = "#F2A488";
  const wrap = body => `<svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${body}</svg>`;
  const hills = (y, o) => `<path d="M0 ${y} C 80 ${y - 40}, 140 ${y - 10}, 210 ${y - 30} S 340 ${y - 50}, 400 ${y - 15} V220 H0Z" fill="${W}${o})"/>`;

  const scenes = {
    /* 1 · Nature of Environmental Science: globe, orbit, leaf */
    L1: wrap(`
      <circle cx="285" cy="105" r="118" fill="${W}.07)"/>
      <circle cx="285" cy="105" r="78" fill="${W}.16)"/>
      <path d="M232 92c14-22 40-26 52-14 10 10-2 22 6 32s30 6 36 22c-14 26-52 34-80 18-18-10-26-40-14-58z" fill="${LEAF}" opacity=".9"/>
      <path d="M300 56c10-6 26-4 32 6-8 8-26 10-32-6z" fill="${LEAF}" opacity=".8"/>
      <ellipse cx="285" cy="105" rx="150" ry="34" fill="none" stroke="${W}.5)" stroke-width="2" stroke-dasharray="3 7" transform="rotate(-18 285 105)"/>
      <circle cx="418" cy="62" r="0"/>
      <circle cx="157" cy="143" r="9" fill="${SUN}"/>
      <path d="M30 190c40-30 90-30 130 0" stroke="${W}.35)" stroke-width="2" fill="none"/>
      <path d="M52 176c10-26 30-34 44-30-2 18-20 34-44 30z" fill="${LEAF}" opacity=".85"/>
      <path d="M52 176c14-10 26-18 40-28" stroke="${W}.7)" stroke-width="1.5" fill="none"/>`),

    /* 2 · Population Ecology: growth curves and dots */
    L2: wrap(`
      <path d="M40 180H380M40 180V36" stroke="${W}.45)" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M44 176C120 172 150 150 190 100S280 52 372 50" stroke="${SUN}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M44 176C140 170 200 160 240 120S320 58 372 46" stroke="${W}.55)" stroke-width="3" fill="none" stroke-dasharray="2 8" stroke-linecap="round"/>
      <path d="M44 56H376" stroke="${W}.35)" stroke-width="2" stroke-dasharray="6 6"/>
      <g fill="${LEAF}"><circle cx="90" cy="160" r="5"/><circle cx="104" cy="152" r="5"/><circle cx="98" cy="168" r="5"/>
      <circle cx="170" cy="130" r="5"/><circle cx="184" cy="122" r="5"/><circle cx="176" cy="142" r="5"/><circle cx="192" cy="136" r="5"/><circle cx="160" cy="118" r="5"/>
      <circle cx="262" cy="86" r="5"/><circle cx="276" cy="78" r="5"/><circle cx="270" cy="96" r="5"/><circle cx="286" cy="90" r="5"/><circle cx="254" cy="74" r="5"/><circle cx="292" cy="72" r="5"/><circle cx="280" cy="104" r="5"/></g>
      <text x="344" y="46" fill="${W}.9)" font-family="sans-serif" font-size="14" font-weight="700">K</text>`),

    /* 3 · Community & Ecosystem: food web */
    L3: wrap(`
      <g stroke="${W}.55)" stroke-width="2.5" fill="none" stroke-linecap="round">
        <path d="M95 60L180 120M180 120L270 70M180 120L250 170M270 70L330 120M250 170L330 120M95 60L120 160M120 160L180 120"/></g>
      <circle cx="95" cy="60" r="28" fill="${SUN}"/>
      <g stroke="${SUN}" stroke-width="3" stroke-linecap="round"><path d="M95 18v8M95 94v8M53 60h8M129 60h8M65 30l6 6M119 84l6 6M125 30l-6 6M71 84l-6 6"/></g>
      <circle cx="180" cy="120" r="22" fill="${LEAF}"/><path d="M180 134v-24M180 122c-8-2-12-8-12-14M180 118c8-2 12-8 12-14" stroke="#1d6b4f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="270" cy="70" r="20" fill="${W}.92)"/><circle cx="262" cy="52" r="5" fill="${W}.92)"/><circle cx="278" cy="52" r="5" fill="${W}.92)"/>
      <circle cx="250" cy="170" r="20" fill="${CLAY}"/><path d="M238 158l4-10 6 8M262 158l-4-10-6 8" stroke="${CLAY}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <circle cx="330" cy="120" r="24" fill="${AQUA}"/><path d="M318 120c6-8 18-8 24 0-6 8-18 8-24 0z" fill="#fff" opacity=".9"/>
      <circle cx="120" cy="160" r="14" fill="${W}.5)"/>`),

    /* 4 · Biogeochemical Cycles: circular arrows with drop and leaf */
    L4: wrap(`
      <circle cx="285" cy="110" r="96" fill="${W}.07)"/>
      <g fill="none" stroke="${W}.75)" stroke-width="6" stroke-linecap="round">
        <path d="M285 36a74 74 0 0 1 64 37"/><path d="M359 130a74 74 0 0 1-48 56"/><path d="M247 180a74 74 0 0 1-34-92"/></g>
      <g fill="${W}.95)"><path d="M349 60l14 22-26 2z"/><path d="M308 193l-22-12 20-14z"/><path d="M208 100l8-24 18 16z"/></g>
      <path d="M285 78c18 24 24 34 24 46a24 24 0 0 1-48 0c0-12 6-22 24-46z" fill="${AQUA}"/>
      <path d="M205 150c4-26 24-40 46-38-2 24-22 42-46 38z" fill="${LEAF}"/>
      <circle cx="358" cy="150" r="14" fill="${SUN}"/>
      <text x="351" y="155" fill="#7a4d00" font-family="sans-serif" font-size="13" font-weight="800">N</text>
      <text x="260" y="196" fill="${W}.95)" font-family="sans-serif" font-size="13" font-weight="800">C</text>`),

    /* 5 · Biomes: layered terrain, pine, palm, sea */
    L5: wrap(`
      <circle cx="320" cy="58" r="26" fill="${SUN}"/>
      <path d="M0 150L70 70L120 120L190 40L260 130L320 90L400 160V220H0Z" fill="${W}.18)"/>
      <path d="M0 175C60 150 110 168 170 160S300 140 400 168V220H0Z" fill="${W}.28)"/>
      <g fill="${LEAF}"><path d="M60 170l16-44 16 44z"/><path d="M60 150l16-36 16 36z" opacity=".85"/><path d="M112 176l12-34 12 34z"/></g>
      <g stroke="${LEAF}" stroke-width="5" stroke-linecap="round" fill="none"><path d="M270 176c-2-24 2-44 10-62"/><path d="M280 114c-14-6-26-4-34 6M280 114c12-8 26-6 32 4M280 114c-4-14 2-24 12-28"/></g>
      <path d="M0 196c25-12 50 12 75 0s50 12 75 0 50 12 75 0 50 12 75 0 50 12 100 0V220H0Z" fill="${AQUA}" opacity=".85"/>
      <path d="M0 208c25-10 50 10 75 0s50 10 75 0 50 10 75 0 50 10 75 0 50 10 100 0V220H0Z" fill="${W}.35)"/>`),

    /* 6 · Biodiversity: butterfly, fish, leaves */
    L6: wrap(`
      <g transform="translate(290 80)">
        <path d="M0 0C-24-52-86-52-76-8-72 14-34 22 0 0z" fill="${CLAY}"/><path d="M0 0C-18 24-60 36-48 66-34 84-6 50 0 0z" fill="${SUN}"/>
        <path d="M0 0C24-52 86-52 76-8 72 14 34 22 0 0z" fill="${CLAY}"/><path d="M0 0C18 24 60 36 48 66 34 84 6 50 0 0z" fill="${SUN}"/>
        <rect x="-3" y="-8" width="6" height="64" rx="3" fill="${W}.95)"/>
        <path d="M-2-8C-12-26-20-30-28-30M2-8C12-26 20-30 28-30" stroke="${W}.95)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="-44" cy="-8" r="7" fill="${W}.85)"/><circle cx="44" cy="-8" r="7" fill="${W}.85)"/></g>
      <g transform="translate(90 150)"><path d="M0 0C20-28 56-28 76 0 56 28 20 28 0 0z" fill="${AQUA}"/><path d="M76 0l26-18v36z" fill="${AQUA}"/><circle cx="20" cy="-4" r="4" fill="#0b4a73"/></g>
      <g transform="translate(40 70)"><path d="M0 0C14-30 46-34 66-24 62 8 28 30 0 0z" fill="${LEAF}"/><path d="M4-2C24-10 42-18 60-22" stroke="${W}.7)" stroke-width="2" fill="none"/></g>
      <g transform="translate(180 62)"><path d="M0 0C14-24 38-26 52-16 48 8 22 24 0 0z" fill="${LEAF}" opacity=".8"/></g>
      <circle cx="170" cy="190" r="6" fill="${W}.35)"/><circle cx="188" cy="176" r="4" fill="${W}.35)"/>`),

    /* 7 · Air: smokestacks, clouds, atmosphere arcs */
    L7: wrap(`
      <g fill="none" stroke="${W}.28)" stroke-width="2"><path d="M20 190A190 190 0 0 1 400 190"/><path d="M60 190A150 150 0 0 1 360 190"/><path d="M100 190A110 110 0 0 1 320 190"/></g>
      <path d="M250 190v-84h22v84zM292 190v-66h22v66z" fill="${W}.75)"/>
      <path d="M250 106h22M292 124h22" stroke="${CLAY}" stroke-width="5"/>
      <g fill="${W}.4)"><circle cx="262" cy="84" r="14"/><circle cx="280" cy="68" r="18"/><circle cx="306" cy="52" r="22"/><circle cx="338" cy="44" r="18"/>
      <circle cx="304" cy="102" r="12"/><circle cx="322" cy="88" r="14"/></g>
      <g fill="${W}.92)"><ellipse cx="96" cy="70" rx="38" ry="16"/><circle cx="80" cy="58" r="16"/><circle cx="108" cy="54" r="20"/></g>
      <g stroke="${AQUA}" stroke-width="4" stroke-linecap="round" fill="none"><path d="M40 118h80M62 136h66M30 154h56"/></g>
      <path d="M0 190H400V220H0Z" fill="${W}.25)"/>`),

    /* 8 · Water & land: droplet, waves, subsiding ground */
    L8: wrap(`
      <path d="M110 24C142 70 160 94 160 120a50 50 0 0 1-100 0c0-26 18-50 50-96z" fill="${AQUA}"/>
      <path d="M82 118c2 16 14 28 30 30" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".7"/>
      <path d="M0 150c25-12 50 12 75 0s50 12 75 0 50 12 75 0 50 12 75 0 50 12 100 0V220H0Z" fill="${W}.2)"/>
      <path d="M200 170H400V220H200Z" fill="${CLAY}" opacity=".75"/>
      <path d="M200 170l40 8 36-12 40 14 84-10" stroke="${W}.7)" stroke-width="2.5" fill="none"/>
      <path d="M300 178l-8 14 12 6-10 16M330 170l8 18-10 8" stroke="#7a3b25" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <g fill="${W}.92)"><rect x="236" y="130" width="30" height="40"/><rect x="274" y="112" width="26" height="54"/><rect x="340" y="124" width="34" height="42"/></g>
      <g stroke="${SUN}" stroke-width="5" stroke-linecap="round"><path d="M368 66v34M368 100l-9-10M368 100l9-10"/></g>`),

    /* 9 · Land use: patchwork fields, buildings, trees */
    L9: wrap(`
      <path d="M30 120L200 60L370 120L200 196Z" fill="${W}.14)"/>
      <path d="M200 60L370 120L330 140L160 80Z" fill="${LEAF}" opacity=".85"/>
      <path d="M160 80L330 140L290 160L120 100Z" fill="${SUN}" opacity=".85"/>
      <path d="M120 100L290 160L250 180L80 120Z" fill="${AQUA}" opacity=".85"/>
      <path d="M80 120L250 180L200 196L30 120Z" fill="${W}.55)"/>
      <g fill="${W}.95)"><rect x="248" y="52" width="26" height="46"/><rect x="278" y="68" width="22" height="34"/><rect x="224" y="68" width="20" height="30"/></g>
      <g fill="${SUN}"><rect x="253" y="60" width="5" height="5"/><rect x="263" y="60" width="5" height="5"/><rect x="253" y="72" width="5" height="5"/><rect x="263" y="72" width="5" height="5"/></g>
      <g fill="${LEAF}"><circle cx="90" cy="86" r="16"/><circle cx="116" cy="74" r="12"/></g>
      <path d="M90 102v18M116 86v16" stroke="${W}.8)" stroke-width="3"/>`),

    /* 10 · Energy: sun, wind turbines, bolt, pylons */
    L10: wrap(`
      <circle cx="90" cy="64" r="34" fill="${SUN}"/>
      <g stroke="${SUN}" stroke-width="4" stroke-linecap="round"><path d="M90 10v10M90 108v10M36 64h10M134 64h10M52 26l7 7M121 95l7 7M128 26l-7 7M59 95l-7 7"/></g>
      <g stroke="${W}.95)" stroke-width="5" stroke-linecap="round">
        <path d="M250 190V96M330 190V120"/>
        <path d="M250 96l0-44M250 96l38 22M250 96l-38 22"/><path d="M330 120l0-34M330 120l29 17M330 120l-29 17" stroke-width="4"/></g>
      <circle cx="250" cy="96" r="7" fill="#fff"/><circle cx="330" cy="120" r="6" fill="#fff"/>
      <path d="M160 100l-22 38h20l-14 40 36-52h-22l16-26z" fill="${SUN}" transform="translate(-40 6)"/>
      <path d="M0 190H400V220H0Z" fill="${W}.25)"/>
      <path d="M20 190l16-60 16 60M20 150h32M24 168h24" stroke="${W}.7)" stroke-width="2.5" fill="none"/>`)
  };

  /* Category emblem art (small, used in category headers) */
  const catArt = {
    foundations: scenes.L1, ecology: scenes.L3, biomes: scenes.L5,
    air: scenes.L7, water: scenes.L8, energy: scenes.L10
  };

  /* Section glyphs: 24px stroke icons, picked by keyword in the section title */
  const g = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const glyphs = {
    leaf: g('<path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z"/><path d="M5 19c3-5 6-8 10-10"/>'),
    drop: g('<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>'),
    bolt: g('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'),
    sun: g('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>'),
    chart: g('<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>'),
    globe: g('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'),
    book: g('<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6"/><path d="M20 4v14h-6"/>'),
    law: g('<path d="M12 3v18M5 21h14M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>'),
    wind: g('<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8"/>'),
    factory: g('<path d="M3 21V10l6 4V10l6 4V6h4v15zM3 21h18"/>'),
    cycle: g('<path d="M20 11a8 8 0 0 0-14-4M4 13a8 8 0 0 0 14 4"/><path d="M6 3v4h4M18 21v-4h-4"/>'),
    paw: g('<circle cx="6" cy="11" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="15" cy="6" r="2"/><circle cx="19" cy="11" r="2"/><path d="M12 12c-4 0-6 4-5 6s3 2 5 1c2 1 4 1 5-1s-1-6-5-6z"/>'),
    layers: g('<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>'),
    list: g('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'),
    mountain: g('<path d="M3 20l6-11 4 7 3-4 5 8z"/>'),
    shield: g('<path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'),
    warn: g('<path d="M12 3L2 20h20zM12 10v5M12 18h.01"/>'),
    star: g('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>')
  };
  const rules = [
    [/law|act\b|RA \d|policy|legal|ethic|worldview/i, "law"], [/threat|issue|challenge|problem|hazard|intrusion|pollut|danger|subsid/i, "warn"],
    [/water|ground|fresh|marine|aquatic|eutroph|recharge|clean water|saltwater/i, "drop"], [/air|atmosph|gas|wind|ozone|climate|warming|greenhouse/i, "wind"],
    [/energy|power|plant|electric|fuel|solar|renew|capacity/i, "bolt"], [/sun|light|photo/i, "sun"],
    [/cycle|nitrogen|carbon|phospho|sulfur|succession|recycl|waste|biomagn/i, "cycle"], [/factory|industr|sources|control|technology|solution/i, "factory"],
    [/biome|terrestrial|land use|habitat|forest|desert|tundra|mountain/i, "mountain"], [/species|interaction|predator|defens|biodiversity|population|distribution|growth|age|life/i, "paw"],
    [/level|layer|organization|composition|structure/i, "layers"], [/principle|key|message|why|matter|discussion|summary/i, "star"],
    [/conserv|prevent|protect|strateg|sustainab|practice|management|bioremed/i, "shield"], [/estimat|chart|pattern|limiting|%|capacity|through time/i, "chart"],
    [/past|present|history|define|introduc|nature/i, "book"], [/earth|world|global|scale/i, "globe"]
  ];
  function glyphFor(title, type) {
    const t = title || "";
    for (const [re, name] of rules) if (re.test(t)) return glyphs[name];
    return glyphs[type === "table" ? "list" : type === "bars" || type === "donut" ? "chart" : type === "steps" ? "cycle" : "leaf"];
  }

  window.ENVISCI_ART = { scenes, catArt, glyphFor };
})();
