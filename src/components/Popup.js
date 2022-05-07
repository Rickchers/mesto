class Popup {
  
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open(){    
    this._popup.classList.add('popup_opened');
    document.addEventListener ('keydown', this._handleEscClose.bind(this));
    this.setEventListeners();
  }

  close(){   
    this._popup.classList.remove('popup_opened');
    document.removeEventListener ('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(event){
    
    if (event.key === 'Escape') {
      
      this.close();
    } else {
      return;
    }
    
  }

  setEventListeners(){
    this._popup.addEventListener('mousedown', (evt) => {
        
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__button-image')) {
        this.close();
      }
      if (evt.target == evt.currentTarget) {
        this.close();
      }  
  })
  }


  
};

export {Popup};
