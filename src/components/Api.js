class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  setLike(id) {
    
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: 'c6cdad07-f201-4fb1-b931-468bd978f248',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  unsetLike(id) {
    
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: 'c6cdad07-f201-4fb1-b931-468bd978f248',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }


  getUserData() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers,

    })
      .then(res => {
        if (res.ok) {
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
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  setAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: 'c6cdad07-f201-4fb1-b931-468bd978f248',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })

    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  removeCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: 'c6cdad07-f201-4fb1-b931-468bd978f248',
        'Content-Type': 'application/json'
      }

    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }


  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: {
        authorization: 'c6cdad07-f201-4fb1-b931-468bd978f248'
      },

    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  postNewCard(data) {
    return fetch(`${this._url}cards`, {
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
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }



}

export { Api };