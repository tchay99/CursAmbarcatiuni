/*
 * player.js — "Player-ul video" al lecției.
 *
 * Fiecare lecție se poate reda în două moduri:
 *   1) Fișier real videos/dayNN.mp4  → element <video> HTML5 (dacă există).
 *   2) Lecție narată (fallback)       → diapozitive sincronizate cu voice-over
 *      în limba română prin Web Speech API (speechSynthesis, ro-RO).
 *
 * În ambele moduri, player-ul semnalează "completed" DOAR după ce întregul
 * conținut a fost parcurs (video vizionat până la capăt / toate diapozitivele
 * narate). Fără vizionare completă, verificarea de cunoștințe rămâne blocată.
 */

// Factor de accelerare pentru testare automată (implicit 1 = viteză normală).
const PLAYER_SPEED = (typeof window !== "undefined" && window.__PLAYER_SPEED__) || 1;
const _t = (ms) => Math.max(60, Math.round(ms / PLAYER_SPEED));

class LessonPlayer {
  constructor(root, lesson, onComplete) {
    this.root = root;
    this.lesson = lesson;
    this.onComplete = onComplete;
    this.mode = "slides";       // "video" | "slides"
    this.slideIndex = 0;
    this.playing = false;
    this.completed = false;
    this.maxWatched = 0;        // pentru video: cel mai avansat punct vizionat (anti-skip)
    this.utterance = null;
    this.slideTimer = null;
    this._destroyed = false;
  }

  /* Verifică dacă există un fișier video real pentru ziua respectivă. */
  async _hasRealVideo() {
    const src = `videos/${this.lesson.id}.mp4`;
    try {
      const res = await fetch(src, { method: "HEAD" });
      return res.ok ? src : null;
    } catch (_) {
      return null;
    }
  }

  async render() {
    const realSrc = await this._hasRealVideo();
    if (this._destroyed) return;
    if (realSrc) {
      this.mode = "video";
      this._renderVideo(realSrc);
    } else {
      this.mode = "slides";
      this._renderSlides();
    }
  }

  /* ---------------- Modul VIDEO (MP4 real) ---------------- */
  _renderVideo(src) {
    this.root.innerHTML = `
      <div class="player player--video">
        <video id="lessonVideo" playsinline preload="metadata"></video>
        <div class="player__note">Video în redare. Vizionează integral pentru a debloca verificarea.</div>
      </div>`;
    const v = this.root.querySelector("#lessonVideo");
    v.src = src;

    // Anti-skip: nu permite sărirea peste porțiuni nevizionate.
    v.addEventListener("timeupdate", () => {
      if (v.currentTime > this.maxWatched + 0.5 && !this.completed) {
        v.currentTime = this.maxWatched; // readuce la ultimul punct vizionat
      } else {
        this.maxWatched = Math.max(this.maxWatched, v.currentTime);
      }
      this._reportProgress(v.duration ? v.currentTime / v.duration : 0);
    });
    v.addEventListener("seeking", () => {
      if (v.currentTime > this.maxWatched + 0.5 && !this.completed) {
        v.currentTime = this.maxWatched;
      }
    });
    v.addEventListener("ended", () => this._markComplete());
  }

  /* ---------------- Modul DIAPOZITIVE + NARAȚIUNE ---------------- */
  _renderSlides() {
    const total = this.lesson.slides.length;
    this.root.innerHTML = `
      <div class="player player--slides">
        <div class="slide-stage" id="slideStage"></div>
        <div class="player__note" id="playerNote">
          Apasă „Redă lecția" pentru a începe. Vizionează integral pentru a debloca verificarea.
        </div>
      </div>`;
    this._paintSlide();
    this._reportProgress(0);

    // Reia de unde a rămas dacă a fost deja parcurs anterior.
  }

  _paintSlide() {
    const stage = this.root.querySelector("#slideStage");
    if (!stage) return;
    const s = this.lesson.slides[this.slideIndex];
    const total = this.lesson.slides.length;
    stage.innerHTML = `
      <div class="slide" data-anim>
        <div class="slide__counter">Diapozitiv ${this.slideIndex + 1} / ${total}</div>
        <h3 class="slide__title">${s.title}</h3>
        <ul class="slide__bullets">
          ${s.bullets.map((b) => `<li>${b}</li>`).join("")}
        </ul>
        <p class="slide__narration" aria-hidden="true">🔊 ${s.narration}</p>
      </div>`;
  }

  play() {
    if (this.mode === "video") {
      const v = this.root.querySelector("#lessonVideo");
      if (v) v.play();
      this.playing = true;
      return;
    }
    // slides
    if (this.completed) { this.replay(); return; }
    this.playing = true;
    this._narrateCurrent();
  }

