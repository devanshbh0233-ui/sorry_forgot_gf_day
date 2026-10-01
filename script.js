/* ---------------- data ---------------- */
const DODGE_LINES = [
  "Nice try, Betuu 😏",
  "Aww, so close!",
  "Almost, almost…",
  "Not yet, my love 💕",
  "Okay, last one, I promise…"
];
const MAX_DODGES = 5;

/* ---------------- your photos ----------------
   1. Create a folder called "images" next to index.html, style.css and
      script.js, and put your files inside it.
   2. List the filenames below, in the order you want them to appear.
   3. Leave an array empty ( [] ) to keep the "add a photo here" placeholder
      tiles instead. */
const PHOTO_FILES = [
  'images/photo1.jpg',
  'images/photo2.jpg',
  'images/photo3.jpg',
  'images/photo4.jpg',
  'images/photo5.jpg',
  'images/photo6.jpg',
  'images/photo7.jpg',
];


let current = 0;
const TOTAL = 7;      // total slides, including the teaser
const SORRY_SLIDES = [1, 3, 4]; // these pages use the cool "sorry" colours, the rest are "love" red
const PAGE_TOTAL = 6;

/* ---------------- build slides ---------------- */
const slidesEl = document.getElementById('slides');

function heartIcon(size = 30) {
  return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:${size}px;height:${size}px"><path d="M12 21s-7.5-4.6-10-9.1C.4 8.6 2.2 5 5.7 5c2 0 3.4 1.1 4.3 2.4C10.9 6.1 12.3 5 14.3 5c3.5 0 5.3 3.6 3.7 6.9C19.5 16.4 12 21 12 21z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
}

function sparkleIcon(size = 16) {
  return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:${size}px;height:${size}px"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" fill="currentColor"/></svg>`;
}

/* ---------- teaser / "click yes" game slide ---------- */
function buildTeaserSlide() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">${sparkleIcon(14)} A LITTLE SURPRISE FIRST</span>
    <h1 class="big">Betuu, will you hear me out? 💗</h1>
    <p class="slide-sub" id="teaserSub">Tap "Yes" and I'll tell you what's in my heart…</p>
    <div class="teaser-stage" id="teaserStage">
      <button class="btn teaser-yes" id="teaserYes">Yes</button>
      <button class="btn ghost teaser-no" id="teaserNo">No</button>
    </div>
    <p class="hint" id="teaserHint">psst — it's a little shy, it might run from you</p>
  `;
  return el;
}

