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
  cards,
  avatar,
  formEditAvatar,
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
    function loadCallback(evt) {
      document.querySelector('.profile').prepend(evt.target);
    }
    const myImg = document.createElement('img');
    myImg.classList.add('profile__avatar');    
    myImg.src = result.avatar;
    myImg.onload = loadCallback;
    
    profileUserInfo.setUserInfo(result.name, result.about);
    
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

//===================================================================================




//функция создания карточки
function createCardElement (data, myID) {
  const card = new Card(data, handleCardClick, handleBusketIconClick, '#card', setLike, unsetLike);
  const cardElement = card.generateCard(myID);  
  return cardElement;
}

//============================

function delSubmitHandler(id, item){  

  api.removeCard(id)
      .then((result) => {
        console.log(result);        
      });

  item.remove();
 
  popupDelCardConfirm.close();
}

function setLike(id, card) {
  api.setLike(id)
    .then((result) => {
      card.querySelector('.card__likes').textContent = result.likes.length;        
    });
}

function unsetLike(id, card) {
  api.unsetLike(id)
    .then((result) => {
      card.querySelector('.card__likes').textContent = result.likes.length;        
    });
}



function handleBusketIconClick(id, item){ 
  popupDelCardConfirm.open(id, item);
}


//============================


//экземпляр поп-ап объекта "Обновление аватара пользователя" класса PopupWithForm 
const popupEditAvatar = new PopupWithForm('#avatar', saveAvatarFormSubmitHandler);

//экземпляр поп-ап объекта "Подтвердить удаление" класса PopupDelCardConfirm
const popupDelCardConfirm = new PopupDelCardConfirm ('#popup-confirm', delSubmitHandler);

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


function renderLoading(isLoading, popup) {
  if (isLoading) {
    popup.textContent = 'Сохранение...';  
  } else {  
    popup.textContent = 'Сохранить';  
  }
}
 

//функция обработчик события submit формы поп-апа редактирования профиля
function saveProfileFormSubmitHandler(formData, popup) {
  
  renderLoading(true, popup);
  
  //поставил таймер чтобы было видно появление надписи "сохранение..."
  setTimeout(showMessage, 1000);

  function showMessage (){

    api.setUserData(formData.name, formData.about)
      .then((data) => {
        profileUserInfo.setUserInfo(data.name, data.about);  
      })
      .catch((err) => {
        (err) => console.log(`Ошибка: ${err}`)
      });
    
    popupEditProfile.close();
    setTimeout(renderLoading, 1000, false, popup);
  }
  

}

//функция обработчик события submit формы поп-апа "Обновление аватара пользователя"
function saveAvatarFormSubmitHandler(formData, popup) {
  renderLoading(true, popup);

  //поставил таймер чтобы было видно появление надписи "сохранение..."
  setTimeout(showMessage, 1000);

  function showMessage (){
    api.setAvatar(formData.link)
      .then((result) => {
        document.querySelector('.profile__avatar').src = result.avatar;
        console.log(result.avatar); 
      }); 
    popupEditAvatar.close();
    setTimeout(renderLoading, 1000, false, popup);
  }    
}

//функция обработчик события submit формы поп-апа добавления карточки
function saveAddCardFormSubmitHandler(formData, popup) {  
  renderLoading(true, popup);

  //поставил таймер чтобы было видно появление надписи "сохранение..."
  setTimeout(showMessage, 1000);

  function showMessage (){
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
    setTimeout(renderLoading, 1000, false, popup);
  }  
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

//функция колл-бэк на событие 'click' кнопки "Обновление аватара пользователя"
function openEditAvatarPopup() { 
  avatarValidation.clearErrorMessages();
  popupEditAvatar.open();
}

//eventListeners
//слушатель событий кнопки "редактировать профиль"
editProfileButton.addEventListener('click', openEditInfoPopup);

//слушатель событий на аватаре
avatar.addEventListener('click', openEditAvatarPopup);

//слушатель событий кнопки "добавить карточку"
addCardButton.addEventListener('click', openAddCardPopup);

const profileValidation = new FormValidator(settingsObject, formEditProfile);
const newCardValidation = new FormValidator(settingsObject, formAddCard);
const avatarValidation = new FormValidator(settingsObject, formEditAvatar);

profileValidation.enableValidation();
newCardValidation.enableValidation();
avatarValidation.enableValidation();














/*
api.getInitialCards()
  .then(cards) => {
    cards.forEach(data => {
      const card = createCardElement(data);
      section.addItem(card);
    })
  }
*/  