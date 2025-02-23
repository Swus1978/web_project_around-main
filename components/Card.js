export class Card {
    constructor(data, templateSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
      const template = document.querySelector(this._templateSelector);
      if (!template) {
        throw new Error(`Template with selector "${this._templateSelector}" not found.`);
      }
      const cardElement = template.content.querySelector('.card-section__card').cloneNode(true);
      return cardElement;
    }
  
  
    _setEventListeners() {
      this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));
      this._likeButton.addEventListener('click', () => this._handleLikeClick());
      this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
    }
  
    _handleLikeClick() {
      this._likeButton.classList.toggle('card__button-like--active');
    }
  
    _handleDeleteClick() {
      this._cardElement.remove();
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.card-section__card-img');
      this._cardTitle = this._element.querySelector('.card-section__card-title');
  
    
      if (!this._cardImage) {
        console.error('Card image element not found.');
      }
      if (!this._cardTitle) {
        console.error('Card title element not found.');
      }
  
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._cardTitle.textContent = this._name;
  
    
      this._cardImage.addEventListener('click', () => {
        this._handleImageClick(this._link, this._name);
      });
  
      return this._element;
    }
  }


  