import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: true
    };
  }

  componentDidMount = () => {
    if (!this.props.isStart) {
      setTimeout(() => {
        this.setState({ isStart: false });
        this.props.rotate();
      }, 1000);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isStart !== nextProps.isStart) {
      setTimeout(() => {
        this.setState({ isStart: false });
      }, 1000);
      setTimeout(() => {
        this.setState({ isStart: true });
      }, 1500);

      setTimeout(() => {
        this.setState({ isStart: false });
        this.props.rotate();
      }, 2500);
    }
  }

  handleClick = () => {
    this.props.click(this.props.currentCard);
  };

  render = () => {
    if (this.state.isStart) {
      if (this.props.isAnswer) {
        console.log(this.props.currentCard);
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
            (this.state.isStart || this.props.isClicked ? "opened" : "")
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
