/* =========================================================
   写给囡囡的生日告白 · 交互
   三幕：① 开场流光丝带（静音）→ ② 多方向幻灯片故事 → ③ 表白
   翻页：前后左右多方向切换（方向键 / 滚轮 / 触摸滑动）
   依赖 content.js 里的 window.STORY
   ========================================================= */
(function () {
  "use strict";
  const S = window.STORY;
  const $ = (id) => document.getElementById(id);

  /* -------------------------------------------------------
     1) 流光丝带 canvas（复刻 Awesome-Love-Code / web019）
     ------------------------------------------------------- */
  function makeTendrils(canvas) {
    const ctx = canvas.getContext("2d");
    const settings = { friction: 0.5, trails: 20, size: 50, dampening: 0.25, tension: 0.98 };
    let tendrils = [];
    let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let running = false;
    let rafId = null;

    function makeOsc(o) {
      let phase = o.phase || 0;
      let value = 0;
      return {
        update() {
          phase += o.frequency;
          value = o.offset + Math.sin(phase) * o.amplitude;
          return value;
        },
      };
    }
    const hue = makeOsc({ phase: 0, offset: 285, frequency: 0.0015, amplitude: 85 });

    function Tendril(spring) {
      this.spring = spring + Math.random() * 0.1 - 0.05;
      this.friction = settings.friction + Math.random() * 0.01 - 0.005;
      this.nodes = [];
      for (let i = 0; i < settings.size; i++) {
        this.nodes.push({ x: target.x, y: target.y, vx: 0, vy: 0 });
      }
    }
    Tendril.prototype.update = function () {
      let spring = this.spring;
      let node = this.nodes[0];
      node.vx += (target.x - node.x) * spring;
      node.vy += (target.y - node.y) * spring;
      for (let prev, i = 0, n = this.nodes.length; i < n; i++) {
        node = this.nodes[i];
        if (i > 0) {
          prev = this.nodes[i - 1];
          node.vx += (prev.x - node.x) * spring;
          node.vy += (prev.y - node.y) * spring;
          node.vx += prev.vx * settings.dampening;
          node.vy += prev.vy * settings.dampening;
        }
        node.vx *= this.friction;
        node.vy *= this.friction;
        node.x += node.vx;
        node.y += node.vy;
        spring *= settings.tension;
      }
    };
    Tendril.prototype.draw = function () {
      let x = this.nodes[0].x;
      let y = this.nodes[0].y;
      let a, b, i;
      ctx.beginPath();
      ctx.moveTo(x, y);
      const n = this.nodes.length - 2;
      for (i = 1; i < n; i++) {
        a = this.nodes[i];
        b = this.nodes[i + 1];
        x = (a.x + b.x) * 0.5;
        y = (a.y + b.y) * 0.5;
        ctx.quadraticCurveTo(a.x, a.y, x, y);
      }
      a = this.nodes[i];
      b = this.nodes[i + 1];
      ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
      ctx.stroke();
      ctx.closePath();
    };

    function reset() {
      tendrils = [];
      for (let i = 0; i < settings.trails; i++) {
        tendrils.push(new Tendril(0.45 + 0.025 * (i / settings.trails)));
      }
    }
    function loop() {
      if (!running) return;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(8,5,16,0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = "hsla(" + Math.round(hue.update()) + ",90%,55%,0.25)";
      ctx.lineWidth = 1;
      for (let i = 0; i < settings.trails; i++) {
        tendrils[i].update();
        tendrils[i].draw();
      }
      rafId = requestAnimationFrame(loop);
    }
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    function onMove(e) {
      if (e.touches) {
        target.x = e.touches[0].pageX;
        target.y = e.touches[0].pageY;
      } else {
        target.x = e.clientX;
        target.y = e.clientY;
      }
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });

    return {
      start() {
        if (running) return;
        resize();
        reset();
        running = true;
        loop();
      },
      stop() {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
      },
    };
  }

  /* -------------------------------------------------------
     2) 漂浮爱心
     ------------------------------------------------------- */
  function makeHearts(layer) {
    const glyphs = ["❤", "♥", "❥"];
    let timer = null;
    function spawn() {
      const s = document.createElement("span");
      s.textContent = glyphs[(Math.random() * glyphs.length) | 0];
      s.style.left = Math.random() * 100 + "vw";
      const dur = 8 + Math.random() * 9;
      s.style.animationDuration = dur + "s";
      s.style.fontSize = 10 + Math.random() * 18 + "px";
      s.style.opacity = String(0.25 + Math.random() * 0.5);
      layer.appendChild(s);
      setTimeout(() => s.remove(), dur * 1000 + 300);
    }
    return {
      start() {
        if (timer) return;
        timer = setInterval(spawn, 950);
      },
      stop() {
        clearInterval(timer);
        timer = null;
      },
    };
  }

  /* -------------------------------------------------------
     3) 打字机
     ------------------------------------------------------- */
  function typewriter(el, text, speed, done) {
    el.textContent = "";
    let i = 0;
    (function tick() {
      el.textContent = text.slice(0, i);
      if (i <= text.length) {
        i++;
        setTimeout(tick, speed);
      } else if (done) {
        done();
      }
    })();
  }

  /* -------------------------------------------------------
     4) 渲染故事页
     ------------------------------------------------------- */
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    e.className = cls;
    e.textContent = text;
    return e;
  }
  function renderPages() {
    const wrap = $("pages");
    const frag = document.createDocumentFragment();

    S.pages.forEach((p) => {
      const sec = document.createElement("section");
      sec.className = "page";
      const inner = document.createElement("div");
      inner.className = "page__inner";

      if (p.chapter) {
        const c = document.createElement("div");
        c.className = "page__chapter";
        c.textContent = p.chapter;
        sec.appendChild(c);
      }

      if (p.type === "text") {
        sec.classList.add("page--text");
        if (p.kicker) inner.appendChild(el("p", "page__kicker", p.kicker));
        if (p.title) inner.appendChild(el("h2", "page__title", p.title));
        if (p.text) inner.appendChild(el("p", "page__text", p.text));
      } else if (p.type === "photo") {
        sec.classList.add(p.layout === "full" ? "page--full" : "page--frame");
        const fig = document.createElement("div");
        fig.className = "page__img";
        const img = document.createElement("img");
        img.src = p.img;
        img.alt = "";
        img.loading = "lazy";
        img.addEventListener("error", () => fig.classList.add("is-missing"));
        fig.appendChild(img);

        if (p.layout === "full") sec.appendChild(fig);
        else inner.appendChild(fig);
        if (p.kicker) inner.appendChild(el("p", "page__kicker", p.kicker));
        if (p.text) inner.appendChild(el("p", "page__text", p.text));
      }

      sec.appendChild(inner);
      frag.appendChild(sec);
    });

    wrap.appendChild(frag);
  }

  /* -------------------------------------------------------
     5) 多方向幻灯片引擎
     ------------------------------------------------------- */
  const OPP = { left: "right", right: "left", up: "down", down: "up", in: "out", out: "in" };
  function transformFor(pos) {
    switch (pos) {
      case "center": return "translate3d(0,0,0) scale(1)";
      case "left": return "translate3d(-100%,0,0) scale(1)";
      case "right": return "translate3d(100%,0,0) scale(1)";
      case "up": return "translate3d(0,-100%,0) scale(1)";
      case "down": return "translate3d(0,100%,0) scale(1)";
      case "in": return "translate3d(0,0,0) scale(1.55)"; // 由近及远（前）
      case "out": return "translate3d(0,0,0) scale(0.5)"; // 由远及近（后）
      default: return "translate3d(0,0,0) scale(1)";
    }
  }
  function opacityFor(pos) {
    if (pos === "center") return "1";
    if (pos === "in" || pos === "out") return "0"; // 纵深切换用淡入淡出
    return "1"; // 平移切换全程可见（被舞台裁切）
  }

  /* -------------------------------------------------------
     6) 主流程
     ------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    // ---- 填充文案 ----
    $("introTitle").textContent = S.intro.title;
    $("introSubtitle").textContent = S.intro.subtitle;
    $("introLine").textContent = S.intro.line;
    $("startButton").textContent = S.intro.start;
    $("introHint").textContent = S.intro.hint;

    $("finalePrelude").textContent = S.finale.prelude.join("\n");
    $("finaleBig").textContent = S.finale.big;
    $("finaleWords").textContent = S.finale.words.join("\n");
    $("finaleWang").textContent = S.finale.wangxiaobo;
    $("finaleWangBy").textContent = S.finale.wangxiaoboBy;
    $("finaleEnding").textContent = S.finale.ending;
    $("finaleClosing").textContent = S.finale.closing;
    $("replayButton").textContent = S.finale.replay;

    renderPages();

    // ---- 实例 ----
    const introTendrils = makeTendrils($("tendrilCanvas"));
    const finaleTendrils = makeTendrils($("finaleCanvas"));
    const hearts = makeHearts($("hearts"));
    const bgm = $("bgm");
    const intro = $("intro");
    const musicBtn = $("musicToggle");
    const scrollCue = $("scrollCue");
    const progress = $("scrollProgress").firstElementChild;

    // ---- 幻灯片集合 + 方向分配 ----
    const slides = Array.prototype.slice.call(
      document.querySelectorAll(".page, .finale__step")
    );
    const PHOTO_DIRS = ["right", "left", "up", "down"];
    let pc = 0;
    slides.forEach((s) => {
      let dir;
      if (s.classList.contains("finale__step")) {
        dir = s.dataset.step === "big" ? "in" : s.dataset.step === "ending" ? "out" : "up";
      } else if (s.classList.contains("page--text")) {
        dir = "in"; // 章节标题：纵深推入
      } else {
        dir = PHOTO_DIRS[pc++ % PHOTO_DIRS.length]; // 照片：左右上下轮转
      }
      s.dataset.dir = dir;
    });

    // ---- 初始定位 ----
    function park(elm, pos) {
      elm.style.transition = "none";
      elm.style.transform = transformFor(pos);
      elm.style.opacity = opacityFor(pos);
      void elm.offsetWidth; // 强制回流，使无过渡定位生效
      elm.style.transition = "";
    }
    function move(elm, pos) {
      elm.style.transform = transformFor(pos);
      elm.style.opacity = opacityFor(pos);
    }
    slides.forEach((s, i) => {
      if (i === 0) {
        park(s, "center");
        s.classList.add("is-active");
      } else {
        park(s, "down");
      }
    });

    let cur = 0;
    let locked = false;
    let letterDone = false;

    function onEnter(toEl, idx) {
      progress.style.width = (idx / (slides.length - 1)) * 100 + "%";
      const inFinale = toEl.classList.contains("finale__step");
      $("finaleCanvas").classList.toggle("is-on", inFinale);
      if (inFinale) finaleTendrils.start();
      else finaleTendrils.stop();
      if (toEl.dataset.step === "letter") runLetterOnce();
      scrollCue.classList.add("is-hidden");
    }

    function show(to, back) {
      if (locked || to === cur || to < 0 || to >= slides.length) return;
      locked = true;
      const from = cur;
      const fromEl = slides[from];
      const toEl = slides[to];
      const dir = back ? fromEl.dataset.dir : toEl.dataset.dir;
      const enterPos = back ? OPP[dir] : dir;
      const exitPos = back ? dir : OPP[dir];

      fromEl.style.zIndex = "2";
      toEl.style.zIndex = "3";
      park(toEl, enterPos);
      toEl.classList.add("is-active");

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          move(toEl, "center");
          move(fromEl, exitPos);
        })
      );

      cur = to;
      onEnter(toEl, to);

      setTimeout(() => {
        fromEl.classList.remove("is-active");
        fromEl.style.zIndex = "";
        toEl.style.zIndex = "";
        locked = false;
      }, 1000);
    }
    const next = () => show(cur + 1, false);
    const prev = () => show(cur - 1, true);

    function runLetterOnce() {
      if (letterDone) return;
      letterDone = true;
      typewriter($("finaleTyped"), S.finale.confession, 130, () => {
        setTimeout(() => ($("finaleCursor").style.display = "none"), 1200);
      });
    }

    // ---- 音乐 ----
    function syncMusicBtn() {
      musicBtn.classList.toggle("is-playing", !bgm.paused);
      musicBtn.classList.toggle("is-paused", bgm.paused);
    }
    bgm.addEventListener("play", syncMusicBtn);
    bgm.addEventListener("pause", syncMusicBtn);
    musicBtn.addEventListener("click", () => {
      if (bgm.paused) bgm.play().catch(() => {});
      else bgm.pause();
    });

    // ---- 开场：流光 + 终端打字 + 标题浮现 ----
    introTendrils.start();
    typeTerminal(S.intro.terminal, $("introTerminal"), () => intro.classList.add("is-ready"));
    function typeTerminal(lines, node, done) {
      let li = 0;
      (function nextLine() {
        if (li >= lines.length) {
          done && done();
          return;
        }
        const line = lines[li];
        let ci = 0;
        (function tick() {
          const head = lines.slice(0, li).join("\n");
          node.textContent = (li > 0 ? head + "\n" : "") + line.slice(0, ci);
          if (ci <= line.length) {
            ci++;
            setTimeout(tick, 16);
          } else {
            li++;
            setTimeout(nextLine, 240);
          }
        })();
      })();
    }

    // ---- 开始 ----
    let started = false;
    function start() {
      if (started) return;
      started = true;
      intro.classList.add("is-gone");
      document.body.classList.remove("locked");
      musicBtn.classList.remove("is-hidden");
      scrollCue.classList.remove("is-hidden");
      hearts.start();
      bgm.muted = false;
      bgm.play().catch(() => {});
      syncMusicBtn();
      setTimeout(() => introTendrils.stop(), 1400);
    }
    $("startButton").addEventListener("click", start);

    // ---- 输入：滚轮 / 键盘 / 触摸 ----
    let wheelLock = false;
    window.addEventListener(
      "wheel",
      (e) => {
        if (!started) return;
        if (Math.abs(e.deltaY) < 6 && Math.abs(e.deltaX) < 6) return;
        if (wheelLock) return;
        wheelLock = true;
        setTimeout(() => (wheelLock = false), 950);
        e.deltaY + e.deltaX > 0 ? next() : prev();
      },
      { passive: true }
    );

    window.addEventListener("keydown", (e) => {
      if (!started) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          start();
        }
        return;
      }
      if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      }
    });

    let tsx = 0;
    let tsy = 0;
    window.addEventListener(
      "touchstart",
      (e) => {
        tsx = e.touches[0].clientX;
        tsy = e.touches[0].clientY;
      },
      { passive: true }
    );
    window.addEventListener(
      "touchend",
      (e) => {
        if (!started) return;
        const dx = e.changedTouches[0].clientX - tsx;
        const dy = e.changedTouches[0].clientY - tsy;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 45) return;
        const forward = Math.abs(dx) > Math.abs(dy) ? dx < 0 : dy < 0;
        forward ? next() : prev();
      },
      { passive: true }
    );

    // ---- 再看一遍 ----
    $("replayButton").addEventListener("click", () => show(0, true));
  });
})();
