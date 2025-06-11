export default class Carousel {
  #itemWidth;

  #index = 0;
  #initialTouchPosition = 0;
  constructor(container, item, prevBtn, nextBtn, totalItems) {
    this.container = container;
    this.item = item;
    this.totalItems = totalItems;

    this.nextBtn = nextBtn;
    this.prevBtn = prevBtn;

    this.#itemWidth = this.item.scrollWidth;

    this.#bindEvents();
  }

  #bindEvents() {
    this.container.addEventListener("scroll", () => {
      if (this.#index <= 0) {
        this.nextBtn.classList.remove("deactive");
        this.prevBtn.classList.add("deactive");
      } else if (this.#index >= this.totalItems - 1) {
        this.prevBtn.classList.remove("deactive");
        this.nextBtn.classList.add("deactive");
      } else {
        this.prevBtn.classList.remove("deactive");
        this.nextBtn.classList.remove("deactive");
      }
    });
    this.nextBtn.addEventListener("click", () => this.#scroll(this.#index + 1));
    this.prevBtn.addEventListener("click", () => this.#scroll(this.#index - 1));
    this.container.addEventListener("touchstart", this.#setInitialPosition);
    this.container.addEventListener("touchend", this.#scrollByTouch);
  }

  #resetIndex = (target) => {
    if (target < 0) {
      target = this.totalItems - 1;
    } else if (target > this.totalItems - 1) {
      target = 0;
    }

    return target;
  };

  #scroll = (newindex) => {
    const finalIndex = this.#resetIndex(newindex);

    this.#index = finalIndex;

    this.container.scrollTo({
      left: this.#itemWidth * finalIndex,
      behavior: "smooth",
    });
  };

  #setInitialPosition = (e) => {
    this.#initialTouchPosition = e.touches[0].clientX;
  };

  #scrollByTouch = (e) => {
    const currentPosition = e.changedTouches[0].clientX;

    const diff = this.#initialTouchPosition - currentPosition;
    const threshhold = 50;
    if (diff > threshhold) {
      this.#scroll(this.#index + 1);
    } else {
      this.#scroll(this.#index - 1);
    }
  };
}
