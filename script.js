/* Abdou Nimaga — Portfolio v5 · vanilla JS, zéro dépendance */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const PROJECTS = window.PROJECTS || [];
  const MAIL = "abdou.nimaga@ism.edu.sn";
  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch { /* private mode */ } }
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const host = (u) => { try { return new URL(u).host.replace(/^www\./, ""); } catch { return u; } };

  /* ---------------- toast ---------------- */
  const toastEl = $("#toast");
  let toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove("is-on"), 2200);
  }
  async function copyMail() {
    try { await navigator.clipboard.writeText(MAIL); toast("✓ email copié dans le presse-papiers"); }
    catch { location.href = "mailto:" + MAIL; }
  }

  /* ---------------- boot sequence ---------------- */
  const boot = $("#boot");
  let startHero = () => {};
  function runBoot() {
    if (reduce || store.get("booted")) { startHero(); return; }
    store.set("booted", "1");
    boot.classList.add("is-on");
    const log = $("#bootLog"), bar = $("#bootBar");
    const lines = [
      "[ <span class=ok>OK</span> ] Initialisation du noyau portfolio v5.0",
      "[ <span class=ok>OK</span> ] Montage de /dev/projets (9 trouvés)",
      "[ <span class=ok>OK</span> ] Démarrage de react, next, php, node…",
      "[ <span class=ok>OK</span> ] Pipeline CI/CD : vert",
      "[ <span class=ok>OK</span> ] Connexion réseau établie · Dakar, SN",
      "",
      "Bienvenue."
    ];
    let i = 0, done = false;
    const finish = () => {
      if (done) return; done = true;
      bar.style.width = "100%";
      boot.classList.add("is-done");
      setTimeout(() => boot.remove(), 600);
      startHero();
    };
    const step = () => {
      if (done) return;
      if (i < lines.length) {
        log.innerHTML += lines[i] + "\n";
        bar.style.width = Math.round(((i + 1) / lines.length) * 100) + "%";
        i++;
        setTimeout(step, i === lines.length ? 380 : 150 + Math.random() * 110);
      } else finish();
    };
    boot.addEventListener("click", finish);
    addEventListener("keydown", finish, { once: true });
    step();
  }

  /* ---------------- background spotlight ---------------- */
  if (finePointer && !reduce) {
    const spot = $("#spot");
    let tx = innerWidth / 2, ty = innerHeight / 3, x = tx, y = ty;
    addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function loop() {
      x += (tx - x) * 0.08; y += (ty - y) * 0.08;
      spot.style.transform = `translate(${x - 450}px, ${y - 450}px)`;
      requestAnimationFrame(loop);
    })();
  }

  /* per-element spotlight (cards, links) */
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest && e.target.closest(".spot, .card");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
  }, { passive: true });

  /* ---------------- nav ---------------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const navLinks = $$(".nav__links a");
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((s) => secObs.observe(s));

  /* ---------------- hero network canvas ---------------- */
  function initNetwork() {
    const cv = $("#net");
    if (!cv || reduce) return;
    const ctx = cv.getContext("2d");
    let W, H, DPR, nodes = [], packets = [], running = true, mouse = { x: -999, y: -999 };
    const resize = () => {
      DPR = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * DPR; cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const n = Math.round(Math.min(90, (W * H) / 16000));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() < 0.12 ? 2.4 : 1.3, o: Math.random() < 0.5
      }));
    };
    resize();
    addEventListener("resize", resize);
    cv.parentElement.addEventListener("pointermove", (e) => {
      const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    cv.parentElement.addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; });
    new IntersectionObserver(([en]) => { running = en.isIntersecting; if (running) requestAnimationFrame(draw); }).observe(cv);
    document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) requestAnimationFrame(draw); });

    const LINK = 140;
    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        const dx = mouse.x - n.x, dy = mouse.y - n.y, d = Math.hypot(dx, dy);
        if (d < 180) { n.x -= dx * 0.004; n.y -= dy * 0.004; }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(37,99,235,${(1 - d / LINK) * 0.18})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            if (packets.length < 14 && Math.random() < 0.0009) packets.push({ a, b, t: 0, s: 0.008 + Math.random() * 0.012 });
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 200) {
          ctx.strokeStyle = `rgba(6,182,212,${(1 - md / 200) * 0.5})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = n.r > 2 ? (n.o ? "rgba(6,182,212,.9)" : "rgba(37,99,235,.85)") : "rgba(2,132,199,.35)";
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
      packets = packets.filter((p) => {
        p.t += p.s;
        if (p.t >= 1) return false;
        const x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 8);
        g.addColorStop(0, "rgba(37,99,235,.9)"); g.addColorStop(1, "rgba(37,99,235,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.fill();
        return true;
      });
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  /* ---------------- scramble rotator ---------------- */
  function initRotator() {
    const el = $("#rotator");
    const phrases = ["Je construis des produits.", "J'automatise les déploiements.", "Je fais tourner l'infra.", "Run. Automate. Build."];
    if (reduce) return;
    const chars = "!<>-_\\/[]{}—=+*^?#01";
    let idx = 0;
    const scramble = (to) => new Promise((res) => {
      const from = el.textContent, len = Math.max(from.length, to.length);
      const q = Array.from({ length: len }, (_, i) => ({ f: from[i] || "", t: to[i] || "", s: Math.floor(Math.random() * 18), e: 0 }));
      q.forEach((o) => { o.e = o.s + Math.floor(Math.random() * 18); });
      let frame = 0;
      (function tick() {
        let out = "", done = 0;
        for (const o of q) {
          if (frame >= o.e) { done++; out += o.t; }
          else if (frame >= o.s) out += `<span style="color:var(--accent)">${esc(chars[Math.floor(Math.random() * chars.length)])}</span>`;
          else out += esc(o.f);
        }
        el.innerHTML = out;
        if (done === q.length) res(); else { frame++; requestAnimationFrame(tick); }
      })();
    });
    setInterval(() => { idx = (idx + 1) % phrases.length; scramble(phrases[idx]); }, 3200);
  }

  /* ---------------- terminal ---------------- */
  const termOut = $("#termOut"), termIn = $("#termIn"), termBody = $("#termBody");
  const line = (html, cls = "o") => {
    const d = document.createElement("div"); d.className = "l " + cls; d.innerHTML = html; termOut.appendChild(d);
    termBody.scrollTop = termBody.scrollHeight;
  };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  async function typeCmd(cmd) {
    const d = document.createElement("div"); d.className = "l c"; termOut.appendChild(d);
    if (reduce) { d.textContent = cmd; return; }
    for (const ch of cmd) { d.textContent += ch; await sleep(28 + Math.random() * 40); }
    await sleep(160);
  }
  const COMMANDS = {
    help: () => [
      "<span class=g>commandes disponibles</span>",
      "  <span class=b>whoami</span>      qui je suis",
      "  <span class=b>stack</span>       mes technologies",
      "  <span class=b>projects</span>    lister mes projets",
      "  <span class=b>open</span> &lt;nom&gt;  ouvrir un projet (ex : open jaguar)",
      "  <span class=b>experience</span>  mon parcours",
      "  <span class=b>contact</span>     me joindre",
      "  <span class=b>github</span> · <span class=b>linkedin</span> · <span class=b>clear</span>",
      "<span class=y>astuce : essaie aussi « sudo hire-me »</span>"
    ],
    whoami: () => ["Abdou Nimaga — Développeur Full-Stack &amp; DevOps", "Fondateur d'ARTIX · ex-IT Manager · Dakar, Sénégal"],
    stack: () => [
      "<span class=g>front</span>    React · Next.js · TypeScript · HTML/CSS",
      "<span class=g>back</span>     PHP · Node.js · REST API · Prisma",
      "<span class=g>data</span>     MySQL · PostgreSQL",
      "<span class=g>devops</span>   Docker · GitHub Actions · Ansible · Nginx",
      "<span class=g>infra</span>    Linux · Windows Server · AD · pfSense · Grafana"
    ],
    projects: () => PROJECTS.map((p, i) => `<span class=g>${String(i + 1).padStart(2, "0")}</span>  ${esc(p.name.padEnd(16, " "))}<span class=o>${esc(p.kicker.split(" · ")[0])}</span>`)
      .concat(["→ tape <span class=b>open &lt;nom&gt;</span> pour voir le détail"]),
    experience: () => [
      "<span class=g>2024 → now</span>   Fondateur · Dev Full-Stack @ ARTIX",
      "<span class=g>2024 → 2026</span>  IT Manager @ Shy Performance",
      "<span class=g>2023 → 2024</span>  Spécialiste exploitation SI @ Majorel",
      "<span class=g>2023</span>         Licence Informatique — ISM"
    ],
    contact: () => [`email     <a href="mailto:${MAIL}">${MAIL}</a>`, `linkedin  <a href="https://www.linkedin.com/in/abdou-nimaga" target="_blank" rel="noopener">abdou-nimaga</a>`, `github    <a href="https://github.com/Nims221" target="_blank" rel="noopener">Nims221</a>`],
    github: () => { open("https://github.com/Nims221", "_blank", "noopener"); return ["ouverture de github.com/Nims221…"]; },
    linkedin: () => { open("https://www.linkedin.com/in/abdou-nimaga", "_blank", "noopener"); return ["ouverture de LinkedIn…"]; },
    clear: () => { termOut.innerHTML = ""; return []; },
    ls: () => ["projets/  labs/  cv.pdf  <span class=g>motivation.txt</span>"],
    "cat motivation.txt": () => ["Construire des produits utiles, proprement, et les faire tourner en prod."],
    "sudo hire-me": () => { setTimeout(() => $("#contact").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }), 900); return ["<span class=y>[sudo] mot de passe pour recruteur : ********</span>", "<span class=g>✓ Permission accordée.</span> Redirection vers le contact…"]; }
  };
  function run(raw) {
    const cmd = raw.trim().toLowerCase().replace(/\s+/g, " ");
    if (!cmd) return;
    if (cmd.startsWith("open ")) {
      const q = cmd.slice(5);
      const p = PROJECTS.find((x) => x.id === q || x.name.toLowerCase().includes(q));
      if (p) { line("ouverture de " + esc(p.name) + "…", "g"); setTimeout(() => openModal(p.id), 350); }
      else line("projet introuvable : " + esc(q) + " (tape <span class=b>projects</span>)", "y");
      return;
    }
    if (cmd === "sudo" || (cmd.startsWith("sudo ") && cmd !== "sudo hire-me")) { line("bien essayé 😏 — essaie <span class=b>sudo hire-me</span>", "y"); return; }
    const fn = COMMANDS[cmd];
    if (fn) fn().forEach((l) => line(l));
    else line(`zsh: command not found: ${esc(cmd)} — tape <span class=b>help</span>`, "y");
  }
  const cmdHistory = []; let hIdx = 0;
  $("#termForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = termIn.value; termIn.value = "";
    if (!v.trim()) return;
    cmdHistory.push(v); hIdx = cmdHistory.length;
    const d = document.createElement("div"); d.className = "l c"; d.textContent = v; termOut.appendChild(d);
    run(v);
    termBody.scrollTop = termBody.scrollHeight;
  });
  termIn.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && hIdx > 0) { termIn.value = cmdHistory[--hIdx]; e.preventDefault(); }
    else if (e.key === "ArrowDown") { hIdx = Math.min(cmdHistory.length, hIdx + 1); termIn.value = cmdHistory[hIdx] || ""; e.preventDefault(); }
    else if (e.key === "Tab") {
      e.preventDefault();
      const all = Object.keys(COMMANDS).concat(PROJECTS.map((p) => "open " + p.id));
      const m = all.find((c) => c.startsWith(termIn.value.toLowerCase()) && termIn.value);
      if (m) termIn.value = m;
    }
  });
  termBody.addEventListener("click", (e) => { if (!e.target.closest("a") && !getSelection().toString()) termIn.focus({ preventScroll: true }); });

  async function termIntro() {
    await typeCmd("whoami");
    COMMANDS.whoami().forEach((l) => line(l));
    await sleep(reduce ? 0 : 350);
    await typeCmd("cat stack.txt");
    line("React · Next.js · TypeScript · PHP · Node.js · MySQL", "o");
    line("Docker · GitHub Actions · Ansible · Linux", "o");
    await sleep(reduce ? 0 : 350);
    await typeCmd("./status --now");
    line("<span class=g>●</span> Fondateur @ ARTIX · <span class=g>ouvert aux opportunités</span>");
    await sleep(reduce ? 0 : 250);
    line("tape <span class=b>help</span> pour explorer — ou <span class=b>projects</span> 👇", "o");
  }

  /* ---------------- counters ---------------- */
  function countUp(el) {
    const to = +el.dataset.to, suf = el.dataset.suffix || "";
    const fmt = (n) => n.toLocaleString("fr-FR").replace(/ | /g, " ") + suf;
    if (reduce) { el.textContent = fmt(to); return; }
    const t0 = performance.now(), dur = 1600;
    (function f(t) {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(Math.round(to * e));
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }

  /* ---------------- reveal ---------------- */
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      $$(".count", en.target).forEach(countUp);
      revObs.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  function observeReveals(root = document) {
    $$(".reveal:not(.is-in)", root).forEach((el) => {
      const sib = el.parentElement ? $$(":scope > .reveal", el.parentElement) : [];
      const i = sib.indexOf(el);
      if (i > 0) el.style.setProperty("--d", Math.min(i, 6) * 0.08 + "s");
      revObs.observe(el);
    });
  }

  /* ---------------- magnetic buttons ---------------- */
  if (finePointer && !reduce) {
    $$(".magnetic").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });
  }

  /* ---------------- projects ---------------- */
  const grid = $("#projects");
  const arrow = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
  const laptop = (src, alt, lazy) => `<div class="dev-laptop"><div class="dev-laptop__screen"><img src="${src}" alt="${esc(alt)}"${lazy ? ' loading="lazy" decoding="async"' : ""}></div><div class="dev-laptop__base"></div></div>`;
  const phone = (src, alt, lazy) => `<div class="dev-phone"><img src="${src}" alt="${esc(alt)}"${lazy ? ' loading="lazy" decoding="async"' : ""}></div>`;
  const tagsOf = (p) => (p.stack.length ? p.stack : p.services || []);
  const liveBadge = (p) => p.url ? `<span class="live">en ligne</span>` : p.status ? `<span class="live live--pilot">${esc(p.status.toLowerCase())}</span>` : "";
  function cardHTML(p) {
    return `
      <article class="card reveal" data-id="${p.id}" data-cat="${p.cat}" tabindex="0" role="button" aria-label="Voir le projet ${esc(p.name)}">
        <div class="card__scene">
          ${laptop(p.images[0], p.name + " sur ordinateur", true)}
          ${p.phone ? `<div class="card__phone">${phone(p.phone, p.name + " sur mobile", true)}</div>` : ""}
        </div>
        <div class="card__body">
          <div class="card__row">
            <h3 class="card__name">${esc(p.name)}</h3>
            <div class="card__meta">${liveBadge(p)}<span class="card__go">${arrow}</span></div>
          </div>
          <p class="card__k">${esc(p.kicker)}</p>
          <ul class="chips chips--sm">${tagsOf(p).slice(0, 3).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        </div>
      </article>`;
  }
  function renderProjects() {
    grid.innerHTML = PROJECTS.map(cardHTML).join("");
    $("#cntAll").textContent = PROJECTS.length;
    observeReveals(grid);
    $$(".card", grid).forEach((c) => {
      c.addEventListener("click", () => openModal(c.dataset.id));
      c.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(c.dataset.id); } });
    });
  }
  $$("[data-open]").forEach((b) => b.addEventListener("click", () => openModal(b.dataset.open)));
  $$(".filter").forEach((f) => f.addEventListener("click", () => {
    $$(".filter").forEach((x) => { x.classList.toggle("is-active", x === f); x.setAttribute("aria-selected", x === f); });
    const k = f.dataset.filter;
    $$(".card", grid).forEach((c) => {
      const show = k === "all" || c.dataset.cat === k;
      c.classList.toggle("is-hidden", !show);
      if (show) { c.classList.remove("is-in"); requestAnimationFrame(() => c.classList.add("is-in")); }
    });
  }));

  /* ---------------- modal ---------------- */
  const modal = $("#modal");
  let lastFocus = null;
  function openModal(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    lastFocus = document.activeElement;
    closePalette();
    $("#mStage").innerHTML = `<div class="m-dev m-dev--laptop">${laptop(p.images[0], p.name + " sur ordinateur")}</div>` + (p.phone ? `<div class="m-dev m-dev--phone">${phone(p.phone, p.name + " sur mobile")}</div>` : "");
    $("#mKicker").textContent = p.kicker;
    $("#mTitle").textContent = p.name;
    $("#mLead").textContent = p.short;
    const chips = (arr) => `<ul class="chips">${arr.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`;
    $("#mFacts").innerHTML =
      `<div><dt>Fonctionnalités</dt><dd>${chips(p.features)}</dd></div>` +
      `<div><dt>${p.stack.length ? "Stack" : "Livré"}</dt><dd>${chips(tagsOf(p))}</dd></div>`;
    $("#mFoot").innerHTML = (p.url
      ? `<a class="btn btn--primary" href="${p.url}" target="_blank" rel="noopener"><span>Voir le site</span>${arrow}</a><span class="note">${esc(host(p.url))}</span>`
      : `<span class="note">${esc(p.status || "Projet client")} · code privé</span>`);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal__panel", modal).scrollTop = 0;
    $(".modal__close", modal).focus();
    history.replaceState(null, "", "#projet-" + p.id);
  }
  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const f = $$("a[href], button", modal).filter((x) => x.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });

  /* ---------------- pipeline ---------------- */
  function initPipeline() {
    const pipe = $("#pipeline"), steps = $$(".pipeline__steps li", pipe), log = $("#pipeLog");
    const msgs = [
      "<span class=g>$</span> git push origin main · <span class=g>a3f9c1e</span> feat: checkout WhatsApp",
      "<span class=y>▸</span> docker build -t app:a3f9c1e . · <span class=g>built in 41s</span>",
      "<span class=y>▸</span> npm test · <span class=g>48 passed</span>, 0 failed",
      "<span class=y>▸</span> trivy image app:a3f9c1e · <span class=g>0 critical</span>, 0 high",
      "<span class=y>▸</span> push ghcr.io/nims221/app · docker compose up -d · <span class=g>healthy</span>",
      "<span class=g>✓</span> déployé · métriques Grafana au vert · <span class=g>prêt pour la prochaine itération</span>"
    ];
    let timer = null, k = 0;
    const set = (i) => {
      steps.forEach((s, j) => { s.classList.toggle("is-done", j < i); s.classList.toggle("is-run", j === i); });
      pipe.style.setProperty("--p", (Math.min(i, steps.length - 1) / (steps.length - 1)) * 100 + "%");
      log.innerHTML = msgs[Math.min(i, msgs.length - 1)];
    };
    const tick = () => {
      if (k > steps.length) { k = 0; steps.forEach((s) => s.classList.remove("is-done", "is-run")); }
      if (k === steps.length) { steps.forEach((s) => { s.classList.add("is-done"); s.classList.remove("is-run"); }); log.innerHTML = msgs[msgs.length - 1]; }
      else set(k);
      k++;
    };
    if (reduce) { k = steps.length; tick(); return; }
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !timer) { tick(); timer = setInterval(tick, 1100); }
      else if (!en.isIntersecting && timer) { clearInterval(timer); timer = null; }
    }, { threshold: 0.4 }).observe(pipe);
  }

  /* ---------------- timeline progress ---------------- */
  function initTimeline() {
    const tl = $("#timeline");
    const upd = () => {
      const r = tl.getBoundingClientRect();
      const p = Math.max(0, Math.min(r.height - 16, innerHeight * 0.6 - r.top));
      tl.style.setProperty("--tl", p + "px");
    };
    addEventListener("scroll", upd, { passive: true });
    addEventListener("resize", upd);
    upd();
  }

  /* ---------------- command palette ---------------- */
  const pal = $("#palette"), pIn = $("#pIn"), pList = $("#pList");
  const ACTIONS = [
    { t: "Profil", g: "section", ic: "01", run: () => go("#profil") },
    { t: "Projets", g: "section", ic: "02", run: () => go("#projets") },
    { t: "DevOps & labs", g: "section", ic: "03", run: () => go("#devops") },
    { t: "Parcours", g: "section", ic: "04", run: () => go("#parcours") },
    { t: "Contact", g: "section", ic: "05", run: () => go("#contact") },
    ...PROJECTS.map((p) => ({ t: p.name, sub: p.kicker, g: "projet", ic: "◆", run: () => openModal(p.id) })),
    { t: "Copier mon email", g: "action", ic: "@", run: copyMail },
    { t: "Ouvrir le terminal", g: "action", ic: ">_", run: () => { go("#top"); setTimeout(() => termIn.focus({ preventScroll: true }), 500); } },
    { t: "GitHub — Nims221", g: "lien", ic: "↗", run: () => open("https://github.com/Nims221", "_blank", "noopener") },
    { t: "LinkedIn — abdou-nimaga", g: "lien", ic: "↗", run: () => open("https://www.linkedin.com/in/abdou-nimaga", "_blank", "noopener") },
    { t: "Studio ARTIX — artix-na.com", g: "lien", ic: "↗", run: () => open("https://artix-na.com/work", "_blank", "noopener") }
  ];
  let filtered = ACTIONS, sel = 0;
  function go(h) { $(h).scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
  function renderPalette() {
    const q = pIn.value.trim().toLowerCase();
    filtered = ACTIONS.filter((a) => !q || (a.t + " " + (a.sub || "") + " " + a.g).toLowerCase().includes(q));
    sel = Math.min(sel, Math.max(0, filtered.length - 1));
    pList.innerHTML = filtered.length
      ? filtered.map((a, i) => `<li role="option" data-i="${i}" class="${i === sel ? "is-sel" : ""}" aria-selected="${i === sel}"><span class="ic">${esc(a.ic)}</span>${esc(a.t)}<span class="grp">${esc(a.g)}</span></li>`).join("")
      : `<li class="empty">Aucun résultat</li>`;
    const s = $(".is-sel", pList); if (s) s.scrollIntoView({ block: "nearest" });
  }
  function openPalette() { closeModal(); pal.hidden = false; pIn.value = ""; sel = 0; renderPalette(); pIn.focus(); }
  function closePalette() { pal.hidden = true; }
  function exec(i) { const a = filtered[i]; if (!a) return; closePalette(); a.run(); }
  $("#openPalette").addEventListener("click", openPalette);
  pal.addEventListener("click", (e) => {
    if (e.target.closest("[data-pclose]")) closePalette();
    const li = e.target.closest("li[data-i]"); if (li) exec(+li.dataset.i);
  });
  pIn.addEventListener("input", () => { sel = 0; renderPalette(); });
  pIn.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { sel = (sel + 1) % Math.max(1, filtered.length); renderPalette(); e.preventDefault(); }
    else if (e.key === "ArrowUp") { sel = (sel - 1 + filtered.length) % Math.max(1, filtered.length); renderPalette(); e.preventDefault(); }
    else if (e.key === "Enter") { exec(sel); e.preventDefault(); }
  });
  addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.hidden ? openPalette() : closePalette(); }
    else if (e.key === "Escape") { closePalette(); closeModal(); }
    else if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName) && pal.hidden && modal.hidden) { e.preventDefault(); openPalette(); }
  });

  /* ---------------- misc ---------------- */
  $("#copyMail").addEventListener("click", async () => {
    await copyMail();
    const h = $("#copyHint"); h.textContent = "✓ Copié !"; setTimeout(() => { h.textContent = "Cliquer pour copier"; }, 2000);
  });
  $("#year").textContent = new Date().getFullYear();
  const clock = $("#clock");
  const tickClock = () => {
    try { clock.textContent = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Africa/Dakar" }).format(new Date()); }
    catch { clock.textContent = new Date().toUTCString().slice(17, 25); }
  };
  tickClock(); setInterval(tickClock, 1000);

  /* ---------------- start ---------------- */
  renderProjects();
  observeReveals();
  initPipeline();
  initTimeline();
  let heroStarted = false;
  startHero = () => {
    if (heroStarted) return; heroStarted = true;
    initNetwork();
    initRotator();
    termIntro();
  };
  runBoot();

  /* deep link: #projet-jaguar */
  const m = location.hash.match(/^#projet-(.+)$/);
  if (m) setTimeout(() => openModal(m[1]), 400);
})();
