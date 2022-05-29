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


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-40/',
    headers: {
      authorization: 'c6cdad07-f201-4fb1-b931-468bd978f248',
      'Content-Type': 'application/json'
    }
  }
);


//единственный экземпляр класса Section
const cardList = new Section(createCardElement, '.cards');

Promise.all([api.getUserData(), api.getCards()])
 
  .then(([apiUserData, apiCards]) => {
    //устанавливаем данные пользователя   
    profileUserInfo.setUserInfo(apiUserData.name, apiUserData.about);
    profileUserInfo.setUserID(apiUserData._id);
    profileUserInfo.setUserAvatar(apiUserData.avatar);
    
    //отрисовка карточек    
    cardList.renderItems(apiCards, apiUserData._id);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  });


//функция создания карточки
function createCardElement (data, myID) {
  const card = new Card(data, handleCardClick, handleBusketIconClick, '#card', handleLike, myID);
  const cardElement = card.generateCard(myID);  
  return cardElement;
}

function handleDelSubmit(id, item){  

  api.removeCard(id)
      .then((result) => {
        console.log(result);
        item.remove();        
        popupDelCardConfirm.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });

  
 
}

function handleBusketIconClick(id, item){ 
  popupDelCardConfirm.open(id, item);
}

function handleLike(card) {
  api.changeLikeCardStatus(card.getId(), !card.isLiked())
    .then((res) => {
      //console.log('пришел ответ');
      card.updateLikes(res)
    })
    .catch((err) => {
      console.log(err);
    });
}



//экземпляр поп-ап объекта "Обновление аватара пользователя" класса PopupWithForm 
const popupEditAvatar = new PopupWithForm('#avatar', handleAvatarFormSubmit);

//экземпляр поп-ап объекта "Подтвердить удаление" класса PopupDelCardConfirm
const popupDelCardConfirm = new PopupDelCardConfirm ('#popup-confirm', handleDelSubmit);

//экземпляр поп-ап объекта "Редактировать профиль" класса PopupWithForm 
const popupEditProfile = new PopupWithForm('#editInfo', handleProfileFormSubmit);

//экземпляр поп-ап объекта "Добавить карточку" класса PopupWithForm 
const popupAddProfile = new PopupWithForm('#addCard', handleAddCardFormSubmit);

//экземпляр объекта "Поп-ап с картинкой" класса PopupWithImage 
const myPopupWithImage = new PopupWithImage('#popup-preview');

//экземпляр класса UserInfo 
const profileUserInfo = new UserInfo ({
  user: userName,
  job: userAbout
}, '.profile__avatar');


function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...';  
  } else {  
    button.textContent = 'Сохранить';  
  }
}
 

//функция обработчик события submit формы поп-апа редактирования профиля
function handleProfileFormSubmit(formData, button) {
  
  renderLoading(true, button); 

  api.setUserData(formData.name, formData.about)
    .then((data) => {
      profileUserInfo.setUserInfo(data.name, data.about);
      //profileUserInfo.setUserID(data._id);
      popupEditProfile.close();  
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(()=>{setTimeout(renderLoading, 1000, false, button)});  

}

//функция обработчик события submit формы поп-апа "Обновление аватара пользователя"
function handleAvatarFormSubmit(formData, button) {
  renderLoading(true, button);


  
  api.setAvatar(formData.link)
    .then((result) => {
      profileUserInfo.setUserAvatar(result.avatar);
      
      console.log(result.avatar); 
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(()=>{setTimeout(renderLoading, 1000, false, button)});
      
}

//функция обработчик события submit формы поп-апа добавления карточки
function handleAddCardFormSubmit(formData, button) {  
  renderLoading(true, button);
  
  api.postNewCard(formData)
  .then((data) => {
    const myID = profileUserInfo.getUserID();
    cardList.prependItem(data, myID);
           
    popupAddProfile.close();
  })
  .catch((err) => console.log(err))
  .finally(()=>{setTimeout(renderLoading, 1000, false, button)});
    
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