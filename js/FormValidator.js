export class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this.config.inputSelector));
        this._submitButton = this._formElement.querySelector(this.config.submitButtonSelector);

        if (!this._submitButton) {
            console.error("Form submit button not found for:", this._formElement);
        }

        this._errorMessages = {}; // Store custom error messages
    }

    // Show input error message
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        if (!errorElement) {
            console.error(`Error element not found for input: ${inputElement.id}. Creating one dynamically.`);
            return;
        }

        inputElement.classList.add(this.config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.config.errorClass);
    }

    // Hide input error message
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        if (!errorElement) return;

        inputElement.classList.remove(this.config.inputErrorClass);
        errorElement.classList.remove(this.config.errorClass);
        errorElement.textContent = "";
    }

    // Check input validity and display appropriate error message
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            const errorMessage = inputElement.validationMessage || this._errorMessages[inputElement.name];
            this._showInputError(inputElement, errorMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // Check if any input is invalid
    _hasInvalidInput() {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    }

    // Toggle button state based on input validity
    _toggleButtonState() {
        if (!this._submitButton) return;

        const isFormValid = !this._hasInvalidInput();
        this._submitButton.disabled = !isFormValid;
        this._submitButton.classList.toggle(this.config.inactiveButtonClass, !isFormValid);
    }

    // Reset the form and clear errors
    resetForm() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }

    // Set custom error messages for specific inputs
    setCustomErrorMessages(messages) {
        this._errorMessages = { ...this._errorMessages, ...messages };
    }

    // Set up event listeners for form inputs
    _setEventListeners() {
        this._toggleButtonState();

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });

            // Add blur event for better user experience
            inputElement.addEventListener("blur", () => {
                this._checkInputValidity(inputElement);
            });
        });

        // Reset form on reset event
        this._formElement.addEventListener("reset", () => {
            setTimeout(() => this.resetForm(), 0);
        });
    }

    // Enable form validation
    enableValidation() {
        this._setEventListeners();

        this._formElement.addEventListener("submit", (event) => {
            if (this._hasInvalidInput()) {
                event.preventDefault();
                console.warn("Form submission blocked due to validation errors");
            }
        });
    }
}