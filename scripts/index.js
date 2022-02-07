window.onload = function(){
  
  let popup = document.querySelector('.popup');
  

  let closeIcon = popup.querySelector('.popup__close-icon');
  closeIcon.addEventListener('click', closePopup);
  
  let form = document.querySelector('.popup__container');
  let formInputs = form.querySelectorAll('.popup__input');
  
  let profile = document.querySelector('.profile')
  let name = profile.querySelector('.profile__title').textContent;
  let job = profile.querySelector('.profile__subtitle').textContent;
  let editProfileButton = profile.querySelector('.profile__edit-button');
  
  editProfileButton.addEventListener('click', togglePopup);
  
  function closePopup(){
    popup.classList.remove('popup_opened');
  };
 
  

  
  function togglePopup(){
    popup.classList.toggle('popup_opened');
    name = profile.querySelector('.profile__title').textContent;
    job = profile.querySelector('.profile__subtitle').textContent;    
    formInputs[0].value = name;
    formInputs[1].value = job;
  };
  
  function formSubmitHandler(evt){
    evt.preventDefault();
    let newNameValue = formInputs[0].value;
    let newJobValue = formInputs[1].value;
    profile.querySelector('.profile__title').textContent = newNameValue;
    profile.querySelector('.profile__subtitle').textContent = newJobValue;

    popup.classList.remove('popup_opened');

  }

  
  form.addEventListener('submit', formSubmitHandler);

  function closePopupByClickOnOverlay(event) {
    if (event.target !== event.currentTarget) {
      return;
    }  
    closePopup();
  }
  
  popup.addEventListener('click', closePopupByClickOnOverlay);

 
};
