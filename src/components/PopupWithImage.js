import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, titleSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(imageSelector);
    this._title = this._popup.querySelector(titleSelector);
  }

  open(title, image) {
    this._image.src = image;
    this._title.textContent = title;
    this._image.alt = title;
    super.open();
  }
}