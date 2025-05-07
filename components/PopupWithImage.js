<<<<<<< HEAD
import { Popup } from "./Popup.js";
=======
import { Popup } from './Popup.js';
>>>>>>> be71d65aa3c2d4f736e087e261f0851c1b7d12bd

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
<<<<<<< HEAD
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__image-name");
=======
    this._popupImage = this._popup.querySelector('.popup__image'); 
    this._popupCaption = this._popup.querySelector('.popup__image-name');
>>>>>>> be71d65aa3c2d4f736e087e261f0851c1b7d12bd
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;

    super.open();
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> be71d65aa3c2d4f736e087e261f0851c1b7d12bd
