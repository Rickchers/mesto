import {/*openPopup, */popupPreview, popupFigcaption, popupImage} from '../pages/index.js';

class Card {
  constructor(name, image, handleCardClick) {
    this._name = name;
    this._image = image;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('#card')
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  //переключение состояний значка "лайк"
  _handleToggleLiked(event) {
    const itemElement = event.target;
    itemElement.classList.toggle('card__heart_active');
  }
  /*
  //создание поп-апа с картинкой
  _handlePreview(event) {
    popupFigcaption.textContent = event.target.closest('.card').querySelector('.card__title').textContent;
    popupImage.src = event.target.closest('.card__image').src;
    popupImage.alt = event.target.closest('.card__image').alt;
    openPopup(popupPreview);
  }
  */
  //удаление карточки
  _handleRemoveCard(event) {
    const itemElement = event.target.closest('.card');
    itemElement.remove();
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__title').textContent = this._name;
    
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._image;
    cardImage.alt = this._name;
    //cardImage.addEventListener('click', this._handlePreview);
    cardImage.addEventListener('click', this._handleCardClick);

    this._element.querySelector('.card__heart').addEventListener('click', this._handleToggleLiked);
    this._element.querySelector('.card__remove-button').addEventListener('click', this._handleRemoveCard);

    return this._element;
  }

};

export {Card};