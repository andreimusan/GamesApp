class App extends React.Component {
  constructor(props) {
    super(props)
    this.url = "https://games-app-siit.herokuapp.com";
    this.state = {
      error: null,
      isLoaded: false,
      arrayOfGames:[]
    }
  }

  componentDidMount(){
    fetch(`${this.url}/games`)
    .then(response => response.json())
    .then ((result) => {
      return this.setState ({
        isLoaded: true,
        arrayOfGames: result
      })    
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    })
  }

  
  render() {
    if (!this.state.isLoaded) {
      return (<p>THE PAGE IS LOADING</p>)
    } else if (this.state.error) {
      return (<p>Error 404</p>)
      
    } else {
      const listOfGames = this.state.arrayOfGames.map(game => {
        return(<Game 
                title={game.title}
                description={game.description}
                imageUrl={game.imageUrl} />)
      })
      return(<div>{listOfGames}</div>)
    }
  }

}

const appDOM = document.getElementById('app');
ReactDOM.render(<App />, appDOM);