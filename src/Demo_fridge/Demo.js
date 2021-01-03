/* eslint-disable jsx-a11y/alt-text */
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
import { withRouter } from "react-router-dom";

class Demo extends React.Component {
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
      // itemType.style.display = "block";
      itemType.style.opacity = 1;
    }
  };

  goToSignup = () => {
    this.props.history.push("/signup");
  }

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
        <img className="logo"></img>
        <div className="whiteBackground">
          <div className="userInfo">
            <div className="name__section">guest님의 냉장고입니다.</div>
            <span className="loggedOut" onClick={this.goToSignup}>
              회원가입
            </span>
          </div>
          <div className="content">
            <div className="left">
              {/* 왼쪽 냉장고 */}
              <div className="fridge">
                <div className="fridge_leftside">
                  <img className="fridge_left" src={left_fridge}></img>
                  <div className="left_items">
                    <img id="mandu" src={mandu}></img>
                    <img id="eggs" src={eggs}></img>
                    <img id="dairy" src={dairy}></img>
                  </div>
                </div>

                {/* <img className="fridge_rightside" src={right_fridge}></img>
              <div className="fridge_rightside">
                <img id="seafood" src={fish}></img>
                <img id="meat" src={meat}></img>
                <img id="fruits" src={fruit}></img>
                <img id="veges" src={veges}></img>
              </div> */}
                <div className="fridge_rightside">
                  <img className="fridge_right" src={right_fridge}></img>
                  <div className="right_items">
                    <img id="seafood" src={fish}></img>
                    <img id="meat" src={meat}></img>
                    <div className="freshSection">
                      <img id="fruits" src={fruit}></img>
                      <img id="veges" src={veges}></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽 화면*/}
            <div className="right">
              <AddItems
                changeItems={this.changeItems}
                changePart={this.changePart}
                items={this.state.items}
                currentPart={this.state.currentPart}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// 카테고리
// 이름
export default withRouter(Demo);