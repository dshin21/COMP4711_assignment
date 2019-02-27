import React, { Component } from "react";
import LeaderBoard from "./LeaderBoard";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      playerScore: this.props.playerScore,
      playerInfo: [],
      submitted: false
    };
  }

  handleClick = () => {
    this.setState({ submitted: true });
    this.addplayerInfo();
  };

  handleRestart = () => {
    this.props.restart();
  };

  addplayerInfo = _ => {
    let name = this.state.playerName;
    let score = this.props.playerScore;
    fetch(`http://comp4711assignment.herokuapp.com/players/add?name=${name}&score=${score}`)
      .then(response => response.json())
      .catch(err => console.log(err));
  };

  handleChange = e => {
    this.setState({ playerName: e.target.value });
  };

  getPlayerInfo = () => {
    fetch("http://comp4711assignment.herokuapp.com/players")
      .then(response => response.json())
      .then(response => this.setState({ playerInfo: response.data }, () => {}))
      .catch(err => console.log(err));
  };

  render = () => {
    if (this.state.submitted) {
      return (
        <LeaderBoard
          getPlayerInfo={() => this.getPlayerInfo()}
          playerInfo={this.state.playerInfo}
          playerName={this.state.playerName}
          playerScore={this.state.playerScore}
          restart={() => this.handleRestart()}
        />
      );
    }

    return (
      <div className="summary">
        <div>
          <h1>GAME OVER!</h1>
          <h1>Your Score is: {this.state.playerScore}</h1>
          <input
            type="text"
            value={this.state.playerName}
            onChange={this.handleChange.bind(this)}
            placeholder="Please Enter Your Name"
          />
        </div>

        <button className="restart-button" onClick={() => this.handleRestart()}>
          RESTART
        </button>

        <button
          className="submit-button"
          onClick={this.handleClick.bind(this, this.state.playerName)}
        >
          SUBMIT
        </button>
      </div>
    );
  };
}

export default Summary;
