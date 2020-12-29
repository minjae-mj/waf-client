import React, { Component } from "react";
import Player from "./Player";
import PlayLists from "./PlayLists";

class Recipes extends Component {
  render() {
    return (
      <div>
        <Player className="big__screen"></Player>
        <PlayLists className="small__screen"></PlayLists>
      </div>
    );
  }
}

export default Recipes;
