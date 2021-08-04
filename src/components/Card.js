import {userId} from '../pages/index.js'

export default class Card {
  constructor(data, cardSelector, {handleCardClick, likeCardClick, handleCardDelete}, cardId) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likeCardClick = likeCardClick;
    this._handleCardDelete = handleCardDelete;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardId = cardId;
    }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  _like() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  getIdCard() {
    return this._cardId;
  }

  removeCard() {
    this._element.remove()
}

  renderLikes() {
    this._amount.textContent = this._likes.length;
    this._show(this._userId);
  }

  likedCard() {
    return this._likes.some(value => {
      return value._id === this._userId
    })
  }

  _show() {
    if (this.likedCard(this._userId)) {
      this._handleLike.classList.add('element__like_active')
    } else {
      this._handleLike.classList.remove('element__like_active')
    }
  }

  setLikes(list) {
    this._likes = list
  }
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;
    this._amount = this._element.querySelector('.element__amount');
    this._handleLike = this._element.querySelector('.element__like')
    this._deleteIcon = this._element.querySelector('.element__delete');
    if (this._ownerId !== this._userId) {
      this._deleteIcon.style.display = 'none';
    }
    this.renderLikes()
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._handleLike.addEventListener('click', () => {
      this._likeCardClick()
      this._like()
  })
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleCardDelete();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

  }
}

