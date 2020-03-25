var apiURL = "https://games-world.herokuapp.com";

fetch(apiURL + "/games", {
    method: "GET",
    headers : {
        "Content-Type": "application/x-www-form-urlencoded"
    }
}).then(function(response){
    return response.json();
}).then(function(arrayOfGames){
    console.log("the response ", arrayOfGames);

    var container = document.querySelector('.container');

    // for (var i = 0; i < arrayOfGames.length; i++) {
    //     // console.log(arrayOfGames[i]);
    //     const h1 = document.createElement("h1");
    //     const p = document.createElement("p");
    //     const img = document.createElement("img");

    //     h1.innerHTML = arrayOfGames[i].title;
    //     p.innerHTML = arrayOfGames[i].description;

    //     img.setAttribute("src", arrayOfGames[i].imageUrl);

    //     container.appendChild(h1);
    //     container.appendChild(img);
    //     container.appendChild(p);
    // }

    let gameElements = "";

    for (var i = 0; i < arrayOfGames.length; i++) {
        gameElements += "<h1>" + arrayOfGames[i].title + "</h1>" + 
                        "<img src='" + arrayOfGames[i].imageUrl + "' />" +
                        "<p>" + arrayOfGames[i].description + "</p>" +
                        "<button class='delete-btn' onclick=\"deleteGame('" + arrayOfGames[i]._id + "')\">Delete</button>";
    }

    container.innerHTML = gameElements;
});

function deleteGame(gameID) {
    fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    }).then(function(r){
        return r.text();
    }).then(function(apiResponse){
        console.log(apiResponse);
        location.reload(true);
    });
}

document.querySelector(".submit-Btn").addEventListener("click", function(event){
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

    validateReleaseTimestampElement(gameRelease, "The release date provided is not a valid timestamp!");

    if (gameTitle.value !== "" || gameGenre.value !== "" || gameImageUrl.value !== "" || gameRelease.value !== "") {
        
        const requestParams = {
            title : gameTitle,
            releaseDate : gameRelease,
            genre : gameGenre,
            publisher : gamePublisher,
            imageUrl : gameImageUrl,
            description : gameDescription
        }

        createGameRequest(requestParams);
    }
});

function validateFormElement(inputElement, errorMessage) {
    console.log(inputElement.value);

    if (inputElement.value === "") {
        if (!document.querySelector('[rel="'+ inputElement.id +'"]')) {
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if (document.querySelector('[rel="'+ inputElement.id +'"]')) {
            document.querySelector('[rel="'+ inputElement.id +'"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
}

function validateReleaseTimestampElement(inputElement, errorMessage) {
    if (isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
}

function buildErrorMessage(inputEl, errorMsg) {
    inputEl.classList.add("inputError");
    const errorMsg = document.createElement("span");
    errorMsg.setAttribute("rel", inputEl.id)
    errorMsg.classList.add("errorMsg");
    errorMsg.innerHTML = errorMsg;
    inputEl.after(errorMsg);
}

function createGameRequest(gameObject) {
    fetch(apiURL + "/games", {
        method: "POST",
        headers : {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body : JSON.stringify(gameObject)
    });
}