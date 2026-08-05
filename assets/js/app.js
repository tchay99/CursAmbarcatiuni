/*
 * app.js — Shell-ul mini-LMS: navigare, progres, blocarea/deblocarea lecțiilor.
 *
 * Reguli de progresie:
 *  - Lecția N este accesibilă doar dacă lecția N-1 a fost promovată.
 *  - Verificarea de cunoștințe se deblochează după vizionarea integrală.
 *  - La eșec, verificarea se blochează la loc și lecția trebuie revizionată.
 *  - Examenul final se deblochează după promovarea tuturor celor 14 lecții.
 *  - Progresul este salvat local (localStorage), pe acest dispozitiv/browser.
 */

const STORE_KEY = "curs_ambarcatiuni_v1";

const App = {
  state: null,
  player: null,
  exam: null,
  view: { type: "home" }, // {type:'home'} | {type:'lesson', id} | {type:'exam'}

  init() {
    this.state = this.load();
    this.cacheEls();
    this.bindGlobalEvents();
    this.renderSidebar();
    this.route();
  },

  /* --------------------- Persistență --------------------- */
  defaultState() {
    const lessons = {};
    window.COURSE.LESSONS.forEach((l) => {
      lessons[l.id] = { watched: false, passed: false, bestScore: 0, attempts: 0 };
    });
    return { lessons, exam: { passed: false, bestPct: 0, attempts: 0 }, lastView: null };
  },
  load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return this.defaultState();
      const parsed = JSON.parse(raw);
      // Migrare defensivă: asigură intrări pentru toate lecțiile.
      const def = this.defaultState();
      def.exam = Object.assign(def.exam, parsed.exam || {});
      Object.keys(def.lessons).forEach((id) => {
        if (parsed.lessons && parsed.lessons[id]) def.lessons[id] = Object.assign(def.lessons[id], parsed.lessons[id]);
      });
      return def;
    } catch (_) {
      return this.defaultState();
    }
  },
  save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(this.state)); } catch (_) {}
  },

  /* --------------------- Logica de blocare --------------------- */
  lessonList() { return window.COURSE.LESSONS; },
  indexOf(id) { return this.lessonList().findIndex((l) => l.id === id); },

  isLessonUnlocked(id) {
    const i = this.indexOf(id);
    if (i <= 0) return true; // prima lecție e mereu deschisă
    const prev = this.lessonList()[i - 1];
    return this.state.lessons[prev.id].passed;
  },
  allLessonsPassed() {
    return this.lessonList().every((l) => this.state.lessons[l.id].passed);
  },
  progressPct() {
    const passed = this.lessonList().filter((l) => this.state.lessons[l.id].passed).length;
    return Math.round((passed / this.lessonList().length) * 100);
  },

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
      // Deblochează verificarea fără a rerenda tot (evită întreruperea).
      if (this.view.type === "lesson" && this.view.id === id) this.unlockQuizInPlace(id);
    });
    document.addEventListener("lesson:replayed", (e) => {
      const id = e.detail.id;
      if (this.state.lessons[id]) { this.state.lessons[id].watched = false; this.save(); }
      if (this.view.type === "lesson" && this.view.id === id) this.lockQuizInPlace();
    });

    // Butoane player (delegare)
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
      if (a === "start-exam") this.navigate({ type: "exam" });
    });

    document.getElementById("brandHome").addEventListener("click", (ev) => {
      ev.preventDefault(); this.navigate({ type: "home" });
    });
    document.getElementById("resetBtn").addEventListener("click", () => {
      if (confirm("Resetezi tot progresul cursului? Această acțiune nu poate fi anulată.")) {
        this.state = this.defaultState(); this.save(); this.renderSidebar(); this.navigate({ type: "home" });
      }
    });

    // Sesiune server (dacă aplicația rulează în spatele serverului de auth).
    // Servită static (file://, GitHub Pages etc.), cererea eșuează și rămâne ascuns.
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

    // Voce TTS: forțează încărcarea vocilor (dacă API-ul e disponibil).
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
    if (this.view.type === "exam") return this.renderExam();
  },

  /* --------------------- Bara de progres global --------------------- */
  updateGlobalProgress() {
    const pct = this.progressPct();
    if (this.$progressBar) this.$progressBar.style.width = pct + "%";
    if (this.$progressText) this.$progressText.textContent = pct + "% finalizat";
  },

  /* --------------------- Sidebar --------------------- */
  renderSidebar() {
    const modules = window.COURSE.MODULES;
    const html = modules.map((mod) => {
      const items = this.lessonList().filter((l) => l.module === mod.id).map((l) => {
        const st = this.state.lessons[l.id];
        const unlocked = this.isLessonUnlocked(l.id);
        let icon = "🔒", cls = "locked";
        if (st.passed) { icon = "✅"; cls = "passed"; }
        else if (unlocked) { icon = st.watched ? "🎬" : "▶️"; cls = "open"; }
        const active = this.view.type === "lesson" && this.view.id === l.id ? " nav-item--active" : "";
        return `<li>
          <button class="nav-item nav-item--${cls}${active}" data-lesson="${l.id}" ${unlocked ? "" : "disabled"}>
            <span class="nav-item__icon">${icon}</span>
            <span class="nav-item__label"><strong>Ziua ${l.day}</strong><small>${l.title}</small></span>
          </button></li>`;
      }).join("");
      return `<div class="nav-module" style="--mod:${mod.color}">
        <div class="nav-module__title">${mod.title}</div>
        <ul class="nav-list">${items}</ul>
      </div>`;
    }).join("");

    const examUnlocked = this.allLessonsPassed();
    const examSt = this.state.exam;
    const examActive = this.view.type === "exam" ? " nav-item--active" : "";
    const examIcon = examSt.passed ? "🏆" : examUnlocked ? "📝" : "🔒";
    const examHtml = `<div class="nav-module nav-module--exam" style="--mod:#7c3aed">
      <div class="nav-module__title">Examen final</div>
      <ul class="nav-list"><li>
        <button class="nav-item nav-item--${examSt.passed ? "passed" : examUnlocked ? "open" : "locked"}${examActive}" data-exam ${examUnlocked ? "" : "disabled"}>
          <span class="nav-item__icon">${examIcon}</span>
          <span class="nav-item__label"><strong>Simulare examen</strong><small>${examUnlocked ? "Deblocat" : "Termină toate lecțiile"}</small></span>
        </button></li></ul></div>`;

    this.$sidebar.innerHTML = html + examHtml;

    this.$sidebar.querySelectorAll("[data-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.lesson;
        if (this.isLessonUnlocked(id)) this.navigate({ type: "lesson", id });
      });
    });
    const examBtn = this.$sidebar.querySelector("[data-exam]");
    if (examBtn) examBtn.addEventListener("click", () => { if (examUnlocked) this.navigate({ type: "exam" }); });
  },

  /* --------------------- Home --------------------- */
  renderHome() {
    const pct = this.progressPct();
    const passedCount = this.lessonList().filter((l) => this.state.lessons[l.id].passed).length;
    const nextLesson = this.lessonList().find((l) => !this.state.lessons[l.id].passed);
    const examUnlocked = this.allLessonsPassed();

    this.$main.innerHTML = `
      <section class="home">
        <div class="home__hero">
          <h1>Curs: Conducător de ambarcațiune cu motor</h1>
          <p class="home__sub">Pregătire pentru examenul practic/teoretic — 14 zile, 4 module, în limba română.</p>
          <div class="home__stats">
            <div class="stat"><span class="stat__num">${passedCount}/${this.lessonList().length}</span><span class="stat__lbl">lecții promovate</span></div>
            <div class="stat"><span class="stat__num">${pct}%</span><span class="stat__lbl">progres</span></div>
            <div class="stat"><span class="stat__num">${this.state.exam.passed ? "✔" : "—"}</span><span class="stat__lbl">examen final</span></div>
          </div>
          <div class="home__cta">
            ${nextLesson
              ? `<button class="btn btn--primary btn--lg" data-action="resume">${passedCount === 0 ? "Începe cursul" : "Continuă"} — Ziua ${nextLesson.day}</button>`
              : `<button class="btn btn--primary btn--lg" data-action="start-exam">Dă simularea de examen</button>`}
          </div>
        </div>

        <div class="home__how">
          <h2>Cum funcționează</h2>
          <ol>
            <li>🎬 Fiecare zi are o <strong>lecție video</strong> narată în limba română.</li>
            <li>✅ La final răspunzi la o <strong>verificare de cunoștințe</strong> (minim ${Math.round(window.QUIZ_PASS * 100)}%).</li>
            <li>🔁 Dacă nu treci, <strong>revizionezi</strong> lecția înainte de a reîncerca.</li>
            <li>🔒 Lecția următoare se <strong>deblochează</strong> doar după ce ai promovat-o pe cea curentă.</li>
            <li>🏆 La final susții o <strong>simulare completă de examen</strong>.</li>
          </ol>
        </div>

        <div class="home__modules">
          ${window.COURSE.MODULES.map((m) => {
            const ls = this.lessonList().filter((l) => l.module === m.id);
            const done = ls.filter((l) => this.state.lessons[l.id].passed).length;
            return `<div class="mod-card" style="--mod:${m.color}">
              <div class="mod-card__bar"></div>
              <h3>${m.title}</h3>
              <p>${done}/${ls.length} lecții</p>
              <ul>${ls.map((l) => `<li>Ziua ${l.day}: ${l.title}</li>`).join("")}</ul>
            </div>`;
          }).join("")}
        </div>
      </section>`;

    const resume = this.$main.querySelector('[data-action="resume"]');
    if (resume) resume.addEventListener("click", () => this.navigate({ type: "lesson", id: nextLesson.id }));
  },

  /* --------------------- Lecție --------------------- */
  renderLesson(id) {
    const lesson = this.lessonList().find((l) => l.id === id);
    if (!lesson || !this.isLessonUnlocked(id)) return this.navigate({ type: "home" });
    const st = this.state.lessons[id];
    const mod = window.COURSE.MODULES.find((m) => m.id === lesson.module);
    const i = this.indexOf(id);

    this.$main.innerHTML = `
      <section class="lesson" style="--mod:${mod.color}">
        <div class="lesson__head">
          <div class="lesson__crumbs">${mod.title}</div>
          <h1>Ziua ${lesson.day}: ${lesson.title}</h1>
          <p class="lesson__summary">${lesson.summary}</p>
        </div>

        <div class="lesson__player-wrap">
          <div id="playerRoot"></div>
          <div class="player-controls">
            <button class="btn btn--primary" data-action="play">▶ Redă lecția</button>
            <button class="btn btn--ghost" data-action="pause">⏸ Pauză</button>
            <button class="btn btn--ghost" data-action="replay">🔁 De la început</button>
            <div class="player-progress"><div class="player-progress__bar" id="lessonProgressBar"></div></div>
            <span class="player-progress__label" id="lessonProgressLabel">0%</span>
          </div>
        </div>

        <div id="quizRoot" class="quiz-root"></div>

        <div class="lesson__nav">
          <button class="btn btn--ghost" data-action="prev" ${i === 0 ? "disabled" : ""}>← Ziua anterioară</button>
          <button class="btn btn--ghost" data-action="home">Acasă</button>
          <button class="btn btn--primary" id="nextBtn" data-action="next" ${st.passed ? "" : "disabled"}>Ziua următoare →</button>
        </div>
      </section>`;

    // Progresul player-ului
    const bar = document.getElementById("lessonProgressBar");
    const label = document.getElementById("lessonProgressLabel");
    this._progressHandler = (e) => {
      if (e.detail.id !== id) return;
      const p = Math.round(e.detail.ratio * 100);
      if (bar) bar.style.width = p + "%";
      if (label) label.textContent = p + "%";
    };
    document.addEventListener("lesson:progress", this._progressHandler);

    // Player
    this.player = new LessonPlayer(document.getElementById("playerRoot"), lesson);
    this.player.render();

    // Quiz (blocat până la vizionare, dacă nu e deja promovat / vizionat)
    this.renderLessonQuiz(lesson, st.watched || st.passed);
  },

  renderLessonQuiz(lesson, unlocked) {
    const root = document.getElementById("quizRoot");
    renderQuiz(root, lesson, {
      unlocked,
      onPass: ({ correct, total }) => {
        const st = this.state.lessons[lesson.id];
        st.passed = true;
        st.attempts++;
        st.bestScore = Math.max(st.bestScore, correct);
        this.save();
        const nextBtn = document.getElementById("nextBtn");
        if (nextBtn) nextBtn.disabled = false;
        this.renderSidebar();
        this.updateGlobalProgress();
        this.celebrate(root);
      },
      onFail: ({ correct }) => {
        const st = this.state.lessons[lesson.id];
        st.attempts++;
        st.watched = false; // impune revizionarea
        this.save();
        // Re-blochează quiz-ul și repornește lecția de la capăt.
        this.renderLessonQuiz(lesson, false);
        this.renderSidebar();
        if (this.player) this.player.replay();
        document.getElementById("playerRoot").scrollIntoView({ behavior: "smooth", block: "center" });
      },
    });
  },

  unlockQuizInPlace(id) {
    const lesson = this.lessonList().find((l) => l.id === id);
    const st = this.state.lessons[id];
    // Nu suprascrie un quiz deja completat/promovat.
    if (st.passed) return;
    this.renderLessonQuiz(lesson, true);
    this.renderSidebar();
  },
  lockQuizInPlace() {
    if (this.view.type !== "lesson") return;
    const lesson = this.lessonList().find((l) => l.id === this.view.id);
    const st = this.state.lessons[lesson.id];
    if (st.passed) return;
    this.renderLessonQuiz(lesson, false);
  },

  celebrate(root) {
    const el = document.createElement("div");
    el.className = "toast toast--success";
    el.textContent = "🎉 Lecție promovată! Ziua următoare este deblocată.";
    document.body.appendChild(el);
    setTimeout(() => el.classList.add("toast--show"), 20);
    setTimeout(() => { el.classList.remove("toast--show"); setTimeout(() => el.remove(), 300); }, 2600);
  },

  goNext() {
    const i = this.indexOf(this.view.id);
    const st = this.state.lessons[this.view.id];
    if (!st.passed) return;
    if (i < this.lessonList().length - 1) {
      this.navigate({ type: "lesson", id: this.lessonList()[i + 1].id });
    } else if (this.allLessonsPassed()) {
      this.navigate({ type: "exam" });
    } else {
      this.navigate({ type: "home" });
    }
  },
  goPrev() {
    const i = this.indexOf(this.view.id);
    if (i > 0) this.navigate({ type: "lesson", id: this.lessonList()[i - 1].id });
  },

  /* --------------------- Examen --------------------- */
  renderExam() {
    if (!this.allLessonsPassed()) return this.navigate({ type: "home" });
    const cfg = window.COURSE.EXAM_CONFIG;

    this.$main.innerHTML = `
      <section class="exam-page">
        <div class="exam-page__head">
          <h1>Simulare examen — Conducător de ambarcațiune cu motor</h1>
          <p>${cfg.count} întrebări din toate cele 4 module · timp: ${cfg.minutes} minute · prag: ${Math.round(cfg.pass * 100)}%.</p>
          ${this.state.exam.passed ? `<p class="exam-page__badge">🏆 Cel mai bun rezultat: ${this.state.exam.bestPct}% — PROMOVAT</p>` : ""}
        </div>
        <div class="exam-page__intro" id="examIntro">
          <p>Examenul reproduce formatul grilă. Ai o singură variantă corectă la fiecare întrebare. Succes!</p>
          <button class="btn btn--primary btn--lg" id="beginExam">Începe simularea</button>
          <button class="btn btn--ghost" data-action="home">Înapoi acasă</button>
        </div>
        <div id="examRoot"></div>
      </section>`;

    document.getElementById("beginExam").addEventListener("click", () => {
      document.getElementById("examIntro").style.display = "none";
      // Sămânță derivată din numărul de încercări (întrebări diferite la reluare).
      const seed = 1000 + this.state.exam.attempts * 37 + this.lessonList().length;
      // Banca reală ANR (7 categorii) dacă e disponibilă; altfel banca proprie.
      const anr = (window.ANR_BANK || []).map((q) => ({ m: q.cat, q: q.q, options: q.options, answer: q.answer }));
      this.exam = new Exam(document.getElementById("examRoot"), {
        bank: anr.length ? anr : window.COURSE.EXAM_BANK,
        config: cfg,
        seed,
        onFinish: (res) => {
          if (res.retry) {
            // Reia cu o nouă simulare.
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
