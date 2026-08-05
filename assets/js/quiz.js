/*
 * quiz.js — Verificarea de cunoștințe de la finalul fiecărei lecții.
 *
 * Reguli:
 *  - Se deblochează DOAR după vizionarea integrală a lecției.
 *  - Prag de promovare: QUIZ_PASS (implicit 75%).
 *  - La eșec: lecția trebuie RE-VIZIONATĂ înainte de a reîncerca, iar accesul
 *    la lecția următoare rămâne blocat (gestionat în app.js).
 */

const QUIZ_PASS = 0.75;
const QUIZ_ANR_EXTRA = 2; // întrebări reale ANR adăugate fiecărei verificări

/* Extrage n întrebări reale ANR din categoriile modulului lecției,
 * cu opțiunile amestecate. */
function pickAnrQuestions(lesson, n) {
  const bank = window.ANR_BANK || [];
  const cats = (window.COURSE.MODULE_CATS || {})[lesson.module] || [];
  const pool = bank.filter((q) => cats.includes(q.cat));
  const picked = [];
  const used = new Set();
  while (picked.length < n && used.size < pool.length) {
    const i = Math.floor(Math.random() * pool.length);
    if (used.has(i)) continue;
    used.add(i);
    const src = pool[i];
    const opts = src.options.map((text, oi) => ({ text, correct: oi === src.answer }));
    for (let j = opts.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [opts[j], opts[k]] = [opts[k], opts[j]];
    }
    picked.push({
      q: src.q,
      options: opts.map((o) => o.text),
      answer: opts.findIndex((o) => o.correct),
      explain: "Întrebare din setul oficial de antrenament pentru examenul ANR.",
      anr: true,
    });
  }
  return picked;
}

function renderQuiz(root, lesson, { unlocked, onPass, onFail }) {
  const questions = lesson.quiz.concat(pickAnrQuestions(lesson, QUIZ_ANR_EXTRA));
  const answers = new Array(questions.length).fill(null);

  function paint() {
    if (!unlocked) {
      root.innerHTML = `
        <div class="quiz quiz--locked">
          <div class="lock-icon">🔒</div>
          <h3>Verificare de cunoștințe blocată</h3>
          <p>Vizionează integral lecția de mai sus pentru a debloca verificarea.</p>
        </div>`;
      return;
    }
    root.innerHTML = `
      <div class="quiz">
        <h3 class="quiz__title">Verificare de cunoștințe</h3>
        <p class="quiz__intro">Răspunde corect la cel puțin ${Math.ceil(questions.length * QUIZ_PASS)} din ${questions.length} întrebări pentru a trece mai departe.</p>
        <form id="quizForm" class="quiz__form">
          ${questions.map((item, qi) => `
            <fieldset class="quiz__q" data-qi="${qi}">
              <legend>${qi + 1}. ${item.q}</legend>
              ${item.options.map((opt, oi) => `
                <label class="quiz__opt">
                  <input type="radio" name="q${qi}" value="${oi}">
                  <span>${opt}</span>
                </label>`).join("")}
            </fieldset>`).join("")}
          <button type="submit" class="btn btn--primary">Trimite răspunsurile</button>
        </form>
        <div id="quizResult" class="quiz__result" hidden></div>
      </div>`;

    const form = root.querySelector("#quizForm");
    form.addEventListener("change", (e) => {
      const name = e.target.name;
      if (name && name.startsWith("q")) {
        answers[Number(name.slice(1))] = Number(e.target.value);
      }
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      grade();
    });
  }

  function grade() {
    // Verifică dacă s-a răspuns la toate întrebările.
    const unanswered = answers.findIndex((a) => a === null);
    if (unanswered !== -1) {
      const fs = root.querySelector(`fieldset[data-qi="${unanswered}"]`);
      if (fs) { fs.classList.add("quiz__q--missing"); fs.scrollIntoView({ behavior: "smooth", block: "center" }); }
      return;
    }

    let correct = 0;
    questions.forEach((item, qi) => {
      const fs = root.querySelector(`fieldset[data-qi="${qi}"]`);
      fs.classList.remove("quiz__q--missing");
      const chosen = answers[qi];
      const isRight = chosen === item.answer;
      if (isRight) correct++;
      fs.classList.add(isRight ? "quiz__q--right" : "quiz__q--wrong");
      // Marchează vizual opțiunile.
      fs.querySelectorAll(".quiz__opt").forEach((lab, oi) => {
        lab.querySelector("input").disabled = true;
        if (oi === item.answer) lab.classList.add("opt--correct");
        if (oi === chosen && !isRight) lab.classList.add("opt--chosen-wrong");
      });
      if (item.explain) {
        const ex = document.createElement("p");
        ex.className = "quiz__explain";
        ex.textContent = (isRight ? "✓ " : "✗ ") + item.explain;
        fs.appendChild(ex);
      }
    });

    const ratio = correct / questions.length;
    const passed = ratio >= QUIZ_PASS;
    const box = root.querySelector("#quizResult");
    box.hidden = false;
    box.className = "quiz__result " + (passed ? "quiz__result--pass" : "quiz__result--fail");

    if (passed) {
      box.innerHTML = `
        <div class="result-badge result-badge--pass">Promovat</div>
        <p>Ai răspuns corect la <strong>${correct}/${questions.length}</strong>. Poți trece la lecția următoare.</p>`;
      root.querySelector("#quizForm button[type=submit]").disabled = true;
      if (typeof onPass === "function") onPass({ correct, total: questions.length });
    } else {
      box.innerHTML = `
        <div class="result-badge result-badge--fail">Nepromovat</div>
        <p>Ai răspuns corect la <strong>${correct}/${questions.length}</strong>. Ai nevoie de minim ${Math.ceil(questions.length * QUIZ_PASS)}.</p>
        <p class="quiz__retry-note">⚠️ Trebuie să <strong>revizionezi lecția</strong> înainte de a reîncerca. Apasă butonul de mai jos.</p>
        <button type="button" class="btn btn--warn" id="quizReplayBtn">Revizionează lecția și reîncearcă</button>`;
      box.querySelector("#quizReplayBtn").addEventListener("click", () => {
        if (typeof onFail === "function") onFail({ correct, total: questions.length });
      });
    }
  }

  paint();
}

window.renderQuiz = renderQuiz;
window.QUIZ_PASS = QUIZ_PASS;
