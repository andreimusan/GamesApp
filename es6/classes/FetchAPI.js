class FetchAPI {
    constructor(serverURL){
        this.serverURL = serverURL;
    }

    getGameList () {
        return fetch(`${this.serverURL}/games`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            //console.log('Raspuns de la server: ', response);
            return response.json();
        })
    }

    deleteGame (gameID) {
        return fetch(`${this.serverURL}/games/${gameID}`, {
            method: 'DELETE'
        }).then(response => {
         
            return response.text();
        }).then(responseMsg => {
            return {
                succes: true,
                msg: responseMsg
            }
        }).catch(error => {
            return {
                succes: false,
                msg: error
            }
        }) 
    }

    createGameRequest (gameObj) {
        return fetch(`${this.serverURL}/games`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: gameObj
        }).then(response => {
            return response.json();
        })
    }

    editGame (id,gameObj) {
        return fetch(`${this.serverURL}/games/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : "application/x-www-form-urlencoded"
            },
            body: gameObj
        }).then(response => {
            console.log("PUT response ", response);
            
            return response.json()
        })
    }

    reloadDB () {
        return fetch(`${this.serverURL}/regenerate-games`, {
            method: 'GET',
            headers: {
                'Content-Type' : "application/x-www-form-urlencoded",
                'Connection' : 'keep-alive'
            }
        });
    }
}