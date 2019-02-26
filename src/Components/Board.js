import React, { Component } from "react";

import Card from "./Card";
import ScoreBoard from "./ScoreBoard";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDeckSize: 7,
      deck: [],
      selectedCards: [],
      playerScore: 0, //TODO:store in DB
      playerName: "", //TODO:store in DB
      trials: 1 //TODO:store in DB
    };

    this.rotate = this.rotate.bind(this);
    this.start();
  }

  start() {
    // this.reset();
    //zero: wrong ans
    //one:  correct ans
    // this.setState({ isRotated: false });//TODO: temp
    for (
      let zero = 0, one = 0;
      zero < this.state.currentDeckSize * this.state.currentDeckSize;
      zero++
    ) {
      let tempCard = {
        name: zero,
        isAnswer: false
      };
      if (one <= this.state.currentDeckSize) {
        tempCard.isAnswer = true;
        this.state.deck[zero] = tempCard;
        one++;
      } else {
        tempCard.isAnswer = false;
        this.state.deck[zero] = tempCard;
      }
    }

    this.setState({ deck: this.randomizeCards(this.state.deck) });
  }

  randomizeCards(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    console.log(array);
    return array;
  }

  //array holding cards
  // if clicked, check if it is marked with "answer"
  // if true, remain flipped
  // if false, lose point -> reset -> prev level
  handleClick(name, index) {
    if (!this.state.selectedCards.some(e => e.name === name)) {
      if (this.state.selectedCards.length >= this.state.currentDeckSize + 1) {
        this.check();
      } else {
        let deck = this.state.deck;
        let selectedCards = this.state.selectedCards;

        deck[index].isClicked = true;
        selectedCards.push(deck[index]);

        this.setState({
          selectedCards,
          deck
        });

        if (
          this.state.selectedCards.length ===
          this.state.currentDeckSize + 1
        ) {
          this.check();
        }
      }
    }
  }

  check() {
    let selectedCards = this.state.selectedCards;
    let playerScore = this.state.playerScore;
    let currentDeckSize = this.state.currentDeckSize;

    for (let i = 0; i < selectedCards.length; i++) {
      if (!selectedCards[i].isAnswer) {
        //TODO: -1 score && restart the game -1 size if not 3
        this.setState({
          currentDeckSize:
            this.state.currentDeckSize <= 3
              ? 3
              : this.state.currentDeckSize - 1,

          //TODO:store in DB
          playerScore: this.playerScore <= 0 ? 0 : this.playerScore - 1,

          //TODO:store in DB
          playerName: ""
        });

        this.start();
        return;
      }
    }

    this.setState(
      {
        playerScore: playerScore + 1,
        currentDeckSize: currentDeckSize + 1
      },
      () => {
        console.log(this.state.playerScore);
        setTimeout(() => {
          this.start();
        }, 3000);
      }
    );
  }

  reset() {
    let deck = this.state.deck;
    let selectedCards = this.state.selectedCards;
    for (let i = 0; i < deck.length; i++) deck[i] = null;
    for (let i = 0; i < selectedCards.length; i++) selectedCards[i] = null;
  }

  rotate() {
    if (!this.state.isRotated) {
      this.setState({
        isRotated: true
      });
    }
  }

  // determineContainerSize() {
  //   let currentDeckSize = this.state.currentDeckSize;
  //   switch (currentDeckSize) {
  //     case 3:
  //       return 3;
  //     case 4:
  //     case 5:
  //     case 6:
  //     case 7:
  //   }
  // }

  render() {
    return (
      <div>
        <ScoreBoard
          playerScore={this.state.playerScore}
          numTiles={this.state.currentDeckSize}
          trials={this.state.trials}
        />
        <div
          className={`playground playground-${this.state.currentDeckSize} ${
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
                click={() => this.handleClick(currentCard.name, index)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Board;
