import React, { Component } from "react";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStart: true
        };
    }

    clicked(currentCard) {
        this.props.click(currentCard);
    }

    componentDidMount() {
        setTimeout(() => {
            console.log("Parent did mount.");
            this.state.isStart = false;
            this.forceUpdate();
            this.props.rotate();
        }, 3000);
    }

    render() {
        if (this.state.isStart) {
            if (this.props.isAnswer) {
                return (
                    <div className={"card opened"}>
                        <div className="front" />
                        <div className="back" />
                    </div>
                );
            } else {
                return (
                    <div className={"card"}>
                        <div className="front" />
                        <div className="back" />
                    </div>
                );
            }
        } else {
            return (
                <div
                    className={
                        "card " +
                        (this.props.isStart || this.props.isClicked
                            ? "opened"
                            : "")
                    }
                    onClick={() => this.clicked(this.props.currentCard)}
                >
                    <div className="front" />
                    <div className="back" />
                </div>
            );
        }
    }
}
export default Card;
