class UserInfo {
  //Принимает в конструктор объект с селекторами двух элементов:
  //элемента имени пользователя (user) и элемента информации о себе (job)
  constructor({user, job}) {
    this._userName = user;
    this._userJob = job;
  }
  
  getUserInfo(){    
    const userNameValue = this._userName.textContent;
    const userJobValue = this._userJob.textContent;

    //возвращает объект с данными пользователя
    return({userNameValue, userJobValue});    
  }

  setUserInfo(newUserNameValue, newUserJobValue){
    //принимает новые данные пользователя (NewUserNameValue, NewUserJobValue)
    //и добавляет их на страницу
    this._userName.textContent = newUserNameValue;
    this._userJob.textContent = newUserJobValue;
  }
}

export { UserInfo };