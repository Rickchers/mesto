import './index.css';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupDelCardConfirm } from '../components/PopupDelCardConfirm.js';

import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js';
import {
  settingsObject,
  formAddCard,
  formEditProfile,
  formUserNameField,
  formUserJobField,
  addCardButton,
  userName,
  userAbout,
  editProfileButton,
  //initialCards,
  cards,
  likes
} from '../utils/constants.js';

//===================================================================================

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-40/',
    headers: {
      authorization: 'c6cdad07-f201-4fb1-b931-468bd978f248'
    }
  }
);

api.getUserData()
  .then((result) => {
    profileUserInfo.setUserInfo(result.name, result.about);
    document.querySelector('.profile__avatar').src = result.avatar;
    
  })


api.getInitialCards()
  .then((data) => {    
    const cardList = new Section({

      items: data,
      renderer: createCardElement},
      api,
      '.cards');    
    cardList.renderItems();
  })



/*
api.getInitialCards()
  .then(cards) => {
    cards.forEach(data => {
      const card = createCardElement(data);
      section.addItem(card);
    })
  }
*/  
//===================================================================================




//функция создания карточки
function createCardElement (data, myID) {
  const card = new Card(data, handleCardClick, handleBusketIconClick, '#card', api);
  const cardElement = card.generateCard(myID);
  
  return cardElement;
}

//============================
//экземпляр поп-ап объекта "Подтвердить удаление" класса PopupDelCardConfirm
const popupDelCardConfirm = new PopupDelCardConfirm ('#popup-confirm', delSubmitHandler);

function delSubmitHandler(id, item){  

  //console.log(id, item);
  
  api.removeCard(id)
      .then((result) => {
        console.log(result);        
      });

  item.remove();
 
  popupDelCardConfirm.close();
}





function handleBusketIconClick(id, item){ 
  //console.log(id, item);
  popupDelCardConfirm.open(id, item);
}


//============================


//экземпляр поп-ап объекта "Редактировать профиль" класса PopupWithForm 
const popupEditProfile = new PopupWithForm('#editInfo', saveProfileFormSubmitHandler);

//экземпляр поп-ап объекта "Добавить карточку" класса PopupWithForm 
const popupAddProfile = new PopupWithForm('#addCard', saveAddCardFormSubmitHandler);

//экземпляр объекта "Поп-ап с картинкой" класса PopupWithImage 
const myPopupWithImage = new PopupWithImage('#popup-preview');

//экземпляр класса UserInfo 
const profileUserInfo = new UserInfo ({
  user: userName,
  job: userAbout
});

//функция обработчик события submit формы поп-апа редактирования профиля
function saveProfileFormSubmitHandler(formData) {
  api.setUserData(formData.name, formData.about)
    .then((data) => {
      profileUserInfo.setUserInfo(data.name, data.about);  
    }); 
  popupEditProfile.close();  
}

//функция обработчик события submit формы поп-апа добавления карточки
function saveAddCardFormSubmitHandler(formData) {  
  
  //cardList.prependItem(formData);
  api.postNewCard(formData)
  .then((data) => {
    api.getUserData()
      .then((res) => {
        const myID = res._id;
        const cardElement = createCardElement (data, myID);
        cards.prepend(cardElement);        
      });
  })
  .catch((err) => console.log(err));
  
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