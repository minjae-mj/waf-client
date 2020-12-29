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
import { Link } from "react-router-dom";

class RealFridge extends Component {
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
      let itemType = document.querySelector(`#${item.category}`);
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
    const { userData } = this.props;
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
        <div>
          <ul className="sidebar">
            {userData.map((item) => {
              <li key={item.id}>{item.category}</li>;
            })}
          </ul>
          <Link to="/cart">
            <button> 냉장고에 넣기 </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default RealFridge;
