import React, { Component } from "react";

import Card from "./Card";
import ScoreBoard from "./ScoreBoard";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDeckSize: 7,
      row: 3,
      col: 3,
      tiles: 4,

      deck: [],
      selectedCards: [],
      isStart: false,
      rotateClass: "",
      playerScore: 0, //TODO:store in DB
      playerName: "", //TODO:store in DB
      trials: 1
    };
    this.start();
  }

  componentDidMount = () => {};

  start = () => {
    let deck = this.state.deck;
    let row = this.state.row;
    let col = this.state.col;
    let tiles = this.state.tiles;
    this.reset();
    console.log("start", row, col, tiles);

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
    this.setState((state, props) => {
      return {
        deck: this.randomizeCards(this.state.deck),
        isStart: state.isStart === false ? true : false
      };
    });
  };

  reset = () => {
    console.log("reset");

    let deck = this.state.deck;
    let selectedCards = this.state.selectedCards;

    deck = [];
    selectedCards = [];

    this.setState({ deck: deck, selectedCards: selectedCards }, () => {});
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

  //array holding cards
  // if clicked, check if it is marked with "answer"
  // if true, remain flipped
  // if false, lose point -> reset -> prev level
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
        this.setState(
          () => {
            return {
              row: this.determineNewBoardState("lose")[0],
              col: this.determineNewBoardState("lose")[1],
              tiles: this.determineNewBoardState("lose")[2],
              playerScore: this.determineNewBoardState("lose")[3]
            };
          },
          () => {
            if (isWrongAns) this.start();
          }
        );
      }
    }

    if (!isWrongAns) {
      this.setState(
        () => {
          return {
            row: this.determineNewBoardState("win")[0],
            col: this.determineNewBoardState("win")[1],
            tiles: this.determineNewBoardState("win")[2],
            playerScore: this.determineNewBoardState("win")[3]
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
    let res = [];

    if (winOrLose === "win") {
      console.log("win", row, col, tiles);
      if (tiles - col === 2) {
        if (row === 3 && col === 3) {
          row++;
          col++;
          tiles = row + 1;
        } else {
          tiles = row + 1;
        }
      } else {
        tiles++;
      }

      if (playerScore <= 0) playerScore = 0;
      else playerScore++;
    }

    if (winOrLose === "lose") {
      console.log("lose", row, col, tiles);
      if (row === 3 && col === 3 && tiles === 4) {
        tiles--;
      } else if (tiles - col === 2) {
        tiles--;
      } else if (tiles - col === 1) {
        row--;
        col--;
        tiles = row + 2;
      }

      if (playerScore <= 0) playerScore = 0;
      else playerScore--;
    }

    res.push(row, col, tiles, playerScore);
    return res;
  };

  componentDidUpdate = () => {};

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
    // this.forceUpdate();
  };

  render = () => {
    return (
      <div>
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
                isStart={this.state.isStart}
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
