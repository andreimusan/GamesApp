const apiServer = new FetchAPI('https://games-app-siit.herokuapp.com');

const gamesFromServer = async () => {
    const arrayOfGames = await apiServer.getGameList();
    for(let i = arrayOfGames.length-1; i >= 0 ; i--) {
        const gameObj = arrayOfGames[i];
        
        //obiect nou creat cu ajutorul functiei contructor din gamesListPosts.js
        const game = new Game(
            gameObj._id,
            gameObj.title,
            gameObj.imageUrl,
            gameObj.description
        )
        
        const postGameInDom = game.displayGame();
        document.querySelector('.container').appendChild(postGameInDom);
       
        document.getElementById(`${game._id}`).addEventListener("click", async () => {
            if (event.target.classList.contains('delete-btn')) {
                const divId = event.target.parentElement.getAttribute('id');
                const gameID = document.getElementById(`${game._id}`);
                const delGame = await apiServer.deleteGame(divId);
                
                if(delGame.succes){
                    removeDeletedElementFromDOM(gameID);
                } else {
                    alert("Could not delete game, something went wrong");
                } 
            } else if (event.target.classList.contains('edit-btn')) {
                createEditForm(event.target.parentElement)                    
        }   
        });
    }
}
gamesFromServer();

const createEditForm = gameContainer => {
    
    if (!gameContainer.querySelector('#updateForm')) {

        if (document.querySelector('#updateForm')) {
            document.querySelector('#updateForm').remove();
        }
        
        const gameTitle = gameContainer.querySelector('h1');
        const gameDescription = gameContainer.querySelector('.description');
        const gameImageURL = gameContainer.querySelector('.imageUrl'); 

        const oldTitle = gameTitle.textContent;
        const oldDescription = gameDescription.textContent;
        const oldImageURL = gameImageURL.src;
      
        const formElement = document.createElement('form');
        formElement.setAttribute('id', 'updateForm'); 
        formElement.classList.add('updateForm');     
        formElement.innerHTML =  `<label for="updatedGameTitle">Title</label>
                                <input type="text" value="${gameTitle.textContent}" name="gameTitle" id="updatedGameTitle" />
                        
                                <label for="updatedGameDescription">Description</label>
                                <textarea name="gameDescription" id="updatedGameDescription">${gameDescription.textContent}</textarea>
                        
                                <label for="updatedGameImageUrl">Image URL</label>
                                <input type="text" value="${gameImageURL.src}" name="gameImageUrl" id="updatedGameImageUrl" />
                                <div>
                                    <button class="updateBtn">Save</button>
                                    <button class="cancelBtn">Cancel</button>
                                </div>`;
        gameContainer.appendChild(formElement); 
        
        gameContainer.querySelector('.cancelBtn').addEventListener('click', () => removeDeletedElementFromDOM(formElement));

        gameContainer.querySelector('.updateBtn').addEventListener('click', () => {
            const updatedGameTitle = document.querySelector('#updatedGameTitle');
            const updatedGameDescription = document.querySelector('#updatedGameDescription');
            const updatedGameImageUrl = document.querySelector('#updatedGameImageUrl');

            const gameContainerElement = event.target.parentElement.parentElement.parentElement;

            const urlencoded = new URLSearchParams();
            urlencoded.append("title", updatedGameTitle.value);
            urlencoded.append("description", updatedGameDescription.value);
            urlencoded.append("imageUrl", updatedGameImageUrl.value);

            if (updatedGameTitle.value !== "" && updatedGameDescription.value !== "" && updatedGameImageUrl.value !== "") {
                
                gameContainerElement.querySelector('h1').innerText = updatedGameTitle.value;
                gameContainerElement.querySelector('.description').innerText = updatedGameDescription.value;
                gameContainerElement.querySelector('.imageUrl').src = updatedGameImageUrl.value;
                removeDeletedElementFromDOM(formElement);
            }
            
            if (updatedGameTitle.value !== oldTitle || updatedGameDescription.value !== oldDescription || updatedGameImageUrl.value !== oldImageURL){
                (async () => {
                    const gameEditor = await apiServer.editGame(gameContainerElement.id, urlencoded);
                    return gameEditor;
                })();
            }
        });
    } else {
        gameContainer.querySelector('#updateForm').remove();
    }

}

