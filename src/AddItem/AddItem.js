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
        {},
        {},
      ],

      item: "",
      category: "",
      part: "",
      created_at: new Date(),
      modified_at: "",
      boughtToday: true,
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
    if (e.target.checked) {
      this.setState({
        // purchase: {
        boughtToday: true,
        // },
      });
    } else {
      this.setState({
        // purchase: {
        boughtToday: false,
        // },
      });
    }
  };

  putDatabase = () => {
    axios
      .post(
        "https://localhost:4000//myfridge/cart/:id", //개인마다 카트가 다름.
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
    const {
      item,
      category,
      part,
      created_at,
      modified_at,
      boughtToday,
    } = this.state;

    if (
      !item ||
      !category ||
      !part ||
      !created_at ||
      !modified_at ||
      !boughtToday
    ) {
      console.log("더넣어");
    } else {
      const container = [];
      container.push({
        item,
        category,
        part,
        boughtToday,
        modified_at,
        created_at,
      });
    }
    console.log(e);
  };

  deleteCollection = () => {};

  render() {
    const { categories, collection } = this.state;
    const { userName, usernameOauth } = this.props;

    return (
      <div>
        {userName ? (
          <div className="username">{userName}의 냉장고입니다.</div>
        ) : (
          <div className="username">{usernameOauth}의 냉장고입니다.</div>
        )}
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
          <option value="fridge">선택필수</option>
          <option value="fridge">상온</option>
          <option value="fridge">냉장</option>
          <option value="frozen">냉동</option>
        </select>
        <input
          type="checkbox"
          name="오늘구매"
          onClick={this.boughtToday.bind(this)}
        ></input>
        <input
          type="date"
          onChange={this.inputValueHandler("modified_at")}
        ></input>
        <button onClick={this.putCollection}> + </button>
        <button onClick={this.putDatabase}> 냉장고에 넣기 </button>
      </div>
    );
  }
}

export default AddItem;
