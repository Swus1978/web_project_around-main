export class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(sectionSelector);
<<<<<<< HEAD
    if (!this._container) {
      throw new Error(
        `Container with selector "${sectionSelector}" not found.`
      );
    }
=======
>>>>>>> be71d65aa3c2d4f736e087e261f0851c1b7d12bd
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
<<<<<<< HEAD
=======

>>>>>>> be71d65aa3c2d4f736e087e261f0851c1b7d12bd
