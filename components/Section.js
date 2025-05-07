export class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(sectionSelector);
    if (!this._container) {
      throw new Error(
        `Container with selector "${sectionSelector}" not found.`
      );
    }
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
