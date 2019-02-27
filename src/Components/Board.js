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
      playerScore: 0, //TODO:store in DB
      playerName: "", //TODO:store in DB
      trials: 1
    };
    console.log("constructor");
    this.start();
  }

  componentDidMount = () => {
    console.log("componentDidMount");
    console.log(this.state.deck);
  };

  start = () => {
    console.log("start");

    let deck = this.state.deck;
    let row = this.state.row;
    let col = this.state.col;
    let tiles = this.state.tiles;
    // console.log(row, col, tiles);

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
    this.setState({ deck: this.randomizeCards(this.state.deck) });
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

    deck[index].isClicked = true;

    if (selectedCards[selectedCards.length - 1] !== deck[index]) {
      selectedCards.push(deck[index]);
      // console.log(selectedCards);
      this.setState(
        {
          selectedCards,
          deck
        },
        () => {
          if (selectedCards.length === tiles) this.check();
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
    for (let i = 0; i < selectedCards.length; i++) {
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
            this.start();
          }
        );
      }
    }
    console.log("checking");
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
      if (tiles - col === 2) {
        row++;
        col++;
        tiles = row;
      } else {
        tiles++;
      }

      if (playerScore <= 0) playerScore = 0;
      else playerScore++;
    }

    if (winOrLose === "lose") {
      if (tiles - col === 1) {
        if (row === 3 && col === 3) {
          console.log("hi");
          tiles--;
        }
      } else {
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

  componentDidUpdate = () => {
    console.log(this.state.row, this.state.col, this.state.tiles);
    console.log(this.state.deck);
  };

  reset = () => {
    let deck = this.state.deck;
    let selectedCards = this.state.selectedCards;
    for (let i = 0; i < deck.length; i++) deck[i] = null;
    for (let i = 0; i < selectedCards.length; i++) selectedCards[i] = null;
  };

  rotate = () => {
    if (!this.state.isRotated) {
      this.setState({
        isRotated: true
      });
    }
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
            this.state.isRotated ? "start-rotate" : ""
          }`}
        >
          {this.state.deck.map((currentCard, index) => {
            return (
              <Card
                currentCard={currentCard.name}
                isClicked={currentCard.isClicked}
                isAnswer={currentCard.isAnswer}
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
