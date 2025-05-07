export class UserInfo {
  constructor({
    nameSelector,
    titleSelector,
    imageSelector,
    imageUrlSelector,
  }) {
    this._nameElement = document.querySelector(nameSelector);
    this._titleElement = document.querySelector(titleSelector);
    this._imageElement = document.querySelector(imageSelector);
    this._imageUrlInput = document.querySelector(imageUrlSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement?.textContent || "",
      title: this._titleElement?.textContent || "",
      imageTitle: this._imageElement?.textContent || "",
      imageUrl: this._imageUrlInput?.value || "",
    };
  }

  setUserInfo({ name, title, imageTitle, imageUrl }) {
    if (name) this._nameElement.textContent = name;
    if (title) this._titleElement.textContent = title;
    if (imageTitle) this._imageElement.textContent = imageTitle;
    if (imageUrl) this._imageUrlInput.value = imageUrl;
  }
}
