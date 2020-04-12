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


/*function updateGameRequest(updatedGameObj, callbackCreateGame){
    fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObject
    }).then(function(response){
        return response.json();
    }).then(function(updatedGame){
        //console.log(updatedGame);
        callbackCreateGame(updatedGame);
    });
}*/

/*function reloadData(callback) {
    fetch(apiURL + "/regenerate-games", {
        method: "GET",
        headers: {
            'Content-Type' : "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        //console.log("raspunsul este:", response);
        return response.text();
    }).then(function(regenerateGame){
        //console.log("raspuns request: ", regenerateGame);
        callback(regenerateGame);
    })
}
*/
function editGame(id, gameObject1,callback){
  console.log(id)
  console.log(gameObject1)
    fetch(`${apiURL}/games/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type' : "application/x-www-form-urlencoded"
        },
        body: gameObject1
        /*JSON.stringify({
            title: 'text',
            description: '',
            imageUrl: ''
        })*/
    }).then(function(response){
        console.log("raspunsul de la server este: ",response )
        return response.text();
    }).then(function(editGameResponse) {
       callback(editGameResponse)
        console.log("raspuns PUT: ", editGameResponse)
    }).catch(err =>  {
        console.log('my error from put is: ', err);
        
    })
}








// "application/json"
// {"cheie": "valoare", "cheie2": "valoare2"}

//application/x-www-form-urlencoded
// cheie=valoare&cheie2=valoare