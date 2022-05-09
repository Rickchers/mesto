import { Popup } from './Popup.js';


class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
    this._popupImage = this._popup.querySelector('.popup__image');
  }

  open(name, link){
    super.open();
    this._popupFigcaption.textContent = name;
    this._popupImage.src = link;
  }
};

export {PopupWithImage};