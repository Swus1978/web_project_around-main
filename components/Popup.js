export class Popup {
<<<<<<< HEAD
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    if (!this._popup) {
      console.error(`Popup element (${popupSelector}) not found`);
    }
=======
  constructor(popupSelector, templateId = null) {
    if (templateId) {
      const template = document.querySelector(templateId);
      if (!template) {
        throw new Error(`Template with ID "${templateId}" not found.`);
      }
      this._popup = template.content.firstElementChild.cloneNode(true);
      document.body.appendChild(this._popup);
    } else {
      this._popup = document.querySelector(popupSelector);
    }

    if (!this._popup) {
      throw new Error(`Popup with selector "${popupSelector}" not found.`);
    }

>>>>>>> be71d65aa3c2d4f736e087e261f0851c1b7d12bd
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
<<<<<<< HEAD
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
=======
    this._popup.classList.add('editPopup'); 
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('editPopup');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
>>>>>>> be71d65aa3c2d4f736e087e261f0851c1b7d12bd
      this.close();
    }
  }

  setEventListeners() {
<<<<<<< HEAD
    if (!this._popup) {
      console.error("Cannot set event listeners: popup element is null");
      return;
    }
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup__close-button") ||
        evt.target.classList.contains("popup")
=======
    this._popup.addEventListener('mousedown', (evt) => {
      if (
        evt.target.classList.contains('editPopup') || 
        evt.target.classList.contains('popup__close-button')
>>>>>>> be71d65aa3c2d4f736e087e261f0851c1b7d12bd
      ) {
        this.close();
      }
    });
  }
}
