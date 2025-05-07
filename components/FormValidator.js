export class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this._formElement = formElement;
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

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("form__input_invalid");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("form__input-error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  };

  _setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(this.config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      this.config.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation = () => {
    const formList = Array.from(
      document.querySelectorAll(this.config.formSelector)
    );
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });

      this._setEventListeners(formElement);
    });
  };
}
