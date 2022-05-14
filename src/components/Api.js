class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getUserData() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers,

    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
    })    
    .catch((err) => {
      console.log(err);
    }) 
  }


  setUserData(name, about) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: 'c6cdad07-f201-4fb1-b931-468bd978f248',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })

    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
    })    
    .catch((err) => {
      console.log(err);
    }) 
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
      method: 'GET',
      headers: {
        authorization: 'c6cdad07-f201-4fb1-b931-468bd978f248'
      },

    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
    })    
    .catch((err) => {
      console.log(err);
    }) 
  }

  postNewCard(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
      method: 'POST',
      headers: {
        authorization: 'c6cdad07-f201-4fb1-b931-468bd978f248',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })

    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
    })    
    .catch((err) => {
      console.log(err);
    }) 
  }


  
}

export { Api };