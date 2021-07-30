import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    this._values = {}
    this._inputs = this._popup.querySelectorAll('.popup__input')
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
}
