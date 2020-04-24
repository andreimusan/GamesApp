// functia constructor pentru un joc creat de utilizator
function createGameForm(title, releaseDate, genre, publisher, imageUrl, description) {
    this.title = title;
    this.releaseDate = releaseDate;
    this.genre = genre;
    this.publisher = publisher;
    this.imageUrl = imageUrl;
    this.description = description;
}

createGameForm.prototype.validateFormElement = function(inputElement, errorMessage) {
    if (inputElement.value === "") {
        if (!document.querySelector('[rel="' + inputElement.id + '"]')){
            this.buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if (document.querySelector('[rel="' + inputElement.id + '"]')){
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    } 
}

createGameForm.prototype.validateReleaseTimestampElement = function (inputElement, errorMessage){
    if (isNaN(inputElement.value) && inputElement.value !== "") {
        this.buildErrorMessage(inputElement, errorMessage);
    }
}

createGameForm.prototype.buildErrorMessage = function (inputEl, errosMsg){
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
}

createGameForm.prototype.displayCreatedGame = function(request) {
    const divContainer = document.createElement('div');
    divContainer.setAttribute('id', `${request._id}`);
    divContainer.setAttribute('class', 'divContainer');
    divContainer.innerHTML = `
                <h1>${request.title}</h1>
                <p><strong>GAME ID: '${request._id}'</strong></p>
                <img class='imageUrl' src='${request.imageUrl}'>
                <p class='description'>${request.description}</p> 
                <button class="delete-btn">Delete Game</button>
                <button class="editBtn">Edit Game</button>       
    `;

    return divContainer;
}
