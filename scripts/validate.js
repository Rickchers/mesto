function showError (formElement, inputElement, errorMessage, settings) {
  
  const errorElement = inputElement
    .closest(settings.formSectionSelector)
    .querySelector(settings.inputErrorClass);


  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideError (formElement, inputElement) {
  const errorElement = inputElement
    .closest(settings.formSectionSelector)
    .querySelector(settings.inputErrorClass);

  errorElement.textContent = '';
}

function checkValidity(formElement, inputElement, settings) {
  const isInputNotValid = !inputElement.validity.valid;
  
    if (isInputNotValid) {

    const errorMessage = inputElement.validationMessage;


    showError(formElement, inputElement, errorMessage, settings);

  } else {

    hideError(formElement, inputElement);
  }

};

function toggleButtonState (inputList, submitButtonElement, settings) {
  const inputElements = Array.from(inputList);
  const hasInvalidInput = inputElements.some((inputElement => {
    return !inputElement.validity.valid;
  }));
  

  if(hasInvalidInput) {
    submitButtonElement.classList.add(settings.inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.classList.remove(settings.inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  }

};

function setEventListeners(formElement, settings) {
  
  const inputList = formElement.querySelectorAll(settings.inputSelector);
  const submitButtonElement = formElement.querySelector(settings.submitButtonSelector);
  
  const inputListIterator = (inputElement) => {
    const handleInput = (event) => {
      checkValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, submitButtonElement, settings);
    };

    inputElement.addEventListener('input', handleInput);
  };

  toggleButtonState(inputList, submitButtonElement, settings);

  inputList.forEach(inputListIterator);
};

const myObject = {
  formSelector: '.form',
  formSectionSelector: '.form__section',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: '.form__input-error',
  errorClass: 'form__input-error_active'
}

function enableValidation (settings) {
  
  
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  const formListIterator = (formElement) => {
    
    const handleFormSubmit = (event) => {
      event.preventDefault();
    };    
    formElement.addEventListener('submit', handleFormSubmit);
    setEventListeners(formElement, settings);

  }

  formList.forEach(formListIterator);
  
};

enableValidation(myObject);