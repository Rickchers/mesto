import { Popup } from './Popup.js';
import {popupFigcaption, popupImage} from '../pages/index.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(){
    super.open();
    popupFigcaption.textContent = event.target.closest('.card').querySelector('.card__title').textContent;
    popupImage.src = event.target.closest('.card__image').src;
    popupImage.alt = event.target.closest('.card__image').alt;
  }
  

};

export {PopupWithImage};