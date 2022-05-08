class Section {
  
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item){
    this._container.append(item);    
  }

  prependItem(item){
    const cardElement = this._renderer(item.name, item.link);
    this._container.prepend(cardElement);
  }

  renderItems(){
    this._renderedItems.forEach((item) => {
      const cardElement = this._renderer(item.name, item.link);
      this.addItem(cardElement);
    });
  }
  
};

export {Section};