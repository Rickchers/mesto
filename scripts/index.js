let popup = document.querySelector('.popup');

let closeIcon = popup.querySelector('.popup__close-button');

let form = popup.querySelector('.popup__form');

let profile = document.querySelector('.profile')
let UserName = profile.querySelector('.profile__title');
let UserJob = profile.querySelector('.profile__subtitle');

let formUserNameField = document.getElementsByName('username');
let formUserJobField = document.getElementsByName('userjob');

let editProfileButton = profile.querySelector('.profile__edit-button');

//в этом месте текстовые значения модулей .profile__title и .profile__subtitle
//записываются в поля формы .popup__form
formUserNameField[0].value = UserName.textContent;
formUserJobField[0].value = UserJob.textContent;



function closePopup(){
  popup.classList.remove('popup_opened');
};

function togglePopup(){
  popup.classList.toggle('popup_opened');
};

function formSubmitHandler(evt){
  evt.preventDefault();
  //здесь в текстовые значения модулей .profile__title и .profile__subtitle
  //записываются значения полей ввода формы, заполненные пользователем
  UserName.textContent = formUserNameField[0].value;
  UserJob.textContent = formUserJobField[0].value;
  closePopup();
}

/*eventListeners*/
closeIcon.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);
editProfileButton.addEventListener('click', togglePopup);











/*
function closePopupByClickOnOverlay(event) {
  if (event.target !== event.currentTarget) {
    return;
  }  
  closePopup();
}
popup.addEventListener('click', closePopupByClickOnOverlay);
*/