export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    if (!this._popup) {
      console.error(`Popup element (${popupSelector}) not found`);
    }
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    if (!this._popup) {
      console.error("Cannot open popup: element is null");
      return;
    }
    this._popup.classList.add("popup--open");
    document.addEventListener("keydown", this._handleEscClose);
    console.log(`Popup opened: ${this._popup.id}`);
  }

  close() {
    if (!this._popup) {
      console.error("Cannot close popup: element is null");
      return;
    }
    this._popup.classList.remove("popup--open");
    document.removeEventListener("keydown", this._handleEscClose);
    console.log(`Popup closed: ${this._popup.id}`);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    if (!this._popup) {
      console.error("Cannot set event listeners: popup element is null");
      return;
    }
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup__close-button") ||
        evt.target.classList.contains("popup")
      ) {
        this.close();
      }
    });
  }
}
