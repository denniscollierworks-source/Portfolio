// Javascript WAIT FOR PAGE TO LOAD
document.addEventListener("DOMContentLoaded", () => {
  // BUTTON CLICK
  const button = document.querySelector(".btn");

  button.addEventListener("click", () => {
    alert("Welcome! Your button works.");
  });

  // CARD INTERACTION
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    // HOVER EFFECT
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px)";
      card.style.transition = "0.3s";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });

    // CLICK EFFECT
    card.addEventListener("click", () => {
      alert(`${card.textContent} clicked`);
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
          section.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });
});
