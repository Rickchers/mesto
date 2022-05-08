class Card {
  constructor(name, image, handleCardClick, templateSelector) {
    this._name = name;
    this._image = image;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
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

  //удаление карточки
  _handleRemoveCard(event) {
    const itemElement = event.target.closest('.card');
    itemElement.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._name;    
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;    
    this._setEventListeners(); 
    return this._element;
  }

  _setEventListeners(){
    this._cardImage.addEventListener('click', this._handleCardClick);
    this._element.querySelector('.card__heart').addEventListener('click', this._handleToggleLiked);
    this._element.querySelector('.card__remove-button').addEventListener('click', this._handleRemoveCard);
  }
};

export {Card};