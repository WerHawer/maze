import React, { Component } from "react";
import Square from "./components/Square";

export default class App extends Component {
  state = { maze: [], size: 3 };

  render() {
    const { size } = this.state;
    return (
      <div className="wrapper">
        <Square size={size} />
      </div>
    );
  }
}
