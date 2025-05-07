import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  initialCards,
  cardGridSelector,
  selectors,
  validationConfig,
} from "../utils/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, initializing script...");

  // Render cards
  console.log("Checking card grid selector:", cardGridSelector);
  const gridElement = document.querySelector(cardGridSelector);
  if (!gridElement) {
    console.error(`Card grid (${cardGridSelector}) not found`);
    return;
  }

  console.log("Checking card template selector:", selectors.cardTemplate);
  const templateElement = document.querySelector(selectors.cardTemplate);
  if (!templateElement) {
    console.error(`Card template (${selectors.cardTemplate}) not found`);
    return;
  }

  const imageViewerPopup = new PopupWithImage(selectors.imageViewerPopup);
  imageViewerPopup.setEventListeners();

  const cardSection = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        try {
          const card = new Card(item, selectors.cardTemplate, (link, name) => {
            imageViewerPopup.open(link, name);
          });
          const cardElement = card.generateCard();
          if (cardElement) {
            cardSection.addItem(cardElement);
          } else {
            console.error(`Failed to generate card for: ${item.name}`);
          }
        } catch (error) {
          console.error(`Failed to render card: ${item.name}`, error);
        }
      },
    },
    cardGridSelector
  );

  try {
    console.log("Rendering cards...");
    cardSection.renderItems();
    console.log("Cards rendered successfully");
  } catch (error) {
    console.error("Failed to render cards:", error);
  }

  // Initialize popups and user info
  const viewerPopupElement = document.querySelector(selectors.imageViewerPopup);
  if (!viewerPopupElement) {
    console.error(
      `Image viewer popup (${selectors.imageViewerPopup}) not found`
    );
  }

  const userInfo = new UserInfo({
    nameSelector: selectors.userName,
    jobSelector: selectors.userJob,
  });

  let editProfilePopup;
  const editPopupElement = document.querySelector(selectors.editPopup);
  if (editPopupElement) {
    editProfilePopup = new PopupWithForm(
      selectors.editPopup,
      handleProfileFormSubmit
    );
    editProfilePopup.setEventListeners();
  } else {
    console.error(`Edit popup (${selectors.editPopup}) not found`);
  }

  let addCardPopup;
  const addPopupElement = document.querySelector(selectors.addCardPopup);
  if (addPopupElement) {
    addCardPopup = new PopupWithForm(
      selectors.addCardPopup,
      handleAddCardFormSubmit
    );
    addCardPopup.setEventListeners();
  } else {
    console.error(`Add card popup (${selectors.addCardPopup}) not found`);
  }

  // Setup event listeners for buttons
  const editButton = document.querySelector(selectors.editProfileButton);
  if (editButton) {
    editButton.addEventListener("click", () => {
      if (!editProfilePopup) {
        console.error("Edit profile popup not initialized");
        return;
      }
      const { name, job } = userInfo.getUserInfo();
      const nameInput = document.querySelector(selectors.editNameInput);
      const jobInput = document.querySelector(selectors.editJobInput);
      if (nameInput && jobInput) {
        nameInput.value = name;
        jobInput.value = job;
        editProfilePopup.open();
      } else {
        console.error("Edit form inputs not found");
      }
    });
  } else {
    console.error(
      `Edit profile button (${selectors.editProfileButton}) not found`
    );
  }

  const addButton = document.querySelector(selectors.addCardButton);
  if (addButton) {
    addButton.addEventListener("click", () => {
      if (!addCardPopup) {
        console.error("Add card popup not initialized");
        return;
      }
      addCardPopup.open();
    });
  } else {
    console.error(`Add card button (${selectors.addCardButton}) not found`);
  }

  // Setup form validation
  const editForm = document
    .querySelector(selectors.editPopup)
    ?.querySelector(".form_type_popup");
  if (editForm) {
    const editFormValidator = new FormValidator(validationConfig, editForm);
    editFormValidator.enableValidation();
    console.log("Edit form validation enabled");
  } else {
    console.error(
      `Edit form (${selectors.editPopup} .form_type_popup) not found`
    );
  }

  const addCardForm = document
    .querySelector(selectors.addCardPopup)
    ?.querySelector(".form_type_popup");
  if (addCardForm) {
    const addCardFormValidator = new FormValidator(
      validationConfig,
      addCardForm
    );
    addCardFormValidator.enableValidation();
    console.log("Add card form validation enabled");
  } else {
    console.error(
      `Add card form (${selectors.addCardPopup} .form_type_popup) not found`
    );
  }

  function handleProfileFormSubmit(formData) {
    console.log("Edit profile form submitted with data:", formData);
    try {
      editProfilePopup.setLoading(true);
      userInfo.setUserInfo({
        name: formData.name,
        job: formData.job,
      });
      const updatedName = document.querySelector(
        selectors.userName
      )?.textContent;
      const updatedJob = document.querySelector(selectors.userJob)?.textContent;
      console.log("Profile updated:", { name: updatedName, job: updatedJob });
      editProfilePopup.close();
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      editProfilePopup.setLoading(false);
    }
  }

  function handleAddCardFormSubmit(formData) {
    console.log("Add card form submitted with data:", formData);
    try {
      addCardPopup.setLoading(true);
      const newCard = {
        name: formData.name,
        link: formData.imageUrl,
      };
      const card = new Card(newCard, selectors.cardTemplate, (link, name) => {
        imageViewerPopup.open(link, name);
      });
      const cardElement = card.generateCard();
      if (cardElement) {
        cardSection.addItem(cardElement);
        console.log("New card added:", newCard);
        addCardPopup.close();
      } else {
        console.error("Failed to generate new card:", newCard);
      }
    } catch (error) {
      console.error("Failed to add new card:", error);
    } finally {
      addCardPopup.setLoading(false);
    }
  }
});
