export class UserInfo {
    constructor({ nameSelector, titleSelector }) {
      this._nameElement = document.querySelector('#editName');
      this._titleElement = document.querySelector('#editText');
    }
  
    getUserInfo() {
      return {
        name: this._nameElement.textContent,
        title: this._titleElement.textContent,
      };
    }
  
    setUserInfo({ name, title }) {
      this._nameElement.textContent = name;
      this._titleElement.textContent = title;
    }
  }