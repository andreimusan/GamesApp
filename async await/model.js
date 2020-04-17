var apiURL = "https://games-world.herokuapp.com";

async function getGamesList(){
    const response = await fetch(`${apiURL}/games`, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    const arrayOfGames = response.json();
    return arrayOfGames;
}

async function deleteGame(gameID) {
    const response = await fetch(`${apiURL}/games/${gameID}`, {
        method: "DELETE"
    });
    const apiresponse = response.text();
    return apiresponse;
}

async function createGameRequest(gameObject){
    const response = await fetch(`${apiURL}/games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObject
    });
    const createdGame = response.json();
    return createdGame;
}

async function reloadData() {
    const response = await fetch(`${apiURL}/regenerate-games`, {
        method: "GET",
        headers: {
            'Content-Type' : "application/x-www-form-urlencoded"
        }
    });
    const regenerateGame = response.text();
    return regenerateGame;
}

async function editGame(id, updatedGameObject){
    const response = await fetch(`${apiURL}/games/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type' : "application/x-www-form-urlencoded"
        },
        body: updatedGameObject
    });
    const editGameResponse = response.text();
    return editGameResponse;
}