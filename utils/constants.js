export const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

export const cardGridSelector = ".card-section__grid";

export const selectors = {
  cardTemplate: "#cardTemplate",
  editPopup: "#editPopup",
  addCardPopup: "#imagePopup",
  imageViewerPopup: "#viewerPopup",
  userName: ".author__title",
  userJob: ".author__text",
  editProfileButton: "#editProfileButton",
  addCardButton: "#openPopupButton",
  editNameInput: "#editName",
  editJobInput: "#editText",
};

export const validationConfig = {
  formSelector: ".form_type_popup",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "form__input_invalid",
  errorClass: "form__input-error_active",
};
