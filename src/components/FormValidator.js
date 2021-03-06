class FormValidator {
  constructor (settings,formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._submitButtonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    this._inputList = this._formElement.querySelectorAll(this._settings.inputSelector);
  }

  _disableButton (button) {
    button.classList.add(this._settings.inactiveButtonClass);
    button.setAttribute('disabled', true);
  }
  
  clearErrorMessages () {
    this._inputList.forEach((item) => {
      this._hideError(item);
    });    
    this._disableButton(this._submitButtonElement);
  }

  _showError (inputElement, errorMessage) {  
    const errorElement = inputElement
      .closest(this._settings.formSectionSelector)
      .querySelector(this._settings.inputErrorClass);
    inputElement.classList.add(this._settings.formSectionErrorClass);  
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }
  
  _hideError (inputElement) {
    const errorElement = inputElement
      .closest(this._settings.formSectionSelector)
      .querySelector(this._settings.inputErrorClass);      
    inputElement.classList.remove(this._settings.formSectionErrorClass);
    errorElement.textContent = '';
  }

  _checkValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;    
      if (isInputNotValid) {  
      const errorMessage = inputElement.validationMessage;  
      this._showError(inputElement, errorMessage);  
    } else {  
      this._hideError(inputElement);
    }
  
  };

  _toggleButtonState () {
    const inputElements = Array.from(this._inputList);
    const hasInvalidInput = inputElements.some((inputElement => {
      return !inputElement.validity.valid;
    }));
    
  
    if(hasInvalidInput) {
      this._disableButton(this._submitButtonElement);
    } else {
      this._submitButtonElement.classList.remove(this._settings.inactiveButtonClass);
      this._submitButtonElement.removeAttribute('disabled');
    }
  
  };

  _setEventListeners() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

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