function buildSlide1() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">PAGE 1 OF ${PAGE_TOTAL}</span>
    <h1 class="big">Sorry I'm Late, Betuu 🥺</h1>
    <p class="slide-sub">I missed your Girlfriend's Day wish and I can't stop thinking about it. So I made you something, Siddhi. Open it when you're ready 💌</p>
    <div class="gift-wrap">
      <div class="gift-scene" id="giftScene">
        <div class="gift-glow" id="giftGlow"></div>
        <div class="gift-shadow"></div>
        <button class="gift-box" id="giftBox" aria-label="Open it">
          <span class="lid" id="giftLid">
            <span class="lid-ribbon-h"></span>
            <span class="lid-ribbon-v"></span>
          </span>
          <span class="bow" id="giftBow">
            <span class="bow-loop bow-loop-l"></span>
            <span class="bow-loop bow-loop-r"></span>
            <span class="bow-knot"></span>
          </span>
          <span class="base"></span>
          <span class="ribbon-v"></span>
          <span class="ribbon-h"></span>
        </button>
        <div class="confetti-field" id="giftConfetti" aria-hidden="true"></div>
      </div>
      <div class="cta-row">
        <button class="btn" id="openGiftBtn">Open it</button>
      </div>
    </div>
  `;
  return el;
}

function buildMediaSlide({ page, title, sub, kind, files, count }) {
  const el = document.createElement('div');
  const grid = document.createElement('div');
  grid.className = 'media-grid';

  const total = (files && files.length) ? files.length : count;
  let tiles = '';
  for (let i = 0; i < total; i++) {
    const src = (files && files[i]) ? files[i] : null;
    let inner;
    if (src) {
      inner = kind === 'video'
        ? `<video controls src="${src}"></video>`
        : `<img src="${src}" alt="">`;
    } else {
      inner = kind === 'video'
        ? '<!-- Add a video that plays right here on the page, e.g. <video controls src="images/clip1.mp4"></video> -->'
        : '<!-- Add a photo here, e.g. <img src="images/photo1.jpg" alt=""> -->';
    }
    tiles += `<div class="media-tile" data-kind="${kind}">${inner}</div>`;
  }
  el.innerHTML = `
    <span class="kicker">PAGE ${page} OF ${PAGE_TOTAL}</span>
    <h2 class="slide-title">${title}</h2>
    <p class="slide-sub">${sub}</p>
  `;
  grid.innerHTML = tiles;
  el.appendChild(grid);
  const continueRow = document.createElement('div');
  continueRow.className = 'cta-row';
  continueRow.style.marginTop = '26px';
  continueRow.innerHTML = `<button class="btn continue-btn">Continue</button>`;
  el.appendChild(continueRow);
  return el;
}

/* ---------- mend the broken heart ---------- */
const HEART = 'M100 170 C20 110 5 70 5 45 C5 20 25 5 50 5 C75 5 92 20 100 38 C108 20 125 5 150 5 C175 5 195 20 195 45 C195 70 180 110 100 170 Z';
function buildMendSlide() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">PAGE 3 OF ${PAGE_TOTAL}</span>
    <h2 class="slide-title" id="mendTitle">I let you down 💔</h2>
    <p class="slide-sub" id="mendSub">I was late on your special day and I know it hurt. Let me fix it, Betuu.</p>
    <div class="mend-stage">
      <svg viewBox="-20 -10 240 200" class="mend-svg" id="mendSvg">
        <defs>
          <clipPath id="clipL"><polygon points="-20,-10 100,-10 90,40 108,70 92,100 106,130 100,190 -20,190"/></clipPath>
          <clipPath id="clipR"><polygon points="100,-10 220,-10 220,190 100,190 106,130 92,100 108,70 90,40"/></clipPath>
        </defs>
        <g class="half half-l" clip-path="url(#clipL)"><path d="${HEART}"/></g>
        <g class="half half-r" clip-path="url(#clipR)"><path d="${HEART}"/></g>
      </svg>
      <div class="confetti-field" id="mendField" aria-hidden="true"></div>
    </div>
    <div class="cta-row" id="mendCta"><button class="btn" id="mendBtn">Fix it with love</button></div>
  `;
  return el;
}

