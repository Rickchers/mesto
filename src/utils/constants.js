//объект настроек с селекторами
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

//поп-ап "обновить аватар"
const popupEditAvatar = document.querySelector('#avatar');

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

//форма поп-апа "Обновить аватар"
const formEditAvatar = popupEditAvatar.querySelector('#avatarForm')

//поля формы поп-апа "Редактировать профиль" в документе
const formUserNameField = document.querySelector('#username');
const formUserJobField = document.querySelector('#userjob');

//секция профиль
//=========================================================================
const profile = document.querySelector('.profile')
//кнопка добавить карточку
const addCardButton = profile.querySelector('.profile__add-button');
//заголовок профиля (имя пользователя)
const userName = profile.querySelector('.profile__title');
//подзаголовок профиля (род занятий пользователя)
const userAbout = profile.querySelector('.profile__subtitle');
//кнопка "редактировать профиль"
const editProfileButton = profile.querySelector('.profile__edit-button');
//аватар
const avatar = profile.querySelector('.profile__avatar-wrapper');


//=========================================================================


//узел документа, содержащий карточки
const cards = document.querySelector('.cards');

//элемент счетчика лайков на карточке
const likes = document.querySelector('.card__likes');


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


export {
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
  userAbout,
  editProfileButton,
  cards,
  initialCards,
  likes,
  avatar,
  formEditAvatar
  
};