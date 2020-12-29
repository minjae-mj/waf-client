import axios from "axios";
import React, { Component } from "react";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        "선택 필수",
        "dairy",
        "fruit",
        "vegetables",
        "meat",
        "fish",
        "frozen",
        "eggs",
      ],
      collection: [
        {
          id: 1,
          item: "brocolli",
          category: "vegitable",
          part: "fridge",
          created_at: "2020-12-25",
          modified_at: "",
        },
      ],
      item: "",
      category: "",
      part: "",
      created_at: `${new Date()}`,
      modified_at: "",
      boughtToday: false,
    };
  }
  // inputValueHandler = (key) => (e) => {
  //   this.setState({ [key]: e.target.value });
  // };
  inputValueHandler = (key) => (e) => {
    this.setState((prevState) => ({
      // purchase: {
      [key]: e.target.value,
      // },
    }));
  };
  boughtToday = (e) => {
    const modified_date = document.querySelector(".calendar");

    if (e.target.checked) {
      this.setState({
        boughtToday: true,
      });
    } else {
      this.setState({
        boughtToday: false,
        modified_at: modified_date,
      });
    }
  };
  putDatabase = () => {
    axios
      .post(
        "https://localhost:4000//myfridge/cart", //개인마다 카트가 다름.
        this.state.collection,
        {
          "Content-Type": "application/json",
          withCredentials: true,
        }
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  putCollection = (e) => {
    const { collection } = this.state;
    const {
      item,
      category,
      part,
      modified_at,
      created_at,
      boughtToday,
    } = this.state;

    if (!item || !category || !part) {
      console.log("더넣어");
    } else {
      if (boughtToday) {
        const container = [
          {
            item: item,
            category: category,
            part: part,
            created_at: created_at,
          },
        ];
        this.setState({ collection: collection.concat(...container) });
      } else {
        const container1 = [
          {
            item: item,
            category: category,
            part: part,
            modified_at: modified_at,
          },
        ];
        this.setState({ collection: collection.concat(...container1) });
      }
    }
    console.log(e);
  };
  deleteCollection = () => {};
  render() {
    const { categories, collection } = this.state;
    const { userName, usernameOauth } = this.props;
    return (
      <div>
        <div className="username">{userName}의 냉장고입니다.</div>

        {/* 리스트업을 위한 자리 */}
        <ul>
          {/* eslint-disable-next-line array-callback-return */}
          {collection.map((item) => {
            return (
              <li key={item.id}>
                <div>{item.item}</div>
                <div>{item.category}</div>
                <div>{item.part}</div>
                {item.modified_at ? (
                  <div>{item.modified_at}</div>
                ) : (
                  <div>{item.created_at}</div>
                )}
              </li>
            );
          })}
        </ul>
        {/* addItem을 위한 인풋창 */}
        <button onClick={this.deleteCollection}> - </button>
        <select
          name="categories"
          type="category"
          onChange={this.inputValueHandler("category")}
        >
          {categories.map((c, index) => {
            return (
              <option value={c} key={index}>
                {c}
              </option>
            );
          })}
        </select>
        <input
          placeholder="구매하신 것을 적어주세요"
          type="item"
          onChange={this.inputValueHandler("item")}
        ></input>
        <select type="part" onChange={this.inputValueHandler("part")}>
          <option value="options">선택필수</option>
          <option value="normal">상온</option>
          <option value="fridge">냉장</option>
          <option value="frozen">냉동</option>
        </select>

        <input
          type="checkbox"
          name="오늘구매"
          onClick={this.boughtToday.bind(this)}
        ></input>
        {this.state.boughtToday ? (
          <></>
        ) : (
          <input
            type="date"
            className="calendar"
            onChange={this.inputValueHandler("modified_at")}
          ></input>
        )}
        <button onClick={this.putCollection}> + </button>
        <button onClick={this.putDatabase}> 냉장고에 넣기 </button>
      </div>
    );
  }
}
export default AddItem;
