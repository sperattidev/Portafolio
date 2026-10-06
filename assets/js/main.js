/* ==========================================================================
   main.js — Interactividad del portafolio (vanilla JS, sin dependencias)
   ========================================================================== */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } },
  };

  const content = $("#content");
  const sections = $$(".section");

  /* ------------------------------------------------------------------
     Toast
     ------------------------------------------------------------------ */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-on"), 2400);
  }

  /* ------------------------------------------------------------------
     Temas
     ------------------------------------------------------------------ */
  const THEMES = ["dark", "dracula", "light"];
  function setTheme(name) {
    if (!THEMES.includes(name)) return false;
    document.documentElement.setAttribute("data-theme", name);
    store.set("sd-theme", name);
    $("#sb-theme").textContent = "◐ " + name;
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    return true;
  }
  function cycleTheme() {
    const cur = document.documentElement.getAttribute("data-theme") || "dark";
    const next = THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length];
    setTheme(next);
    toast("Tema: " + next);
  }
  setTheme(document.documentElement.getAttribute("data-theme") || "dark");
  $$('[data-action="theme"]').forEach((b) => b.addEventListener("click", cycleTheme));

  /* ------------------------------------------------------------------
     Secuencia de arranque
     ------------------------------------------------------------------ */
  function boot() {
    const el = $("#boot");
    const log = $("#boot-log");
    let seen = false;
    try { seen = sessionStorage.getItem("sd-booted") === "1"; } catch (e) { /* noop */ }
    if (reduceMotion || seen) {
      el.remove();
      return Promise.resolve();
    }
    try { sessionStorage.setItem("sd-booted", "1"); } catch (e) { /* noop */ }

    const lines = [
      "sperattiOS v2.0.26 (tty1)",
      "",
      "[ <span class=ok>OK</span> ] Iniciando kernel de creatividad…",
      "[ <span class=ok>OK</span> ] Montando /dev/ideas",
      "[ <span class=ok>OK</span> ] Cargando módulos: web, backend, sistemas, automatización",
      "[ <span class=ok>OK</span> ] Compilando café → código",
      "[ <span class=ok>OK</span> ] Conectando con github.com/sperattidev",
      "[ <span class=ok>OK</span> ] Servicio freelance.service activo",
      "",
      "Bienvenido/a. Iniciando entorno de desarrollo…",
    ];
    return new Promise((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        el.classList.add("is-done");
        window.removeEventListener("keydown", finish);
        el.removeEventListener("click", finish);
        setTimeout(() => el.remove(), 600);
        resolve();
      };
      window.addEventListener("keydown", finish);
      el.addEventListener("click", finish);
      (async () => {
        for (const l of lines) {
          if (done) return;
          log.innerHTML += l + "\n";
          await sleep(l ? 140 : 60);
        }
        await sleep(350);
        finish();
      })();
    });
  }

  /* ------------------------------------------------------------------
     Hero: código que se escribe solo + rotador de roles
     ------------------------------------------------------------------ */
  const HERO = [
    [["t-com", "// Perfil cargado desde ~/sperattidev"]],
    [["t-kw", "const "], ["t-var", "developer"], ["t-pun", ": "], ["t-type", "Developer"], ["t-pun", " = {"]],
    [["", "  "], ["t-prop", "nombre"], ["t-pun", ": "], ["t-str", '"Matías Rubén Speratti"'], ["t-pun", ","]],
    [["", "  "], ["t-prop", "alias"], ["t-pun", ": "], ["t-str", '"@sperattidev"'], ["t-pun", ","]],
    [["", "  "], ["t-prop", "rol"], ["t-pun", ": ["], ["t-str", '"Full-Stack"'], ["t-pun", ", "], ["t-str", '"Sistemas"'], ["t-pun", "],"]],
    [["", "  "], ["t-prop", "modalidad"], ["t-pun", ": "], ["t-str", '"freelance"'], ["t-pun", ","]],
    [["", "  "], ["t-prop", "formacion"], ["t-pun", ": "], ["t-str", '"autodidacta"'], ["t-pun", ","]],
    [["", "  "], ["t-prop", "alcance"], ["t-pun", ": "], ["t-str", '"web → sistemas avanzados"'], ["t-pun", ","]],
    [["", "  "], ["t-prop", "mente"], ["t-pun", ": "], ["t-str", '"inventora"'], ["t-pun", ","]],
    [["", "  "], ["t-prop", "disponible"], ["t-pun", ": "], ["t-num", "true"], ["t-pun", ","]],
    [["t-pun", "};"]],
    [],
    [["t-kw", "await "], ["t-var", "developer"], ["t-pun", "."], ["t-fn", "construir"], ["t-pun", "("], ["t-var", "tuIdea"], ["t-pun", ");"]],
    [["t-com", "// → 🚀 listo para producción"]],
  ];

  function renderTokens(line) {
    return line.map(([c, t]) => (c ? `<span class="${c}">${esc(t)}</span>` : esc(t))).join("");
  }

  async function typeHero() {
    const pre = $("#hero-code");
    if (reduceMotion) {
      pre.innerHTML = HERO.map((l) => `<span class="ln">${renderTokens(l)}</span>`).join("");
      return;
    }
    let skip = false;
    pre.addEventListener("click", () => (skip = true), { once: true });
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    for (const line of HERO) {
      const ln = document.createElement("span");
      ln.className = "ln";
      pre.appendChild(ln);
      for (const [cls, text] of line) {
        const span = document.createElement("span");
        if (cls) span.className = cls;
        ln.appendChild(span);
        ln.appendChild(cursor);
        if (skip) { span.textContent = text; continue; }
        for (const ch of text) {
          span.textContent += ch;
          await sleep(ch === " " ? 4 : 7 + Math.random() * 12);
        }
      }
      if (!line.length) ln.appendChild(cursor);
      if (!skip) await sleep(40);
    }
    pre.lastElementChild.appendChild(cursor);
  }

  async function rotateRoles() {
    const el = $("#rotator");
    const roles = D.roles;
    if (reduceMotion) return;
    let i = 0;
    for (;;) {
      await sleep(2200);
      const cur = el.textContent;
      for (let n = cur.length; n >= 0; n--) { el.textContent = cur.slice(0, n); await sleep(28); }
      i = (i + 1) % roles.length;
      const next = roles[i];
      for (let n = 1; n <= next.length; n++) { el.textContent = next.slice(0, n); await sleep(55); }
    }
  }

  /* ------------------------------------------------------------------
     Render de secciones desde data.js
     ------------------------------------------------------------------ */
  function renderServices() {
    $("#services-grid").innerHTML = D.services
      .map(
        (s) => `
      <article class="svc reveal">
        <p class="svc__sig"><span class="t-kw">async</span> <span class="t-fn">${esc(s.fn)}</span><span class="t-pun">(</span><span class="t-var">${esc(s.param)}</span><span class="t-pun">):</span> <span class="t-type">Promise</span><span class="t-pun">&lt;</span><span class="t-type">${esc(s.returns)}</span><span class="t-pun">&gt;</span></p>
        <h3 class="svc__title">${esc(s.title)}</h3>
        <p class="svc__desc">${esc(s.description)}</p>
        <ul class="tags">${s.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </article>`
      )
      .join("");

    $$(".svc").forEach((card) =>
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      })
    );
  }

  function renderStack() {
    const keys = Object.keys(D.stack);
    const lines = ['<span class="ln"><span class="t-pun">{</span></span>'];
    keys.forEach((k) => {
      lines.push(`<span class="ln">  <span class="t-prop">"${esc(k)}"</span><span class="t-pun">: [</span></span>`);
      D.stack[k].forEach((v, vi) => {
        const comma = vi < D.stack[k].length - 1 ? '<span class="t-pun">,</span>' : "";
        lines.push(`<span class="ln">    <span class="chip">"${esc(v)}"</span>${comma}</span>`);
      });
      lines.push('<span class="ln">  <span class="t-pun">],</span></span>');
    });
    lines.push('<span class="ln">  <span class="t-prop">"aprendiendo"</span><span class="t-pun">: </span><span class="t-num">true</span></span>');
    lines.push('<span class="ln"><span class="t-pun">}</span></span>');
    $("#stack-code").innerHTML = lines.join("");
  }

  function renderProcess() {
    const last = D.process.length - 1;
    $("#gitlog").innerHTML = D.process
      .map(
        (c, i) => `
      <li class="commit reveal${i === last ? " commit--head" : ""}">
        <span class="commit__dot" aria-hidden="true"></span>
        <div class="commit__head">
          <span class="commit__hash">${esc(c.hash)}</span>
          ${i === last ? '<span class="t-fn">(HEAD -&gt; <span class="t-ok">main</span>)</span>' : ""}
          <span class="commit__type">${esc(c.type)}(${esc(c.scope)}):</span>
        </div>
        <h3 class="commit__title">${i + 1}. ${esc(c.title)}</h3>
        <p class="commit__body">${esc(c.body)}</p>
      </li>`
      )
      .join("");
  }

  const ICONS = {
    github:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-3.95z"/></svg>',
  };

  function renderContact() {
    const L = D.links;
    const items = [];
    if (L.email) {
      items.push(`<li><button type="button" data-copy="${esc(L.email)}">${ICONS.mail}<span><small>email · click para copiar</small><strong>${esc(L.email)}</strong></span></button></li>`);
    }
    items.push(`<li><a href="${esc(L.github)}" target="_blank" rel="noopener">${ICONS.github}<span><small>github</small><strong>@${esc(D.githubUser)}</strong></span></a></li>`);
    if (L.linkedin) {
      items.push(`<li><a href="${esc(L.linkedin)}" target="_blank" rel="noopener">${ICONS.linkedin}<span><small>linkedin</small><strong>${esc(D.profile.name)}</strong></span></a></li>`);
    }
    $("#contact-links").innerHTML = items.join("");

    $$("[data-copy]").forEach((b) =>
      b.addEventListener("click", () => copy(b.getAttribute("data-copy")))
    );

    const form = $("#contact-form");
    if (!L.email) {
      // Sin email configurado: el formulario no tiene destino.
      form.remove();
      $(".contact").style.gridTemplateColumns = "minmax(0, 560px)";
      return;
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const subject = `[Portfolio] ${f.get("asunto")}`;
      const body = `Hola Matías,\n\n${f.get("mensaje")}\n\n— ${f.get("nombre")}`;
      window.location.href = `mailto:${L.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      $("#contact-note").innerHTML = '<span class="t-ok">✓</span> Abriendo tu cliente de correo…';
    });
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast("✓ Copiado: " + text);
    } catch (e) {
      toast(text);
    }
  }

  /* ------------------------------------------------------------------
     Proyectos desde la API pública de GitHub
     ------------------------------------------------------------------ */
  const LANG_COLORS = {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", PHP: "#4F5D95", HTML: "#e34c26",
    CSS: "#563d7c", Java: "#b07219", "C#": "#178600", "C++": "#f34b7d", C: "#555555", Go: "#00ADD8",
    Rust: "#dea584", Shell: "#89e051", Vue: "#41b883", Dart: "#00B4AB", Kotlin: "#A97BFF", Ruby: "#701516",
  };
  let loadedRepos = [];

  function projectCard(p) {
    const lang = p.language
      ? `<span><i class="lang-dot" style="background:${LANG_COLORS[p.language] || "var(--accent-3)"}"></i>${esc(p.language)}</span>`
      : "";
    const stars = p.stars != null ? `<span>★ ${p.stars}</span>` : "";
    const forks = p.forks ? `<span>⑂ ${p.forks}</span>` : "";
    const updated = p.updated ? `<span>⟳ ${new Date(p.updated).toLocaleDateString("es", { month: "short", year: "numeric" })}</span>` : "";
    const tags = p.tags && p.tags.length ? `<ul class="tags" style="margin-bottom:14px">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : "";
    return `
      <a class="proj reveal" href="${esc(p.url)}" target="_blank" rel="noopener">
        <div class="proj__top"><span>${p.featured ? "★ destacado" : "repo"}</span><span>↗</span></div>
        <h3 class="proj__name">${esc(p.name)}</h3>
        <p class="proj__desc">${esc(p.description || "Sin descripción todavía — el código habla por sí mismo.")}</p>
        ${tags}
        <div class="proj__meta">${lang}${stars}${forks}${updated}</div>
      </a>`;
  }

  function emptyCard() {
    return `
      <div class="proj proj--empty">
        <div class="proj__top"><span class="t-warn">// TODO</span></div>
        <h3 class="proj__name">nuevos_proyectos/</h3>
        <p class="proj__desc">Estoy preparando la vitrina de proyectos. Mientras tanto, mirá mi actividad en GitHub o escribime para ver casos de trabajo reales.</p>
      </div>`;
  }

  async function loadProjects() {
    const grid = $("#projects-grid");
    const featured = (D.featuredProjects || []).map((p) => ({ ...p, featured: true }));
    const user = D.githubUser;
    try {
      const get = (u) => fetch(u, { headers: { Accept: "application/vnd.github+json" } }).then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      });
      const [profile, repos] = await Promise.all([
        get(`https://api.github.com/users/${user}`),
        get(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`),
      ]);
      const exclude = (D.excludeRepos || []).map((r) => r.toLowerCase());
      loadedRepos = repos
        .filter((r) => !r.fork && !r.archived && !exclude.includes(r.name.toLowerCase()))
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, D.maxRepos)
        .map((r) => ({
          name: r.name,
          description: r.description,
          url: r.homepage || r.html_url,
          language: r.language,
          stars: r.stargazers_count,
          forks: r.forks_count,
          updated: r.pushed_at,
          tags: (r.topics || []).slice(0, 4),
        }));

      const stats = $("#gh-stats");
      stats.innerHTML = `<span>repos públicos: <b>${profile.public_repos}</b></span>${profile.followers ? `<span>seguidores: <b>${profile.followers}</b></span>` : ""}<span>en GitHub desde: <b>${new Date(profile.created_at).getFullYear()}</b></span>`;
      stats.hidden = false;
    } catch (e) {
      loadedRepos = [];
    }
    const all = featured.concat(loadedRepos);
    grid.innerHTML = all.length ? all.map(projectCard).join("") : emptyCard();
    observeReveal(grid);
  }

  /* ------------------------------------------------------------------
     Navegación: scroll-spy, pestañas, explorador y barra de estado
     ------------------------------------------------------------------ */
  function setActive(id) {
    $$(".tab, .files a").forEach((a) => a.classList.toggle("is-active", a.dataset.target === id));
    const tab = $(`.tab[data-target="${id}"]`);
    if (tab) {
      const bar = $("#tabs");
      const left = tab.offsetLeft - bar.clientWidth / 2 + tab.clientWidth / 2;
      bar.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
    }
    const sec = document.getElementById(id);
    if (sec) {
      $("#sb-lang").textContent = sec.dataset.lang;
      document.title = `${sec.dataset.file} — Matías Rubén Speratti · sperattidev`;
    }
  }

  function initSpy() {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { root: content, rootMargin: "-35% 0px -60% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    setActive("home");

    let col = 1;
    const pos = $("#sb-pos");
    const update = () => (pos.textContent = `Ln ${Math.floor(content.scrollTop / 24) + 1}, Col ${col}`);
    content.addEventListener("scroll", update, { passive: true });
    content.addEventListener("pointermove", (e) => { col = Math.max(1, Math.floor((e.clientX - content.getBoundingClientRect().left) / 8)); update(); }, { passive: true });
  }

  function goTo(id) {
    const el = document.getElementById(id);
    if (!el) return false;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    closeSidebar();
    return true;
  }

  // Interceptar anclas internas para que siempre desplacen el contenedor del editor.
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    if (id && goTo(id)) {
      e.preventDefault();
      history.replaceState(null, "", "#" + id);
    }
  });

  /* Sidebar móvil */
  const sidebar = $("#sidebar");
  const backdrop = $("#sidebar-backdrop");
  const menuBtn = $("#menu-btn");
  function openSidebar() { sidebar.classList.add("is-open"); backdrop.hidden = false; menuBtn.setAttribute("aria-expanded", "true"); }
  function closeSidebar() { sidebar.classList.remove("is-open"); backdrop.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); }
  menuBtn.addEventListener("click", () => (sidebar.classList.contains("is-open") ? closeSidebar() : openSidebar()));
  backdrop.addEventListener("click", closeSidebar);

  /* Reveal */
  let revealIO;
  function observeReveal(scope = document) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      $$(".reveal", scope).forEach((el) => el.classList.add("in"));
      return;
    }
    revealIO = revealIO || new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); } }),
      { root: content, threshold: 0.12 }
    );
    $$(".reveal:not(.in)", scope).forEach((el) => revealIO.observe(el));
  }

  /* Reloj */
  function clock() {
    const d = new Date();
    $("#sb-clock").textContent = d.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
  }

  /* ------------------------------------------------------------------
     Paleta de comandos
     ------------------------------------------------------------------ */
  const palette = $("#palette");
  const pInput = $("#palette-input");
  const pList = $("#palette-list");
  let pItems = [];
  let pSel = 0;

  function paletteCommands() {
    const cmds = sections.map((s) => ({
      label: `Ir a: ${s.dataset.file}`,
      hint: s.querySelector(".h2") ? s.querySelector(".h2").textContent.replace(/\s+/g, " ").trim().slice(0, 32) : "",
      run: () => goTo(s.id),
    }));
    THEMES.forEach((t) => cmds.push({ label: `Tema: ${t}`, hint: "preferencias", run: () => { setTheme(t); toast("Tema: " + t); } }));
    cmds.push({ label: "Abrir GitHub", hint: "@" + D.githubUser, run: () => window.open(D.links.github, "_blank", "noopener") });
    cmds.push({ label: "Terminal: enfocar", hint: "bash", run: () => { goTo("terminal"); setTimeout(() => termInput.focus({ preventScroll: true }), 500); } });
    cmds.push({ label: "Efecto: Matrix on/off", hint: "easter egg", run: toggleMatrix });
    if (D.links.email) cmds.push({ label: "Copiar email", hint: D.links.email, run: () => copy(D.links.email) });
    return cmds;
  }

  function renderPalette() {
    const q = pInput.value.replace(/^>\s*/, "").toLowerCase().trim();
    pItems = paletteCommands().filter((c) => (c.label + " " + c.hint).toLowerCase().includes(q));
    pSel = Math.min(pSel, Math.max(0, pItems.length - 1));
    pList.innerHTML = pItems.length
      ? pItems.map((c, i) => `<li role="option" data-i="${i}" class="${i === pSel ? "is-sel" : ""}" aria-selected="${i === pSel}"><span>${esc(c.label)}</span><small>${esc(c.hint)}</small></li>`).join("")
      : '<li class="palette__empty">Sin resultados</li>';
    const sel = pList.querySelector(".is-sel");
    if (sel) sel.scrollIntoView({ block: "nearest" });
  }
  function openPalette() {
    palette.hidden = false;
    pInput.value = "";
    pSel = 0;
    renderPalette();
    pInput.focus();
  }
  function closePalette() { palette.hidden = true; }
  function runPalette(i) {
    const c = pItems[i];
    closePalette();
    if (c) c.run();
  }

  $("#palette-btn").addEventListener("click", openPalette);
  $$('[data-action="palette"]').forEach((b) => b.addEventListener("click", openPalette));
  pInput.addEventListener("input", () => { pSel = 0; renderPalette(); });
  pInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); pSel = (pSel + 1) % Math.max(1, pItems.length); renderPalette(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); pSel = (pSel - 1 + pItems.length) % Math.max(1, pItems.length); renderPalette(); }
    else if (e.key === "Enter") { e.preventDefault(); runPalette(pSel); }
  });
  pList.addEventListener("click", (e) => { const li = e.target.closest("li[data-i]"); if (li) runPalette(+li.dataset.i); });
  palette.addEventListener("click", (e) => { if (e.target === palette) closePalette(); });

  /* ------------------------------------------------------------------
     Terminal interactiva
     ------------------------------------------------------------------ */
  const termOut = $("#term-out");
  const termInput = $("#term-input");
  const termBody = $("#term-body");
  const cmdHistory = [];
  let hIdx = 0;

  function print(html = "") {
    const div = document.createElement("div");
    div.className = "line";
    div.innerHTML = html;
    termOut.appendChild(div);
    termBody.scrollTop = termBody.scrollHeight;
  }
  const printLines = (arr) => arr.forEach((l) => print(l));

  const FILES = ["index.tsx", "about.md", "services.ts", "stack.json", "process.log", "projects.jsx", "terminal.sh", "contact.sh"];
  const SECTION_BY_FILE = Object.fromEntries(sections.map((s) => [s.dataset.file, s.id]));

  const COMMANDS = {
    help: {
      desc: "lista de comandos",
      run: () => {
        print('<span class="t-warn">Comandos disponibles:</span>');
        Object.entries(COMMANDS).forEach(([k, c]) => !c.hidden && print(`  <span class="t-ok">${k.padEnd(10)}</span> <span class="t-muted">${c.desc}</span>`));
        print('<span class="t-muted">Tip: usá ↑ ↓ para el historial y Tab para autocompletar.</span>');
      },
    },
    whoami: {
      desc: "quién soy",
      run: () => printLines([
        `<span class="t-ok">${esc(D.profile.name)}</span> <span class="t-muted">(@${esc(D.profile.alias)})</span>`,
        esc(D.profile.role),
        `${esc(D.profile.mode)} · ${esc(D.profile.education)} · ${esc(D.profile.location)}`,
      ]),
    },
    about: {
      desc: "resumen sobre mí",
      run: () => printLines([
        "Desarrollador freelance y autodidacta con una mente apasionada por inventar.",
        "Construyo desde sitios web hasta sistemas avanzados: APIs, automatizaciones,",
        "integraciones y software a medida. Del concepto a producción.",
      ]),
    },
    services: {
      desc: "qué puedo hacer por vos",
      run: () => D.services.forEach((s) => print(`  <span class="t-fn">${esc(s.fn)}()</span> <span class="t-muted">→</span> ${esc(s.title)}`)),
    },
    skills: {
      desc: "stack tecnológico",
      run: () => Object.entries(D.stack).forEach(([k, v]) => print(`  <span class="t-kw">${esc(k.padEnd(10))}</span> ${v.map(esc).join(" · ")}`)),
    },
    projects: {
      desc: "proyectos en GitHub",
      run: () => {
        const list = (D.featuredProjects || []).concat(loadedRepos);
        if (!list.length) return print('<span class="t-muted">Cargando o sin proyectos públicos todavía. Probá</span> <span class="t-ok">github</span>');
        list.forEach((p) => print(`  <span class="t-ok">▸</span> <a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)}</a> <span class="t-muted">${esc(p.description || "")}</span>`));
      },
    },
    contact: {
      desc: "cómo contactarme",
      run: () => {
        if (D.links.email) print(`  email    <a href="mailto:${esc(D.links.email)}">${esc(D.links.email)}</a>`);
        print(`  github   <a href="${esc(D.links.github)}" target="_blank" rel="noopener">${esc(D.links.github)}</a>`);
        if (D.links.linkedin) print(`  linkedin <a href="${esc(D.links.linkedin)}" target="_blank" rel="noopener">${esc(D.links.linkedin)}</a>`);
      },
    },
    github: { desc: "abrir mi perfil de GitHub", run: () => { print("Abriendo github.com/" + esc(D.githubUser) + " …"); window.open(D.links.github, "_blank", "noopener"); } },
    neofetch: {
      desc: "info del sistema",
      run: () => {
        const art = [
          "   _____ ____  ",
          "  / ___// __ \\ ",
          "  \\__ \\/ / / / ",
          " ___/ / /_/ /  ",
          "/____/_____/   ",
        ].join("\n");
        const info = [
          `<span class="t-ok">visitante</span>@<span class="t-ok">sperattidev</span>`,
          "-------------------",
          `<span class="t-ok">Nombre</span>: ${esc(D.profile.name)}`,
          `<span class="t-ok">Rol</span>: Full-Stack & Sistemas`,
          `<span class="t-ok">Modo</span>: ${esc(D.profile.mode)}`,
          `<span class="t-ok">Formación</span>: ${esc(D.profile.education)}`,
          `<span class="t-ok">Shell</span>: bash (creatividad)`,
          `<span class="t-ok">Uptime</span>: aprendiendo desde siempre`,
          `<span class="t-ok">Estado</span>: ${D.profile.available ? "disponible ✔" : "ocupado"}`,
        ].join("\n");
        print(`<div class="neo"><pre>${esc(art)}</pre><div>${info}</div></div>`);
      },
    },
    ls: { desc: "listar archivos", run: () => print(FILES.map((f) => `<span class="${f.endsWith(".sh") ? "t-ok" : "t-fn"}">${f}</span>`).join("  ")) },
    cd: {
      desc: "ir a una sección (cd about)",
      run: (args) => {
        const t = (args[0] || "").replace(/\.\w+$/, "");
        const target = sections.find((s) => s.id === t || s.dataset.file.startsWith(t + "."));
        if (!t || t === "~") return;
        if (!target) return print(`<span class="t-err">bash: cd: ${esc(args[0])}: No existe el archivo o directorio</span>`);
        goTo(target.id);
      },
    },
    cat: {
      desc: "ver un archivo (cat about.md)",
      run: (args) => {
        const f = args[0];
        if (!f) return print('<span class="t-err">uso: cat &lt;archivo&gt;</span>');
        if (f === "about.md") return COMMANDS.about.run();
        if (f === "stack.json") return COMMANDS.skills.run();
        if (f === "services.ts") return COMMANDS.services.run();
        if (f === "contact.sh") return COMMANDS.contact.run();
        if (SECTION_BY_FILE[f]) { print(`<span class="t-muted">Abriendo ${esc(f)} en el editor…</span>`); return goTo(SECTION_BY_FILE[f]); }
        print(`<span class="t-err">cat: ${esc(f)}: No existe el archivo o directorio</span>`);
      },
    },
    theme: {
      desc: "cambiar tema (dark | dracula | light)",
      run: (args) => {
        if (!args[0]) return print(`Temas: ${THEMES.join(", ")}`);
        print(setTheme(args[0]) ? `<span class="t-ok">✓</span> Tema cambiado a ${esc(args[0])}` : `<span class="t-err">Tema desconocido: ${esc(args[0])}</span>`);
      },
    },
    matrix: { desc: "despertar…", run: () => { toggleMatrix(); print('<span class="t-ok">Sigue al conejo blanco. 🐇</span>'); } },
    date: { desc: "fecha y hora", run: () => print(new Date().toLocaleString("es")) },
    echo: { desc: "imprimir texto", run: (args) => print(esc(args.join(" "))) },
    history: { desc: "historial de comandos", run: () => cmdHistory.forEach((h, i) => print(`  ${String(i + 1).padStart(3)}  ${esc(h)}`)) },
    clear: { desc: "limpiar la terminal", run: () => (termOut.innerHTML = "") },
    sudo: {
      desc: "sudo hire-me 😉",
      run: (args) => {
        if (args.join(" ") === "hire-me") {
          printLines([
            "[sudo] contraseña para visitante: ********",
            '<span class="t-ok">✓ Permiso concedido.</span> Excelente decisión.',
            "Redirigiendo a contacto…",
          ]);
          setTimeout(() => goTo("contact"), 900);
        } else {
          print('<span class="t-err">visitante no está en el archivo sudoers. Este incidente será reportado. 👀</span>');
        }
      },
    },
    rm: { hidden: true, run: () => print('<span class="t-warn">Buen intento 😏 — este portfolio tiene backups.</span>') },
    exit: { hidden: true, run: () => print("No se puede salir de un buen código. 🙂") },
    vim: { hidden: true, run: () => print("Para salir de vim: <span class=\"t-ok\">:q!</span> … o mejor quedate acá.") },
    hello: { hidden: true, run: () => print("¡Hola! 👋 Escribí <span class=\"t-ok\">help</span> para empezar.") },
  };
  COMMANDS.hola = COMMANDS.hello;

  function runCommand(raw) {
    const line = raw.trim();
    print(`<span class="t-ok">visitante@sperattidev</span>:<span class="t-fn">~</span>$ ${esc(line)}`);
    if (!line) return;
    cmdHistory.push(line);
    hIdx = cmdHistory.length;
    const [cmd, ...args] = line.split(/\s+/);
    const c = COMMANDS[cmd.toLowerCase()];
    if (c) c.run(args);
    else print(`<span class="t-err">bash: ${esc(cmd)}: comando no encontrado.</span> <span class="t-muted">Escribí</span> <span class="t-ok">help</span>`);
  }

  function initTerminal() {
    printLines([
      '<span class="t-ok">sperattiOS</span> <span class="t-muted">— terminal interactiva v1.0</span>',
      'Escribí <span class="t-ok">help</span> para ver los comandos disponibles.',
      "",
    ]);
    $("#term-form").addEventListener("submit", (e) => {
      e.preventDefault();
      runCommand(termInput.value);
      termInput.value = "";
    });
    termInput.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (hIdx > 0) termInput.value = cmdHistory[--hIdx];
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        hIdx = Math.min(cmdHistory.length, hIdx + 1);
        termInput.value = cmdHistory[hIdx] || "";
      } else if (e.key === "Tab") {
        e.preventDefault();
        const parts = termInput.value.split(" ");
        const pool = parts.length > 1 ? FILES : Object.keys(COMMANDS).filter((k) => !COMMANDS[k].hidden);
        const last = parts[parts.length - 1];
        const hits = pool.filter((k) => k.startsWith(last));
        if (hits.length === 1) { parts[parts.length - 1] = hits[0]; termInput.value = parts.join(" ") + (parts.length === 1 ? " " : ""); }
        else if (hits.length > 1) print(hits.join("  "));
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        termOut.innerHTML = "";
      }
    });
    termBody.addEventListener("click", () => {
      if (!window.getSelection().toString()) termInput.focus({ preventScroll: true });
    });
  }

  /* ------------------------------------------------------------------
     Matrix rain
     ------------------------------------------------------------------ */
  const canvas = $("#matrix");
  let matrixOn = false;
  let rafId;
  function toggleMatrix() {
    matrixOn = !matrixOn;
    canvas.classList.toggle("is-on", matrixOn);
    if (matrixOn) startMatrix();
    else cancelAnimationFrame(rafId);
  }
  function startMatrix() {
    const ctx = canvas.getContext("2d");
    const chars = "01{}[]<>/=;:()$#&*+アイウエオカキクケコサシスセソ".split("");
    const size = 16;
    let cols, drops;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / size);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();
    window.onresize = resize;
    const color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#3ddc97";
    let last = 0;
    const frame = (t) => {
      if (!matrixOn) return;
      rafId = requestAnimationFrame(frame);
      if (t - last < 50) return;
      last = t;
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = size + "px JetBrains Mono, monospace";
      for (let i = 0; i < cols; i++) {
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * size, drops[i] * size);
        if (drops[i] * size > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    cancelAnimationFrame(rafId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rafId = requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------------
     Atajos de teclado globales + Konami
     ------------------------------------------------------------------ */
  const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let kPos = 0;
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === "k" || e.key.toLowerCase() === "p")) {
      e.preventDefault();
      palette.hidden ? openPalette() : closePalette();
      return;
    }
    if (e.key === "Escape") { closePalette(); closeSidebar(); }
    if (e.ctrlKey && e.key === "`") { e.preventDefault(); goTo("terminal"); setTimeout(() => termInput.focus({ preventScroll: true }), 500); }

    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    kPos = k === KONAMI[kPos] ? kPos + 1 : k === KONAMI[0] ? 1 : 0;
    if (kPos === KONAMI.length) {
      kPos = 0;
      toggleMatrix();
      toast("🐇 Modo Matrix " + (matrixOn ? "activado" : "desactivado"));
    }
  });

  /* ------------------------------------------------------------------
     Arranque
     ------------------------------------------------------------------ */
  renderServices();
  renderStack();
  renderProcess();
  renderContact();
  initSpy();
  initTerminal();
  observeReveal();
  loadProjects();
  clock();
  setInterval(clock, 15000);
  $("#year").textContent = new Date().getFullYear();
  $$('[data-link="github"]').forEach((a) => (a.href = D.links.github));

  if (location.hash) {
    const id = location.hash.slice(1);
    if (document.getElementById(id)) setTimeout(() => document.getElementById(id).scrollIntoView(), 50);
  }

  boot().then(() => {
    typeHero();
    rotateRoles();
  });

  console.log(
    "%c</> sperattidev%c\n¿Curioseando el código? Me gusta tu estilo. Hablemos: " + D.links.github,
    "color:#3ddc97;font:700 20px monospace",
    "color:#8191a6;font:12px monospace"
  );
})();
