/**
 * /* eslint-disable no-extend-native
 *
 * @format
 */

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
import serverUrl from "../config/server";

class RealFridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [],
      ingredient: "",
    };
  }

  goToCart = () => {
    const name = window.localStorage.getItem("userName");

    this.props.history.push({
      pathname: "/cart",
      userName: name,
    });
  };

  clickIngredient = (e) => {
    let target = e.target.innerText;
    this.setState({ ingredient: target });
    window.localStorage.setItem("ingredient", target);
    this.props.history.push({
      pathname: "/recipes",
    });
  };

  showLists = (e) => {
    const forRemove = document.querySelectorAll(".partList_click");
    console.log(forRemove);
    for (let el of forRemove) {
      el.classList.remove("partList_click");
    }
    if (e.target.id === "total") {
      this.setState({ status: this.props.userData });
      e.target.classList.add("partList_click");
    } else {
      if (e.target.id === "normal") {
        this.setState({ status: this.props.partNormal });
        e.target.classList.add("partList_click");
      } else if (e.target.id === "fridge") {
        this.setState({ status: this.props.partFridge });
        e.target.classList.add("partList_click");
      } else if (e.target.id === "frozen") {
        this.setState({ status: this.props.partFrozen });
        e.target.classList.add("partList_click");
      }
    }
  };

  showImages = () => {
    for (let item of this.props.userData) {
      let itemType = document.querySelector(`#${item.category}`);
      // itemType.style.display = "block";
      itemType.style.opacity = 1;
    }
  };

  removeItem = async (e) => {
    const item = e.target.parentElement.children[1].innerText;
    const userid = window.localStorage.getItem("userid");

    await serverUrl
      .put("/myfridge/removeItem", {
        userid: userid,
        item: item,
      })
      .then((res) => {
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
      return <span className="part__Yet__expired"> {result}일 남음</span>;
    } else {
      return (
        <span className="part__expired">
          {Math.floor(distance / (1000 * 60 * 60 * 24))}일 지남
        </span>
      );
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
    const { status } = this.state;
    return (
      <div id="myfridge">
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
        {/* -------------------------------------------------------------------------------- */}
        <div className="right__my">
          <div className="part__division">
            <div
              id="total"
              className="partList partList_click"
              onClick={this.showLists}
            >
              전체
            </div>
            <div id="normal" className="partList" onClick={this.showLists}>
              상온
            </div>
            <div id="fridge" className="partList" onClick={this.showLists}>
              냉장
            </div>
            <div id="frozen" className="partList" onClick={this.showLists}>
              냉동
            </div>
          </div>

          <div className="sidebar_container">
            <ul className="sidebar">
              {status.length !== 0
                ? status.map((item) => (
                    <div className="bundleOfList">
                      <div
                        className="part__TotalList__minus"
                        onClick={this.removeItem}
                      >
                        -
                      </div>
                      <li
                        className="part__TotalList__item"
                        key={item.id}
                        onClick={this.clickIngredient}
                      >
                        {item.name}
                      </li>
                      <>
                        {this.getDDay(
                          item.expiredAfter,
                          item.modifiedAt,
                          item.createdAt
                        )}
                      </>
                    </div>
                  ))
                : userData.map((item) => (
                    <div className="bundleOfList">
                      <div
                        className="part__TotalList__minus"
                        onClick={this.removeItem}
                      >
                        -
                      </div>
                      <li
                        className="part__TotalList__item"
                        key={item.id}
                        onClick={this.clickIngredient}
                      >
                        {item.name}
                      </li>
                      <>
                        {this.getDDay(
                          item.expiredAfter,
                          item.modifiedAt,
                          item.createdAt
                        )}
                      </>
                    </div>
                  ))}
            </ul>
          </div>
          <div className="myfridge__button" onClick={this.goToCart}>
            냉장고에 재료 넣으러 가기
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RealFridge);
