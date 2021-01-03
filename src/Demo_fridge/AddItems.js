import React from "react";
import "./Demo.css";
import Itemlist from "./ItemList";

export default class Demo extends React.Component {
  // props.value === [{},{},{} ...]

  clickBtn = () => {
    let selectVal = document.querySelector(`#fridge__select`).value;
    let nameVal = document.querySelector(`.itemName`).value;
    let dateVal = document.querySelector(`.dateYouBuy`).value;
    let partVal = document.querySelector(`#fridge__select__part`).value;

    let info = {
      type: selectVal,
      name: nameVal,
      date: dateVal,
      part: partVal,
    };
    if (nameVal.length === 0) {
      alert("재료 이름을 적어주세요");
    } else {
      this.props.changeItems(info);
    }
  };

  // componentDidUpdate() {
  //   let selectVal = document.querySelector(`#fridge__select`).value;
  //   let nameVal = document.querySelector(`.itemName`).value;
  //   let dateVal = document.querySelector(`.dateYouBuy`).value;

  //   selectVal = "type";
  //   nameVal = "";
  //   dateVal = "";
  // }

  render() {
    return (
      <div className="container__DemoAdd">
        <div className="fridge__inputBox">
          <div className="fridge__inputBox__title">
            냉장고에 물건을 추가해주세요
          </div>
          <div className="demo__inputContainer">
            <select id="fridge__select">
              {/* <option value="Type">Type</option> */}
              <option value="shouldChoose">선택필수</option>
              <option value="meat">Meat</option>
              <option value="seafood">Seafood</option>
              <option value="veges">Veges</option>
              <option value="fruits">Fruits</option>
              <option value="eggs">Eggs</option>
              <option value="dairy">Dairy</option>
              <option value="mandu">Frozen</option>
            </select>

            <select id="fridge__select__part">
              <option value="선택필수">선택필수</option>
              <option value="상온">상온</option>
              <option value="냉장">냉장</option>
              <option value="냉동">냉동</option>
            </select>

            <input
              className="itemName"
              type="text"
              placeholder="재료 이름을 적어주세요"
            ></input>
            <input className="dateYouBuy" type="date"></input>
            <button
              className="inputbutton__demo"
              onClick={() => this.clickBtn()}
            >
              냉장고에 재료 넣기
            </button>
          </div>
        </div>
        <Itemlist items={this.props.items} />
      </div>
    );
  }
}
