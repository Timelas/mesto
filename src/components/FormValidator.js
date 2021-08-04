export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._form = formElement;
    this._inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
    this._button = this._form.querySelector(this._validationConfig.submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._validationConfig.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _hasInvalidInput()  {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
  })
}

  toggleButton() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    }
    else {
      this._button.classList.remove(this._validationConfig.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _setEventListeners() {
    this.toggleButton();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButton();
      });
    });
  }

  clearInputError() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
  });
  }

  disableButton() {
    this._button.classList.add(this._validationConfig.inactiveButtonClass);
    this._button.disabled = true;
}

  enableValidation() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
      };
};
