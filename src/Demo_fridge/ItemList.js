/**
 * /* eslint-disable no-extend-native
 *
 * @format
 */

import React, { Component } from "react";

export default class Itemlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPart: "전체",
    };
  }

  changePart = (e) => {
    let findActiveClass = document.querySelector(".active");
    findActiveClass.classList.remove("active");

    let targetCategory = e.target;
    targetCategory.classList.add("active");

    let part = e.target.innerHTML;
    this.setState({ currentPart: part });
  };
  deleteItem = (e) => {
    let target = e.target.parentNode;
    console.log(target);
  };

  addDaysTo = (days) => {
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    var date = new Date();
    return date.addDays(days).toLocaleDateString();
  };

  currentDate = new Date().toLocaleDateString();
  currentTime = new Date().getTime();
  getDDay = (obj) => {
    let expireDate = 0;
    if (obj.type === "mandu") {
      expireDate = 730; // 냉동은 2년
    } else if (obj.type === "eggs") {
      expireDate = 14; // 계란은 14일
    } else if (obj.type === "veges") {
      expireDate = 7; // 야채는 7일
    } else if (obj.type === "seafood") {
      expireDate = 7; // 해산물은 7일
    } else if (obj.type === "meat") {
      expireDate = 5; // 육류는 5일
    } else if (obj.type === "fruits") {
      expireDate = 10; // 과일은 10일
    } else if (obj.type === "dairy") {
      expireDate = 9; // 유제품은 9일
    }

    if (!obj.date) {
      // 사용자가 날짜를 선택하지 않으면, 구매 날짜는 현재이고, ( 소비 기한 - 오늘 날짜 )일이 남음
      let expire = new Date(this.addDaysTo(expireDate)).getTime();
      let howManyDaysLeft = Math.floor(
        (expire - this.currentTime) / (1000 * 60 * 60 * 24)
      );

      return <div className="stillLeft">{howManyDaysLeft}일 남음</div>;
    } else {
      // 사용자가 날짜를 선택하지 않으면, 구매 날짜는 현재이고, ( 소비 기한 - 오늘 날짜 )일이 남음
      let dateYouBought = new Date(obj.date).toISOString();
      let addDaysTo = (days) => {
        Date.prototype.addDays = function (days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
        var date = new Date(dateYouBought);
        return date.addDays(days).toLocaleDateString();
      };

      let expire = new Date(addDaysTo(expireDate)).getTime();
      let howManyDaysLeft = Math.floor(
        (expire - this.currentTime) / (1000 * 60 * 60 * 24)
      );

      if (howManyDaysLeft < 0) {
        return (
          <div className="expired">{Math.abs(howManyDaysLeft)}일 지남</div>
        );
      } else {
        return <div className="stillLeft">{howManyDaysLeft}일 남음</div>;
      }
    }
  };

  render() {
    const { items, changePart } = this.props;

    return (
      <div className="demo__itemListBox">
        <div className="demo__itemList__category">
          <div className="demopart_section" onClick={this.changePart}>
            <div className="part active" onClick={changePart}>
              전체
            </div>
            <div className="part" onClick={changePart}>
              냉장
            </div>
            <div className="part" onClick={changePart}>
              상온
            </div>
            <div className="part" onClick={changePart}>
              냉동
            </div>
          </div>
          <div className="fridge_Section">
            {this.state.currentPart === "전체"
              ? items.map((item) => (
                  <div className="item__info">
                    <div className="item__name">{item.name}</div>
                    <>{this.getDDay(item)}</>
                  </div>
                ))
              : items.map((item) =>
                  item.part === this.state.currentPart ? (
                    <div className="item__info">
                      <div className="item__name">{item.name}</div>
                      <>{this.getDDay(item)}</>
                    </div>
                  ) : null
                )}
          </div>
        </div>
      </div>
    );
  }
}
