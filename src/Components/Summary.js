import React, { Component } from "react";
import LeaderBoard from "./LeaderBoard";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      submitted: false
    };
  }

  handleClick = () => {
    console.log(this.state.playerName);
    this.setState({ submitted: true });
  };

  handleChange = e => {
    this.setState({ playerName: e.target.value });
  };

  render = () => {
    if (this.state.submitted) {
      return <LeaderBoard playerName={this.state.playerName} />;
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
