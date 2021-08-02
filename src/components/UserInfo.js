export default class UserInfo {
    constructor({userName, userDescription, profileAvatars}) {
        this._userName = document.querySelector(userName)
        this._userDescription = document.querySelector(userDescription)
        this._profileAvatars = document.querySelector(profileAvatars)
        
    }

    getUserInfo() {
        const value = {
            name: this._userName.textContent,
            description: this._userDescription.textContent,
            avatar: this._profileAvatars.src
        }
          return value;
    }

    setUserInfo(value) {
        if (value.name) {
            this._userName.textContent = value.name;
        }
        if (value.about) {
            this._userDescription.textContent = value.about;
        }
        if (value.avatar) {
            console.log(value.avatar)
            this._profileAvatars.src = value.avatar;
        }
    }
}