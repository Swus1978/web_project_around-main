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

    this._overlay = document.getElementById('overlay');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    if (this._overlay) {
      this._overlay.style.display = 'block';
    }
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    if (this._overlay) {
      this._overlay.style.display = 'none';
    }
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
  
    const closeButton = this._popup.querySelector('.popup__close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }

 
    if (this._overlay) {
      this._overlay.addEventListener('click', (evt) => {
        if (evt.target === this._overlay) {
          this.close();
        }
      });
    }
  }
}