const removeDeletedElementFromDOM = domElement => domElement.remove();


document.querySelector(".submitBtn").addEventListener("click", event => { 
    event.preventDefault();

    const createdGame = new GameCreator(document.getElementById("gameTitle"), 
                                        document.getElementById("gameRelease"), 
                                        document.getElementById("gameGenre"), 
                                        document.getElementById("gamePublisher"), 
                                        document.getElementById("gameImageUrl"), 
                                        document.getElementById("gameDescription"));
    
    createdGame.validateFormElement(createdGame.title, "The title is required!");
    createdGame.validateFormElement(createdGame.genre, "The genre is required!");
    createdGame.validateFormElement(createdGame.publisher, "The image URL is required!");
    createdGame.validateFormElement(createdGame.releaseDate, "The release date is required!");

    createdGame.validateReleaseTimestampElement(createdGame.releaseDate, "The release date you provided is not a valid timestamp!");

    if (createdGame.title.value !== "" && createdGame.genre.value !== "" && createdGame.imageUrl.value !== "" && createdGame.releaseDate.value !== "") {
        const urlencoded = new URLSearchParams();
        urlencoded.append("title", createdGame.title.value);
        urlencoded.append("releaseDate", createdGame.releaseDate.value);
        urlencoded.append("genre", createdGame.genre.value);
        urlencoded.append("publisher", createdGame.publisher.value);
        urlencoded.append("imageUrl", createdGame.imageUrl.value);
        urlencoded.append("description", createdGame.description.value);

        displayCreatedGame(urlencoded);

        gameTitle.value = "";
        gameRelease.value = "";
        gameGenre.value = "";
        gamePublisher.value = "";
        gameImageUrl.value = "";
        gameDescription.value = "";
    }
});

const displayCreatedGame = async urlencoded => {
    const request = await apiServer.createGameRequest(urlencoded);
     
    const game = new Game(request._id,
                        request.title,
                        request.imageUrl,
                        request.description)
    
    const addGame = game.displayGame();
    
    const allGamesContainer = document.querySelector('.container');
    allGamesContainer.insertBefore(addGame, allGamesContainer.childNodes[0]);
    
    document.getElementById(`${request._id}`).addEventListener("click", async () => {
        if (event.target.classList.contains('delete-btn')) {
            const divId = event.target.parentElement.getAttribute('id');
            const gameID = document.getElementById(`${game._id}`);
            const delGame = await apiServer.deleteGame(divId);

            if(delGame.succes){
                removeDeletedElementFromDOM(gameID);
            } else {
                alert("Could not delete game, something went wrong");
            } 
        } else if (event.target.classList.contains('edit-btn')) {
                createEditForm(event.target.parentElement)  
        }   
    }); 
}

const reload = async () => {
    const reloadDataBase = document.createElement('button');
    reloadDataBase.setAttribute('class', 'reloadDB');
    reloadDataBase.innerHTML = "Reload DataBase";
    reloadDataBase.style.width = "200px";
    reloadDataBase.style.padding = "10px";
    reloadDataBase.style.cursor = "pointer";
    reloadDataBase.style.backgroundColor = "slategray";
    reloadDataBase.style.color = "white";
    reloadDataBase.style.fontWeight = "bold";
    reloadDataBase.style.border = "none";
    const formForRegen = document.querySelector(".creationForm");
    formForRegen.appendChild(reloadDataBase);

    reloadDataBase.addEventListener('click', () => {

        const alertBox = confirm("Do you really want to reload DataBase ?")
        if (alertBox === true) {   
            (async () => {
                const dbLoader = await apiServer.reloadDB();
                console.log(dbLoader);
                
                return dbLoader;
            })();
        }
    });
}

reload();