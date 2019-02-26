import React, { Component } from "react";

class TestButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    clicked(framework) {
        this.props.click(framework);
    }
    render() {
        return (
            <div>
                <button onClick={this.props.test}>CLICK</button>
            </div>
        );
    }
}
export default TestButton;
