class FetchAPI {
    constructor(serverURL){
        this.serverURL = serverURL;
    }

    async getGameList () {
        const response = await fetch(`${this.serverURL}/games`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.json();
    }

    async deleteGame (gameID) {
        try {
            const response = await fetch(`${this.serverURL}/games/${gameID}`, {
            method: 'DELETE'
            });
            const responseMsg = response.text();;
            return {
                succes: true,
                msg: responseMsg
            }
        } catch(error) {
            return {
                succes: false,
                msg: error
            }
        }
    }

    async createGameRequest (gameObj) {
        const response = await fetch(`${this.serverURL}/games`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: gameObj
        });
        return response.json();
    }
 
    async editGame (id,gameObj) {
        const response = await fetch(`${this.serverURL}/games/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : "application/x-www-form-urlencoded"
            },
            body: gameObj
        });
        console.log("PUT response ", response);
        return response.json();
    }

    async reloadDB () {
        const response = await fetch(`${this.serverURL}/regenerate-games`, {
            method: 'GET',
            headers: {
                'Content-Type' : "application/x-www-form-urlencoded",
                'Connection' : 'keep-alive'
            }
        });
        return response.json();
    }
}