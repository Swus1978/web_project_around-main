const popupImage = popup.querySelector("#popupImage");
const popupImageName = popup.querySelector("#popupImageName");

if (popupImage && popupImageName) {
  popupImage.src = imageUrl;
  popupImage.alt = imageName;
  popupImageName.textContent = imageName;
  popup.classList.add("popup--active");
} else {
  console.error("Popup elements not found.");
}

export const resetForm = (formElement) => {
  if (formElement) formElement.reset();
};
