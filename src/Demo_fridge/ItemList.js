/* eslint-disable no-extend-native */
import React, { Component } from "react";

export default class Itemlist extends Component {
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

      return `${howManyDaysLeft}일 남음`;
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
        return `${Math.abs(howManyDaysLeft)}일 지남`;
      } else {
        return `${howManyDaysLeft}일 남음`;
      }
    }
  };

  showListDemo = (e) => {
    console.log(e.target.innerHTML);
    for (let item of this.props.items) {
      if (e.target.innerHTML !== "전체" && item.part === e.target.innerHTML) {
        let itemStyle = document.querySelectorAll(`#${item.part}`);
        for (let el of itemStyle) {
          el.style.display = "block";
        }
      } else {
        if (e.target.innerHTML === "전체") {
          let itemStyle = document.querySelectorAll(`#전체`);
          for (let el of itemStyle) {
            el.style.display = "block";
          }
        }
      }
    }
  };

  render() {
    const { items } = this.props;
    {
      console.log({ items });
    }

    return (
      <div className="demo__itemListBox">
        {/* <div className="demo__itemList__title">나의 냉장고에 있는 재료들</div> */}
        <div className="demo__itemList__category">
          <div className="fridge_Section">
            <div className="demopart_section" onClick={this.showListDemo}>
              전체
            </div>
            <ul className="demoul_section">
              {items.map((item) =>
                item.part === "냉장" ||
                item.part === "상온" ||
                item.part === "냉동" ? (
                  <>
                    <li id="전체" className="demoli">
                      {item.name}
                    </li>
                    <span className="demoperiod">{this.getDDay(item)}</span>
                  </>
                ) : (
                  <></>
                )
              )}
            </ul>
          </div>

          <div className="fridge_Section">
            <div className="demopart_section" onClick={this.showListDemo}>
              상온
            </div>
            <ul className="demoul_section">
              {items.map((item) =>
                item.part === "상온" ? (
                  <>
                    <li id="상온" className="demoli">
                      {item.name}
                    </li>
                    <span className="demoperiod">{this.getDDay(item)}</span>
                  </>
                ) : (
                  <></>
                )
              )}
            </ul>
          </div>

          <div className="fridge_Section">
            <div className="demopart_section" onClick={this.showListDemo}>
              냉장
            </div>
            <ul className="demoul_section">
              {items.map((item) =>
                item.part === "냉장" ? (
                  <>
                    <li id="냉장" className="demoli">
                      {item.name}
                    </li>
                    <span className="demoperiod">{this.getDDay(item)}</span>
                  </>
                ) : (
                  <></>
                )
              )}
            </ul>
          </div>

          <div className="fridge_Section">
            <div className="demopart_section" onClick={this.showListDemo}>
              냉동
            </div>
            <ul className="demoul_section">
              {items.map((item) =>
                item.part === "냉장" ? (
                  <>
                    <li id="냉동" className="demoli">
                      {item.name}
                    </li>
                    <span className="demoperiod">{this.getDDay(item)}</span>
                  </>
                ) : (
                  <></>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
// props.items = {
//   type: selectVal,
//   name: nameVal,
//   date: dateVal,
// };
