export default class Popup {
  constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_open');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close () {
    this._popup.classList.remove('popup_open');
    document.addEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if(evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target !== this._popup) return; {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', () => this.close())
    this._popup.addEventListener('mousedown', (evt) => this._handleClickClose(evt))
  }
}
