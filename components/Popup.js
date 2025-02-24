export class Popup {
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

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('editPopup'); 
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('editPopup');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (
        evt.target.classList.contains('editPopup') || 
        evt.target.classList.contains('popup__close-button')
      ) {
        this.close();
      }
    });
  }
}
