function fetchAPI(serverURL) {
    this.serverURL = serverURL;
}

fetchAPI.prototype.getGameList = function() {
    return fetch(`${this.serverURL}/games`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        //console.log('Raspuns de la server: ', response);
        return response.json();
    })
} 

fetchAPI.prototype.deleteGame = function(gameID) {
    return fetch(`${this.serverURL}/games/${gameID}`, {
        method: 'DELETE'
    }).then(function(response) {
     
        return response.text();
    }).then(function(responseMsg) {
        return {
            succes: true,
            msg: responseMsg
        }
    }).catch(function(error) {
        return {
            succes: false,
            msg: error
        }
    })
}

fetchAPI.prototype.createGameRequest = function(gameObj) {
    return fetch(`${this.serverURL}/games`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObj
    }).then(function(response) {
        return response.json();
    })
}

fetchAPI.prototype.editGame = function(id,gameObj) {
    return fetch(`${this.serverURL}/games/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : "application/x-www-form-urlencoded"
        },
        body: gameObj
    }).then(function(response) {
        console.log("PUT response ", response);
        
        return response.json()
    })
}
fetchAPI.prototype.reloadDB = function() {
    return fetch(`${this.serverURL}/regenerate-games`, {
        method: 'GET',
        headers: {
            'Content-Type' : "application/x-www-form-urlencoded",
            'Connection' : 'keep-alive'
        }
    });
}
