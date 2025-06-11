import Carousel from "./carousel.js";

const myCarousel = new Carousel(
  globalThis.items,
  document.querySelector(".item"),
  globalThis.prev,
  globalThis.next,
  document.querySelectorAll(".item").length
);
myCarousel;
