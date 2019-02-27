import React, { Component } from "react";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerInfo: []
    };
  }

  componentDidMount = () => {
    this.props.getPlayerInfo();
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.playerInfo !== nextProps.playerInfo) {
      this.setState({ playerInfo: nextProps.playerInfo });
    }
  }

  handleClick = () => {
    this.props.click();
  };

  _renderObject = () => {
    let playerInfo = this.state.playerInfo;
    console.log(playerInfo);

    return Object.keys(playerInfo).map(obj => {
      console.log(obj);

      return <div>{}</div>;
    });
  };

  render = () => {
    const playerInfo = this.state.playerInfo;
    console.log(playerInfo);
    return (
      <div id="leader-board" onClick={() => this.handleClick()}>
        <div>
          {playerInfo.map(e => (
            <div>
              {e.name} {e.score}
            </div>
          ))}
        </div>
        <button type="button">RESTART</button>
      </div>
    );
  };
}

export default LeaderBoard;
