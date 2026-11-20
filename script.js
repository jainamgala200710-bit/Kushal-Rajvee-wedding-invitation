/* ═══════════════════════════════════════════════════════════════
   ★  EDITABLE WEDDING CONTENT — Change everything here!  ★
   ═══════════════════════════════════════════════════════════════
   Edit the CONFIG object below to personalize every detail.
   You do NOT need to touch any code below the config section.
   ═══════════════════════════════════════════════════════════════ */

const CONFIG = {

  // ── Couple Details ──────────────────────────────────
  brideName: "Dhwani",
  groomName: "Amey",
  brideParents: "Daughter of Rashmi & Tejas Gala",
  groomParents: "Son of Falguni & Rajinikanath Gindra",
  welcomeInviteText: "With the blessings of Shri Ganesh and our beloved families, we joyfully invite you to celebrate the union of",
  coupleTagline: "Two souls, one beautiful journey",
  couplePhoto: "images/couple.webp",   // Replace with your engagement photo

  // ── Wedding Date & Time ─────────────────────────────
  weddingDay: "Wednesday",
  weddingDate: "10th February 2027",
  weddingTime: "7:00 PM Onwards",
  weddingDateISO: "2027-02-10T19:00:00",  // Used for countdown timer

  // ── Venue ───────────────────────────────────────────
  venueName: "Dhwani & Amey Wedding Venue",
  venueAddress: "JK Mehta Rd,\nSantacruz (West),\nMumbai,\nMaharashtra 400054",
  venuePhoto: "images/venue.webp",     // Replace with your venue photo
  venueMapLink: "https://www.google.com/maps/dir/?api=1&destination=JK+Mehta+Rd,+Santacruz+(West),+Mumbai,+Maharashtra+400054",

  // ── Wedding Events ──────────────────────────────────
  events: [
    {
      emoji: "🎨",
      name: "Mehendi",
      date: "8th February 2027",
      time: "4:00 PM",
      location: "Bride's Residence",
    },
    {
      emoji: "🎶",
      name: "Sangeet",
      date: "9th February 2027",
      time: "7:00 PM",
      location: "The Grand Ballroom",
    },
    {
      emoji: "💍",
      name: "Wedding Ceremony",
      date: "10th February 2027",
      time: "7:00 PM",
      location: "The Royal Palace Grounds",
    },
    {
      emoji: "🎉",
      name: "Reception",
      date: "11th February 2027",
      time: "8:00 PM",
      location: "The Grand Ballroom",
    },
  ],

  // ── Family Names ────────────────────────────────────
  brideFamily: {
    label: "Bride's Family",
    members: [
      { name: "Rashmi & Tejas Gala", role: "Parents of the Bride" },
      { name: "Jyotiben & Jayantilal Gala", role: "Grandparents" },
    ],
  },
  groomFamily: {
    label: "Groom's Family",
    members: [
      { name: "Falguni & Rajinikanath Gindra", role: "Parents of the Groom" },
      { name: "Valiben & Vijpar Gindra", role: "Grandparents" },
    ],
  },

  // ── Invitation Message ──────────────────────────────
  invitationMessage:
    "With the blessings of the Almighty and our beloved families, we invite you to share in our joy as we begin this beautiful journey together. Your presence will make our celebration truly special.",



  // ── Music ───────────────────────────────────────────
  musicAutoplay: true,
};


/* ═══════════════════════════════════════════════════════════════
   ⚙️  LOGIC BELOW — No need to edit below this line  ⚙️
   ═══════════════════════════════════════════════════════════════ */


/* ── DOM References ──────────────────────────────────── */

const envelopeScene  = document.getElementById("envelope-scene");
const invitationScene = document.getElementById("invitation-scene");
const envelopeWrapper = document.getElementById("envelope-wrapper");
const envelopeSeal   = document.getElementById("envelope-seal");
const tapHint        = document.getElementById("tap-hint");
const petalsCanvas   = document.getElementById("petals-canvas");
const sparklesCanvas = document.getElementById("sparkles-canvas");
const dustCanvas     = document.getElementById("dust-canvas");
const musicBtn       = document.getElementById("music-btn");
const musicIcon      = document.getElementById("music-icon");
const bgMusic        = document.getElementById("bg-music");
const lightBurst     = document.getElementById("light-burst");
let musicInitialized = false;

function prepareMusic() {
  if (!bgMusic) return;
  if (!musicInitialized) {
    if (!bgMusic.src || !bgMusic.src.includes("music.mp3")) {
      bgMusic.src = "music.mp3";
    }
    bgMusic.addEventListener("loadedmetadata", () => {
      try { bgMusic.currentTime = 15; } catch (e) {}
    }, { once: true });
    musicInitialized = true;
  }
}

// Palace elements
const palaceFrame    = document.getElementById("palace-frame");
const palaceDoors    = document.getElementById("palace-doors");
const leftDoor       = document.getElementById("left-door");
const rightDoor      = document.getElementById("right-door");

let isOpened = false;


/* ═══════════════════════════════════════════════════════════════
   POPULATE CONTENT from CONFIG
   ═══════════════════════════════════════════════════════════════ */

