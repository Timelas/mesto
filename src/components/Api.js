class Api {
    constructor(options) {
      // тело конструктора
    }
  
    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-26/cards', {
            headers: {
              authorization: '60bdf67c-096f-4da4-8c27-4a10609300f8'
            }
          })
            .then(res => res.json())
    }
  
    // другие методы работы с API
  }