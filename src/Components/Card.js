import React, { Component } from "react";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    clicked(currentCard) {
        this.props.click(currentCard);
    }

    render() {
        return (
            <div
                className={"card" + (this.props.isClicked ? " opened" : "")}
                onClick={() => this.clicked(this.props.currentCard)}
            >
                <div className="front" />
                <div className="back" />
            </div>
        );
    }
}
export default Card;
