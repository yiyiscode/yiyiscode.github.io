(function () {
  const D = window.SITE;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const S = {
    lang: store.get("lang") || (/^zh/i.test(navigator.language) ? "zh" : "en"),
    theme: store.get("theme"),
    filter: "all",
    more: false,
    menu: false
  };
  const t = (o) => o[S.lang];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const ym = (s) => {
    const [y, m] = s.split("-");
    return S.lang === "zh" ? `${y}/${m}` : `${MONTHS[+m - 1]} ${y}`;
  };
  const period = (a, b) => `${ym(a)} – ${b ? ym(b) : t(D.ui.present)}`;
  const chips = (a) => a.map((x) => `<span class="chip">${esc(x)}</span>`).join("");
  const asof = () => ` <span class="asof">(${t(D.ui.asof)})</span>`;

  const ICON = {
    gh: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    theme: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>'
  };

  function header() {
    return `<header class="top"><div class="bar">
      <a class="brand" href="#top"><div class="logo">${D.initials}</div><span class="nm">${esc(t(D.name))}</span></a>
      <nav class="links ${S.menu ? "open" : ""}" id="nav">${t(D.ui.nav).map(([h, l]) => `<a href="${h}">${l}</a>`).join("")}</nav>
      <div class="tools">
        <div class="seg" role="group" aria-label="Language"><button data-lang="zh" class="${S.lang === "zh" ? "on" : ""}">中</button><button data-lang="en" class="${S.lang === "en" ? "on" : ""}">EN</button></div>
        <button class="icon-btn" data-theme-toggle aria-label="${t(D.ui.theme)}" title="${t(D.ui.theme)}">${ICON.theme}</button>
        <a class="icon-btn" href="https://${D.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${ICON.gh}</a>
        <button class="icon-btn menu-btn" data-menu aria-label="Menu">${ICON.menu}</button>
      </div></div></header>`;
  }

  function hero() {
    return `<section class="hero" id="top" style="padding-top:48px">
      <div class="badge-live reveal"><span class="ping"></span>${t(D.ui.badge)}</div>
      <h1 class="reveal">${esc(t(D.name))}</h1>
      <p class="tag reveal">${t(D.ui.tag)}</p>
      <div class="cta reveal"><a class="btn primary" href="#projects">${t(D.ui.cta1)} ${ICON.arrow}</a><a class="btn ghost" href="mailto:${D.email}">${ICON.mail} ${t(D.ui.cta2)}</a></div>
      <div class="socials reveal"><a href="https://${D.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${ICON.gh}</a><a href="mailto:${D.email}" aria-label="Email">${ICON.mail}</a></div>
    </section>
    <div class="tiles reveal">${D.metrics.map((m) => `<div class="tile"><b>${m.v}</b><span>${t(m)}${m.asof ? asof() : ""}</span></div>`).join("")}</div>`;
  }

  // 卡片載入 WebP 縮圖（約 500px 顯示寬 × 2），點開才載入大圖；寬高屬性預留版面，避免載入時跳動
  const imgName = (src) => src.replace(/^.*\//, "").replace(/\.\w+$/, "");
  const shots = (img) => img
    ? `<div class="shots">${[].concat(img).map((m) => {
        const n = imgName(m.src), dim = (window.IMG_META || {})[n];
        const size = dim ? ` width="${dim[0]}" height="${dim[1]}"` : "";
        return `<figure class="shot"><a href="assets/img/full/${n}.webp" target="_blank" rel="noopener noreferrer"><img src="assets/img/thumb/${n}.webp"${size} alt="${esc(t(m))}" loading="lazy" decoding="async"></a><figcaption>${esc(t(m))}</figcaption></figure>`;
      }).join("")}</div>`
    : "";

  function stack() {
    return `<section id="skills"><div class="sec-head reveal"><h2>${t(D.ui.stack)}</h2></div>
      <div class="stack">${D.stack.map((g) => `<div class="stack-card reveal"><h3>${t(g.l)}</h3>${chips(g.i)}</div>`).join("")}</div>
      <div class="cert-list reveal">${D.certs.map((c) => `<span>${t(c)}</span>`).join("")}</div>
      <p class="ai-note reveal">${t(D.ui.aiNote)}</p></section>`;
  }

  function timeline() {
    const items = D.timeline.filter((i) => S.filter === "all" || i.k === S.filter);
    return `<section id="experience"><div class="sec-head reveal"><span class="pill">${t(D.ui.tlBadge)}</span><h2>${t(D.ui.tlTitle)}</h2><p>${t(D.ui.tlSub)}</p>
      <div class="filters">${t(D.ui.filters).map(([k, l]) => `<button data-filter="${k}" class="${S.filter === k ? "on" : ""}">${l}</button>`).join("")}</div></div>
      <div class="tl">${items.map((i) => `<div class="tl-item reveal"><div class="card">
        <div class="tl-top"><span class="date mono">${period(i.start, i.end)}</span><span class="tag-pill">${t(i.badge)}</span></div>
        <div class="tl-org">${t(i.org)}</div><h3>${t(i.role)}</h3>
        <ul>${i.bullets.map((b) => `<li>${esc(t(b))}</li>`).join("")}</ul>
        ${i.tech.length ? `<div class="tags">${chips(i.tech)}</div>` : ""}${shots(i.img)}</div></div>`).join("")}</div></section>`;
  }

  function projects() {
    const card = (p) => `<article class="card proj reveal">
      <div class="cat mono">${p.cat}</div><h3>${esc(t(p.title))}</h3><div class="sub">${esc(t(p.sub))}</div>
      ${shots(p.img)}
      ${p.metrics.length ? `<div class="metrics">${p.metrics.map((m) => `<div class="metric"><b>${m.v}</b>${t(m)}${m.asof ? asof() : ""}</div>`).join("")}</div>` : ""}
      <div class="flow-label">${t(D.ui.flow)}</div>
      <div class="flow">${p.flow[S.lang].map((s) => `<span class="step">${esc(s)}</span>`).join('<span class="arrow">→</span>')}</div>
      <div class="hl-label">${t(D.ui.highlights)}</div>
      <ul>${p.bullets.map((b) => `<li>${esc(t(b))}${b.asof ? asof() : ""}</li>`).join("")}</ul>
      <div class="tags">${chips(p.tech)}</div>
      ${p.link ? `<div class="card-actions"><a class="btn ghost" href="${p.link}" target="_blank" rel="noopener noreferrer">${ICON.gh} ${t(D.ui.github)}</a></div>` : ""}
    </article>`;
    return `<section id="projects"><div class="sec-head reveal"><span class="pill">${t(D.ui.projBadge)}</span><h2>${t(D.ui.projTitle)}</h2><p>${t(D.ui.projSub)}</p></div>
      <div class="proj-grid">${D.projects.map(card).join("")}</div>
      <button class="more-toggle" data-more aria-expanded="${S.more}">${S.more ? "− " + t(D.ui.hideMore) : "+ " + t(D.ui.showMore) + " (" + D.more.length + ")"}</button>
      <div class="more-grid ${S.more ? "show" : ""}">${D.more.map((m) => `<div class="card"><h3>${esc(t(m.title))}</h3><p>${esc(t(m.desc))}</p><div class="tags">${chips(m.tech)}</div>${shots(m.img)}</div>`).join("")}</div></section>`;
  }

  function contact() {
    return `<section id="contact" class="contact"><div class="sec-head reveal"><h2>${t(D.ui.contactTitle)}</h2><p>${t(D.ui.contactSub)}</p></div>
      <div class="row reveal"><a class="btn primary" href="mailto:${D.email}">${ICON.mail} ${D.email}</a><a class="btn ghost" href="https://${D.github}" target="_blank" rel="noopener noreferrer">${ICON.gh} ${D.github}</a></div></section>`;
  }

  function render() {
    const y = window.scrollY;
    document.documentElement.lang = S.lang === "zh" ? "zh-Hant" : "en";
    document.title = t(D.titles);
    if (S.theme) document.documentElement.dataset.theme = S.theme;
    document.getElementById("app").innerHTML =
      header() + `<main class="wrap">${hero()}${timeline()}${projects()}${stack()}${contact()}</main><footer class="foot">${t(D.ui.footer)}</footer>`;
    window.scrollTo(0, y);
    observe();
  }

  let io;
  function observe() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    if (io) io.disconnect();
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach((e) => {
      const r = e.getBoundingClientRect();
      if (r.top < window.innerHeight) e.classList.add("in"); else io.observe(e);
    });
  }

  // 燈箱：點縮圖在站內看完整圖（長圖可上下捲）；←/→ 切換同一張卡片的圖，Esc 或點背景關閉
  let lb = null, lbList = [], lbIdx = 0;
  const lbShow = (i) => {
    lbIdx = (i + lbList.length) % lbList.length;
    const a = lbList[lbIdx], im = a.querySelector("img"), box = lb.querySelector("img");
    box.src = a.href; box.alt = im.alt;
    lb.querySelector(".lb-cap").textContent = `${lbIdx + 1} / ${lbList.length}　${im.alt}`;
    lb.querySelector(".lb-body").scrollTop = 0;
  };
  const lbClose = () => { if (lb) { lb.remove(); lb = null; document.body.style.overflow = ""; } };
  const lbOpen = (a) => {
    lbList = [...a.closest(".shots").querySelectorAll(".shot a")];
    lb = document.createElement("div");
    lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
    lb.innerHTML = `<button class="lb-x" data-lb="close" aria-label="Close">✕</button>`
      + (lbList.length > 1 ? `<button class="lb-nav lb-prev" data-lb="prev" aria-label="Previous">‹</button><button class="lb-nav lb-next" data-lb="next" aria-label="Next">›</button>` : "")
      + `<div class="lb-body" data-lb="bg"><img alt=""></div><div class="lb-cap"></div>`;
    document.body.appendChild(lb); document.body.style.overflow = "hidden";
    lbShow(lbList.indexOf(a)); lb.querySelector(".lb-x").focus();
  };
  document.addEventListener("keydown", (e) => {
    if (!lb) return;
    if (e.key === "Escape") lbClose();
    else if (e.key === "ArrowLeft") lbShow(lbIdx - 1);
    else if (e.key === "ArrowRight") lbShow(lbIdx + 1);
  });

  document.addEventListener("click", (e) => {
    const q = (s) => e.target.closest(s);
    let x;
    if ((x = q(".shot a"))) { e.preventDefault(); lbOpen(x); return; }
    if ((x = q("[data-lb]"))) {
      const k = x.dataset.lb;
      if (k === "close" || (k === "bg" && e.target === x)) lbClose();
      else if (k === "prev") lbShow(lbIdx - 1);
      else if (k === "next") lbShow(lbIdx + 1);
      return;
    }
    if ((x = q("[data-lang]"))) { S.lang = x.dataset.lang; store.set("lang", S.lang); }
    else if ((x = q("[data-filter]"))) { S.filter = x.dataset.filter; }
    else if (q("[data-more]")) { S.more = !S.more; }
    else if (q("[data-theme-toggle]")) {
      const dark = S.theme ? S.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
      S.theme = dark ? "light" : "dark"; store.set("theme", S.theme);
    }
    else if (q("[data-menu]")) { S.menu = !S.menu; document.getElementById("nav").classList.toggle("open", S.menu); return; }
    else if (q("nav.links a")) { S.menu = false; document.getElementById("nav").classList.remove("open"); return; }
    else return;
    render();
  });

  render();
})();
