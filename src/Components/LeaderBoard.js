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

  render = () => {
    let counter = 1;
    const playerInfo = this.state.playerInfo;
    console.log(playerInfo);
    return (
      <div>
        <h1>Welcome to the LeaderBoard!</h1>
        <div id="leader-board">
          <div>
            <div>
              <div className="leader-board-header">Name</div>
              <div className="leader-board-header">Score</div>
            </div>
            <hr/>
            {playerInfo.map(e => {
              if (counter++ <= 5) {
                return (
                  <div>
                    <div className="players">{e.name}</div>
                    <div className="players">{e.score}</div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <button type="button">RESTART</button>
      </div>
    );
  };
}

export default LeaderBoard;
