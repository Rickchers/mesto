class Section {
 
  constructor (renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  addItem(item){
    this._container.append(item);    
  }

  
  prependItem(data, ID){
    const cardElement = this._renderer(data, ID);
    this._container.prepend(cardElement);
  } 

  
  renderItems(items, ID){
    items.forEach((data) => {
      const cardElement = this._renderer(data, ID);      
      this.addItem(cardElement);
    });
  }

  
};

export {Section};