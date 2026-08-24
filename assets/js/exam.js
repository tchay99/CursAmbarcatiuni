/*
 * exam.js — Simularea examenului final.
 *
 * Extrage aleator EXAM_CONFIG.count întrebări din banca oficială ANR,
 * echilibrat pe categorii, cu timp limită și prag de promovare
 * (EXAM_CONFIG.pass). Reproduce formatul grilă al examenului teoretic.
 */

function shuffle(arr, seedRandom) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(seedRandom() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// PRNG simplu (mulberry32) ca să nu depindem de Math.random în medii restrânse.
function makeRandom(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

class Exam {
  constructor(root, { bank, config, seed, onFinish }) {
    this.root = root;
    this.config = config;
    this.onFinish = onFinish;
    const rnd = makeRandom(seed || 1);
    // Selectează întrebări echilibrat pe module, apoi completează aleator.
    const byModule = {};
    bank.forEach((q) => { (byModule[q.m] = byModule[q.m] || []).push(q); });
    let picked = [];
    const perModule = Math.floor(config.count / Object.keys(byModule).length);
    Object.values(byModule).forEach((qs) => {
      picked = picked.concat(shuffle(qs, rnd).slice(0, perModule));
    });
    const remaining = shuffle(bank.filter((q) => !picked.includes(q)), rnd);
    while (picked.length < config.count && remaining.length) picked.push(remaining.pop());
    this.questions = shuffle(picked, rnd).slice(0, config.count).map((q) => {
      // Amestecă și opțiunile fiecărei întrebări.
      const opts = q.options.map((text, i) => ({ text, correct: i === q.answer }));
      const shuffledOpts = shuffle(opts, rnd);
      return { q: q.q, options: shuffledOpts.map((o) => o.text), answer: shuffledOpts.findIndex((o) => o.correct) };
    });
    this.answers = new Array(this.questions.length).fill(null);
    this.remainingSec = config.minutes * 60;
    this.timerId = null;
    this.finished = false;
  }

  start() {
    this._paint();
    this._tick();
    this.timerId = setInterval(() => this._tick(), 1000);
  }

  _tick() {
    const el = this.root.querySelector("#examTimer");
    if (el) {
      const m = String(Math.floor(this.remainingSec / 60)).padStart(2, "0");
      const s = String(this.remainingSec % 60).padStart(2, "0");
      el.textContent = `${m}:${s}`;
      if (this.remainingSec <= 60) el.classList.add("exam__timer--low");
    }
    if (this.remainingSec <= 0) { this._finish(true); return; }
    this.remainingSec--;
  }

  _paint() {
    this.root.innerHTML = `
      <div class="exam">
        <div class="exam__bar">
          <div><strong>Simulare examen</strong> — ${this.questions.length} întrebări</div>
          <div class="exam__timer" id="examTimer">--:--</div>
        </div>
        <form id="examForm">
          ${this.questions.map((item, qi) => `
            <fieldset class="quiz__q" data-qi="${qi}">
              <legend>${qi + 1}. ${item.q}</legend>
              ${item.options.map((opt, oi) => `
                <label class="quiz__opt">
                  <input type="radio" name="e${qi}" value="${oi}">
                  <span>${opt}</span>
                </label>`).join("")}
            </fieldset>`).join("")}
          <button type="submit" class="btn btn--primary btn--lg">Finalizează examenul</button>
        </form>
        <div id="examResult" class="exam__result" hidden></div>
      </div>`;

    const form = this.root.querySelector("#examForm");
    form.addEventListener("change", (e) => {
      if (e.target.name && e.target.name.startsWith("e")) {
        this.answers[Number(e.target.name.slice(1))] = Number(e.target.value);
      }
    });
    form.addEventListener("submit", (e) => { e.preventDefault(); this._finish(false); });
  }

  _finish(byTimeout) {
    if (this.finished) return;
    this.finished = true;
    if (this.timerId) clearInterval(this.timerId);

    let correct = 0;
    this.questions.forEach((item, qi) => {
      const fs = this.root.querySelector(`fieldset[data-qi="${qi}"]`);
      const chosen = this.answers[qi];
      const isRight = chosen === item.answer;
      if (isRight) correct++;
      fs.classList.add(isRight ? "quiz__q--right" : "quiz__q--wrong");
      fs.querySelectorAll(".quiz__opt").forEach((lab, oi) => {
        lab.querySelector("input").disabled = true;
        if (oi === item.answer) lab.classList.add("opt--correct");
        if (oi === chosen && !isRight) lab.classList.add("opt--chosen-wrong");
      });
    });

    const ratio = correct / this.questions.length;
    const passed = ratio >= this.config.pass;
    const pct = Math.round(ratio * 100);
    const box = this.root.querySelector("#examResult");
    box.hidden = false;
    box.className = "exam__result " + (passed ? "exam__result--pass" : "exam__result--fail");
    box.innerHTML = `
      <div class="result-badge result-badge--${passed ? "pass" : "fail"}">${passed ? "PROMOVAT" : "NEPROMOVAT"}</div>
      <p class="exam__score">${correct} / ${this.questions.length} corecte — <strong>${pct}%</strong>
        ${byTimeout ? '<span class="exam__timeout">(timpul a expirat)</span>' : ""}</p>
      <p>Prag de promovare: ${Math.round(this.config.pass * 100)}%.</p>
      <button type="button" class="btn ${passed ? "btn--ghost" : "btn--warn"}" id="examRetry">
        ${passed ? "Reia simularea (întrebări noi)" : "Reîncearcă simularea"}
      </button>`;
    box.querySelector("#examRetry").addEventListener("click", () => {
      if (typeof this.onFinish === "function") this.onFinish({ passed, correct, total: this.questions.length, retry: true });
    });
    this.root.querySelector("#examForm button[type=submit]").disabled = true;
    box.scrollIntoView({ behavior: "smooth", block: "start" });

    if (typeof this.onFinish === "function") this.onFinish({ passed, correct, total: this.questions.length, retry: false });
  }

  destroy() { if (this.timerId) clearInterval(this.timerId); }
}

window.Exam = Exam;
