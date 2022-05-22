import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupSaveButton = this._popup.querySelector('.popup__button');    
  }
  
  setEventListeners(){
    super.setEventListeners();
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.form');
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._popupSaveButton);
    });
  }
  
  _getInputValues(){    
    this._formValues = {};    
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });    
    return this._formValues;    
  }

  close(){
    super.close();
    this.reset();
  }

  reset(){
    this._form.reset();  
  }
};

export {PopupWithForm};