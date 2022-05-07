import { Card } from '../components/Card.js';

import { Section } from '../components/Section.js';


import { Popup } from '../components/Popup.js';

import {PopupWithForm} from '../components/PopupWithForm.js';

import { PopupWithImage } from '../components/PopupWithImage.js';

import { UserInfo } from '../components/UserInfo.js';

import {
  settingsObject,
  popups,
  popupEditInfo,
  popupAddCard,
  formAddCard,
  cardName,
  cardLink,
  popupPreview,
  closeIconPreview,
  popupImage,
  popupFigcaption,
  formEditProfile,
  formUserNameField,
  formUserJobField,
  profile,
  addCardButton,
  userName,
  userJob,
  editProfileButton,
  cards,
  initialCards,

} from '../utils/constants.js';

import { FormValidator } from '../components/FormValidator.js';



const cardList = new Section({
  items: initialCards,
  renderer: createCardElement,
}, cards);

cardList.renderItems();


//функция создания карточки
function createCardElement (cardTitle, cardImage) {
  const card = new Card(cardTitle, cardImage, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//=========================================================================================

//экземпляр "Редактировать профиль" класса PopupWithForm 
const popupEditProfile = new PopupWithForm(popupEditInfo, saveProfileFormSubmitHandler);

//экземпляр "Добавить карточку" класса PopupWithForm 
const popupAddProfile = new PopupWithForm(popupAddCard, saveAddCardFormSubmitHandler);

//экземпляр "Поп-апа с картинкой" класса PopupWithImage 
const myPopupWithImage = new PopupWithImage(popupPreview);

//экземпляр класса UserInfo 
const ProfileUserInfo = new UserInfo ({
  user: userName,
  job: userJob
});

//=========================================================================================

//функция обработчик события submit формы поп-апа редактирования профиля
function saveProfileFormSubmitHandler(formData) {

  ProfileUserInfo.setUserInfo(formData.user, formData.userjob);
  
  popupEditProfile.close();  
  
}

//функция обработчик события submit формы поп-апа добавления карточки
function saveAddCardFormSubmitHandler(formData) {
  
  const curentInputValue = formData.cardname;
  const curentInputLinkValue = formData.link;

  cards.prepend(createCardElement(curentInputValue, curentInputLinkValue));
  popupAddProfile.close();
  
}


//функция открывания поп-апа с картинкой
function handleCardClick(){
  myPopupWithImage.open();
}

//функция колл-бэк на событие 'click' кнопки "редактировать профиль"
function openEditInfoPopup() {
  
  const {userNameValue, userJobValue} = ProfileUserInfo.getUserInfo();
  
  //данные пользователя подставляются в форму при открытии
  formUserNameField.value = userNameValue;
  formUserJobField.value = userJobValue;

  //изменение состояния объекта валидации формы: очистка полей span и дизабл кнопки сабмит
  profileValidation.clearErrorMessages();
  popupEditProfile.open();
  
  
}

//функция колл-бэк на событие 'click' кнопки "добавить карточку"
function openAddCardPopup() {

  cardName.value = '';
  cardLink.value = '';
  
  //изменение состояния объекта валидации формы: очистка полей span и дизабл кнопки сабмит
  newCardValidation.clearErrorMessages();
  popupAddProfile.open(); 

}

//eventListeners

//слушатель событий кнопки "редактировать профиль"
editProfileButton.addEventListener('click', openEditInfoPopup);

//слушатель событий кнопки "сохранить" модального окна "редактировать профиль"
formEditProfile.addEventListener('submit', saveProfileFormSubmitHandler);


//слушатель событий кнопки "добавить карточку"
addCardButton.addEventListener('click', openAddCardPopup);

const profileValidation = new FormValidator(settingsObject, formEditProfile);
const newCardValidation = new FormValidator(settingsObject, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();  

export {popupPreview, popupFigcaption, popupImage, handleCardClick};