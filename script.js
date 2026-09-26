const menu = document.querySelector(".navbar .menu");
const navLinks = document.querySelector(".navbar .nav-links");

menu.addEventListener("click", () => {
  menu.classList.toggle("active");
  navLinks.classList.toggle("active");
});