  pause() {
    this.playing = false;
    if (this.mode === "video") {
      const v = this.root.querySelector("#lessonVideo");
      if (v) v.pause();
    } else {
      window.speechSynthesis && window.speechSynthesis.cancel();
      this._clearSlideTimers();
    }
  }

  _clearSlideTimers() {
    if (this.slideTimer) { clearTimeout(this.slideTimer); this.slideTimer = null; }
    if (this._speakWatchdog) { clearTimeout(this._speakWatchdog); this._speakWatchdog = null; }
    if (this._capTimer) { clearTimeout(this._capTimer); this._capTimer = null; }
  }

  /* Narează diapozitivul curent; la final avansează automat.
   * Avansarea este GARANTATĂ (nu depinde exclusiv de TTS): un timer estimat
   * asigură continuarea chiar dacă sinteza vocală lipsește sau nu pornește.
   * TTS, când funcționează, doar avansează mai devreme (la finalul vorbirii). */
  _narrateCurrent() {
    if (this._destroyed) return;
    const s = this.lesson.slides[this.slideIndex];
    this._paintSlide();
    const total = this.lesson.slides.length;
    this._reportProgress(this.slideIndex / total);
    this._clearSlideTimers();

    let advanced = false;
    const advance = () => {
      if (advanced || this._destroyed || !this.playing) return;
      advanced = true;
      this._clearSlideTimers();
      if (this.slideIndex < total - 1) {
        this.slideIndex++;
        this._narrateCurrent();
      } else {
        this._reportProgress(1);
        this._markComplete();
      }
    };

    // Durată estimată de citire (~12 caractere/secundă + tampon), min 3.5s.
    const estMs = _t(Math.max(3500, Math.round((s.narration.length / 12) * 1000) + 1500));

    const ss = window.speechSynthesis;
    const canSpeak = ss && typeof ss.speak === "function" && typeof SpeechSynthesisUtterance !== "undefined";

    if (canSpeak) {
      try { ss.cancel(); } catch (_) {}
      const u = new SpeechSynthesisUtterance(s.narration);
      u.lang = "ro-RO";
      u.rate = 0.98;
      const voice = this._pickRomanianVoice();
      if (voice) u.voice = voice;
      u.onend = () => advance();
      u.onerror = () => { if (!this.slideTimer) this.slideTimer = setTimeout(advance, estMs); };
      this.utterance = u;
      try { ss.speak(u); } catch (_) {}

      // Watchdog: dacă TTS nu pornește deloc, avansează pe bază de timer estimat.
      this._speakWatchdog = setTimeout(() => {
        if (this.playing && !ss.speaking && !ss.pending && !advanced) {
          if (!this.slideTimer) this.slideTimer = setTimeout(advance, estMs);
        }
      }, _t(1000));
      // Plasă de siguranță: dacă TTS pornește dar nu se termină, avansează oricum.
      this._capTimer = setTimeout(advance, estMs * 3 + _t(2000));
    } else {
      this.slideTimer = setTimeout(advance, estMs);
    }
  }

  _pickRomanianVoice() {
    const voices = window.speechSynthesis.getVoices() || [];
    return (
      voices.find((v) => /ro(-|_)?RO/i.test(v.lang)) ||
      voices.find((v) => /^ro/i.test(v.lang)) ||
      null
    );
  }

  replay() {
    this.pause();
    this.completed = false;
    this.slideIndex = 0;
    this.maxWatched = 0;
    if (this.mode === "video") {
      const v = this.root.querySelector("#lessonVideo");
      if (v) { v.currentTime = 0; v.play(); this.playing = true; }
    } else {
      this._paintSlide();
      this.play();
    }
    document.dispatchEvent(new CustomEvent("lesson:replayed", { detail: { id: this.lesson.id } }));
  }

  _reportProgress(ratio) {
    ratio = Math.max(0, Math.min(1, ratio || 0));
    document.dispatchEvent(new CustomEvent("lesson:progress", {
      detail: { id: this.lesson.id, ratio, completed: this.completed },
    }));
  }

  _markComplete() {
    if (this.completed) return;
    this.completed = true;
    this.playing = false;
    this._clearSlideTimers();
    window.speechSynthesis && window.speechSynthesis.cancel();
    this._reportProgress(1);
    document.dispatchEvent(new CustomEvent("lesson:completed", { detail: { id: this.lesson.id } }));
    if (typeof this.onComplete === "function") this.onComplete();
  }

  destroy() {
    this._destroyed = true;
    this.playing = false;
    this._clearSlideTimers();
    window.speechSynthesis && window.speechSynthesis.cancel();
  }
}

window.LessonPlayer = LessonPlayer;
