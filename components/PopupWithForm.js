import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form_type_popup");
    if (!this._form) {
      console.error(
        `Form (.form_type_popup) not found in popup: ${popupSelector}`
      );
    }
    this._inputList = this._form?.querySelectorAll(".form__input") || [];
    this._submitButton = this._form?.querySelector(".popup__button-submit");
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    console.log("Form input values:", formValues);
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        console.log("Form submit event triggered");
        const formData = this._getInputValues();
        this._handleFormSubmit(formData);
      });
      console.log("Submit event listener added to form");
    }
  }

  close() {
    console.log("Closing popup", this._popup.id);
    if (this._form) {
      console.log("Resetting form");
      this._form.reset();
    }
    super.close();
  }

  setLoading(isLoading) {
    if (this._submitButton) {
      this._submitButton.textContent = isLoading ? "Guardando..." : "Guardar";
    }
  }
}
