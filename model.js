var apiURL = "https://games-world.herokuapp.com";

function getGamesList(callbackFunction){
    fetch(apiURL + "/games", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
       // console.log("request response ", response);
        
        return response.json();
    }).then(function(arrayOfGames){
        //console.log('raspuns la request :', arrayOfGames);
        
        callbackFunction(arrayOfGames);
    });
}

function deleteGame(gameID, callbackFunction) {
    fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    }).then(function(r){
        return r.text();
    }).then(function(apiresponse){
        callbackFunction(apiresponse);
    });

}

function createGameRequest(gameObject, callbackCreateGame){
    fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObject
    }).then(function(response){
        return response.json();
    }).then(function(createdGame){
       // console.log(createdGame);
        callbackCreateGame(createdGame);
    });
}

function reloadData() {
    fetch(apiURL + "/regenerate-games", {
        method: "GET",
        headers: {
            'Content-Type' : "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        return response.text();
    }).then(function(regenerateGame){
    })
}

function editGame(id, updatedGameObject, callback){
  console.log(id)
  console.log(gameObject1)
    fetch(`${apiURL}/games/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type' : "application/x-www-form-urlencoded"
        },
        body: updatedGameObject
    }).then(function(response){
        return response.text();
    }).then(function(editGameResponse) {
       callback(editGameResponse)  
    })
}








// "application/json"
// {"cheie": "valoare", "cheie2": "valoare2"}

//application/x-www-form-urlencoded
// cheie=valoare&cheie2=valoare