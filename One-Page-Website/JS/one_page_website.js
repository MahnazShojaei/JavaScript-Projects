const cards = Array.from(document.querySelectorAll(".photo-card"));
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const closeModal = document.getElementById("closeModal");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

let activeIndex = 0;

function displayImage(index) {
  activeIndex = (index + cards.length) % cards.length;

  const activeCard = cards[activeIndex];
  const thumbnail = activeCard.querySelector("img");

  modalImage.src = activeCard.dataset.large;
  modalImage.alt = thumbnail.alt;
  modalCaption.textContent = activeCard.dataset.caption;
}

function openGallery(index) {
  displayImage(index);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  cards[activeIndex].focus();
}

cards.forEach((card, index) => {
  card.addEventListener("click", () => openGallery(index));
});

closeModal.addEventListener("click", closeGallery);
prevImage.addEventListener("click", () => displayImage(activeIndex - 1));
nextImage.addEventListener("click", () => displayImage(activeIndex + 1));

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeGallery();
  }
});

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("open")) return;

  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") displayImage(activeIndex - 1);
  if (event.key === "ArrowRight") displayImage(activeIndex + 1);
});
