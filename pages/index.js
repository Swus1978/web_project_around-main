import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards, cardGridSelector, selectors } from '../utils/constants.js'; 
import { FormValidator } from '../components/FormValidator.js';
import { togglePopup, createImageViewerPopup } from '../utils/utils.js';
import { Popup } from '../components/Popup.js';


const addCardPopupInstance = new Popup(selectors.addCardPopup);
addCardPopupInstance.setEventListeners();

const openPopupButton = document.querySelector(selectors.openPopupButton);
openPopupButton.addEventListener('click', () => {
  addCardPopupInstance.open();
  togglePopup(addCardPopup);
});

const editProfileButton = document.querySelector(selectors.editProfileButton);
const editPopup = document.querySelector(selectors.editPopup);
const addCardPopup = document.querySelector(selectors.addCardPopup);


const imageViewerPopup = new PopupWithImage('.popup--image-viewer');
const userInfo = new UserInfo(selectors.authorTitle, selectors.authorText);

const editNameInput = document.querySelector(selectors.editNameInput);
const editTextInput = document.querySelector(selectors.editTextInput);
const authorTitle = document.querySelector(selectors.authorTitle);
const authorText = document.querySelector(selectors.authorText);

const editProfilePopup = new PopupWithForm(selectors.editPopup, handleProfileFormSubmit);

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



