import React, { Component } from "react";

class TerminateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    this.props.click();
  };

  render = () => {
    return (
      <div id="terminate-button" onClick={() => this.handleClick()}>
        <button type="button">TERMINATE</button>
      </div>
    );
  };
}

export default TerminateButton;
