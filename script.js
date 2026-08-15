const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuToggle = document.getElementById("menuToggle");
const printBtn = document.getElementById("btnPrint");
const navLinks = document.querySelectorAll(".binder-nav a");
const sections = [...document.querySelectorAll("main section[id]")];

function setMenu(open) {
  sidebar.classList.toggle("open", open);
  overlay.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}

menuToggle.addEventListener("click", () => {
  setMenu(!sidebar.classList.contains("open"));
});

overlay.addEventListener("click", () => setMenu(false));

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    const target = id ? document.querySelector(id) : null;

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", id);
    }

    setMenu(false);
  });
});

printBtn.addEventListener("click", () => window.print());

const bars = document.querySelectorAll(".bar");
const animateBars = () => {
  bars.forEach((bar) => {
    const level = bar.dataset.level || "0";
    bar.querySelector("span").style.width = `${level}%`;
  });
};

window.addEventListener("load", animateBars);

const onScroll = () => {
  const fromTop = window.scrollY + 120;
  let current = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= fromTop) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});
