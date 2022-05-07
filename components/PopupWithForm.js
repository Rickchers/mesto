import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }
  
  setEventListeners(){
    super.setEventListeners();

    this._popup.querySelector('.form').addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      //this._popup.reset();
    });
  }
  
  _getInputValues(){
    this._inputList = this._popup.querySelectorAll('.popup__input');
    
    this._formValues = {};
    
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    
    return this._formValues;
      
    
  }



};

export {PopupWithForm};