import React, { Component } from "react";

export default class Itemlist extends Component {
  constructor(props) {
    super(props);
  }

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
    } else if (obj.type === "fruit") {
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

      return `${howManyDaysLeft}일 남았습니다.`;
    } else {
      // 사용자가 날짜를 선택하지 않으면, 구매 날짜는 현재이고, ( 소비 기한 - 오늘 날짜 )일이 남음
      let dateYouBought = new Date(obj.date).toLocaleDateString();
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
        return `${Math.abs(howManyDaysLeft)}일 지났습니다.`;
      } else {
        return `${howManyDaysLeft}일 남았습니다.`;
      }
    }
  };

  render() {
    const { items } = this.props;
    // console.log(items);
    return (
      <div className="demo__itemListBox">
        <div className="demo__itemList__title">나의 냉장고에 있는 재료들</div>
        <div className="demo__itemList__category">
          <div className="fridge_Section">
            <div>냉장 식품</div>
            <ul>
              {items.map((item) =>
                item.type !== "mandu" ? (
                  <li>
                    {!item.date
                      ? `${item.name} (구매 날짜 : ${
                          this.currentDate
                        } (${this.getDDay(item)})`
                      : `${
                          item.name
                        } (구매 날짜 : ${item.date.toLocaleString()} (${this.getDDay(
                          item
                        )})`}
                  </li>
                ) : null
              )}
            </ul>
          </div>

          <div className="frozen_Section">
            <div>냉동 식품</div>
            <ul>
              {items.map((item) =>
                item.type === "mandu" ? (
                  <li>
                    {!item.date
                      ? `${item.name} (구매 날짜 : ${
                          this.currentDate
                        } (${this.getDDay(item)})`
                      : `${
                          item.name
                        } (구매 날짜 : ${item.date.toLocaleString()} (${this.getDDay(
                          item
                        )})`}
                  </li>
                ) : null
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
