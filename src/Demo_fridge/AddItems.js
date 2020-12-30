import React from "react";
import "./Demo.css";
import Itemlist from "./ItemList";

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  // props.value === [{},{},{} ...]

  clickBtn = () => {
    let selectVal = document.querySelector(`#fridge__select`).value;
    let nameVal = document.querySelector(`.itemName`).value;
    let dateVal = document.querySelector(`.dateYouBuy`).value;
    let info = {
      type: selectVal,
      name: nameVal,
      date: dateVal,
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
      <div className="fridge__inputBox">
        <div className="fridge__inputBox__title">
          냉장고에 물건을 추가해주세요
        </div>
        <select id="fridge__select">
          {/* <option value="Type">Type</option> */}
          <option value="meat">Meat</option>
          <option value="seafood">Seafood</option>
          <option value="veges">Veges</option>
          <option value="fruits">Fruits</option>
          <option value="eggs">Eggs</option>
          <option value="dairy">Dairy</option>
          <option value="mandu">Frozen</option>
        </select>
        <input
          className="itemName"
          type="text"
          placeholder="재료 이름을 적어주세요"
        ></input>
        <input className="dateYouBuy" type="date"></input>
        <button onClick={() => this.clickBtn()}>냉장고에 재료 넣기</button>
        <Itemlist items={this.props.items} />
      </div>
    );
  }
}
