import React, { Component } from "react";

import Card from "./Card";
import ScoreBoard from "./ScoreBoard";
import Summary from "./Summary";
import TerminateButton from "./TerminateButton";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: 6,
      col: 6,
      tiles: 4,
      deck: [],
      selectedCards: [],
      isFirst: true,
      rotateClass: "",
      playerScore: 0,
      playerName: "",
      trials: 1,
      isGameOver: false,
      initialGame: true
    };
    this.start();
  }

  start = () => {
    let deck = this.state.deck;
    let row = this.state.row;
    let col = this.state.col;
    let tiles = this.state.tiles;
    let trials = this.state.trials;
    let playerScore = this.state.playerScore;
    this.reset();

    if (!(trials >= 12 || playerScore < 0)) {
      for (let regTile = 0, ansTile = 0; regTile < row * col; regTile++) {
        let tempCard = {
          name: regTile,
          isAnswer: false
        };

        if (ansTile < tiles) {
          tempCard.isAnswer = true;
          deck[regTile] = tempCard;
          ansTile++;
        } else {
          tempCard.isAnswer = false;
          deck[regTile] = tempCard;
        }
      }
      this.randomizeCards(this.state.deck);
      setTimeout(() => {
        this.setState(
          {
            deck: deck,
            initialGame:false
          },
          () => {
            this.setState({
              isFirst: true
            });
          }
        );
      }, 500);
    } else {
      this.setState({ isGameOver: true });
    }
  };

  reset = () => {
    let deck = this.state.deck;
    let selectedCards = this.state.selectedCards;

    deck = [];
    selectedCards = [];

    this.setState({ deck: deck, selectedCards: selectedCards }, () => {});
  };

  restart = () => {
    this.setState({
      isGameOver: false,
      playerScore: 0,
      trials: 0
    });
  };

  randomizeCards = array => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  handleClick = index => {
    let selectedCards = this.state.selectedCards;
    let deck = this.state.deck;
    let tiles = this.state.tiles;

    if (selectedCards[selectedCards.length - 1] !== deck[index]) {
      deck[index].isClicked = true;
      selectedCards.push(deck[index]);
      this.setState(
        {
          selectedCards,
          deck
        },
        () => {
          if (selectedCards.length === tiles) {
            this.check();
          }
        }
      );
    }
  };

  existDuplicateSelection = () => {
    let currentSelection = this.state.currentSelection;
    if (this.state.selectedCards.some(e => e.name == currentSelection))
      return true;
    else return false;
  };

  check = () => {
    let selectedCards = this.state.selectedCards;
    let isWrongAns = false;
    for (let i = 0; i < selectedCards.length && !isWrongAns; i++) {
      if (!selectedCards[i].isAnswer) {
        isWrongAns = true;
        let newStates = this.determineNewBoardState("lose");
        this.setState(
          () => {
            return {
              row: newStates[0],
              col: newStates[1],
              tiles: newStates[2],
              playerScore: newStates[3],
              trials: newStates[4]
            };
          },
          () => {
            if (isWrongAns) this.start();
          }
        );
      }
    }

    if (!isWrongAns) {
      let newStates = this.determineNewBoardState("win");

      this.setState(
        () => {
          return {
            row: newStates[0],
            col: newStates[1],
            tiles: newStates[2],
            playerScore: newStates[3],
            trials: newStates[4]
          };
        },
        () => {
          this.start();
        }
      );
    }
  };

  determineNewBoardState = winOrLose => {
    let row = this.state.row;
    let col = this.state.col;
    let tiles = this.state.tiles;
    let playerScore = this.state.playerScore;
    let trials = this.state.trials;
    let res = [];

    if (winOrLose === "win") {
      if (tiles - col === 2) {
        tiles = row + 2;
        row++;
        col++;
      } else if (tiles - col === 1) {
        tiles = row + 2;
      }

      playerScore++;
      trials++;
    }

    if (winOrLose === "lose") {
      if (row === 3 && col === 3 && tiles === 4) {
        tiles--;
      } else if (tiles - col === 2) {
        tiles--;
      } else if (tiles - col === 1) {
        row--;
        col--;
        tiles = row + 2;
      }

      if (playerScore > 0) playerScore--;
      else {
        this.setState({ isGameOver: true });
      }
      trials++;
    }

    res.push(row, col, tiles, playerScore, trials);
    return res;
  };

  rotate = () => {
    if (this.state.rotateClass === "") {
      this.setState((state, props) => {
        return {
          rotateClass: "start-rotate"
        };
      });
    } else if (this.state.rotateClass === "start-rotate") {
      this.setState((state, props) => {
        return {
          rotateClass: "start-unrotate"
        };
      });
    } else if (this.state.rotateClass === "start-unrotate") {
      this.setState((state, props) => {
        return {
          rotateClass: "start-rotate"
        };
      });
    }
  };

  terminateButtonHandler = () => {
    if (window.confirm("Are you sure you want to terminate?"))
      this.setState({ isGameOver: true });
  };

  render = () => {
    // if (this.state.initialGame) {
    //   return (
    //     <button className="start-button" onClick={() => this.start()}>
    //       START
    //     </button>
    //   );
    // }
    if (this.state.isGameOver) {
      return (
        <Summary
          restart={() => this.restart()}
          playerScore={this.state.playerScore}
        />
      );
    }
    return (
      <div>
        <TerminateButton click={() => this.terminateButtonHandler()} />
        <ScoreBoard
          playerScore={this.state.playerScore}
          numTiles={this.state.tiles}
          trials={this.state.trials}
        />
        <div
          className={`playground playground-${this.state.row} ${
            this.state.rotateClass
          }`}
        >
          {this.state.deck.map((currentCard, index) => {
            return (
              <Card
                currentCard={currentCard.name}
                isClicked={currentCard.isClicked}
                isAnswer={currentCard.isAnswer}
                lastCard={this.state.deck.length - 1 === index}
                isFirst={this.state.isFirst}
                rotate={this.rotate}
                click={() => this.handleClick(index)}
              />
            );
          })}
        </div>
      </div>
    );
  };
}

export default Board;
