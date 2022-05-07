class Section {
  
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element){
    this._container.append(element);
  }

  renderItems(){
    this._renderedItems.forEach((item) => {
      const cardElement = this._renderer(item.name, item.link);
      this.addItem(cardElement);
    });
  }
  
};

export {Section};