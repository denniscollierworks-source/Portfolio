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
      alert(`${label ? label.textContent : card.textContent.trim()} — coming soon!`);
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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

});