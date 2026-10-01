const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const filters = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");
const year = document.getElementById("year");

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const selected = button.dataset.filter;

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const showCard = selected === "all" || categories.includes(selected);
      card.classList.toggle("hidden", !showCard);
    });
  });
});

const revealItems = document.querySelectorAll(
  ".project-card, .skill-card, .timeline-item, .about-note"
);

revealItems.forEach((item) => item.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

year.textContent = new Date().getFullYear();
