
export const togglePopup = (popup) => {
    if (!popup) return;
  
    const isOpen = popup.classList.toggle('popup--open');
    const overlay = document.getElementById('overlay');
  
    if (overlay) {
      overlay.style.display = isOpen ? 'block' : 'none';
    }
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  };
  

  export function createImageViewerPopup(imageUrl, imageName) {
    let popup = document.querySelector("#viewerPopup");

    if (!popup) {
        popup = document.createElement("section");
        popup.id = "viewerPopup";
        popup.className = "popup popup--image-viewer";
        popup.innerHTML = `
            <img id="popupImage" class="popup__image" alt="" />
            <div id="popupImageName" class="popup__image-name"></div>
            <button class="popup__close-template-button" id="closeImageViewerPopupButton" title="Close">X</button>
        `;
        document.body.appendChild(popup);

        popup.querySelector("#closeImageViewerPopupButton").addEventListener("click", () => {
            popup.classList.remove("popup--active");
        });
    }

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
}

  
  export const closePopup = (popupElement) => {
    popupElement.classList.remove('popup--open');
    setTimeout(() => popupElement.remove(), 300); 
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'none';
  };
  

  export const resetForm = (formElement) => {
    if (formElement) formElement.reset();
  };