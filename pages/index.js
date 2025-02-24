import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { togglePopup, createImageViewerPopup } from '../utils/utils.js';

const cardGridSelector = '.card-section__grid';
const editProfileButton = document.querySelector('#editProfileButton');
const openPopupButton = document.querySelector('#openPopupButton');

const editPopup = document.querySelector('#editPopup');
const addCardPopup = document.querySelector('#imagePopup');

const template = document.querySelector('#popupTemplate'); 
const popupClone = template.content.firstElementChild.cloneNode(true);
document.body.appendChild(popupClone);

const imageViewerPopup = new PopupWithImage('.popup--image-viewer');

const userInfo = new UserInfo('.author__title', '.author__text');

const editNameInput = document.querySelector('#editName');
const editTextInput = document.querySelector('#editText');
const authorTitle = document.querySelector('.author__title');
const authorText = document.querySelector('.author__text');

const editProfilePopup = new PopupWithForm('#editPopup', handleProfileFormSubmit);
const addCardPopupInstance = new PopupWithForm('#imagePopup', handleAddCardFormSubmit);

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#cardTemplate', (link, name) => {
        createImageViewerPopup(link, name);
      });
      cardSection.addItem(card.generateCard());
    },
  },
  cardGridSelector
);

cardSection.renderItems();

editProfileButton.addEventListener('click', () => {
  editNameInput.value = authorTitle.textContent.trim();
  editTextInput.value = authorText.textContent.trim();
  togglePopup(editPopup);
});

function handleProfileFormSubmit(formData) {
  userInfo.setUserInfo({
    name: formData.name,
    text: formData.text,
  });
  togglePopup(editPopup);
}

function handleAddCardFormSubmit(formData) {
  const newCard = {
    name: formData.name,
    link: formData.imageUrl,
  };
  const card = new Card(newCard, '#cardTemplate', (link, name) => {
    createImageViewerPopup(link, name);
  });
  cardSection.addItem(card.generateCard());
  togglePopup(addCardPopup);
  addCardClickEvents();
}

const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button-submit',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error_active',
};

const editFormValidator = new FormValidator(validationConfig, editPopup.querySelector('form'));
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addCardPopup.querySelector('form'));
addCardFormValidator.enableValidation();

function addCardClickEvents() {
  document.querySelectorAll('.card-section__card-img').forEach((img) => {
    img.addEventListener('click', (event) => {
      const cardImage = event.target;
      const cardTitle = cardImage.closest('.card-section__card').querySelector('.card-section__card-title')?.textContent || 'Unknown Title';
      createImageViewerPopup(cardImage.src, cardTitle);
    });
  });
}

addCardClickEvents();