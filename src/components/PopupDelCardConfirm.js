import { Popup } from './Popup.js';

class PopupDelCardConfirm extends Popup {
  constructor(popupSelector, delSubmitHandler) {
    super(popupSelector);
    this._delSubmitHandler= delSubmitHandler;
        
  }

  open(id, item){    
    super.open();
    this._id = id;
    this._item = item;
    
  }
  
  setEventListeners(){
    super.setEventListeners();
    this._form = this._popup.querySelector('.form');

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      //console.log(this._id, this._item);
      this._delSubmitHandler(this._id, this._item);      
    });
  }
  
};

export {PopupDelCardConfirm};