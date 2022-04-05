

class FormValidator {
  constructor (settings,formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._submitButtonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    this._inputList = this._formElement.querySelectorAll(this._settings.inputSelector);
  }
  


  _showError (/*formElement, */inputElement, errorMessage) {
  
    const errorElement = inputElement
      .closest(this._settings.formSectionSelector)
      .querySelector(this._settings.inputErrorClass);
    inputElement.closest(this._settings.formSectionSelector).querySelector(this._settings.inputSelector).classList.add(this._settings.formSectionErrorClass);
  
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }
  
  _hideError (/*formElement, */inputElement) {
    const errorElement = inputElement
      .closest(this._settings.formSectionSelector)
      .querySelector(this._settings.inputErrorClass);
      inputElement.closest(this._settings.formSectionSelector).querySelector(this._settings.inputSelector).classList.remove(this._settings.formSectionErrorClass);
    errorElement.textContent = '';
  }

  _checkValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    
      if (isInputNotValid) {
  
      const errorMessage = inputElement.validationMessage;
  
  
      this._showError(/*this._formElement, */inputElement, errorMessage);
  
    } else {
  
      this._hideError(/*this._formElement, */inputElement);
    }
  
  };

  _toggleButtonState () {
    const inputElements = Array.from(this._inputList);
    const hasInvalidInput = inputElements.some((inputElement => {
      return !inputElement.validity.valid;
    }));
    
  
    if(hasInvalidInput) {
      this._submitButtonElement.classList.add(this._settings.inactiveButtonClass);
      this._submitButtonElement.setAttribute('disabled', true);
    } else {
      this._submitButtonElement.classList.remove(this._settings.inactiveButtonClass);
      this._submitButtonElement.removeAttribute('disabled');
    }
  
  };

  _setEventListeners() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    
    //const inputList = this._formElement.querySelectorAll(this._settings.inputSelector);
    //const submitButtonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    
    const inputListIterator = (inputElement) => {
      const handleInput = (event) => {
        this._checkValidity(inputElement);
        this._toggleButtonState();
      };
  
      inputElement.addEventListener('input', handleInput);
    };
  
    this._toggleButtonState();
  
    this._inputList.forEach(inputListIterator); 
    
  }

  enableValidation () {
    this._setEventListeners();    
  }

}

export {FormValidator};