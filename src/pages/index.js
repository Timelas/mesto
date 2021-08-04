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
  profileDescriptionSelector,
  deletePopupSelector,
  popupAvatarSelector,
  profileAvatarInput,
  formAvatar,
  editAvatarButton,
  avatarSelector
 } from '../utils/const.js';

export {userId}
 let userId;

 const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: '60bdf67c-096f-4da4-8c27-4a10609300f8',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([value, items]) => {
  const reverse = items.reverse()
  userId = value._id;
  userInfo.setUserInfo(value)
  cardContainer.renderedItems(reverse)
})
.catch((error) => {
  console.log(`Ошибка: ${error}`)
})

function createCard(item) {
  const card = new Card(item, '.elements-template', {
    handleCardClick: (title, link) => {
      popupWithImage.open(title, link);
    }, 
    likeCardClick: () => {
      const likedCard = card.likedCard();
      const result = likedCard ? api.dislikeCard(card.getIdCard()) : api.likeCard(card.getIdCard());
      result.then(data => {
        card.setLikes(data.likes);
        card.renderLikes()
      }).catch((err) => {
        console.log(err)
      })},
     handleCardDelete: () => {
      popupWithSubmit.open(card)
    }
  }, item._id);
  const cardElement = card.generateCard();
  return cardElement;
}

 const popupWithImage = new PopupWithImage(popupImageSelector, photoPopupSelector, subtitlePopupSelector);
 popupWithImage.setEventListeners();

 const popupEditProfileForm = new PopupWithForm(popupEditProfileSelector, (value) => {
  popupEditProfileForm.renderLoading(true)
  api.editProfile(value.name, value.about)
  .then((data) => {
    userInfo.setUserInfo(data)
    popupEditProfileForm.close()
  })
  .catch((err) => {
    console.log(`Произошла ошибка: ${err}`)
  })
  .finally(() => {
    popupEditProfileForm.renderLoading(false)
  })
})
 popupEditProfileForm.setEventListeners();

 const popupAddCardForm = new PopupWithForm(popupAddCardSelector, (value) => {
 popupAddCardForm.renderLoading(true)
 api.addNewCard(value.title, value.link)
 .then(data => {
   const newCard = createCard(data)
   cardContainer.setItem(newCard)
   popupAddCardForm.close()
 })
 .finally(() => {
   popupAddCardForm.renderLoading(false)
 })
})
 popupAddCardForm.setEventListeners();

 const popupEditAvatar = new PopupWithForm(popupAvatarSelector, () => {
  popupEditAvatar.renderLoading(true)
    api.editAvatar(profileAvatarInput.value)
    .then((res) => {
      userInfo.setUserInfo(res)
      popupEditAvatar.close()
  })
    .catch((err) =>{
      console.log(err)
    })
  .finally(() => {
        popupEditAvatar.renderLoading(false)
  })
})
popupEditAvatar.setEventListeners()

 const popupWithSubmit = new PopupWithSubmit(deletePopupSelector, (evt, card) => {
  deleteConfirm(evt, card)
})
popupWithSubmit.setEventListeners()

const deleteConfirm = (evt, card) => {
  evt.preventDefault();
  popupWithSubmit.renderLoading(true)
  api.deleteCard(card.getIdCard())
    .then( res => {
      card.deleteCard()
      popupWithSubmit.close()
    })
    .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupWithSubmit.renderLoading(false)
})
}

 const profileValidate = new FormValidator(validationConfig, formElementSave);
 profileValidate.enableValidation();

 const cardValidate = new FormValidator(validationConfig, formElementAdd);
 cardValidate.enableValidation();

 const avatarValidate = new FormValidator(validationConfig, formAvatar);
 avatarValidate.enableValidation();

 openPopupAddCardButton.addEventListener('click', () => {
   popupAddCardForm.open();
   cardValidate.clearInputError();
   cardValidate.toggleButton();
  });

  editAvatarButton.addEventListener('click', () => {
    popupEditAvatar.open()
    avatarValidate.clearInputError()
  })

const cardContainer = new Section({
    renderer: (item) => {
    const createdCard = createCard(item);
    cardContainer.setItem(createdCard);
  }
}, elementsListSelector);

const userInfo = new UserInfo({ userName: profileNameSelector, userDescription: profileDescriptionSelector, profileAvatars:avatarSelector });
openPopupEditProfileButton.addEventListener('click', function () {
  popupEditProfileForm.open();
  const infoProfile = userInfo.getUserInfo();
  nameInput.value = infoProfile.name;
  jobInput.value = infoProfile.description;
  profileValidate.clearInputError();
  profileValidate.toggleButton();
  });
 
