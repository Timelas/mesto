export default class UserInfo {
    constructor({ userName, userDescription }) {
        this._userName = document.querySelector(userName)
        this._userDescription = document.querySelector(userDescription)
    }

    getUserInfo() {
        const value = {
            name: this._userName.textContent,
            description: this._userDescription.textContent
        }
          return value;
    }

    setUserInfo(value) {
        this._userName.textContent = value.name;
        this._userDescription.textContent = value.subheading;
    }
}