import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import {
  initialCards,
  validationConfig,
  openPopupEditProfileButton,
  openPopupAddCardButton,
  formElementSave,
  nameInput,
  jobInput,
  formElementAdd,
  elementsListSelector,
  popupImageSelector,
  photoPopupSelector,
  subtitlePopupSelector,
  popupEditProfileSelector,
  popupAddCardSelector,
  profileNameSelector,
  profileDescriptionSelector
 } from '../utils/const.js';

function createCard(item) {
  const card = new Card(item, '.elements-template', {
    handleCardClick: (title, link) => {
      popupWithImage.open(title, link);
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}

function submitCardForm(value) {
  userInfo.setUserInfo(value)
  popupEditProfileForm.close()
}

function submitAddCard(value) {
  const inputTitle = value.title;
  const inputLink = value.link;
  const values = {name: inputTitle, link: inputLink};
  const card = createCard(values);
  cardContainer.setItem(card);
  formElementAdd.reset();
  popupAddCardForm.close();
}

 const popupWithImage = new PopupWithImage(popupImageSelector, photoPopupSelector, subtitlePopupSelector);
 popupWithImage.setEventListeners();

 const popupEditProfileForm = new PopupWithForm(popupEditProfileSelector, submitCardForm);
 popupEditProfileForm.setEventListeners();

 const popupAddCardForm = new PopupWithForm(popupAddCardSelector, submitAddCard);
 popupAddCardForm.setEventListeners();

 const profileValidate = new FormValidator(validationConfig, formElementSave);
 profileValidate.enableValidation();

 const cardValidate = new FormValidator(validationConfig, formElementAdd);
 cardValidate.enableValidation();

 openPopupAddCardButton.addEventListener('click', () => {
   popupAddCardForm.open();
   cardValidate.clearInputError();
   cardValidate.toggleButton();
  });

const cardContainer = new Section({ items:initialCards,
  renderer: (item) => {
    const createdCard = createCard(item);
    cardContainer.setItem(createdCard);
  }
}, elementsListSelector);
cardContainer.renderedItems();

const userInfo = new UserInfo({ userName: profileNameSelector, userDescription: profileDescriptionSelector });
openPopupEditProfileButton.addEventListener('click', function () {
  popupEditProfileForm.open();
  const infoProfile = userInfo.getUserInfo();
  nameInput.value = infoProfile.name;
  jobInput.value = infoProfile.description;
  profileValidate.clearInputError();
  profileValidate.toggleButton();
  });

  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
      authorization: '60bdf67c-096f-4da4-8c27-4a10609300f8',
      'Content-Type': 'application/json'
    }
  }); 
