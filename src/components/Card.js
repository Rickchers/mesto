class Card {
  constructor(data, handleCardClick, handleBusketIconClick, templateSelector, setLike, unsetLike) {
    this._isLiked = false;

    this._data = data;

    this._name = data.name;
    this._image = data.link;

    this._handleCardClick = handleCardClick;
    this._handleBusketIconClick = handleBusketIconClick;

    this._templateSelector = templateSelector;
    this._likes = data.likes;    
    
    this._owner = data.owner;
    this._id = data._id;

    this._setLike = setLike;
    this._unsetLike = unsetLike;
    
  }

  _like() {
    this._isLiked = !this._isLiked;
  }

   _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  //переключение значений свойств likes в объекте api
  _toggleStateLiked() {
      if(this._isLiked) {
      this._like();
      this._unsetLike(this._id, this._element);      
    } else if (!this._isLiked) {
      this._like();
      this._setLike(this._id, this._element);
    }
    this._toggleSignLiked();
  }


  //переключение состояний значка "лайк"
  _toggleSignLiked() {    
    this._element.querySelector('.card__heart').classList.toggle('card__heart_active');
  }


  //удаление карточки
  _handleRemoveCard() {
    this._handleBusketIconClick(this._id, this._element);      
  }



  generateCard(myID) {
    this._element = this._getTemplate();

    //если я поставил лайк на карточке, то значек на ней отображается активным
    this._likes.forEach(data => {
      if (data._id == myID) {
        this._like();
        this._toggleSignLiked();
      }
    });

    
    this._element.querySelector('.card__title').textContent = this._name;    
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._image;
    this._element.querySelector('.card__likes').textContent = (this._likes).length;
    this._cardImage.alt = this._id;

    this._setEventListeners();    
    
    //если карточка моя, то отображается иконка "удалить карточку"
    if (this._owner._id !== myID){
      this._element.querySelector('.card__remove-button').remove();
    }
    
    return this._element;
  }

  _setEventListeners(){
    this._cardImage.addEventListener('click', () => {this._handleCardClick(this._name, this._image)});
    this._element.querySelector('.card__heart').addEventListener('click', () => {this._toggleStateLiked()});    
    this._element.querySelector('.card__remove-button').addEventListener('click', () => {this._handleRemoveCard()});
  }
};

export {Card};