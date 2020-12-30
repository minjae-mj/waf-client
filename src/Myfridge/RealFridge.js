/* eslint-disable no-extend-native */
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
import axios from "axios";

class RealFridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "전체",
    };
  }

  goToCart = () => {
    const name = window.localStorage.getItem("userName");

    this.props.history.push({
      pathname: "/cart",
      userName: name,
    });
  };

  showLists = (e) => {
    if (this.state.status === "") {
      const partBox = [];
      this.setState({ status: e.target.innerText });
      const res = document.querySelectorAll(`#${e.target.innerText}`);
      partBox.push(this.state.status);
      for (let item of res) {
        item.style.display = "block";
      }
    } else {
      if (
        this.state.status === "전체" ||
        this.state.status === "상온" ||
        this.state.status === "냉장" ||
        this.state.status === "냉동"
      ) {
        const partBox = [];
        partBox.push(this.state.status);
        this.setState({ status: e.target.innerText });
        partBox.push(e.target.innerText);
        if (partBox[0] === e.target.innerText) {
          partBox.pop();
          return;
        } else {
          const newResult = document.querySelectorAll(`#${e.target.innerText}`);
          const oldResult = document.querySelectorAll(`#${partBox[0]}`);
          for (let el of newResult) {
            el.style.display = "block";
            console.log(el.innerText);
          }
          for (let ele of oldResult) {
            ele.style.display = "none";
          }
          partBox.pop();
        }
        console.log(partBox, this.state);
      }
    }
  };

  showImages = () => {
    for (let item of this.props.userData) {
      let itemType = document.querySelector(`#${item.category}`);
      itemType.style.display = "block";
    }
  };

  removeItem = async (e) => {
    const item = e.target.parentElement.children[1].innerText;
    const userid = window.localStorage.getItem("userid");

    await axios
      .put("http://localhost:4000/myfridge/removeItem", {
        userid: userid,
        item: item,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.error);
  };

  getDDay = (expiredAfter, modifiedAt, createdAt) => {
    const current = new Date().getTime();
    const dateOfPurchase = modifiedAt
      ? new Date(modifiedAt).getTime()
      : new Date(createdAt).getTime();
    const addDaysTo = (days) => {
      Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
      var date = new Date(dateOfPurchase);
      return date.addDays(days).toISOString();
    };
    const expire = new Date(addDaysTo(expiredAfter)).getTime();
    const distance = Math.floor(current - expire);
    if (distance < 0) {
      const result = Math.abs(Math.floor(distance / (1000 * 60 * 60 * 24)));
      return `${result} 일 남았습니다.`;
    } else {
      return `${Math.floor(distance / (1000 * 60 * 60 * 24))} 일 지났습니다.`;
    }
  };

  componentDidMount() {
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
        {/* -------------------------------------------------------------------------------- */}
        <div className="right">
          <div className="part__division">
            <div type="전체" className="partList" onClick={this.showLists}>
              전체
            </div>
            <div type="상온" className="partList" onClick={this.showLists}>
              상온
            </div>
            <div type="냉장" className="partList" onClick={this.showLists}>
              냉장
            </div>
            <div type="냉동" className="partList" onClick={this.showLists}>
              냉동
            </div>
          </div>
          <div>
            <ul className="sidebar">
              {userData ? (
                userData.map((item) => (
                  <div>
                    <button
                      id="전체"
                      className="part__TotalList"
                      onClick={this.removeItem}
                    >
                      -
                    </button>
                    <li id="전체" className="part__TotalList" key={item.id}>
                      {item.name}
                    </li>
                    <span id="전체" className="part__TotalList">
                      소비기한 :
                      {this.getDDay(
                        item.expiredAfter,
                        item.modifiedAt,
                        item.createdAt
                      )}
                    </span>
                  </div>
                ))
              ) : (
                <></>
              )}
              {partFridge ? (
                partFridge.map((item) => (
                  <div>
                    <button
                      id="냉장"
                      className="part__List"
                      onClick={this.removeItem}
                    >
                      -
                    </button>
                    <li id="냉장" className="part__List" key={item.id}>
                      {item.name}
                    </li>
                    <span id="냉장" className="part__List">
                      소비기한 :
                      {this.getDDay(
                        item.expiredAfter,
                        item.modifiedAt,
                        item.createdAt
                      )}
                    </span>
                  </div>
                ))
              ) : (
                <></>
              )}
              {partFrozen ? (
                partFrozen.map((item) => (
                  <div>
                    <button
                      id="냉동"
                      className="part__List"
                      onClick={this.removeItem}
                    >
                      -
                    </button>
                    <li id="냉동" className="part__List" key={item.id}>
                      {item.name}
                    </li>
                    <span id="냉동" className="part__List">
                      소비기한 :
                      {this.getDDay(
                        item.expiredAfter,
                        item.modifiedAt,
                        item.createdAt
                      )}
                    </span>
                  </div>
                ))
              ) : (
                <></>
              )}
              {partNormal ? (
                partNormal.map((item) => (
                  <div>
                    <button
                      id="상온"
                      className="part__List"
                      onClick={this.removeItem}
                    >
                      -
                    </button>
                    <li id="상온" className="part__List" key={item.id}>
                      {item.name}
                    </li>
                    <span id="상온" className="part__List">
                      소비기한 :
                      {this.getDDay(
                        item.expiredAfter,
                        item.modifiedAt,
                        item.createdAt
                      )}
                    </span>
                  </div>
                ))
              ) : (
                <></>
              )}
            </ul>
            <button onClick={this.goToCart}> 냉장고에 더 넣기 </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RealFridge);
