//поп-ап с формой
const popup = document.querySelector('#editInfo');
const closeIconEditProfile = popup.querySelector('.popup__close-button');

//поп-ап добавление "Добавить карточку"
const popupAddCard = document.querySelector('#addCard');
const closeIconAddCardPopup = popupAddCard.querySelector('.popup__close-button');
//форма поп-апа "Добавить карточку"
const formAddCard = popupAddCard.querySelector('#addCardForm')
//поле ввода имени карточки
const cardName = popupAddCard.querySelector('#cardName');
//поле ввода адреса картинки карточки
const cardLink = popupAddCard.querySelector('#cardLink');

//поп-ап с картинкой
const popupPreview = document.querySelector('#popup-preview');
const closeIconPreview = popupPreview.querySelector('.popup__close-button');

//форма поп-апа "Редактировать профиль"
const formEditProfile = popup.querySelector('#editInfoForm');




//поля формы поп-апа "Редактировать профиль" в документе
const formUserNameField = document.querySelector('#username');
const formUserJobField = document.querySelector('#userjob');

//картинка поп-апа
const popupImage = document.querySelector('.popup__image');
//подпись картинки поп-апа
const popupFigcaption = document.querySelector('.popup__figcaption');


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


//шаблон карточки
const cardTemplate = document.querySelector('#card').content;
//элемент шаблона карточки
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
//для всех елементов массива применяется функция добавления на страницу
initialCards.forEach((item) => {
  cards.append(createCard(item.name, item.link));
});



//функция создания карточки
function createCard(cardTitleValue, cardImageLinkValue){
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

  cardItem.querySelector('.card__title').textContent = cardTitleValue;
  cardItem.querySelector('.card__image').src = cardImageLinkValue;
  cardItem.querySelector('.card__image').alt = cardTitleValue;
  cardItem.querySelector('.card__heart').addEventListener('click', toggleLiked);
  cardItem.querySelector('.card__remove-button').addEventListener('click', removeCard);
  cardItem.querySelector('.card__image').addEventListener('click', preview);
  return cardItem;
}

//переключение состояний значка "лайк"
function toggleLiked(event) {
  const itemElement = event.target;
  itemElement.classList.toggle('card__heart_active');
}
//удаление карточки
function removeCard(event) {
  const itemElement = event.target.closest('.card');
  itemElement.remove();
}
//закрытие поп-апа
function closePopup() {
  document.querySelector('.popup_opened').classList.remove('popup_opened');
};
//открытие поп-апа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

//функция обработчик события submit формы поп-апа редактирования профиля
function saveProfileFormSubmitHandler(event) {
  event.preventDefault();
  //здесь в текстовые значения элементов .profile__title и .profile__subtitle
  //записываются значения полей ввода формы, заполненные пользователем
  userName.textContent = formUserNameField.value;
  userJob.textContent = formUserJobField.value;  
  closePopup();
}

//функция обработчик события submit формы поп-апа добавления карточки
function saveAddCardFormSubmitHandler(event) {
  event.preventDefault();
  curentInputValue = cardName.value;
  curentInputLinkValue = cardLink.value;
  cards.prepend(createCard(curentInputValue, curentInputLinkValue));
  closePopup(popupAddCard);
}
//функция колл-бэк на событие 'click' кнопки "редактировать профиль"
function openEditInfoPopup() {
  formUserNameField.value = userName.textContent;
  formUserJobField.value = userJob.textContent;
  
  openPopup(popup);
}

//функция колл-бэк на событие 'click' кнопки "добавить карточку"
function openAddCardPopup() {
  cardName.value = '';
  cardLink.value = '';
  openPopup(popupAddCard);
}

//создание поп-апа с картинкой
function preview(event) {
  popupFigcaption.textContent = event.target.closest('.card').querySelector('.card__title').textContent;
  popupImage.src = event.target.closest('.card__image').src;
  popupImage.alt = event.target.closest('.card__image').alt;
  openPopup(popupPreview);
}


//eventListeners

//слушатель событий кнопки "закрыть" модального окна с картинкой
closeIconPreview.addEventListener('click', closePopup);


//слушатель событий кнопки "редактировать профиль"
editProfileButton.addEventListener('click', openEditInfoPopup);
//слушатель событий кнопки "закрыть" модального окна "редактировать профиль"
closeIconEditProfile.addEventListener('click', closePopup);
//слушатель событий кнопки "сохранить" модального окна "редактировать профиль"
formEditProfile.addEventListener('submit', saveProfileFormSubmitHandler);


//слушатель событий кнопки "добавить карточку"
addCardButton.addEventListener('click', openAddCardPopup);
//слушатель событий кнопки "закрыть" модального окна "добавить карточку"
closeIconAddCardPopup.addEventListener('click', closePopup);
//слушатель событий кнопки "сохранить" модального окна "добавить карточку"
formAddCard.addEventListener('submit', saveAddCardFormSubmitHandler);






/*
function closePopupByClickOnOverlay(event) {
  if (event.target !== event.currentTarget) {
    return;
  }  
  closePopup();
}
popup.addEventListener('click', closePopupByClickOnOverlay);
*/