/* eslint-disable jsx-a11y/alt-text */
import { Component } from "react";
import "./Myfridge.css";
import left_fridge from "../Demo_fridge/img_fridge/left_fridge.png";
import mandu from "../Demo_fridge/img_fridge/mandu.png";
import eggs from "../Demo_fridge/img_fridge/eggs.png";
import dairy from "../Demo_fridge/img_fridge/dairy.png";
import right_fridge from "../Demo_fridge/img_fridge/right_fridge.png";
import fish from "../Demo_fridge/img_fridge/fish.png";
import meat from "../Demo_fridge/img_fridge/meat.png";
import veges from "../Demo_fridge/img_fridge/veges.png";
import fruit from "../Demo_fridge/img_fridge/fruit.png";
import { withRouter } from "react-router-dom";

class RealFridge extends Component {
  goToCart = () => {
    const name = window.localStorage.getItem("userName");
    this.props.history.push({
      pathname: "/cart",
      userName: name,
    });
  };

  showImages = () => {
    console.log(this.props.userData);
    for (let item of this.props.userData) {
      let itemType = document.querySelector(`#${item.category}`);
      itemType.style.display = "block";
    }
  };

  componentDidMount() {
    console.log(this.props);
    this.showImages();
  }
  componentDidUpdate() {
    this.showImages();
  }

  render() {
    const { userData, partNormal, partFrozen, partFridge } = this.props;
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
        <div className="part__division">
          <div className="partNormal">상온</div>
          <div className="partFridge">냉장</div>
          <div className="partFrozen">냉동</div>
        </div>
        <div>
          <ul className="sidebar">
            {partFridge ? (
              partFridge.map((item) => (
                <li className="Item__List" key={item.id}>
                  {item.item} {item.category}
                </li>
              ))
            ) : (
              <></>
            )}
            {partFrozen ? (
              partFrozen.map((item) => (
                <li className="Item__List" key={item.id}>
                  {item.item} {item.category}
                </li>
              ))
            ) : (
              <></>
            )}
            {partNormal ? (
              partNormal.map((item) => (
                <li className="Item__List" key={item.id}>
                  {item.item} {item.category}
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
          <button onClick={this.goToCart}> 냉장고에 더 넣기 </button>
        </div>
      </div>
    );
  }
}

export default withRouter(RealFridge);
