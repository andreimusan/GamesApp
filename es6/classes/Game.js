// functia contructor
class Game {
    constructor(id, title, imageUrl, description) {
        this._id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    displayGame () {
        const gameContainer = document.createElement('div');
        gameContainer.setAttribute('id', `${this._id}`);
        gameContainer.classList.add('gameList');
        gameContainer.innerHTML = `<h1 class = "title">${this.title}</h1>
                                <img class="imageUrl" src="${this.imageUrl}" />
                                <p class="description">${this.description}</p> 
                                <button class="delete-btn">Delete Game</button>
                                <button class="edit-btn">Edit Game</button>`;
        return gameContainer;
    }
}