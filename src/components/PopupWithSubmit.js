import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupSubmitButton = this._popup.querySelector('.popup__button');
    this._submitButtonText = this._popupSubmitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitForm(evt, this._card);
    })
}

  open(card) {
      super.open();
      this._card = card;
  }
}