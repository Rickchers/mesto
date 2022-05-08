import { Popup } from './Popup.js';


class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupFigcaption = document.querySelector('.popup__figcaption');
    this._popupImage = document.querySelector('.popup__image');
  }

  open(name, link, alt){
    super.open();
    this._popupFigcaption.textContent = name;
    this._popupImage.src = link;    
    this._popupImage.alt = alt;
  }
};

export {PopupWithImage};