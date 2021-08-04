import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._popupSubmitButton = this._popup.querySelector('.popup__button')
    this._submitButtonText = this._popupSubmitButton.textContent
  }

  _getInputValues() {
    this._values = {}
    this._inputs.forEach(input => {
        this._values[input.name] = input.value;
    })
    return this._values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }

  renderLoading(loading, loadingMessage='Сохранение...') {
    if(loading) {
        this._popupSubmitButton.textContent = loadingMessage
    } else {
        this._popupSubmitButton.textContent = this._submitButtonText
    }
  }
}
