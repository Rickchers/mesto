import {preview, toggleLiked, removeCard} from './index.js';

class Card {
  constructor(name, image) {
    this._name = name;
    this._image = image;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('#card')
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._name;
    
    this._element.addEventListener('click', preview);
    this._element.querySelector('.card__heart').addEventListener('click', toggleLiked);
    this._element.querySelector('.card__remove-button').addEventListener('click', removeCard);

    return this._element;
  }

};

export {Card};