function buildMessageSlide() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">PAGE 4 OF ${PAGE_TOTAL}</span>
    <h2 class="slide-title">From My Heart</h2>
    <p class="slide-sub">What I should have said on time</p>
    <div class="letter">
      <!--
        Write the message right here, replacing the lines below.
        This page is for reading only on the live site — edit the text
        in this file, not on the page itself.
      -->
      <p class="letter-text">Betuu, I'm so sorry. Girlfriend's Day was your day, and I let it slip by without wishing you on time. You should have woken up to my message, my voice, my everything — and instead you waited. I'm sorry for every minute of that wait.</p>
      <p class="letter-text">I know how much you do for me without ever asking for credit. You remember my little things, you stand beside me on my worst days, and you love me even when I mess up. You never make me feel small, and I should have made you feel special right on time.</p>
      <p class="letter-text">I can't turn back the clock, but I promise I'll never let a special day of yours pass without being the first to celebrate you. Please forgive me, Siddhi. 🥺 I love you more than any late message could ever say.</p>
    </div>
    <div class="cta-row" style="margin-top:22px;">
      <button class="btn continue-btn">Continue</button>
    </div>
  `;
  return el;
}

/* ---------- the blush page ---------- */
const BLUSH_LINES = [
  "Even though I was late, my love for you never was, Betuu.",
  "It was there the moment I woke up — in every thought, in every smile I had today.",
  "You are my calm, my chaos, and my favourite person to talk to.",
  "So, Happy Girlfriend's Day, my love. Better late than never — and I'll love you on time, forever. 💕"
];
function buildBlushSlide() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">PAGE 5 OF ${PAGE_TOTAL}</span>
    <h2 class="slide-title">Read this slowly 💗</h2>
    <div class="blush-lines" id="blushLines">
      ${BLUSH_LINES.map(t => `<p class="blush-line">${t}</p>`).join('')}
    </div>
    <div class="blush-girl" id="blushGirl">
      <svg viewBox="0 0 200 210" class="girl-svg">
        <path class="hair-back" d="M30 110 C20 30 80 5 100 5 C120 5 180 30 170 110 C170 160 150 190 100 190 C50 190 30 160 30 110Z"/>
        <circle class="skin" cx="100" cy="112" r="62"/>
        <path class="hair-front" d="M38 100 C40 45 80 28 100 28 C120 28 160 45 162 100 C140 80 120 62 100 62 C80 62 60 80 38 100Z"/>
        <g class="eyes-open"><circle cx="78" cy="115" r="6"/><circle cx="122" cy="115" r="6"/><circle class="shine" cx="80" cy="113" r="2"/><circle class="shine" cx="124" cy="113" r="2"/></g>
        <g class="eyes-shy"><path d="M69 116 Q78 106 87 116"/><path d="M113 116 Q122 106 131 116"/></g>
        <path class="mouth" d="M90 142 Q100 150 110 142"/>
        <ellipse class="cheek" cx="64" cy="134" rx="14" ry="9"/>
        <ellipse class="cheek" cx="136" cy="134" rx="14" ry="9"/>
      </svg>
      <div class="blush-hearts" id="blushHearts" aria-hidden="true"></div>
      <p class="blush-caption" id="blushCaption">Siddhi is blushing 🙈💗</p>
    </div>
    <div class="cta-row" style="margin-top:22px;">
      <button class="btn continue-btn" id="blushContinue" style="visibility:hidden">Continue</button>
    </div>
  `;
  return el;
}

let blushTimers = [];
function resetBlush() {
  blushTimers.forEach(clearTimeout); blushTimers = [];
  document.querySelectorAll('.blush-line').forEach(p => p.classList.remove('visible'));
  const g = document.getElementById('blushGirl'); if (g) g.classList.remove('show', 'blushing');
  const c = document.getElementById('blushContinue'); if (c) c.style.visibility = 'hidden';
}
function startBlush() {
  resetBlush();
  const lines = document.querySelectorAll('.blush-line');
  lines.forEach((p, i) => blushTimers.push(setTimeout(() => p.classList.add('visible'), 500 + i * 2300)));
  const t = 500 + lines.length * 2300;
  const girl = document.getElementById('blushGirl');
  blushTimers.push(setTimeout(() => girl.classList.add('show'), t));
  blushTimers.push(setTimeout(() => {
    girl.classList.add('blushing');
    const field = document.getElementById('blushHearts');
    for (let i = 0; i < 12; i++) {
      const h = document.createElement('span');
      h.className = 'blush-heart'; h.textContent = i % 2 ? '💗' : '💕';
      h.style.left = (15 + Math.random() * 70) + '%';
      h.style.animationDelay = (Math.random() * 1.2) + 's';
      field.appendChild(h);
      setTimeout(() => h.remove(), 3500);
    }
  }, t + 900));
  blushTimers.push(setTimeout(() => { document.getElementById('blushContinue').style.visibility = 'visible'; }, t + 2600));
}

