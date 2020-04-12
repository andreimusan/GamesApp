getGamesList(function(arrayOfGames){
    for (var i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i]);
        
    }  
});

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
                deleteGame(gameELement.getAttribute("id"), function(apiResponse){
                    console.log('apiResponse ',apiResponse);
                    removeDeletedElementFromDOM(gameELement);
                });
        } else if (event.target.classList.contains('edit-btn')) {
                createUpdateForm(event.target.parentElement);
        }   
    });
}

function createUpdateForm(gameContainer) {
    if (!gameContainer.querySelector('#updateForm')) {

        if (document.querySelector('#updateForm')) {
            document.querySelector('#updateForm').remove();
        }
        
        const gameTitle = gameContainer.querySelector('h1');
        const gameDescription = gameContainer.querySelector('.description');
        const gameImageURL = gameContainer.querySelector('.imageUrl'); 
      
        var formElement = document.createElement('form');
        formElement.setAttribute('id', 'updateForm');   
        formElement.classList.add('updateForm');     
        formElement.innerHTML =  `<label for="updatedGameTitle">Title</label>
                                <input type="text" value="${gameTitle.innerText}" name="gameTitle" id="updatedGameTitle" />
                        
                                <label for="updatedGameDescription">Description</label>
                                <textarea name="gameDescription" id="updatedGameDescription">${gameDescription.textContent}</textarea>
                        
                                <label for="updatedGameImageUrl">Image URL</label>
                                <input type="text" value="${gameImageURL.src}" name="gameImageUrl" id="updatedGameImageUrl" />

                                <div>
                                    <button class="updateBtn">Save</button>
                                    <button class="cancelBtn">Cancel</button>
                                </div>`;
        gameContainer.appendChild(formElement); 
        
        gameContainer.querySelector('.cancelBtn').addEventListener('click', function(){
            removeDeletedElementFromDOM(formElement);
        });

        gameContainer.querySelector('.updateBtn').addEventListener('click', function(){
            event.preventDefault();
            const updatedGameTitle = document.querySelector('#updatedGameTitle');
            const updatedGameDescription = document.querySelector('#updatedGameDescription');
            const updatedGameImageUrl = document.querySelector('#updatedGameImageUrl');

            var urlencoded = new URLSearchParams();
            urlencoded.append("title", updatedGameTitle.value);
            urlencoded.append("description", updatedGameDescription.value);
            urlencoded.append("imageUrl", updatedGameImageUrl.value);

            if(updatedGameTitle.value !== "" && updatedGameDescription.value !== "" && updatedGameDescription.value !== "") {
                
                gameContainer.querySelector('h1').innerText = updatedGameTitle.value;
                gameContainer.querySelector('.description').innerText = updatedGameDescription.value;
                gameContainer.querySelector('.imageUrl').src = updatedGameImageUrl.value;
                removeDeletedElementFromDOM(formElement);
            }  
            
            if(updatedGameTitle.value !== gameTitle.value && updatedGameDescription.value !== gameDescription.value && updatedGameImageUrl.value !== gameImageURL.value){
                editGame(gameContainer.id, urlencoded, function(editGameResponse){
                    console.log('Raspuns callback PUT ',editGameResponse);                   
                })
            }
        });
    } else {
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

        createGameRequest(urlencoded, createDomElement);
    }
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
        reloadData()
    }
})