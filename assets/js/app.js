/*
 * app.js — Shell-ul mini-LMS (v4).
 *
 * Două module independente:
 *  - 🎬 CURS VIDEO (10 zile): toate lecțiile sunt liber accesibile și se pot
 *    reda în lanț (redare continuă), ca un audiobook. Ascultarea integrală
 *    marchează lecția ca „ascultată" — fără nicio blocare.
 *  - 📝 ANTRENAMENT EXAMEN: teste de 20 de întrebări extrase aleator din banca
 *    oficială de antrenament ANR (568 de întrebări), cu istoric de scoruri,
 *    plus simularea completă de examen (24 întrebări, cronometru).
 *
 * Progresul este salvat local (localStorage), pe acest dispozitiv/browser.
 */

const STORE_KEY = "curs_ambarcatiuni_v2";
const OLD_STORE_KEY = "curs_ambarcatiuni_v1";

const App = {
  state: null,
  player: null,
  exam: null,
  view: { type: "home" }, // home | {type:'lesson', id} | practice | exam

  init() {
    this.state = this.load();
    this.cacheEls();
    this.bindGlobalEvents();
    this.route();
  },

  /* --------------------- Persistență --------------------- */
  defaultState() {
    const lessons = {};
    window.COURSE.LESSONS.forEach((l) => { lessons[l.id] = { watched: false }; });
    return {
      lessons,
      practice: { history: [], bestPct: 0 },
      exam: { passed: false, bestPct: 0, attempts: 0 },
      continuous: true,
    };
  },
  load() {
    try {
      const def = this.defaultState();
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.practice) def.practice = Object.assign(def.practice, parsed.practice);
        if (parsed.exam) def.exam = Object.assign(def.exam, parsed.exam);
        if (typeof parsed.continuous === "boolean") def.continuous = parsed.continuous;
        Object.keys(def.lessons).forEach((id) => {
          if (parsed.lessons && parsed.lessons[id]) def.lessons[id] = Object.assign(def.lessons[id], parsed.lessons[id]);
        });
        return def;
      }
      // Migrare din v1 (cursul pe 14 zile): păstrăm doar rezultatul examenului.
      const oldRaw = localStorage.getItem(OLD_STORE_KEY);
      if (oldRaw) {
        const old = JSON.parse(oldRaw);
        if (old.exam) def.exam = Object.assign(def.exam, old.exam);
        if (typeof old.continuous === "boolean") def.continuous = old.continuous;
      }
      return def;
    } catch (_) {
      return this.defaultState();
    }
  },
  save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(this.state)); } catch (_) {}
  },

  /* --------------------- Helperi --------------------- */
  lessonList() { return window.COURSE.LESSONS; },
  indexOf(id) { return this.lessonList().findIndex((l) => l.id === id); },
  watchedCount() {
    return this.lessonList().filter((l) => this.state.lessons[l.id].watched).length;
  },
  progressPct() {
    return Math.round((this.watchedCount() / this.lessonList().length) * 100);
  },
  anrBank() { return window.ANR_BANK || []; },

  /* --------------------- DOM --------------------- */
  cacheEls() {
    this.$sidebar = document.getElementById("sidebar");
    this.$main = document.getElementById("main");
    this.$progressBar = document.getElementById("globalProgressBar");
    this.$progressText = document.getElementById("globalProgressText");
  },

  bindGlobalEvents() {
    document.addEventListener("lesson:completed", (e) => {
      const id = e.detail.id;
      if (this.state.lessons[id]) { this.state.lessons[id].watched = true; this.save(); }
      this.renderSidebar();
      this.updateGlobalProgress();
      if (this.view.type === "lesson" && this.view.id === id) {
        const next = this.lessonList()[this.indexOf(id) + 1];
        if (this.state.continuous && next) {
          this.toast(`🎧 Urmează Ziua ${next.day}: ${next.title}`);
          this.navigate({ type: "lesson", id: next.id });
          // Încearcă redarea automată (audiobook); dacă browserul o blochează,
          // rămâne butonul de Redă.
          setTimeout(() => { if (this.player) this.player.play(); }, 600);
        } else {
          this.toast("✅ Lecție ascultată integral.");
        }
      }
    });

    this.$main.addEventListener("click", (e) => {
      const act = e.target.closest("[data-action]");
      if (!act) return;
      const a = act.dataset.action;
      if (a === "play") this.player && this.player.play();
      if (a === "pause") this.player && this.player.pause();
      if (a === "replay") this.player && this.player.replay();
      if (a === "next") this.goNext();
      if (a === "prev") this.goPrev();
      if (a === "home") this.navigate({ type: "home" });
      if (a === "go-lesson") this.navigate({ type: "lesson", id: act.dataset.id });
      if (a === "go-practice") this.navigate({ type: "practice" });
      if (a === "start-exam") this.navigate({ type: "exam" });
    });

    document.getElementById("brandHome").addEventListener("click", (ev) => {
      ev.preventDefault(); this.navigate({ type: "home" });
    });
    document.getElementById("resetBtn").addEventListener("click", () => {
      if (confirm("Resetezi tot progresul cursului? Această acțiune nu poate fi anulată.")) {
        this.state = this.defaultState(); this.save(); this.navigate({ type: "home" });
      }
    });

    // Sesiune server (dacă aplicația rulează în spatele serverului de auth).
    fetch("/api/me").then((r) => (r.ok ? r.json() : null)).then((me) => {
      if (!me) return;
      const box = document.getElementById("userBox");
      box.hidden = false;
      document.getElementById("userEmail").textContent = me.email;
      if (me.role === "admin") document.getElementById("adminLink").hidden = false;
      document.getElementById("logoutBtn").addEventListener("click", () => {
        fetch("/api/logout", { method: "POST" }).then(() => (location.href = "/login"));
      });
    }).catch(() => {});

    if (window.speechSynthesis && typeof window.speechSynthesis.getVoices === "function") {
      window.speechSynthesis.getVoices();
    }
  },

  navigate(view) {
    if (this.player) { this.player.destroy(); this.player = null; }
    if (this.exam) { this.exam.destroy(); this.exam = null; }
    this.view = view;
    this.route();
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  route() {
    this.updateGlobalProgress();
    this.renderSidebar();
    if (this.view.type === "home") return this.renderHome();
    if (this.view.type === "lesson") return this.renderLesson(this.view.id);
    if (this.view.type === "practice") return this.renderPractice();
    if (this.view.type === "exam") return this.renderExam();
  },

  updateGlobalProgress() {
    const pct = this.progressPct();
    if (this.$progressBar) this.$progressBar.style.width = pct + "%";
    if (this.$progressText) this.$progressText.textContent = pct + "% ascultat";
  },

  /* --------------------- Sidebar --------------------- */
  renderSidebar() {
    const modules = window.COURSE.MODULES;

    // Modulul CURS VIDEO — totul liber, ca un audiobook.
    const lessonsHtml = `<div class="nav-section">🎬 Curs video — audiobook</div>` +
      modules.map((mod) => {
        const items = this.lessonList().filter((l) => l.module === mod.id).map((l) => {
          const st = this.state.lessons[l.id];
          const icon = st.watched ? "✅" : "▶️";
          const active = this.view.type === "lesson" && this.view.id === l.id ? " nav-item--active" : "";
          return `<li>
            <button class="nav-item nav-item--open${active}" data-lesson="${l.id}">
              <span class="nav-item__icon">${icon}</span>
              <span class="nav-item__label"><strong>Ziua ${l.day}</strong><small>${l.title}</small></span>
            </button></li>`;
        }).join("");
        return `<div class="nav-module" style="--mod:${mod.color}">
          <div class="nav-module__title">${mod.title}</div>
          <ul class="nav-list">${items}</ul>
        </div>`;
      }).join("");

    // Modulul ANTRENAMENT EXAMEN.
    const pr = this.state.practice;
    const tests = pr.history.length;
    const practiceActive = this.view.type === "practice" ? " nav-item--active" : "";
    const examActive = this.view.type === "exam" ? " nav-item--active" : "";
    const examSt = this.state.exam;
    const practiceHtml = `<div class="nav-section">📝 Antrenament examen</div>
      <div class="nav-module" style="--mod:#7c3aed">
        <div class="nav-module__title">Banca oficială — ${this.anrBank().length} întrebări</div>
        <ul class="nav-list">
          <li><button class="nav-item nav-item--open${practiceActive}" data-practice>
            <span class="nav-item__icon">🎯</span>
            <span class="nav-item__label"><strong>Teste de antrenament</strong><small>${tests ? `${tests} teste · best ${pr.bestPct}%` : "20 de întrebări / test"}</small></span>
          </button></li>
          <li><button class="nav-item nav-item--${examSt.passed ? "passed" : "open"}${examActive}" data-exam>
            <span class="nav-item__icon">${examSt.passed ? "🏆" : "⏱️"}</span>
            <span class="nav-item__label"><strong>Simulare examen</strong><small>${examSt.passed ? `Promovat — best ${examSt.bestPct}%` : "24 întrebări · 30 min"}</small></span>
          </button></li>
        </ul>
      </div>`;

    this.$sidebar.innerHTML = lessonsHtml + practiceHtml;

    this.$sidebar.querySelectorAll("[data-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => this.navigate({ type: "lesson", id: btn.dataset.lesson }));
    });
    const practiceBtn = this.$sidebar.querySelector("[data-practice]");
    if (practiceBtn) practiceBtn.addEventListener("click", () => this.navigate({ type: "practice" }));
    const examBtn = this.$sidebar.querySelector("[data-exam]");
    if (examBtn) examBtn.addEventListener("click", () => this.navigate({ type: "exam" }));
  },

  /* --------------------- Home --------------------- */
  renderHome() {
    const listened = this.watchedCount();
    const total = this.lessonList().length;
    const nextListen = this.lessonList().find((l) => !this.state.lessons[l.id].watched);
    const pr = this.state.practice;

    this.$main.innerHTML = `
      <section class="home">
        <div class="home__hero">
          <h1>Curs: Conducător de ambarcațiune cu motor</h1>
          <p class="home__sub">Curs video de 10 zile cu Cpt. Paul Dicu · antrenament cu întrebările oficiale de examen.</p>
          <div class="home__stats">
            <div class="stat"><span class="stat__num">${listened}/${total}</span><span class="stat__lbl">lecții ascultate</span></div>
            <div class="stat"><span class="stat__num">${pr.history.length}</span><span class="stat__lbl">teste de antrenament</span></div>
            <div class="stat"><span class="stat__num">${pr.history.length ? pr.bestPct + "%" : "—"}</span><span class="stat__lbl">cel mai bun scor</span></div>
            <div class="stat"><span class="stat__num">${this.state.exam.passed ? "✔" : "—"}</span><span class="stat__lbl">simulare examen</span></div>
          </div>
          <div class="home__cta">
            ${nextListen
              ? `<button class="btn btn--primary btn--lg" data-action="go-lesson" data-id="${nextListen.id}">🎧 ${listened === 0 ? "Începe cursul" : "Continuă ascultarea"} — Ziua ${nextListen.day}</button>`
              : `<button class="btn btn--ghost btn--lg" data-action="go-lesson" data-id="${this.lessonList()[0].id}">🎧 Reascultă cursul</button>`}
            <button class="btn ${nextListen ? "btn--ghost" : "btn--primary"} btn--lg" data-action="go-practice">🎯 Test de antrenament (20 întrebări)</button>
          </div>
        </div>

        <div class="home__how">
          <h2>Cum funcționează</h2>
          <ol>
            <li>🎬 <strong>Cursul video</strong> (10 zile) se ascultă liber, în orice ordine — cu redare continuă, ca un audiobook.</li>
            <li>🎯 <strong>Antrenamentul</strong>: teste de câte 20 de întrebări, extrase aleator din banca oficială de ${this.anrBank().length} întrebări.</li>
            <li>📊 Scorurile se păstrează — urmărește-ți evoluția până treci constant de ${Math.round(window.COURSE.PRACTICE_CONFIG.pass * 100)}%.</li>
            <li>⏱️ <strong>Simularea de examen</strong>: 24 de întrebări, 30 de minute, ca la examenul real.</li>
          </ol>
        </div>

        <div class="home__modules">
          ${window.COURSE.MODULES.map((m) => {
            const ls = this.lessonList().filter((l) => l.module === m.id);
            const done = ls.filter((l) => this.state.lessons[l.id].watched).length;
            return `<div class="mod-card" style="--mod:${m.color}">
              <h3>${m.title}</h3>
              <p>${done}/${ls.length} lecții ascultate</p>
              <ul>${ls.map((l) => `<li>Ziua ${l.day}: ${l.title}</li>`).join("")}</ul>
            </div>`;
          }).join("")}
        </div>
      </section>`;
  },

  /* --------------------- Lecție (audiobook) --------------------- */
  renderLesson(id) {
    const lesson = this.lessonList().find((l) => l.id === id);
    if (!lesson) return this.navigate({ type: "home" });
    const mod = window.COURSE.MODULES.find((m) => m.id === lesson.module);
    const i = this.indexOf(id);
    const last = i === this.lessonList().length - 1;

    this.$main.innerHTML = `
      <section class="lesson" style="--mod:${mod.color}">
        <div class="lesson__head">
          <div class="lesson__crumbs">🎬 Curs video · ${mod.title}</div>
          <h1>Ziua ${lesson.day}: ${lesson.title}</h1>
          <p class="lesson__summary">${lesson.summary}</p>
        </div>

        <div class="lesson__player-wrap">
          <div id="playerRoot"></div>
          <div class="player-controls">
            <button class="btn btn--primary" data-action="play">▶ Redă</button>
            <button class="btn btn--ghost" data-action="pause">⏸ Pauză</button>
            <button class="btn btn--ghost" data-action="replay">🔁 De la început</button>
            <div class="player-progress"><div class="player-progress__bar" id="lessonProgressBar"></div></div>
            <span class="player-progress__label" id="lessonProgressLabel">0%</span>
          </div>
          <label class="cont-toggle">
            <input type="checkbox" id="contToggle" ${this.state.continuous ? "checked" : ""}>
            ⏭ Redare continuă — lecțiile curg una după alta, ca un audiobook
          </label>
        </div>

        <div class="lesson__nav">
          <button class="btn btn--ghost" data-action="prev" ${i === 0 ? "disabled" : ""}>← Ziua anterioară</button>
          <button class="btn btn--ghost" data-action="go-practice">🎯 Antrenament examen</button>
          <button class="btn btn--primary" data-action="next" ${last ? "disabled" : ""}>Ziua următoare →</button>
        </div>
      </section>`;

    const bar = document.getElementById("lessonProgressBar");
    const label = document.getElementById("lessonProgressLabel");
    this._progressHandler = (e) => {
      if (e.detail.id !== id) return;
      const p = Math.round(e.detail.ratio * 100);
      if (bar) bar.style.width = p + "%";
      if (label) label.textContent = p + "%";
    };
    document.addEventListener("lesson:progress", this._progressHandler);

    document.getElementById("contToggle").addEventListener("change", (e) => {
      this.state.continuous = e.target.checked;
      this.save();
    });

    this.player = new LessonPlayer(document.getElementById("playerRoot"), lesson);
    this.player.render();
  },

  /* --------------------- Antrenament examen --------------------- */
  renderPractice() {
    const cfg = window.COURSE.PRACTICE_CONFIG;
    const pr = this.state.practice;
    const hist = pr.history.slice(-10).reverse();

    this.$main.innerHTML = `
      <section class="lesson" style="--mod:#7c3aed">
        <div class="lesson__head">
          <div class="lesson__crumbs">🎯 Antrenament examen</div>
          <h1>Teste de antrenament</h1>
          <p class="lesson__summary">${cfg.count} întrebări pe test, extrase aleator din banca oficială de
            ${this.anrBank().length} întrebări · prag ${Math.round(cfg.pass * 100)}%.</p>
        </div>

        <div id="practiceIntro">
          ${pr.history.length ? `
            <div class="practice-stats">
              <div class="stat"><span class="stat__num">${pr.history.length}</span><span class="stat__lbl">teste făcute</span></div>
              <div class="stat"><span class="stat__num">${pr.bestPct}%</span><span class="stat__lbl">cel mai bun scor</span></div>
              <div class="stat"><span class="stat__num">${Math.round(pr.history.reduce((s, h) => s + h.pct, 0) / pr.history.length)}%</span><span class="stat__lbl">media</span></div>
              <div class="stat"><span class="stat__num">${pr.history.filter((h) => h.passed).length}/${pr.history.length}</span><span class="stat__lbl">promovate</span></div>
            </div>
            <div class="practice-history">
              <h3>Ultimele teste</h3>
              <ul>${hist.map((h) => `<li class="${h.passed ? "ph--pass" : "ph--fail"}">
                <span>${new Date(h.ts).toLocaleDateString("ro-RO")} ${new Date(h.ts).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}</span>
                <span>${h.correct}/${h.total}</span>
                <strong>${h.pct}%</strong>
                <span>${h.passed ? "✅" : "❌"}</span>
              </li>`).join("")}</ul>
            </div>` : `
            <p class="practice-empty">Încă n-ai făcut niciun test. Începe primul — vezi exact unde stai față de examenul real.</p>`}
          <div class="home__cta">
            <button class="btn btn--primary btn--lg" id="startPracticeBtn">🎯 Începe un test nou (${cfg.count} întrebări)</button>
            <button class="btn btn--ghost" data-action="start-exam">⏱️ Simulare examen (24 · 30 min)</button>
          </div>
        </div>
        <div id="practiceRoot" class="quiz-root"></div>
      </section>`;

    document.getElementById("startPracticeBtn").addEventListener("click", () => this.startPracticeTest());
  },

  startPracticeTest() {
    const cfg = window.COURSE.PRACTICE_CONFIG;
    const intro = document.getElementById("practiceIntro");
    if (intro) intro.style.display = "none";
    renderPracticeTest(document.getElementById("practiceRoot"), {
      bank: this.anrBank(),
      count: cfg.count,
      pass: cfg.pass,
      onFinish: (res) => {
        if (res.again) { this.navigate({ type: "practice" }); this.startPracticeTest(); return; }
        this.state.practice.history.push({ ts: Date.now(), correct: res.correct, total: res.total, pct: res.pct, passed: res.passed });
        if (this.state.practice.history.length > 200) this.state.practice.history.shift();
        this.state.practice.bestPct = Math.max(this.state.practice.bestPct, res.pct);
        this.save();
        this.renderSidebar();
        this.toast(res.passed ? `🎉 ${res.pct}% — peste pragul de examen!` : `📚 ${res.pct}% — mai exersează, îți iese.`);
      },
    });
  },

  toast(text) {
    const el = document.createElement("div");
    el.className = "toast toast--success";
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add("toast--show"), 20);
    setTimeout(() => { el.classList.remove("toast--show"); setTimeout(() => el.remove(), 300); }, 2800);
  },

  goNext() {
    const i = this.indexOf(this.view.id);
    if (i < this.lessonList().length - 1) this.navigate({ type: "lesson", id: this.lessonList()[i + 1].id });
  },
  goPrev() {
    const i = this.indexOf(this.view.id);
    if (i > 0) this.navigate({ type: "lesson", id: this.lessonList()[i - 1].id });
  },

  /* --------------------- Simularea de examen --------------------- */
  renderExam() {
    const cfg = window.COURSE.EXAM_CONFIG;

    this.$main.innerHTML = `
      <section class="exam-page">
        <div class="exam-page__head">
          <h1>Simulare examen — Conducător de ambarcațiune cu motor</h1>
          <p>${cfg.count} întrebări din banca oficială, echilibrate pe categorii · timp: ${cfg.minutes} minute · prag: ${Math.round(cfg.pass * 100)}%.</p>
          ${this.state.exam.passed ? `<p class="exam-page__badge">🏆 Cel mai bun rezultat: ${this.state.exam.bestPct}% — PROMOVAT</p>` : ""}
        </div>
        <div class="exam-page__intro" id="examIntro">
          <p>Simularea reproduce formatul grilă al examenului real: cronometru și o singură variantă corectă pe întrebare. Succes!</p>
          <button class="btn btn--primary btn--lg" id="beginExam">Începe simularea</button>
          <button class="btn btn--ghost" data-action="go-practice">🎯 Înapoi la antrenament</button>
          <button class="btn btn--ghost" data-action="home">Acasă</button>
        </div>
        <div id="examRoot"></div>
      </section>`;

    document.getElementById("beginExam").addEventListener("click", () => {
      document.getElementById("examIntro").style.display = "none";
      const seed = 1000 + this.state.exam.attempts * 37 + Date.now() % 997;
      const anr = this.anrBank().map((q) => ({ m: q.cat, q: q.q, options: q.options, answer: q.answer }));
      this.exam = new Exam(document.getElementById("examRoot"), {
        bank: anr,
        config: cfg,
        seed,
        onFinish: (res) => {
          if (res.retry) {
            this.state.exam.attempts++;
            this.save();
            this.navigate({ type: "exam" });
            return;
          }
          const pct = Math.round((res.correct / res.total) * 100);
          this.state.exam.attempts++;
          this.state.exam.bestPct = Math.max(this.state.exam.bestPct, pct);
          if (res.passed) this.state.exam.passed = true;
          this.save();
          this.renderSidebar();
        },
      });
      this.exam.start();
    });
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
window.App = App;
