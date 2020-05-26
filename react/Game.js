class Game extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      return (
        <div>
          <h1 className="title">{this.props.title}</h1>
          <img className="imageUrl" src={this.props.imageUrl} />
          <p className="description">{this.props.description}</p>
        </div>
      )
  }
}