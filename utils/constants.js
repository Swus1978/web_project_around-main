export const togglePopup = (popup) => {
    if (!popup) return;
  
    const isOpen = popup.classList.toggle('popup--open');
    const overlay = document.getElementById('overlay');
  
    if (overlay) {
        const anyPopupOpen = document.querySelector('.popup--open');
        overlay.style.display = anyPopupOpen ? 'block' : 'none';
    }

    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
};

export const createImageViewerPopup = (link, name) => {
    const existingPopup = document.querySelector('.popup--image-viewer');
    if (existingPopup) existingPopup.remove();

    const template = document.querySelector('#popupTemplate')?.content.cloneNode(true);
    if (!template) {
        console.error("Popup template not found!");
        return;
    }

    const popupElement = template.querySelector('.popup--image-viewer');
    const popupImage = popupElement.querySelector('#popupImage');
    const popupImageName = popupElement.querySelector('#popupImageName');
    const closeImageViewerPopupButton = popupElement.querySelector('#closeImageViewerPopupButton');
    const overlay = document.getElementById('overlay');

    if (!popupElement || !popupImage || !popupImageName || !closeImageViewerPopupButton) {
        console.error("One or more popup elements are missing.");
        return;
    }

    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;

    popupImage.onerror = () => {
        popupImage.src = './images/default-image.jpg';
        popupImage.alt = 'Image not available';
    };

    document.body.appendChild(popupElement);

    requestAnimationFrame(() => popupElement.classList.add('popup--open'));
    if (overlay) overlay.style.display = 'block';

    closeImageViewerPopupButton.addEventListener('click', () => closePopup(popupElement));

    overlay.addEventListener('click', (event) => {
        if (!event.target.closest('.popup--image-viewer')) closePopup(popupElement);
    });
};

const closePopup = (popupElement) => {
    popupElement.classList.remove('popup--open');
    setTimeout(() => {
        popupElement.remove();
        const overlay = document.getElementById('overlay');
        if (overlay) {
            const anyPopupOpen = document.querySelector('.popup--open');
            overlay.style.display = anyPopupOpen ? 'block' : 'none';
        }
    }, 300);
};

export const resetForm = (formElement) => {
    if (formElement) formElement.reset();
};


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
