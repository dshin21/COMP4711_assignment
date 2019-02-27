import React, { Component } from "react";
import LeaderBoard from "./LeaderBoard";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      playerScore: this.props.playerScore,
      playerInfo:[],
      temp: "",
      submitted: false
    };
  }

  handleClick = () => {
    this.setState({ submitted: true });
    this.addplayerInfo();
  };

  addplayerInfo = _ => {
    let name = this.state.playerName;
    let score = this.props.playerScore;
    fetch(`http://localhost:3001/players/add?name=${name}&score=${score}`)
      .then(response => response.json())
      .catch(err => console.log(err));
  };

  handleChange = e => {
    this.setState({ playerName: e.target.value });
  };

  getPlayerInfo = () => {
    console.log("getPlayerInfo");
    fetch("http://localhost:3001/players")
      .then(response => response.json())
      .then(response =>
        this.setState({ playerInfo: response.data }, () => {
          console.log(this.state.temp);
        })
      )
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
        />
      );
    }
    return (
      <div className="summary">
        <div id="restart-button">
          <input
            type="text"
            value={this.state.playerName}
            onChange={this.handleChange.bind(this)}
            placeholder="Please Enter Your Name"
          />
          <button onClick={this.handleClick.bind(this, this.state.playerName)}>
            SUBMIT
          </button>
        </div>
      </div>
    );
  };
}

export default Summary;
