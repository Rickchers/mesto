class Section {

  /*
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  
  
  addItem(item){
    const card = this._renderer(item); 
    this._container.append(card);    
  }
  */

  
  
 
  constructor({ items, renderer }, api, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._api = api;
  }

  addItem(item){
    this._container.append(item);    
  }

  
  // prependItem(item){
  //   const cardElement = this._renderer(item.name, item.link);
  //   this._container.prepend(cardElement);
  // }
  

  renderItems(){
    this._api
      .getUserData()
      .then((res) => {
        //console.log(res._id)
        
        this._renderedItems.forEach((data) => {
          
          const myID = res._id;
          const cardElement = this._renderer(data, myID);      
          this.addItem(cardElement);
        });
      
      });

  }

  
};

export {Section};