function populateContent() {
  // Couple
  document.getElementById("bride-name").textContent = CONFIG.brideName;
  document.getElementById("groom-name").textContent = CONFIG.groomName;
  document.getElementById("welcome-invite-text").textContent = CONFIG.welcomeInviteText;
  document.getElementById("parents-info").innerHTML = `${CONFIG.brideParents} &nbsp;•&nbsp; ${CONFIG.groomParents}`;

  // Couple Photo & Tagline
  document.getElementById("couple-photo").src = CONFIG.couplePhoto;
  document.getElementById("couple-tagline").textContent = CONFIG.coupleTagline;

  // Date (scratch card)
  document.getElementById("scratch-day").textContent = CONFIG.weddingDay;
  document.getElementById("scratch-date").textContent = CONFIG.weddingDate;

  // Events
  const eventsGrid = document.getElementById("events-grid");
  CONFIG.events.forEach((evt) => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <div class="event-emoji">${evt.emoji}</div>
      <p class="event-name">${evt.name}</p>
      <p class="event-date">${evt.date}</p>
      <p class="event-time">${evt.time}</p>
      <p class="event-location">${evt.location}</p>
    `;
    eventsGrid.appendChild(card);
  });

  // Venue
  if (document.getElementById("venue-photo")) {
    document.getElementById("venue-photo").src = CONFIG.venuePhoto;
  }
  const venueNameDisplay = document.getElementById("venue-name-display");
  if (venueNameDisplay) {
    venueNameDisplay.textContent = CONFIG.venueName;
  }
  const venueAddressDisplay = document.getElementById("venue-address-display");
  if (venueAddressDisplay) {
    venueAddressDisplay.innerHTML = CONFIG.venueAddress.replace(/\n/g, "<br>");
  }
  const venueDirectionsBtn = document.querySelector(".venue-directions-btn");
  if (venueDirectionsBtn) {
    venueDirectionsBtn.href = CONFIG.venueMapLink;
  }

  // Family
  const familyGrid = document.getElementById("family-grid");
  [CONFIG.brideFamily, CONFIG.groomFamily].forEach((side) => {
    const div = document.createElement("div");
    div.className = "family-side";
    let membersHTML = side.members
      .map(
        (m) =>
          `<p class="family-member">${m.name}<br><span class="family-member-role">${m.role}</span></p>`
      )
      .join("");
    div.innerHTML = `<p class="family-label">${side.label}</p>${membersHTML}`;
    familyGrid.appendChild(div);
  });

  // Invitation Message
  document.getElementById("invitation-msg").textContent = CONFIG.invitationMessage;

}


/* ═══════════════════════════════════════════════════════════════
   MUSIC CONTROLLER
   ═══════════════════════════════════════════════════════════════ */

let musicPlaying = false;

function toggleMusic() {
  if (!bgMusic) return;
  prepareMusic();
  if (musicPlaying) {
    bgMusic.pause();
    if (musicBtn) musicBtn.classList.remove("playing");
    if (musicIcon) musicIcon.textContent = "♫";
  } else {
    bgMusic.play().catch(() => {});
    if (musicBtn) musicBtn.classList.add("playing");
    if (musicIcon) musicIcon.textContent = "♫";
  }
  musicPlaying = !musicPlaying;
}

if (musicBtn) {
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMusic();
  });
  musicBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMusic();
    }
  });
}

function startMusic() {
  if (bgMusic && !musicPlaying && CONFIG.musicAutoplay) {
    prepareMusic();
    bgMusic.play().then(() => {
      musicPlaying = true;
      if (musicBtn) musicBtn.classList.add("playing");
    }).catch(() => {});
  }
}


/* ═══════════════════════════════════════════════════════════════
   FLOWER PETAL PARTICLE SYSTEM (Canvas)
   ═══════════════════════════════════════════════════════════════ */

const petalCtx = petalsCanvas.getContext("2d", { alpha: true });
let petals = [];
let petalsActive = false;
let petalsRafId = null;

let resizeRaf = null;
function resizeCanvases() {
  if (resizeRaf) cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    petalsCanvas.width = sparklesCanvas.width = w;
    petalsCanvas.height = sparklesCanvas.height = h;
    if (dustCanvas) {
      dustCanvas.width = w;
      dustCanvas.height = h;
    }
    resizeRaf = null;
  });
}
window.addEventListener("resize", resizeCanvases, { passive: true });
resizeCanvases();

const PETAL_COLORS = [
  [255, 182, 193],  // light pink
  [255, 192, 203],  // pink
  [255, 160, 180],  // deeper pink
  [255, 200, 180],  // peach
  [255, 220, 200],  // light peach
  [255, 230, 210],  // softest peach
  [248, 200, 200],  // blush
];

function createPetal(cx, cy, isBurst) {
  const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
  const size = isBurst 
    ? (4 + Math.random() * 20) 
    : (5 + Math.random() * 16);

  let opacity = 0.4 + Math.random() * 0.45;
  let speedY = 0.5 + Math.random() * 1.2;
  let speedX = 0.2 + Math.random() * 0.5;

  if (size > 15) {
    speedY *= 1.3;
    opacity = 0.65 + Math.random() * 0.25;
  } else if (size < 8) {
    speedY *= 0.7;
    opacity = 0.3 + Math.random() * 0.3;
  }

  if (isBurst && cx !== undefined && cy !== undefined) {
    const angle = Math.random() * Math.PI * 2;
    const force = 3 + Math.random() * 7;
    speedX = Math.cos(angle) * force;
    speedY = Math.sin(angle) * force - 3;
  }

  return {
    x: cx !== undefined ? cx : Math.random() * petalsCanvas.width,
    y: cy !== undefined ? cy : -20 - Math.random() * 40,
    size: size,
    speedY: speedY,
    speedX: speedX,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: isBurst ? (Math.random() - 0.5) * 0.08 : (Math.random() - 0.5) * 0.018,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.015 + Math.random() * 0.015,
    wobbleAmp: 0.8 + Math.random() * 1.2,
    opacity: opacity,
    isBurst: !!isBurst,
    colorStr: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
  };
}

function drawPetal(ctx, p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(p.size * 0.4, -p.size * 0.3, p.size, p.size * 0.2, 0, p.size);
  ctx.bezierCurveTo(-p.size, p.size * 0.2, -p.size * 0.4, -p.size * 0.3, 0, 0);
  ctx.fillStyle = p.colorStr;
  ctx.fill();
  ctx.restore();
}

function updatePetals() {
  if (!petalsActive || document.hidden) return;
  petalCtx.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);

  const maxPetals = window.innerWidth < 768 ? 16 : 30;
  if (petals.length < maxPetals && Math.random() < 0.10) {
    petals.push(createPetal());
  }

  for (let i = petals.length - 1; i >= 0; i--) {
    const p = petals[i];
    
    if (p.isBurst) {
      p.speedY += 0.08;
      p.speedX *= 0.98;
      p.speedY *= 0.98;
      p.x += p.speedX;
      p.y += p.speedY;
    } else {
      p.y += p.speedY;
      p.wobble += p.wobbleSpeed;
      p.x += Math.sin(p.wobble) * p.wobbleAmp + p.speedX;
    }
    p.rotation += p.rotSpeed;

    drawPetal(petalCtx, p);

    if (p.y > petalsCanvas.height + 40 || p.x < -40 || p.x > petalsCanvas.width + 40) {
      petals.splice(i, 1);
    }
  }

  petalsRafId = requestAnimationFrame(updatePetals);
}

function burstPetals(cx, cy, count) {
  petalsActive = true;
  const burstCount = window.innerWidth < 768 ? Math.min(count, 30) : count;
  for (let i = 0; i < burstCount; i++) {
    petals.push(createPetal(cx, cy, true));
  }
}


/* ═══════════════════════════════════════════════════════════════
   GOLDEN SPARKLE PARTICLE SYSTEM (Canvas)
   ═══════════════════════════════════════════════════════════════ */

const sparkleCtx = sparklesCanvas.getContext("2d", { alpha: true });
let sparkles = [];
let sparklesActive = false;
let sparklesRafId = null;

function createSparkle(x, y, burst) {
  const isGold = Math.random() > 0.15;
  const speedX = burst ? (Math.random() - 0.5) * 4 : (Math.random() - 0.5) * 0.5;
  const speedY = burst ? (Math.random() - 0.5) * 4 : -0.15 - Math.random() * 0.45;
  return {
    x: x !== undefined ? x : Math.random() * sparklesCanvas.width,
    y: y !== undefined ? y : Math.random() * sparklesCanvas.height,
    size: 1.2 + Math.random() * 2.5,
    speedX: speedX,
    speedY: speedY,
    life: 1.0,
    decay: burst ? 0.015 + Math.random() * 0.01 : 0.002 + Math.random() * 0.004,
    twinkleSpeed: 0.03 + Math.random() * 0.05,
    twinklePhase: Math.random() * Math.PI * 2,
    gold: isGold,
  };
}

function updateSparkles() {
  if (!sparklesActive || document.hidden) return;
  sparkleCtx.clearRect(0, 0, sparklesCanvas.width, sparklesCanvas.height);

  const maxSparkles = window.innerWidth < 768 ? 16 : 30;
  if (sparkles.length < maxSparkles && Math.random() < 0.05) {
    sparkles.push(createSparkle());
  }

  for (let i = sparkles.length - 1; i >= 0; i--) {
    const s = sparkles[i];
    s.x += s.speedX;
    s.y += s.speedY;
    s.life -= s.decay;
    s.twinklePhase += s.twinkleSpeed;

    const twinkle = 0.5 + Math.sin(s.twinklePhase) * 0.5;
    const alpha = s.life * twinkle;

    if (alpha <= 0 || s.life <= 0) {
      sparkles.splice(i, 1);
      continue;
    }

    sparkleCtx.save();
    sparkleCtx.globalAlpha = alpha;
    sparkleCtx.fillStyle = s.gold ? "#FFD700" : "#FFF8DC";
    sparkleCtx.beginPath();
    const sz = s.size;
    sparkleCtx.moveTo(s.x, s.y - sz);
    sparkleCtx.lineTo(s.x + sz * 0.3, s.y - sz * 0.3);
    sparkleCtx.lineTo(s.x + sz, s.y);
    sparkleCtx.lineTo(s.x + sz * 0.3, s.y + sz * 0.3);
    sparkleCtx.lineTo(s.x, s.y + sz);
    sparkleCtx.lineTo(s.x - sz * 0.3, s.y + sz * 0.3);
    sparkleCtx.lineTo(s.x - sz, s.y);
    sparkleCtx.lineTo(s.x - sz * 0.3, s.y - sz * 0.3);
    sparkleCtx.closePath();
    sparkleCtx.fill();
    sparkleCtx.restore();
  }

  sparklesRafId = requestAnimationFrame(updateSparkles);
}

// Burst sparkles from a point (used when seal breaks)
function burstSparkles(cx, cy, count) {
  const burstCount = window.innerWidth < 768 ? Math.min(count, 25) : count;
  for (let i = 0; i < burstCount; i++) {
    sparkles.push(createSparkle(cx, cy, true));
  }
}


/* ═══════════════════════════════════════════════════════════════
   ENVELOPE OPEN — CINEMATIC GSAP TIMELINE
   ═══════════════════════════════════════════════════════════════ */

function openEnvelope() {
  if (isOpened) return;
  isOpened = true;

  // Haptic feedback/vibration on click
  if (window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate([40, 30, 40]);
  }

  // Start music
  startMusic();

  // Start sparkle system
  sparklesActive = true;
  updateSparkles();

  // Get handle position for particle burst
  const sealRect = envelopeSeal.getBoundingClientRect();
  const sealCX = sealRect.left + sealRect.width / 2;
  const sealCY = sealRect.top + sealRect.height / 2;

  // === GSAP CINEMATIC TIMELINE ===
  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
  });

  // Step 1: Fade out tap hint
  tl.to(tapHint, {
    opacity: 0,
    y: 15,
    duration: 0.4,
  });

  // Step 2: Palace doors swing open in 3D perspective & background elements fan outward
  tl.to(leftDoor, {
    rotateY: -115,
    duration: 3.0,
    ease: "power3.inOut"
  }, "+=0.1");

  tl.to(rightDoor, {
    rotateY: 115,
    duration: 3.0,
    ease: "power3.inOut"
  }, "<"); // open together

  // Pillars slide outward symmetrically if they exist
  if (document.querySelector(".pillar-left")) {
    tl.to(".pillar-left", {
      x: -150,
      opacity: 0,
      duration: 3.0,
      ease: "power3.inOut"
    }, "<");
  }

  if (document.querySelector(".pillar-right")) {
    tl.to(".pillar-right", {
      x: 150,
      opacity: 0,
      duration: 3.0,
      ease: "power3.inOut"
    }, "<");
  }

  if (document.querySelector(".left-feathers")) {
    tl.to(".left-feathers", {
      x: -120,
      y: 60,
      rotation: -25,
      opacity: 0,
      duration: 3.0,
      ease: "power3.inOut"
    }, "<"); // animate feathers outward symmetrically
  }

  if (document.querySelector(".right-feathers")) {
    tl.to(".right-feathers", {
      x: 120,
      y: 60,
      rotation: 25,
      opacity: 0,
      duration: 3.0,
      ease: "power3.inOut"
    }, "<");
  }

  if (document.querySelector(".elephant-left")) {
    tl.to(".elephant-left", {
      x: -420,
      opacity: 0,
      duration: 3.0,
      ease: "power3.inOut"
    }, "<");
  }

  if (document.querySelector(".elephant-right")) {
    tl.to(".elephant-right", {
      x: 420,
      opacity: 0,
      duration: 3.0,
      ease: "power3.inOut"
    }, "<");
  }

  // Step 3: Brass handle fades out, bursts sparkles, rose petals & wax shards
  tl.to(envelopeSeal, {
    scale: 1.4,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    onStart: () => {
      // Gold dust sparkles
      burstSparkles(sealCX, sealCY, 65);

      // Rose petal explosion burst from behind doors!
      burstPetals(sealCX, sealCY, 100);

      // Spawn physical brass/seal fragments that fly outward
      const container = document.body;
      const fragmentColors = ["#D4AF37", "#B8962E", "#E8C96A", "#C5A028"];
      for (let i = 0; i < 6; i++) {
        const frag = document.createElement("div");
        frag.className = "seal-fragment";
        frag.style.width = (8 + Math.random() * 12) + "px";
        frag.style.height = (8 + Math.random() * 12) + "px";
        frag.style.background = fragmentColors[Math.floor(Math.random() * fragmentColors.length)];
        frag.style.left = sealCX + "px";
        frag.style.top = sealCY + "px";
        frag.style.borderRadius = "50%";
        container.appendChild(frag);

        const angle = (Math.PI * 2 * i) / 6 + (Math.random() - 0.5) * 0.4;
        const velocity = 100 + Math.random() * 140;
        const fx = Math.cos(angle) * velocity;
        const fy = Math.sin(angle) * velocity;

        gsap.to(frag, {
          x: fx,
          y: fy + 80,
          rotation: (Math.random() - 0.5) * 720,
          opacity: 0,
          scale: 0.2,
          duration: 0.8 + Math.random() * 0.4,
          ease: "power2.out",
          onComplete: () => frag.remove()
        });
      }
    },
  }, "-=1.8"); // trigger during door opening

  // Step 3.5: Light glow/burst shines from behind opening doors
  if (lightBurst) {
    tl.to(lightBurst, {
      scale: 3.0,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    }, "-=1.8");
    tl.to(lightBurst, {
      opacity: 0,
      scale: 3.5,
      duration: 0.8,
      ease: "power2.in",
    }, "-=0.3");
  }

  // Palace doors micro-shake on open impact
  tl.fromTo(palaceDoors, 
    { x: 0, y: 0 },
    {
      x: "random(-4, 4)",
      y: "random(-4, 4)",
      duration: 0.05,
      repeat: 6,
      yoyo: true,
      ease: "none"
    },
    "-=2.0"
  );
  tl.set(palaceDoors, { x: 0, y: 0 });

  // Step 4: Start continuous flower rain
  tl.call(() => {
    petalsActive = true;
    updatePetals();
  }, null, "-=1.2");

  // Step 5: Camera zooms forward through open doors into the palace!
  tl.to(palaceFrame, {
    scale: 2.0,
    opacity: 0,
    duration: 2.2,
    ease: "power3.inOut"
  }, "-=1.0");

  // Step 6: Entire envelope scene fades to dark and transitions
  tl.to(envelopeScene, {
    backgroundColor: "#1f0105",
    opacity: 0,
    duration: 1.0,
  }, "-=1.0");

  // Step 7: Hide envelope scene, show invitation scene, stop sparkles loop
  tl.call(() => {
    envelopeScene.style.display = "none";
    invitationScene.style.display = "block";
    sparklesActive = false; // permanently stop envelope sparkles animation loop
    // Trigger section reveals with staggered timing
    revealInvitationSections();
  });
}

// Attach click/tap/keyboard listeners to envelope
if (envelopeWrapper) {
  envelopeWrapper.addEventListener("click", openEnvelope);
  envelopeWrapper.addEventListener("touchend", openEnvelope, { passive: true });
  envelopeWrapper.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openEnvelope();
    }
  });
}


/* ═══════════════════════════════════════════════════════════════
   INVITATION SECTION REVEALS — Scroll-triggered animations
   ═══════════════════════════════════════════════════════════════ */

function revealInvitationSections() {
  const sections = document.querySelectorAll(".section-inner");

  // Reveal first section immediately with a cinematic 3D unfold animation
  setTimeout(() => {
    if (sections[0]) {
      sections[0].classList.add("revealed");
      gsap.fromTo(sections[0], 
        { 
          opacity: 0, 
          rotateX: -45, 
          scale: 0.85, 
          y: 40 
        }, 
        { 
          opacity: 1, 
          rotateX: 0, 
          scale: 1, 
          y: 0, 
          duration: 1.6, 
          ease: "power3.out" 
        }
      );
    }
  }, 300);

  // Use IntersectionObserver for remaining sections — 3D card entrance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          gsap.fromTo(el,
            { opacity: 0, y: 80, rotateX: 12, scale: 0.92, transformOrigin: "center bottom" },
            { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.1,
              onComplete: () => { el.style.transform = "none"; }
            }
          );
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  sections.forEach((sec, i) => {
    if (i > 0) observer.observe(sec);
  });
}


/* ═══════════════════════════════════════════════════════════════
   AMBIENT SPARKLES ON ENVELOPE SCENE
   ═══════════════════════════════════════════════════════════════ */

// Start a few ambient sparkles on the envelope scene before it's opened
sparklesActive = true;
updateSparkles();

// Periodically add ambient sparkles (floating dust particles) around palace entrance
const isMobileDevice = window.innerWidth < 768;
const ambientIntervalTime = isMobileDevice ? 250 : 150;
const ambientInterval = setInterval(() => {
  if (isOpened) { clearInterval(ambientInterval); return; }
  const w = window.innerWidth;
  const h = window.innerHeight;
  const cx = w / 2 + (Math.random() - 0.5) * w * 0.9;
  const cy = h / 2 + (Math.random() - 0.5) * h * 0.9;
  sparkles.push(createSparkle(cx, cy, false));
  if (!isMobileDevice && Math.random() > 0.5) {
    sparkles.push(createSparkle(cx, cy, false));
  }
}, ambientIntervalTime);

/* ═══════════════════════════════════════════════════════════════
   FLOATING VOLUMETRIC GOLD DUST — Soft warm particles
   ═══════════════════════════════════════════════════════════════ */

(function initDustSystem() {
  if (!dustCanvas) return;
  const dctx = dustCanvas.getContext('2d');
  const dustMotes = [];
  const MAX_DUST = 60;

  function spawnDust() {
    return {
      x: Math.random() * dustCanvas.width,
      y: dustCanvas.height + Math.random() * 40,
      r: 0.6 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -(0.12 + Math.random() * 0.35),
      alpha: 0.15 + Math.random() * 0.45,
      drift: Math.random() * Math.PI * 2,
      driftSpeed: 0.003 + Math.random() * 0.008,
      warm: Math.random() > 0.4 // warm gold vs pale gold
    };
  }

  // Pre-populate
  for (let i = 0; i < MAX_DUST; i++) {
    const d = spawnDust();
    d.y = Math.random() * dustCanvas.height;
    dustMotes.push(d);
  }

  function drawDust() {
    if (isOpened) {
      // Fade out dust when scene changes
      dctx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);
      return;
    }
    dctx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);

    for (let i = dustMotes.length - 1; i >= 0; i--) {
      const m = dustMotes[i];
      m.drift += m.driftSpeed;
      m.x += m.vx + Math.sin(m.drift) * 0.18;
      m.y += m.vy;

      // Recycle particles that exit screen
      if (m.y < -10 || m.x < -10 || m.x > dustCanvas.width + 10) {
        dustMotes[i] = spawnDust();
        continue;
      }

      const col = m.warm
        ? `rgba(212, 175, 55, ${m.alpha})`
        : `rgba(255, 232, 156, ${m.alpha * 0.7})`;
      dctx.beginPath();
      dctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      dctx.fillStyle = col;
      dctx.shadowColor = 'rgba(255, 215, 0, 0.3)';
      dctx.shadowBlur = m.r * 3;
      dctx.fill();
      dctx.shadowBlur = 0;
    }

    // Maintain population
    while (dustMotes.length < MAX_DUST) {
      dustMotes.push(spawnDust());
    }

    requestAnimationFrame(drawDust);
  }

  drawDust();
})();


/* ═══════════════════════════════════════════════════════════════
   SCRATCH CARD — Scratch to reveal the wedding date
   ═══════════════════════════════════════════════════════════════ */

const scratchCanvas = document.getElementById("scratch-canvas");
const scratchCard   = document.getElementById("scratch-card");
const scratchHint   = document.getElementById("scratch-hint");
let scratchCtx, isScratching = false, scratchRevealed = false;

function initScratchCard() {
  if (!scratchCanvas || !scratchCard) return;

  // Size canvas to match the card
  const rect = scratchCard.getBoundingClientRect();
  scratchCanvas.width  = rect.width;
  scratchCanvas.height = rect.height;
  scratchCtx = scratchCanvas.getContext("2d");

  // Draw the golden scratch overlay
  const grad = scratchCtx.createLinearGradient(0, 0, rect.width, rect.height);
  grad.addColorStop(0, "#D4AF37");
  grad.addColorStop(0.3, "#E8C96A");
  grad.addColorStop(0.5, "#D4AF37");
  grad.addColorStop(0.7, "#C5A028");
  grad.addColorStop(1, "#B8962E");
  scratchCtx.fillStyle = grad;
  scratchCtx.fillRect(0, 0, rect.width, rect.height);

  // Add decorative text on the overlay
  scratchCtx.fillStyle = "rgba(255, 248, 240, 0.5)";
  scratchCtx.font = `600 ${Math.min(rect.width * 0.06, 14)}px 'Cinzel Decorative', serif`;
  scratchCtx.textAlign = "center";
  scratchCtx.textBaseline = "middle";
  scratchCtx.fillText("✦  SCRATCH HERE  ✦", rect.width / 2, rect.height / 2);

  // Add subtle shimmer dots
  for (let i = 0; i < 30; i++) {
    scratchCtx.beginPath();
    scratchCtx.arc(
      Math.random() * rect.width,
      Math.random() * rect.height,
      1 + Math.random() * 1.5,
      0, Math.PI * 2
    );
    scratchCtx.fillStyle = `rgba(255, 248, 220, ${0.15 + Math.random() * 0.2})`;
    scratchCtx.fill();
  }

  // Set up erasing composite
  scratchCtx.globalCompositeOperation = "destination-out";

  // Mouse events
  scratchCanvas.addEventListener("mousedown", startScratch);
  scratchCanvas.addEventListener("mousemove", doScratch);
  scratchCanvas.addEventListener("mouseup", stopScratch);
  scratchCanvas.addEventListener("mouseleave", stopScratch);

  // Touch events
  scratchCanvas.addEventListener("touchstart", startScratch, { passive: false });
  scratchCanvas.addEventListener("touchmove", doScratch, { passive: false });
  scratchCanvas.addEventListener("touchend", stopScratch);
}

function getPos(e) {
  const rect = scratchCanvas.getBoundingClientRect();
  const touch = e.touches ? e.touches[0] : e;
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top,
  };
}

function startScratch(e) {
  e.preventDefault();
  if (scratchRevealed) return;
  isScratching = true;

  // Fade out hint on first scratch
  if (scratchHint) {
    gsap.to(scratchHint, { opacity: 0, duration: 0.4 });
  }

  const pos = getPos(e);
  scratchCtx.beginPath();
  scratchCtx.moveTo(pos.x, pos.y);
}

let lastScratchCheck = 0;

function doScratch(e) {
  if (!isScratching || scratchRevealed) return;
  e.preventDefault();
  const pos = getPos(e);

  // Erase with a soft round brush
  scratchCtx.lineWidth = 35;
  scratchCtx.lineCap = "round";
  scratchCtx.lineJoin = "round";
  scratchCtx.lineTo(pos.x, pos.y);
  scratchCtx.stroke();
  scratchCtx.beginPath();
  scratchCtx.moveTo(pos.x, pos.y);

  // Throttle progress check (at most once every 120ms during active stroke)
  const now = performance.now();
  if (now - lastScratchCheck > 120) {
    lastScratchCheck = now;
    checkScratchProgress();
  }
}

function stopScratch() {
  isScratching = false;
  checkScratchProgress();
}

function checkScratchProgress() {
  if (scratchRevealed || !scratchCtx || !scratchCanvas) return;
  try {
    const w = scratchCanvas.width;
    const h = scratchCanvas.height;
    if (w <= 0 || h <= 0) return;
    const imageData = scratchCtx.getImageData(0, 0, w, h);
    const pixels = imageData.data;
    let transparent = 0;
    let total = 0;
    // Step by 32 bytes (8 pixels) for ultra-fast <0.1ms sparse sampling
    for (let i = 3; i < pixels.length; i += 32) {
      total++;
      if (pixels[i] === 0) transparent++;
    }

    if (total > 0 && (transparent / total) > 0.45) {
      revealScratchCard();
    }
  } catch (err) {
    // Non-blocking catch
  }
}

function revealScratchCard() {
  if (scratchRevealed) return;
  scratchRevealed = true;

  // Animate the canvas fading away completely
  if (scratchCanvas) {
    gsap.to(scratchCanvas, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        scratchCanvas.style.display = "none";
      },
    });
  }

  // Burst golden sparkles from the scratch card center
  const rect = scratchCard.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  burstSparkles(cx, cy, 50);

  // 🌸 FLOWER POPPER EXPLOSION 🌸
  flowerPopperBurst(cx, cy);
}

/**
 * Creates a massive burst of pink & red flower petals + confetti
 * that explode outward from a center point like a party popper.
 */
function flowerPopperBurst(cx, cy) {
  const container = document.body;
  const flowers = ["🌸", "🌺", "💮", "🏵️", "❀", "✿", "♥", "❤", "💗", "💕"];
  const petalColors = [
    "#FF69B4", "#FF1493", "#FF6B8A", "#E8456B", "#FF85A2",
    "#DB2777", "#F472B6", "#FB7185", "#FDA4AF", "#FCA5C6",
    "#E11D48", "#BE123C", "#F43F5E", "#FF4081", "#FF80AB",
    "#FFB3C6", "#FF91AF", "#C71585", "#DC143C", "#FFD6E0",
  ];

  // Helper to create a single flower petal/emoji element
  function createPetal(startX, startY) {
    const el = document.createElement("div");
    const isEmoji = Math.random() > 0.45;

    if (isEmoji) {
      el.textContent = flowers[Math.floor(Math.random() * flowers.length)];
      el.style.fontSize = (14 + Math.random() * 20) + "px";
    } else {
      const color = petalColors[Math.floor(Math.random() * petalColors.length)];
      const size = 8 + Math.random() * 14;
      el.style.width = size + "px";
      el.style.height = size * (0.6 + Math.random() * 0.8) + "px";
      el.style.background = color;
      el.style.borderRadius = Math.random() > 0.5 ? "50%" : "50% 0 50% 0";
    }

    el.style.position = "fixed";
    el.style.left = startX + "px";
    el.style.top = startY + "px";
    el.style.pointerEvents = "none";
    el.style.zIndex = "9999";
    el.style.opacity = "1";
    el.style.willChange = "transform, opacity";
    container.appendChild(el);
    return el;
  }

  // 1. Initial Festive Popper Burst (efficient particle budget)
  const isMobile = window.innerWidth < 768;
  const INITIAL_COUNT = isMobile ? 45 : 80;
  for (let i = 0; i < INITIAL_COUNT; i++) {
    const el = createPetal(cx, cy);
    const angle = (Math.PI * 2 * i) / INITIAL_COUNT + (Math.random() - 0.5) * 0.5;
    const velocity = 120 + Math.random() * 320;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity - 90 - Math.random() * 120; // bias upward
    const rotation = (Math.random() - 0.5) * 720;

    gsap.to(el, {
      x: dx,
      y: dy + 300 + Math.random() * 150,
      rotation: rotation,
      opacity: 0,
      scale: 0.2 + Math.random() * 0.5,
      duration: 1.8 + Math.random() * 1.5,
      ease: "power2.out",
      onComplete: () => el.remove(),
    });
  }

  // 2. Secondary gentle celebration via high-performance canvas petals
  burstPetals(window.innerWidth / 2, -20, isMobile ? 15 : 30);
}

// ── Countdown Timer Logic ─────────────────────────────
function initCountdown() {
  const targetDateEl = document.getElementById("countdown-target-date");
  if (targetDateEl) {
    targetDateEl.textContent = `✦ ${CONFIG.weddingDate} at ${CONFIG.weddingTime} ✦`;
  }

  const target = new Date(CONFIG.weddingDateISO);
  const mEl = document.getElementById("cd-months");
  const dEl = document.getElementById("cd-days");
  const hEl = document.getElementById("cd-hours");
  const minEl = document.getElementById("cd-minutes");
  const sEl = document.getElementById("cd-seconds");

  let lastM = "", lastD = "", lastH = "", lastMin = "", lastS = "";

  function updateCountdown() {
    const now = new Date();

    if (now >= target) {
      if (mEl && mEl.textContent !== "00") mEl.textContent = "00";
      if (dEl && dEl.textContent !== "00") dEl.textContent = "00";
      if (hEl && hEl.textContent !== "00") hEl.textContent = "00";
      if (minEl && minEl.textContent !== "00") minEl.textContent = "00";
      if (sEl && sEl.textContent !== "00") sEl.textContent = "00";
      return;
    }
    
    // Safely calculate months, avoiding year/month boundary errors
    let tempDate = new Date(now.getTime());
    let months = 0;
    
    while (true) {
      let nextYear = tempDate.getFullYear();
      let nextMonthVal = tempDate.getMonth() + 1;
      if (nextMonthVal > 11) {
        nextMonthVal = 0;
        nextYear++;
      }
      
      let daysInNextMonth = new Date(nextYear, nextMonthVal + 1, 0).getDate();
      let nextDay = Math.min(tempDate.getDate(), daysInNextMonth);
      let nextMonthDate = new Date(
        nextYear,
        nextMonthVal,
        nextDay,
        tempDate.getHours(),
        tempDate.getMinutes(),
        tempDate.getSeconds(),
        tempDate.getMilliseconds()
      );
      
      if (nextMonthDate <= target) {
        tempDate = nextMonthDate;
        months++;
      } else {
        break;
      }
    }
    
    let diffMs = target - tempDate;
    
    const msInDay = 1000 * 60 * 60 * 24;
    const msInHour = 1000 * 60 * 60;
    const msInMinute = 1000 * 60;
    const msInSecond = 1000;
    
    let days = Math.floor(diffMs / msInDay);
    diffMs %= msInDay;
    
    let hours = Math.floor(diffMs / msInHour);
    diffMs %= msInHour;
    
    let minutes = Math.floor(diffMs / msInMinute);
    diffMs %= msInMinute;
    
    let seconds = Math.floor(diffMs / msInSecond);
    
    const strM = String(months).padStart(2, '0');
    const strD = String(days).padStart(2, '0');
    const strH = String(hours).padStart(2, '0');
    const strMin = String(minutes).padStart(2, '0');
    const strS = String(seconds).padStart(2, '0');

    if (mEl && lastM !== strM) { mEl.textContent = strM; lastM = strM; }
    if (dEl && lastD !== strD) { dEl.textContent = strD; lastD = strD; }
    if (hEl && lastH !== strH) { hEl.textContent = strH; lastH = strH; }
    if (minEl && lastMin !== strMin) { minEl.textContent = strMin; lastMin = strMin; }
    if (sEl && lastS !== strS) { sEl.textContent = strS; lastS = strS; }
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Initialize countdown, content population, and mutation observer on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  populateContent();
  initCountdown();


  /* ═══════════════════════════════════════════════════════════════
     INTERACTIVE 3D CARD TILT SYSTEM (Performance-Optimised)
     — Transform-only updates (GPU-composited, no repaints)
     — requestAnimationFrame throttle (1 write per frame)
     — No dynamic box-shadow (avoids expensive full repaints)
     ═══════════════════════════════════════════════════════════════ */

  const tiltCards = document.querySelectorAll(".floral-border, .venue-card-royal");
  const MAX_TILT = 5;        // max degrees of rotation
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // Inject shine overlay into each floral-border card
  document.querySelectorAll(".floral-border").forEach(card => {
    if (!card.querySelector(".card-3d-shine")) {
      const shine = document.createElement("div");
      shine.className = "card-3d-shine";
      card.appendChild(shine);
    }
  });

  // Only enable tilt on desktop — skip mobile entirely for performance
  if (!isMobile) {
    tiltCards.forEach(card => {
      let rafId = null;
      let latestX = 0.5, latestY = 0.5;
      let cardRect = null;

      card.addEventListener("mouseenter", () => {
        cardRect = card.getBoundingClientRect();
      }, { passive: true });

      card.addEventListener("mousemove", (e) => {
        if (!cardRect) cardRect = card.getBoundingClientRect();
        latestX = (e.clientX - cardRect.left) / cardRect.width;
        latestY = (e.clientY - cardRect.top) / cardRect.height;

        // Throttle to one DOM write per animation frame
        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            const rotateY = (latestX - 0.5) * MAX_TILT * 2;
            const rotateX = (0.5 - latestY) * MAX_TILT * 2;

            // Transform-only — GPU composited, zero repaints
            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.012, 1.012, 1.012)`;

            // Move shine highlight (transform-only, no repaint)
            const shine = card.querySelector(".card-3d-shine");
            if (shine) {
              shine.style.opacity = "1";
              shine.style.transform = `translateX(${(latestX - 0.3) * 160}%)`;
            }

            rafId = null;
          });
        }
      }, { passive: true });

      card.addEventListener("mouseleave", () => {
        cardRect = null;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        card.style.transform = "";
        const shine = card.querySelector(".card-3d-shine");
        if (shine) {
          shine.style.opacity = "0";
          shine.style.transform = "translateX(-80%)";
        }
      });
    });
  }

  // Initialize scratch card once the invitation scene is visible
  if (invitationScene) {
    const scratchObserver = new MutationObserver(() => {
      if (invitationScene.style.display === "block") {
        // Small delay so layout is ready
        setTimeout(initScratchCard, 500);
        scratchObserver.disconnect();
      }
    });
    scratchObserver.observe(invitationScene, { attributes: true, attributeFilter: ["style"] });
  }

  // Page Visibility API to pause animations when tab is hidden
  let petalsActiveTemp = petalsActive;
  let sparklesActiveTemp = sparklesActive;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      petalsActiveTemp = petalsActive;
      sparklesActiveTemp = sparklesActive;
      petalsActive = false;
      sparklesActive = false;
    } else {
      if (typeof petalsActiveTemp !== 'undefined') petalsActive = petalsActiveTemp;
      if (typeof sparklesActiveTemp !== 'undefined') sparklesActive = sparklesActiveTemp;
      if (petalsActive) updatePetals();
      if (sparklesActive) updateSparkles();
    }
  });

  // Re-initialize scratch card on window resize to prevent canvas stretching
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (!scratchRevealed && scratchCanvas && scratchCard) {
        const rect = scratchCard.getBoundingClientRect();
        if (Math.abs(scratchCanvas.width - rect.width) > 5 || Math.abs(scratchCanvas.height - rect.height) > 5) {
          initScratchCard();
        }
      }
    }, 200);
  });
});

