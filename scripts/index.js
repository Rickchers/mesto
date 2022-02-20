let popup = document.querySelector('.popup');

let closeIcon = popup.querySelector('.popup__close-button');
let popupTitle = popup.querySelector('.popup__title');

let addCardButton = document.querySelector('.profile__add-button');

let form = popup.querySelector('.popup__form');

let profile = document.querySelector('.profile')
let UserName = profile.querySelector('.profile__title');
let UserJob = profile.querySelector('.profile__subtitle');

let formUserNameField = document.getElementById('username');
let formUserJobField = document.getElementById('userjob');

let editProfileButton = profile.querySelector('.profile__edit-button');

//========================================================================================
//в этой части кода создаются карточки
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');

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
  addCard(item.name, item.link);
});

function addCard(cardTitleValue, cardImageLinkValue){
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

  cardItem.querySelector('.card__title').textContent = cardTitleValue;
  cardItem.querySelector('.card__image').src = cardImageLinkValue;
  cardItem.querySelector('.card__heart').addEventListener('click', toggleLiked);
  cardItem.querySelector('.card__remove-button').addEventListener('click', removeCard);

  cards.append(cardItem);
}

function toggleLiked(event){  
  const itemElement = event.target;
  itemElement.classList.toggle('card__heart_active');
}

function removeCard(event){
  const itemElement = event.target.closest('.card');
  itemElement.remove();
}

//=============================================================================================
function closePopup(){
  popup.classList.toggle('popup_opened');
};

function openPopup(){
  popup.classList.add('popup_opened');  
};

function formSubmitHandler(evt){
  evt.preventDefault();
  //здесь в текстовые значения модулей .profile__title и .profile__subtitle
  //записываются значения полей ввода формы, заполненные пользователем
  UserName.textContent = formUserNameField.value;
  UserJob.textContent = formUserJobField.value;

  closePopup();
}

function formSubmitHandlerAddCard(evt){
  evt.preventDefault();
  addCard('Архыз', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg');
  closePopup();
}

/*eventListeners*/

closeIcon.addEventListener('click', closePopup);


editProfileButton.addEventListener('click', editProfile);
addCardButton.addEventListener('click', addCardByUser);



function editProfile(){
  formUserNameField.value = UserName.textContent;
  formUserJobField.value = UserJob.textContent;
  popupTitle.textContent = 'Редактировать профиль';
  form.addEventListener('submit', formSubmitHandler);
  openPopup();
}

function addCardByUser(){
  formUserNameField.value = '';
  formUserJobField.value = '';
  formUserNameField.placeholder = 'Название';
  formUserJobField.placeholder = 'Ссылка на картинку';
  popupTitle.textContent = 'Новое место';
  form.addEventListener('submit', formSubmitHandlerAddCard);
  openPopup();
}






/*
function closePopupByClickOnOverlay(event) {
  if (event.target !== event.currentTarget) {
    return;
  }  
  closePopup();
}
popup.addEventListener('click', closePopupByClickOnOverlay);
*/