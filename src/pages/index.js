import './index.css';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  settingsObject,
  formAddCard,
  formEditProfile,
  formUserNameField,
  formUserJobField,
  addCardButton,
  userName,
  userJob,
  editProfileButton,
  initialCards,
} from '../utils/constants.js';

const cardList = new Section({
  items: initialCards,
  renderer: createCardElement,
}, '.cards');

cardList.renderItems();

//функция создания карточки
function createCardElement (cardTitle, cardImage) {  
  const card = new Card(cardTitle, cardImage, handleCardClick, '#card');
  const cardElement = card.generateCard();
  return cardElement;
}

//экземпляр "Редактировать профиль" класса PopupWithForm 
const popupEditProfile = new PopupWithForm('#editInfo', saveProfileFormSubmitHandler);

//экземпляр "Добавить карточку" класса PopupWithForm 
const popupAddProfile = new PopupWithForm('#addCard', saveAddCardFormSubmitHandler);

//экземпляр "Поп-апа с картинкой" класса PopupWithImage 
const myPopupWithImage = new PopupWithImage('#popup-preview');

//экземпляр класса UserInfo 
const profileUserInfo = new UserInfo ({
  user: userName,
  job: userJob
});

//функция обработчик события submit формы поп-апа редактирования профиля
function saveProfileFormSubmitHandler(formData) {
  profileUserInfo.setUserInfo(formData.user, formData.userjob);  
  popupEditProfile.close();  
}

//функция обработчик события submit формы поп-апа добавления карточки
function saveAddCardFormSubmitHandler(formData) {  
  cardList.prependItem(formData);
  popupAddProfile.close();  
}

function handleCardClick(name, link){
  myPopupWithImage.open(name, link);
}

//функция колл-бэк на событие 'click' кнопки "редактировать профиль"
function openEditInfoPopup(){  
  const {userNameValue, userJobValue} = profileUserInfo.getUserInfo();
  
  //данные пользователя подставляются в форму при открытии
  formUserNameField.value = userNameValue;
  formUserJobField.value = userJobValue;

  //изменение состояния объекта валидации формы: очистка полей span и дизабл кнопки сабмит
  profileValidation.clearErrorMessages();
  popupEditProfile.open();  
}

//функция колл-бэк на событие 'click' кнопки "добавить карточку"
function openAddCardPopup() {  
  //изменение состояния объекта валидации формы: очистка полей span и дизабл кнопки сабмит
  newCardValidation.clearErrorMessages();
  popupAddProfile.open();
}

//eventListeners
//слушатель событий кнопки "редактировать профиль"
editProfileButton.addEventListener('click', openEditInfoPopup);

//слушатель событий кнопки "добавить карточку"
addCardButton.addEventListener('click', openAddCardPopup);

const profileValidation = new FormValidator(settingsObject, formEditProfile);
const newCardValidation = new FormValidator(settingsObject, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();