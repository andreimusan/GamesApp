(async function() {
    const arrayOfGames = await getGamesList()
    for (var i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i]); 
    }
})()

function createDomElement(gameObj){
    var container1 = document.querySelector('.container');

    const gameELement = document.createElement("div");
    gameELement.setAttribute('id', gameObj._id)
    gameELement.classList.add('gameList');
    gameELement.innerHTML = `<h1 class = "title">${gameObj.title}</h1>
                        <img class="imageUrl" src="${gameObj.imageUrl}" />
                        <p class="description">${gameObj.description}</p> 
                        <button class="delete-btn">Delete Game</button>
                        <button class="edit-btn">Edit Game</button>`;  
                        // <p>Game ID: <strong>${gameObj._id}</strong></p> 
                        
    container1.appendChild(gameELement);
    
    document.getElementById(`${gameObj._id}`).addEventListener("click", function(){
        if (event.target.classList.contains('delete-btn')) {
            (async function() {
                const apiResponse = await deleteGame(gameELement.getAttribute("id"));
                removeDeletedElementFromDOM(gameELement);
            })();
        } else if (event.target.classList.contains('edit-btn')) {
            createUpdateForm(event.target.parentElement);
        }   
    });
}

function createUpdateForm(gameContainer) {
    if (!gameContainer.querySelector('#updateForm')) {

        if (document.querySelector('#updateForm')) {
            document.querySelector('h1').contentEditable = false;
            document.querySelector('.description').contentEditable = false;
            document.querySelector('#updateForm').remove();
        }
        
        const gameTitle = gameContainer.querySelector('h1');
        const gameDescription = gameContainer.querySelector('.description');
        const gameImageURL = gameContainer.querySelector('.imageUrl'); 

        const oldTitle = gameTitle.textContent;
        const oldDescription = gameDescription.textContent;
        const oldImageURL = gameImageURL.src;
      
        var formElement = document.createElement('form');
        formElement.setAttribute('id', 'updateForm');   
        formElement.classList.add('updateForm');     
        formElement.innerHTML =  `<label for="updatedGameImageUrl">Image URL</label>
                                <input type="text" value="${gameImageURL.src}" name="gameImageUrl" id="updatedGameImageUrl" />

                                <div>
                                    <button class="updateBtn">Save</button>
                                    <button class="cancelBtn">Cancel</button>
                                </div>
                                <span>The game details above are now editable. You can change the Title, Description and Image URL.</span>`;
        gameContainer.appendChild(formElement); 

        gameContainer.querySelector('h1').contentEditable = true;
        gameContainer.querySelector('.description').contentEditable = true;
        
        gameContainer.querySelector('.cancelBtn').addEventListener('click', function(){
            gameContainer.querySelector('h1').contentEditable = false;
            gameContainer.querySelector('.description').contentEditable = false;
            removeDeletedElementFromDOM(formElement);
        });

        gameContainer.querySelector('.updateBtn').addEventListener('click', function(){
            event.preventDefault();

            gameContainer.querySelector('h1').contentEditable = false;
            gameContainer.querySelector('.description').contentEditable = false;

            const updatedGameImageUrl = document.querySelector('#updatedGameImageUrl');

            var urlencoded = new URLSearchParams();
            urlencoded.append("title", gameTitle.textContent);
            urlencoded.append("description", gameDescription.textContent);
            urlencoded.append("imageUrl", updatedGameImageUrl.value);

            if(updatedGameImageUrl.value !== "") {
                
                gameContainer.querySelector('.imageUrl').src = updatedGameImageUrl.value;
                removeDeletedElementFromDOM(formElement);
            }  
            
            if(gameTitle.textContent !== oldTitle || gameDescription.textContent !== oldDescription || updatedGameImageUrl.value !== oldImageURL){
                (async function() {
                    const editGameResponse = await editGame(gameContainer.id, urlencoded);
                    return editGameResponse
                })();
            }
        });
    } else {
        document.querySelector('h1').contentEditable = false;
        document.querySelector('.description').contentEditable = false;
        gameContainer.querySelector('#updateForm').remove();
    }
}

function removeDeletedElementFromDOM(domElement){
    domElement.remove();
}

function validateFormElement(inputElement, errorMessage){
    if (inputElement.value === "") {
        if (!document.querySelector('[rel="' + inputElement.id + '"]')){
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if (document.querySelector('[rel="' + inputElement.id + '"]')){
            // console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
}

function validateReleaseTimestampElement(inputElement, errorMessage){
    if (isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
}

function buildErrorMessage(inputEl, errosMsg){
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
}

document.querySelector(".submitBtn").addEventListener("click", function(event){
    event.preventDefault();

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");

    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");

    if (gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
        var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);

        (async function() {
            const request = await createGameRequest(urlencoded);
            return createDomElement(request);
        })();
    }

    gameTitle.value = "";
    gameRelease.value = "";
    gameGenre.value = "";
    gamePublisher.value = "";
    gameImageUrl.value = "";
    gameDescription.value = "";
})

//probabil ca nu e o practica buna dar ne-am jucat putin
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

reloadDataBase.addEventListener('click', function() {

    const alertBox = confirm("Do you really want to reload DataBase ?")
    if (alertBox === true) {
        (async function(){
            const reloadDB = await reloadData()
            return reloadDB;
        })();
    }
})