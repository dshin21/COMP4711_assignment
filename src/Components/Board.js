import React, { Component } from "react";

import Card from "./Card";
// import TestButton from "./TestButton";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDeckSize: 3,
            deck: [],
            selectedCards: [],
            playerScore: 0, //TODO:store in DB
            playerName: "" //TODO:store in DB
        };
        // this.test = this.test.bind(this);

        this.start();
    }

    start() {
        //zero: wrong ans
        //one:  correct ans

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
            if (
                this.state.selectedCards.length >=
                this.state.currentDeckSize + 1
            ) {
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

        for (let i = 0; i < selectedCards.length; i++) {
            if (!selectedCards[i].isAnswer) {
                //TODO: -1 score && restart the game -1 size if not 3
                this.setState({
                    currentDeckSize:
                        this.state.currentDeckSize <= 3
                            ? 3
                            : this.state.currentDeckSize - 1,

                    //TODO:store in DB
                    playerScore:
                        this.playerScore <= 0 ? -1 : this.playerScore - 1,

                    //TODO:store in DB
                    playerName: "",

                    selectedCards: [],
                    deck: []
                });
                this.reset();
                this.start();
                return;
            }
        }
        console.log("yay");

        this.setState({
            playerScore: playerScore + 1
        });
    }

    render() {
        return (
            <div>
                <div
                    className={`playground ${
                        this.state.temp ? "start-rotate" : ""
                    }`}
                >
                    {this.state.deck.map((currentCard, index) => {
                        return (
                            <Card
                                currentCard={currentCard.name}
                                isClicked={currentCard.isClicked}
                                click={() =>
                                    this.handleClick(currentCard.name, index)
                                }
                            />
                        );
                    })}
                </div>
                {/* <TestButton test={this.test} /> */}
            </div>
        );
    }

    reset() {
        let deck = this.state.deck;
        let selectedCards = this.state.selectedCards;
        for (let i = 0; i < deck.length; i++) deck[i] = null;
        for (let i = 0; i < selectedCards.length; i++) selectedCards[i] = null;
    }
    // test() {
    //     this.setState({
    //         temp: true
    //     });
    // }
}

export default Board;
