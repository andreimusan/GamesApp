var apiURL = "https://games-app-siit.herokuapp.com";

function getGamesList(){
    return fetch(`${apiURL}/games`, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        return response.json();
    });
}

function deleteGame(gameID) {
    return fetch(`${apiURL}/games/${gameID}`, {
        method: "DELETE"
    });
}

function createGameRequest(gameObject){
    return fetch(`${apiURL}/games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObject
    }).then(function(response){
        return response.json();
    });
}

function reloadData() {
    return fetch(`${apiURL}/regenerate-games`, {
        method: "GET",
        headers: {
            'Content-Type' : "application/x-www-form-urlencoded"
        }
    });
}

function editGame(id, updatedGameObject){
    return fetch(`${apiURL}/games/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type' : "application/x-www-form-urlencoded"
        },
        body: updatedGameObject
    });
}