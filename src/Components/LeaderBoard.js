import React, { Component } from "react";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    this.props.click();
  };

  render = () => {
    return (
      <div id="leader-board" onClick={() => this.handleClick()}>
        <button type="button">RESTART</button>
      </div>
    );
  };
}

export default LeaderBoard;
