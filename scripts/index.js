import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const settingsObject = {
  formSelector: '.form',
  formSectionSelector: '.form__section',
  formSectionErrorClass: 'popup__input_error',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: '.form__input-error',
  errorClass: 'form__input-error_active'
}


const popups = document.querySelectorAll('.popup');
//поп-ап с формой
const popupEditInfo = document.querySelector('#editInfo');

//поп-ап добавление "Добавить карточку"
const popupAddCard = document.querySelector('#addCard');

//форма поп-апа "Добавить карточку"
const formAddCard = popupAddCard.querySelector('#addCardForm')
//поле ввода имени карточки
const cardName = popupAddCard.querySelector('#cardName');
//поле ввода адреса картинки карточки
const cardLink = popupAddCard.querySelector('#cardLink');

//поп-ап с картинкой
const popupPreview = document.querySelector('#popup-preview');
const closeIconPreview = popupPreview.querySelector('.popup__close-button');
//картинка поп-апа
const popupImage = document.querySelector('.popup__image');
//подпись картинки поп-апа
const popupFigcaption = document.querySelector('.popup__figcaption');

//форма поп-апа "Редактировать профиль"
const formEditProfile = popupEditInfo.querySelector('#editInfoForm');

//поля формы поп-апа "Редактировать профиль" в документе
const formUserNameField = document.querySelector('#username');
const formUserJobField = document.querySelector('#userjob');






//секция профиль
const profile = document.querySelector('.profile')
//кнопка добавить карточку
const addCardButton = profile.querySelector('.profile__add-button');
//заголовок профиля (имя пользователя)
const userName = profile.querySelector('.profile__title');
//подзаголовок профиля (род занятий пользователя)
const userJob = profile.querySelector('.profile__subtitle');
//кнопка "редактировать профиль"
const editProfileButton = profile.querySelector('.profile__edit-button');

//узел документа, содержащий карточки
const cards = document.querySelector('.cards');


//массив объектов карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


initialCards.forEach((item) => {
  cards.append(createCardElement(item.name, item.link));
});

//функция создания карточки
function createCardElement (cardTitle, cardImage) {
  const card = new Card(cardTitle, cardImage);
  const cardElement = card.generateCard();
  return cardElement;
}


//сброс полей с ошибками и дизабл кнопки сабмит
function clearErrorMessages (popup) {
  const errorIntputs = popup.querySelectorAll('.form__input-error_active');
  
  errorIntputs.forEach((item) => {
    item.textContent = '';
    item.classList.remove('form__input-error_active');
  });
  const errorInputsBorders = popup.querySelectorAll('.popup__input_error');
  errorInputsBorders.forEach((item) => {
    item.classList.remove('popup__input_error');
  });
  const submitButton = popup.querySelector('.popup__button');
  submitButton.classList.add('popup__button_disabled');
  submitButton.setAttribute('disabled', true);

};



//открытие поп-апа
function openPopup(popup) {
  popup.classList.add('popup_opened');  
  //навесили обработчик событий на документ для закрытия поп-апа нажатием "escape"
  document.addEventListener ('keydown', closeByEscape);
};

//закрытие поп-апа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  //удалили обработчик событий на документ для закрытия поп-апа нажатием "escape"
  document.removeEventListener ('keydown', closeByEscape);
};


//функция обработчик события submit формы поп-апа редактирования профиля
function saveProfileFormSubmitHandler(event) {
  event.preventDefault();
  //здесь в текстовые значения элементов .profile__title и .profile__subtitle
  //записываются значения полей ввода формы, заполненные пользователем
  userName.textContent = formUserNameField.value;
  userJob.textContent = formUserJobField.value;  
  closePopup(popupEditInfo);
}

//функция обработчик события submit формы поп-апа добавления карточки
function saveAddCardFormSubmitHandler(event) {
  event.preventDefault();
  const curentInputValue = cardName.value;
  const curentInputLinkValue = cardLink.value;
  cards.prepend(createCardElement(curentInputValue, curentInputLinkValue));
  closePopup(popupAddCard);
}
//функция колл-бэк на событие 'click' кнопки "редактировать профиль"
function openEditInfoPopup() {
  formUserNameField.value = userName.textContent;
  formUserJobField.value = userJob.textContent;
  clearErrorMessages (popupEditInfo); 
  openPopup(popupEditInfo);
}

//функция колл-бэк на событие 'click' кнопки "добавить карточку"
function openAddCardPopup() {
  cardName.value = '';
  cardLink.value = '';
  const submitButton = popupAddCard.querySelector('.popup__button');
  submitButton.classList.add('popup__button_disabled');
  submitButton.setAttribute('disabled', true);
  clearErrorMessages (popupAddCard);  
  openPopup(popupAddCard);
}




//eventListeners

//слушатель событий кнопки "редактировать профиль"
editProfileButton.addEventListener('click', openEditInfoPopup);

//слушатель событий кнопки "сохранить" модального окна "редактировать профиль"
formEditProfile.addEventListener('submit', saveProfileFormSubmitHandler);


//слушатель событий кнопки "добавить карточку"
addCardButton.addEventListener('click', openAddCardPopup);

//слушатель событий кнопки "сохранить" модального окна "добавить карточку"
formAddCard.addEventListener('submit', saveAddCardFormSubmitHandler);


//обработчик события "escape"
function closeByEscape (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  } else {
    return;
  }
}



popups.forEach((popup) => {
    
    popup.addEventListener('mousedown', (evt) => {
        
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__button-image')) {
          closePopup(popup);
        }
        if (evt.target == evt.currentTarget) {
          closePopup(popup);
        }  
    })
})


const profileValidation = new FormValidator(settingsObject, formEditProfile);
const newCardValidation = new FormValidator(settingsObject, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();  

// const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));

// formList.forEach((item)=>{
//   const formValid = new FormValidator(settingsObject, item);
//   formValid.enableValidation();
// });

export {openPopup, popupPreview, popupFigcaption, popupImage};