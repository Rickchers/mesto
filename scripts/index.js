let popup = document.querySelector('.popup');

let closeIcon = popup.querySelector('.popup__close-button');

let form = popup.querySelector('.popup__form');

let profile = document.querySelector('.profile')
let UserName = profile.querySelector('.profile__title');
let UserJob = profile.querySelector('.profile__subtitle');

let formUserNameField = document.getElementById('username');
let formUserJobField = document.getElementById('userjob');

let editProfileButton = profile.querySelector('.profile__edit-button');




function closePopup(){
  popup.classList.remove('popup_opened');
};

function openPopup(){
  popup.classList.add('popup_opened');
  //в этом месте текстовые значения модулей .profile__title и .profile__subtitle
  //записываются в поля формы .popup__form
  formUserNameField.value = UserName.textContent;
  formUserJobField.value = UserJob.textContent;
  
};

function formSubmitHandler(evt){
  evt.preventDefault();
  //здесь в текстовые значения модулей .profile__title и .profile__subtitle
  //записываются значения полей ввода формы, заполненные пользователем
  UserName.textContent = formUserNameField.value;
  UserJob.textContent = formUserJobField.value;
  closePopup();
}

/*eventListeners*/
closeIcon.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);
editProfileButton.addEventListener('click', openPopup);











/*
function closePopupByClickOnOverlay(event) {
  if (event.target !== event.currentTarget) {
    return;
  }  
  closePopup();
}
popup.addEventListener('click', closePopupByClickOnOverlay);
*/