//поп-ап с формой
const popup = document.querySelector('.popup');
//поп-ап с картинкой
const popupPreview = document.querySelector('#popup-preview');
//все кнопки закрытия поп-апов
const closeIcon = document.querySelectorAll('.popup__close-button');
//заголовок поп-апа с формой
const popupTitle = popup.querySelector('.popup__title');
//форма поп-апа
const form = popup.querySelector('.popup__form');
//поля формы поп-апа в документе
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
const UserName = profile.querySelector('.profile__title');
//подзаголовок профиля (род занятий пользователя)
const UserJob = profile.querySelector('.profile__subtitle');
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
  addCard(item.name, item.link);
});

//функция добавления карточки на страницу принимает три аргумента:
//первые два это имя карточки и адрес её картинки, третий необязательный
//аргумент определяет ставить карточку в конец или в начало блока
function addCard(cardTitleValue, cardImageLinkValue, setterPrependCard){
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

  cardItem.querySelector('.card__title').textContent = cardTitleValue;
  cardItem.querySelector('.card__image').src = cardImageLinkValue;
  cardItem.querySelector('.card__heart').addEventListener('click', toggleLiked);
  cardItem.querySelector('.card__remove-button').addEventListener('click', removeCard);
  cardItem.querySelector('.card__image').addEventListener('click', preview);

  if (setterPrependCard){
    cards.prepend(cardItem);
  } else {
    cards.append(cardItem);
  }
}

//переключение состояний значка "лайк"
function toggleLiked(event){  
  const itemElement = event.target;
  itemElement.classList.toggle('card__heart_active');
}
//удаление карточки
function removeCard(event){
  const itemElement = event.target.closest('.card');
  itemElement.remove();
}
//закрытие поп-апа
function closePopup(popup){
  popup.classList.toggle('popup_opened');
};
//открытие поп-апа
function openPopup(popup){
  popup.classList.add('popup_opened');  
};
//функция обработчик события submit формы поп-апа редактирования профиля
function formSubmitHandler(event){
  event.preventDefault();  
  //здесь в текстовые значения элементов .profile__title и .profile__subtitle
  //записываются значения полей ввода формы, заполненные пользователем
  UserName.textContent = formUserNameField.value;
  UserJob.textContent = formUserJobField.value;
  form.removeEventListener('submit', formSubmitHandler);  
  closePopup(popup);
}
//функция обработчик события submit формы поп-апа добавления карточки
function formSubmitHandlerAddCard(event){
  event.preventDefault();
  curentInputValue = document.querySelector('#username').value;
  curentInputLinkValue = document.querySelector('#userjob').value;
  addCard(curentInputValue, curentInputLinkValue, true);
  form.removeEventListener('submit', formSubmitHandlerAddCard);
  closePopup(popup);
}
//функция колл-бэк на событие 'click' кнопки "редактировать профиль"
function editProfile(){
  formUserNameField.value = UserName.textContent;
  formUserJobField.value = UserJob.textContent;
  popupTitle.textContent = 'Редактировать профиль';
  form.addEventListener('submit', formSubmitHandler);  
  openPopup(popup);
}
//функция колл-бэк на событие 'click' кнопки "добавить карточку"
function addCardByUser(event){
  formUserNameField.value = '';
  formUserJobField.value = '';
  formUserNameField.placeholder = 'Название';
  formUserJobField.placeholder = 'Ссылка на картинку';
  popupTitle.textContent = 'Новое место';
  form.addEventListener('submit', formSubmitHandlerAddCard);
  openPopup(popup);
}

//создание поп-апа с картинкой
function preview(event){
  popupFigcaption.textContent = event.target.closest('.card').querySelector('.card__title').textContent;
  popupImage.src = event.target.closest('.card__image').src;
  openPopup(popupPreview);
}
//функция обработчик события 'click' на кнопке закрытия поп-апа
//определяет класс родителя кнопки и передает его функции закрытия поп-апа
function getItemClassValue (event) {
  currentPopup = event.target.closest('.popup');
  closePopup(currentPopup);
}

/*eventListeners*/

//методом .forEach() навешивается слушатель событий на все кнопки
//закрытия поп-апов с классом ".popup__close-button"
//функция колл-бэк получает значение класса родительского элемента кнопки,
//на которой произошел клик и передет его функци, которая закрывает поп-ап 
closeIcon.forEach((userItem) => {
  userItem.addEventListener('click', getItemClassValue);
});

//слушатель событий кнопки "редактировать профиль"
editProfileButton.addEventListener('click', editProfile);

//слушатель событий кнопки "добавить карточку"
addCardButton.addEventListener('click', addCardByUser);






/*
function closePopupByClickOnOverlay(event) {
  if (event.target !== event.currentTarget) {
    return;
  }  
  closePopup();
}
popup.addEventListener('click', closePopupByClickOnOverlay);
*/