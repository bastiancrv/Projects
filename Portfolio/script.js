function scrollToElement(elementSelector, instance = 0) {
  const elements = document.querySelectorAll(elementSelector);
  if (elements.length > instance) {
    const targetElement = elements[instance];
    const navbarHeight = document.querySelector("nav").offsetHeight; // Hauteur de la navbar
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetPosition - navbarHeight - 20, // Compense la hauteur de la navbar fixe
      behavior: "smooth",
    });
  }
}

const link0 = document.getElementById("link0");
const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");
const link4 = document.getElementById("link4");

link0.addEventListener("click", (event) => {
  event.preventDefault(); // Empêche le comportement par défaut
  scrollToElement("html");
});

link1.addEventListener("click", (event) => {
  event.preventDefault(); // Empêche le comportement par défaut
  scrollToElement(".header");
});

link2.addEventListener("click", (event) => {
  event.preventDefault(); // Empêche le comportement par défaut
  scrollToElement(".scroll2");
});

link3.addEventListener("click", (event) => {
  event.preventDefault(); // Empêche le comportement par défaut
  scrollToElement(".scroll3");
});

link4.addEventListener("click", (event) => {
  event.preventDefault(); // Empêche le comportement par défaut
  scrollToElement(".scroll4");
});

const navbar = document.querySelector("nav");
const navbarHeight = navbar.offsetHeight;

window.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("fixed-navbar");
    document.body.classList.add("fixed-navbar-visible");
  } else {
    navbar.classList.remove("fixed-navbar");
    document.body.classList.remove("fixed-navbar-visible");
  }
});

// Récupérer les sections et les liens de la navbar
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links li a");

window.addEventListener("scroll", () => {
  let current = "";

  // Identifier la section visible dans la fenêtre
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140; // Décalage pour ajuster la détection
    const sectionHeight = section.offsetHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  // Mettre à jour les liens actifs
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.textContent.trim() === current) {
      link.classList.add("active");
    }
  });
});
