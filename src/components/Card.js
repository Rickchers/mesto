class Card {
  constructor(data, handleCardClick, templateSelector) {
    this._name = data.name;
    this._image = data.link;

    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._likes = data.likes;    
    
    this._owner = data.owner;

    
    
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

  generateCard(myID) {
     
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._name;    
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;    
    this._setEventListeners();



    //console.log(this._owner._id);
    
    
    
    if (this._owner._id !== myID){
      this._element.querySelector('.card__remove-button').remove();
    }
    
    this._element.querySelector('.likes').textContent = (this._likes).length; 
    return this._element;
  }

  _setEventListeners(){
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._image)
    });

    this._element.querySelector('.card__heart').addEventListener('click', this._handleToggleLiked);
    this._element.querySelector('.card__remove-button').addEventListener('click', this._handleRemoveCard);
  }
};

export {Card};