function buildGoodbyeSlide() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">PAGE 6 OF ${PAGE_TOTAL}</span>
    <h2 class="slide-title">My promises to you, Betuu</h2>
    <p class="slide-sub">I will keep every single one 💞</p>
    <div class="finale-card">
      <div class="finale-text">
        <p class="finale-line">I'll never be late to make you feel loved.</p>
        <p class="finale-line">I'll make every day feel like Girlfriend's Day.</p>
        <p class="finale-line">I'll listen first, and talk after.</p>
        <p class="finale-line">Yours, always. Happy Girlfriend's Day, Betuu. 💗</p>
      </div>
    </div>
    <p class="the-end">I LOVE YOU!</p>
  `;
  return el;
}

const builders = [
  buildTeaserSlide,
  buildSlide1,
  () => buildMediaSlide({ page: 2, title: 'Us, Always 📸', sub: 'Little pieces of us I never want to lose, Betuu…', kind: 'photo', count: 4, files: PHOTO_FILES }),
  buildMendSlide,
  buildMessageSlide,
  buildBlushSlide,
  buildGoodbyeSlide
];

builders.forEach((build, i) => {
  const slide = document.createElement('section');
  slide.className = 'slide' + (i === 0 ? ' active' : '');
  slide.id = 'slide-' + i;
  const inner = document.createElement('div');
  inner.className = 'slide-inner';
  inner.appendChild(build());
  slide.appendChild(inner);
  slidesEl.appendChild(slide);
});

/* ---------------- navigation ---------------- */
function goTo(index) {
  const wrapped = index >= TOTAL || index < 0;
  current = (index + TOTAL) % TOTAL;
  document.querySelectorAll('.slide').forEach((s, i) => s.classList.toggle('active', i === current));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.documentElement.classList.toggle('sorry', SORRY_SLIDES.includes(current));
  if (current === 5) startBlush(); else resetBlush();
  if (wrapped && current === 0) resetGiftBox();
}
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement && document.activeElement.tagName;
  if (tag === 'TEXTAREA' || tag === 'INPUT') return;
  if (e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === 'ArrowLeft') goTo(current - 1);
});

/* ---------------- teaser "runaway yes button" game ---------------- */
(function setupTeaser() {
  const stage = document.getElementById('teaserStage');
  const yesBtn = document.getElementById('teaserYes');
  const noBtn = document.getElementById('teaserNo');
  const sub = document.getElementById('teaserSub');
  const hint = document.getElementById('teaserHint');
  if (!stage || !yesBtn) return;

  let dodges = 0;
  let caught = false;

  function dodge() {
    if (caught) return;
    const stageRect = stage.getBoundingClientRect();
    const btnRect = yesBtn.getBoundingClientRect();
    const maxX = Math.max(stageRect.width - btnRect.width - 8, 0);
    const maxY = Math.max(stageRect.height - btnRect.height - 8, 0);
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    yesBtn.style.left = x + 'px';
    yesBtn.style.top = y + 'px';
    sub.textContent = DODGE_LINES[Math.min(dodges, DODGE_LINES.length - 1)];
    dodges++;
    if (dodges >= MAX_DODGES) {
      caught = true;
      yesBtn.classList.add('catchable');
      hint.textContent = "okay, it's yours now 💕";
    }
  }

  // desktop: dodge the moment the cursor gets near
  yesBtn.addEventListener('pointerenter', (e) => {
    if (e.pointerType === 'mouse') dodge();
  });
  // mobile: a tap should dodge rather than register as a click, until caught
  yesBtn.addEventListener('touchstart', (e) => {
    if (!caught) { e.preventDefault(); dodge(); }
  }, { passive: false });

  yesBtn.addEventListener('click', () => {
    if (!caught) { dodge(); return; }
    goTo(1);
  });

  noBtn.addEventListener('click', () => {
    sub.textContent = "\"No\" isn't an option today, Betuu 🥺💕";
  });
})();

/* ---------------- delegated events (continue) ---------------- */
slidesEl.addEventListener('click', (e) => {
  if (e.target.id === 'openGiftBtn' || e.target.closest('#giftBox')) {
    openGiftSequence();
  }
  if (e.target.id === 'mendBtn') {
    mendHeart();
  }
  if (e.target.closest('.continue-btn')) {
    goTo(current + 1);
  }
});

/* ---------------- reusable particle burst ---------------- */
function spawnParticles(field, { count = 24, colors, shapes = ['confetti'], xRange = [40, 60], yStart = '40%', spreadX = 160, fallDistance = 160, durationRange = [1.2, 2.4], delayRange = [0, 0.3] } = {}) {
  if (!field) return;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    piece.className = 'confetti-piece' + (shape === 'crumb' ? ' crumb-piece' : '');
    piece.style.left = (xRange[0] + Math.random() * (xRange[1] - xRange[0])) + '%';
    piece.style.top = yStart;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--drift', (Math.random() * spreadX * 2 - spreadX) + 'px');
    piece.style.setProperty('--fall', fallDistance + 'px');
    piece.style.animationDuration = (durationRange[0] + Math.random() * (durationRange[1] - durationRange[0])) + 's';
    piece.style.animationDelay = (delayRange[0] + Math.random() * (delayRange[1] - delayRange[0])) + 's';
    field.appendChild(piece);
    setTimeout(() => piece.remove(), 3200);
  }
}

/* ---------------- gift opening: shake -> untie -> pop -> glow -> confetti ---------------- */
let giftBusy = false;
function openGiftSequence() {
  if (giftBusy) return;
  giftBusy = true;
  const box = document.getElementById('giftBox');
  const bow = document.getElementById('giftBow');
  const lid = document.getElementById('giftLid');
  const glow = document.getElementById('giftGlow');
  const field = document.getElementById('giftConfetti');
  if (!box) { giftBusy = false; return; }

  box.classList.add('shaking');

  setTimeout(() => {
    box.classList.remove('shaking');
    bow.classList.add('untied');
  }, 620);

  setTimeout(() => {
    lid.classList.add('opened');
    box.classList.add('opened');
    glow.classList.add('lit');
  }, 900);

  setTimeout(() => {
    spawnParticles(field, {
      count: 30,
      colors: ['#F2478C', '#FF8FB8', '#FFF4F8', '#FFC2D9', '#D81B6A'],
      xRange: [30, 70],
      yStart: '30%',
      spreadX: 120,
      fallDistance: -180,
      durationRange: [1, 1.8]
    });
  }, 1050);

  setTimeout(() => goTo(2), 1650);
}

function resetGiftBox() {
  const box = document.getElementById('giftBox');
  const bow = document.getElementById('giftBow');
  const lid = document.getElementById('giftLid');
  const glow = document.getElementById('giftGlow');
  if (!box) return;
  box.classList.remove('opened', 'shaking');
  bow.classList.remove('untied');
  lid.classList.remove('opened');
  glow.classList.remove('lit');
  giftBusy = false;
}

/* ---------------- mend the heart ---------------- */
function mendHeart() {
  const svg = document.getElementById('mendSvg');
  if (!svg || svg.classList.contains('mended')) return;
  svg.classList.add('mended');
  setTimeout(() => {
    document.getElementById('mendTitle').textContent = 'Together again 💗';
    document.getElementById('mendSub').textContent = 'Every piece fits, because my heart was always yours.';
    spawnParticles(document.getElementById('mendField'), {
      count: 26, colors: ['#F2478C', '#FFC2D9', '#FFF4F8', '#FF8FB8'],
      xRange: [35, 65], yStart: '45%', spreadX: 130, fallDistance: 110, durationRange: [1, 1.8]
    });
    document.getElementById('mendCta').innerHTML = '<button class="btn continue-btn">Continue</button>';
  }, 900);
}

/* ---------------- ambient floating hearts + sparkles ---------------- */
(function seedHearts() {
  const field = document.getElementById('heartsField');
  const count = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 14;
  for (let i = 0; i < count; i++) {
    const size = 14 + Math.random() * 14;
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    h.style.animationDuration = (14 + Math.random() * 10) + 's';
    h.style.animationDelay = (Math.random() * 14) + 's';
    h.style.width = size + 'px';
    h.style.height = size + 'px';
    h.innerHTML = i % 3 === 0 ? sparkleIcon(size) : heartIcon(size);
    field.appendChild(h);
  }
})();