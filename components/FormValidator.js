export class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this._formElement = formElement;
    if (!this._formElement) {
      console.error("Form element is null or undefined");
      return;
    }
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this.config.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this.config.submitButtonSelector
    );
    if (!this._submitButton) {
      console.error("Form submit button not found for:", this._formElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!errorElement) {
      console.warn(
        `Error element (#${inputElement.id}-error) not found in form`
      );
      return;
    }
    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorClass);
    console.log(`Showing error for ${inputElement.id}: ${errorMessage}`);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!errorElement) {
      console.warn(
        `Error element (#${inputElement.id}-error) not found in form`
      );
      return;
    }
    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.classList.remove(this.config.errorClass);
    errorElement.textContent = "";
    console.log(`Hiding error for ${inputElement.id}`);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._submitButton) {
      const isInvalid = this._hasInvalidInput();
      this._submitButton.disabled = isInvalid;
      this._submitButton.classList.toggle(
        this.config.inactiveButtonClass,
        isInvalid
      );
      console.log(`Submit button state: disabled=${isInvalid}`);
    }
  }

  _setEventListeners() {
    if (!this._formElement) return;
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        console.log(
          `Input event on ${inputElement.id}: value=${inputElement.value}`
        );
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    if (!this._formElement) {
      console.error("Cannot enable validation: form element is null");
      return;
    }
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    console.log("Validation enabled for form:", this._formElement.name);
  }
}
