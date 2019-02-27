import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: true
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ isStart: false });
      this.forceUpdate();
      this.props.rotate();
    }, 500);
  };

  handleClick = () => {
    this.props.click(this.props.currentCard);
  };

  render = () => {
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
            (this.props.isStart || this.props.isClicked ? "opened" : "")
          }
          onClick={() => this.handleClick()}
        >
          <div className="front" />
          <div className="back" />
        </div>
      );
    }
  };
}
export default Card;
