/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./Demo.css";
import AddItems from "./AddItems";

import left_fridge from "./img_fridge/left_fridge.png";
import right_fridge from "./img_fridge/right_fridge.png";

import mandu from "./img_fridge/mandu.png";
import eggs from "./img_fridge/eggs.png";
import dairy from "./img_fridge/dairy.png";
import seafood from "./img_fridge/fish.png";
import fruits from "./img_fridge/fruit.png";
import veges from "./img_fridge/veges.png";
import meat from "./img_fridge/meat.png";

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
      <div className="whitebox">
        <p className="demo__name">Guest 님의 냉장고</p>
        <div className="demo__main">
          <div className="demo__fridge">
            <div className="demo__fridge__bg">
              <img src={left_fridge} className="demo__fridge__bg__left" />
              <img src={right_fridge} className="demo__fridge__bg__right" />
            </div>

            <div className="demo__fridge__items">
              <div className="demo__fridge__items__left">
                <div className="demo__fridge__img img-1">
                  <img id="mandu" src={mandu} alt="frozen food image" />
                </div>
                <div className="demo__fridge__img img-2">
                  <img id="eggs" src={eggs} alt="eggs image" />
                </div>
                <div className="demo__fridge__img img-3">
                  <img id="dairy" src={dairy} alt="dairy food image" />
                </div>
              </div>
              <div className="demo__fridge__items__right ">
                <div className="demo__fridge__img img-4">
                  <img id="seafood" src={seafood} alt="seafood image" />
                </div>
                <div className="demo__fridge__img img-5">
                  <img id="meat" src={meat} alt="meat image" />
                </div>
                <div className="demo__fridge__img img-6">
                  <img id="fruits" src={fruits} alt="fruits image" />
                  <img id="veges" src={veges} alt="veges image" />
                </div>
              </div>
            </div>
          </div>
          <div className="demo__cart">
            <AddItems items={this.state.items} changeItems={this.changeItems} />
          </div>
        </div>
      </div>
    );
  }
}
