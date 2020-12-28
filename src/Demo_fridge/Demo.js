import React from "react";
import "./Demo.css";
import AddItems from "./AddItems";

import left_fridge from "./img_fridge/left_fridge.png";
import mandu from "./img_fridge/mandu.png";
import eggs from "./img_fridge/eggs.png";
import dairy from "./img_fridge/dairy.png";

import right_fridge from "./img_fridge/right_fridge.png";
import fish from "./img_fridge/fish.png";
import meat from "./img_fridge/meat.png";
import veges from "./img_fridge/veges.png";
import fruit from "./img_fridge/fruit.png";

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  changeItems = (obj) => {
    let newItem = obj;
    this.setState((state) => ({
      items: state.items.concat(newItem),
    }));

    console.log(this.state.items);
  };

  showImages = () => {
    for (let item of this.state.items) {
      let itemType = document.querySelector(`#${item.type}`);
      itemType.style.display = "block";
    }
  };

  componentDidMount() {
    this.showImages();
  }
  componentDidUpdate() {
    this.showImages();
  }

  render() {
    return (
      <div id="demo">
        {/* 왼쪽 화면 */}
        <div className="left">
          {/* 왼쪽 냉장고 */}
          <div className="fridge">
            <img className="fridge_leftside" src={left_fridge}></img>
            {/* <div className="ingredient"> */}
            <img id="mandu" src={mandu}></img>
            <img id="eggs" src={eggs}></img>
            <img id="dairy" src={dairy}></img>
            {/* </div> */}
          </div>

          {/* 오른쪽 냉장고 */}
          <div className="fridge">
            <img className="fridge_rightside" src={right_fridge}></img>

            <img id="seafood" src={fish}></img>
            <img id="meat" src={meat}></img>
            <img id="fruits" src={fruit}></img>
            <img id="veges" src={veges}></img>
          </div>
        </div>

        {/* 오른쪽 화면*/}
        <div className="right">
          <AddItems value={this.state.items} changeItems={this.changeItems} />
        </div>
      </div>
    );
  }
}

// 카테고리
// 이름
