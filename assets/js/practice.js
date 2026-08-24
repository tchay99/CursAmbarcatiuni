/*
 * practice.js — Antrenamentul pentru examen.
 *
 * Un test de antrenament = PRACTICE_CONFIG.count (20) întrebări extrase
 * aleator din banca oficială de antrenament ANR (questions-anr.js), cu
 * opțiunile amestecate — exact formatul platformei oficiale de pregătire.
 * Prag de promovare: PRACTICE_CONFIG.pass (75%).
 */

const PRACTICE_CATS = {
  "legislatie": "Legislație",
  "marinarie": "Marinărie",
  "manevra": "Manevra navei",
  "prim-ajutor": "Prim ajutor",
  "colreg": "COLREG",
  "navigatie": "Navigație",
  "rnd": "RND",
};

function renderPracticeTest(root, { bank, count, pass, onFinish }) {
  // Extrage `count` întrebări distincte, aleator, din întreaga bancă.
  const picked = [];
  const used = new Set();
  while (picked.length < count && used.size < bank.length) {
    const i = Math.floor(Math.random() * bank.length);
    if (used.has(i)) continue;
    used.add(i);
    const src = bank[i];
    const opts = src.options.map((text, oi) => ({ text, correct: oi === src.answer }));
    for (let j = opts.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [opts[j], opts[k]] = [opts[k], opts[j]];
    }
    picked.push({
      q: src.q,
      cat: PRACTICE_CATS[src.cat] || src.cat,
      options: opts.map((o) => o.text),
      answer: opts.findIndex((o) => o.correct),
    });
  }
  const answers = new Array(picked.length).fill(null);
  const need = Math.ceil(picked.length * pass);

  root.innerHTML = `
    <div class="quiz">
      <h3 class="quiz__title">Test de antrenament — ${picked.length} întrebări</h3>
      <p class="quiz__intro">Întrebări reale din banca oficială de pregătire. Prag de promovare:
        <strong>${need}/${picked.length}</strong> (${Math.round(pass * 100)}%).</p>
      <form id="practiceForm" class="quiz__form">
        ${picked.map((item, qi) => `
          <fieldset class="quiz__q" data-qi="${qi}">
            <legend><span class="quiz__cat">${item.cat}</span>${qi + 1}. ${item.q}</legend>
            ${item.options.map((opt, oi) => `
              <label class="quiz__opt">
                <input type="radio" name="p${qi}" value="${oi}">
                <span>${opt}</span>
              </label>`).join("")}
          </fieldset>`).join("")}
        <button type="submit" class="btn btn--primary btn--lg">Corectează testul</button>
      </form>
      <div id="practiceResult" class="quiz__result" hidden></div>
    </div>`;

  const form = root.querySelector("#practiceForm");
  form.addEventListener("change", (e) => {
    if (e.target.name && e.target.name.startsWith("p")) {
      answers[Number(e.target.name.slice(1))] = Number(e.target.value);
    }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const unanswered = answers.findIndex((a) => a === null);
    if (unanswered !== -1) {
      const fs = root.querySelector(`fieldset[data-qi="${unanswered}"]`);
      if (fs) { fs.classList.add("quiz__q--missing"); fs.scrollIntoView({ behavior: "smooth", block: "center" }); }
      return;
    }

    let correct = 0;
    picked.forEach((item, qi) => {
      const fs = root.querySelector(`fieldset[data-qi="${qi}"]`);
      fs.classList.remove("quiz__q--missing");
      const chosen = answers[qi];
      const isRight = chosen === item.answer;
      if (isRight) correct++;
      fs.classList.add(isRight ? "quiz__q--right" : "quiz__q--wrong");
      fs.querySelectorAll(".quiz__opt").forEach((lab, oi) => {
        lab.querySelector("input").disabled = true;
        if (oi === item.answer) lab.classList.add("opt--correct");
        if (oi === chosen && !isRight) lab.classList.add("opt--chosen-wrong");
      });
    });

    const ratio = correct / picked.length;
    const passed = ratio >= pass;
    const pct = Math.round(ratio * 100);
    const box = root.querySelector("#practiceResult");
    box.hidden = false;
    box.className = "quiz__result " + (passed ? "quiz__result--pass" : "quiz__result--fail");
    box.innerHTML = `
      <div class="result-badge result-badge--${passed ? "pass" : "fail"}">${passed ? "Promovat" : "Nepromovat"}</div>
      <p>Ai răspuns corect la <strong>${correct}/${picked.length}</strong> — <strong>${pct}%</strong>
        (prag: ${Math.round(pass * 100)}%).</p>
      <p class="quiz__retry-note">Răspunsurile corecte sunt marcate cu verde. Parcurge-le pe cele greșite înainte de următorul test.</p>
      <button type="button" class="btn btn--primary" id="practiceAgainBtn">🔄 Alt test (întrebări noi)</button>`;
    form.querySelector("button[type=submit]").disabled = true;
    box.scrollIntoView({ behavior: "smooth", block: "start" });
    box.querySelector("#practiceAgainBtn").addEventListener("click", () => {
      if (typeof onFinish === "function") onFinish({ correct, total: picked.length, pct, passed, again: true });
    });
    if (typeof onFinish === "function") onFinish({ correct, total: picked.length, pct, passed, again: false });
  });
}

window.renderPracticeTest = renderPracticeTest;
