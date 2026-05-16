document.addEventListener("DOMContentLoaded", () => {
  // BUTTON CLICK
  const button = document.querySelector(".btn");
  button.addEventListener("click", () => {
    alert("Welcome! Let's build something great together.");
  });

  // CARD INTERACTION
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    // HOVER EFFECT
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px)";
      card.style.boxShadow = "0 16px 40px rgba(0,0,0,0.10)";
      card.style.transition = "0.3s";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    });

    // CLICK EFFECT
    card.addEventListener("click", () => {
      const label = card.querySelector(".card-label");
      alert(
        `${label ? label.textContent : card.textContent.trim()} — coming soon!`,
      );
    });
  });

  // SMOOTH SCROLL FOR NAV LINKS
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      if (targetId !== "#") {
        const section = document.querySelector(targetId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // SCROLL REVEAL
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  // FIREWORKS
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const FW_COLORS = [
    "#f0c94d",
    "#d4a017",
    "#a855f7",
    "#6b21a8",
    "#ffffff",
    "#fde68a",
    "#c4b5fd",
    "#e879f9",
  ];

  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.012;
      this.size = Math.random() * 3 + 1;
      this.trail = [];
    }
    update() {
      this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
      if (this.trail.length > 6) this.trail.shift();
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.06;
      this.vx *= 0.99;
      this.alpha -= this.decay;
    }
    draw() {
      this.trail.forEach((t, i) => {
        ctx.beginPath();
        ctx.arc(
          t.x,
          t.y,
          this.size * (i / this.trail.length) * 0.6,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = this.color;
        ctx.globalAlpha = t.alpha * (i / this.trail.length) * 0.4;
        ctx.fill();
      });
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  class Rocket {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height;
      this.tx = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
      this.ty = Math.random() * canvas.height * 0.55 + canvas.height * 0.05;
      const dx = this.tx - this.x,
        dy = this.ty - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = Math.random() * 4 + 5;
      this.vx = (dx / dist) * speed;
      this.vy = (dy / dist) * speed;
      this.color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
      this.exploded = false;
      this.trail = [];
    }
    update() {
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > 10) this.trail.shift();
      this.x += this.vx;
      this.y += this.vy;
      if (this.vy > 0 || Math.abs(this.y - this.ty) < 8) this.exploded = true;
    }
    draw() {
      this.trail.forEach((t, i) => {
        ctx.beginPath();
        ctx.arc(t.x, t.y, 1.5 * (i / this.trail.length), 0, Math.PI * 2);
        ctx.fillStyle = "#fde68a";
        ctx.globalAlpha = (i / this.trail.length) * 0.7;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
    }
  }

  let fwParticles = [],
    fwRockets = [],
    fwFrame = 0;

  function explode(x, y) {
    const c1 = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
    const c2 = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
    const count = Math.floor(Math.random() * 60) + 60;
    for (let i = 0; i < count; i++) {
      fwParticles.push(new Particle(x, y, i % 3 === 0 ? c2 : c1));
    }
  }

  function fireworksLoop() {
    ctx.fillStyle = "rgba(26,5,51,0.18)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fwFrame++;
    if (fwFrame % 55 === 0) fwRockets.push(new Rocket());
    fwRockets = fwRockets.filter((r) => {
      r.update();
      r.draw();
      if (r.exploded) {
        explode(r.x, r.y);
        return false;
      }
      return true;
    });
    fwParticles = fwParticles.filter((p) => {
      p.update();
      p.draw();
      return p.alpha > 0;
    });
    requestAnimationFrame(fireworksLoop);
  }

  fwRockets.push(new Rocket());
  fireworksLoop();
});
