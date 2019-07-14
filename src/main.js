import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/skills";
import "./scripts/reviews";
import "./scripts/parallax";

let navLinks = document.querySelectorAll('.main-menu .main-menu__link');

Array.from(navLinks).forEach(link => {
  link.onclick = function (e) {
    e.preventDefault();
    let sectionToScroll = link.attributes.href.value.substr(1),
        offsetTopSectionToScroll = document.querySelector('.' + sectionToScroll).offsetTop-50;

    scrollToSection(offsetTopSectionToScroll);
  }
});

function scrollToSection(coord) {
  window.scrollTo(0, coord);
}
