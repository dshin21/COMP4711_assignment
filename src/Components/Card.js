import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirst: this.props.isFirst,
      lastCard: this.props.lastCard
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ isFirst: false });
    }, 1000);
  
    if (this.state.lastCard) {
      setTimeout(() => {
        this.props.rotate();
      }, 1500);
    }
  };
//TODO:::::::::::::::::::CARD BG?????
  // shouldComponentUpdate = (nextProps, nextState) => {
  //   if (this.props.isFirst) {
  //     setTimeout(() => {
  //       // this.setState({ isFirst: false });
  //       this.props.rotate();
  //     }, 1000);
  //   }
  //   return true;
  // };

  // componentWillReceiveProps(nextProps) {
  // if (this.props.isFirst !== nextProps.isFirst) {
  //   setTimeout(() => {
  //     this.setState({ isFirst: false });
  //   }, 1000);
  //   setTimeout(() => {
  //     this.setState({ isFirst: true });
  //   }, 1500);
  //   setTimeout(() => {
  //     this.setState({ isFirst: false });
  //     this.props.rotate();
  //   }, 2500);
  // }
  // }

  handleClick = () => {
    this.props.click(this.props.currentCard);
  };

  firstRenderClosed = () => {
    return (
      <div className={"card"}>
        <div className="front" />
        <div className="back" />
      </div>
    );
  };

  firstRenderOpen = () => {
    return (
      <div className={"card opened"}>
        <div className="front" />
        <div className="back" />
      </div>
    );
  };

  renderReal = () => {
    return (
      <div
        className={`card ${this.props.isClicked ? "opened" : ""}`}
        onClick={() => this.handleClick()}
      >
        <div className="front" />
        <div className="back" />
      </div>
    );
  };

  render = () => {
    if (this.state.isFirst) {
      if (this.props.isAnswer) return this.firstRenderOpen();
      if (!this.props.isAnswer) return this.firstRenderClosed();
    } else {
      return this.renderReal();
    }
  };
}
export default Card;
