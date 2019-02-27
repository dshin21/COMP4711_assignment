import React, { Component } from "react";

class ScoreBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="score-board">
                <span id="numTiles">TILES&nbsp;&nbsp;{this.props.numTiles}</span>
                <span id="trials">TRIALS&nbsp;&nbsp;{this.props.trials} of 12</span>
                <span id="playerScore">SCORE&nbsp;&nbsp;{this.props.playerScore}</span>
            </div>
        );
    }
}
export default ScoreBoard;
