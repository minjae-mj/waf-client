import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

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
          item: "brocolli",
          category: "vegitable",
          part: "fridge",
          created_at: "2020-12-25",
          modifiedAt: "",
        },
      ],
      item: "",
      category: "",
      part: "",
      created_at: `${new Date().toISOString().split("T")[0]}`,
      modifiedAt: "",
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
        modifiedAt: modified_date,
      });
    }
  };
  putDatabase = async () => {
    const { collection } = this.state;
    const userid = window.localStorage.getItem("userid");
    await axios
      .post(
        "http://localhost:4000/myfridge/cart", //개인마다 카트가 다름.
        { collection: collection, userid: userid }
      )
      .then((response) => {
        console.log(response);
        this.props.history.push("/myfridge");
      })
      .catch((err) => console.log(err));
  };
  putCollection = (e) => {
    const { collection } = this.state;
    const {
      item,
      category,
      part,
      modifiedAt,
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
            modifiedAt: modifiedAt,
          },
        ];
        this.setState({ collection: collection.concat(...container1) });
      }
    }
  };

  deleteCollection = () => {
    const { collection } = this.state;
    this.setState({ collection: collection.slice(0, collection.length - 1) });
  };

  render() {
    const name = window.localStorage.getItem("userName");
    const { categories, collection } = this.state;
    return (
      <div>
        <div className="username">
          {/* {this.props.location.userName} */}
          {name}
          님의 카트입니다.
        </div>

        {/* 리스트업을 위한 자리 */}
        <ul>
          {/* eslint-disable-next-line array-callback-return */}
          {collection.map((item) => {
            return (
              <li key={item.item}>
                <div>{item.item}</div>
                <div>{item.category}</div>
                <div>{item.part}</div>
                {item.modifiedAt ? (
                  <div>{item.modifiedAt}</div>
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
        <span>오늘 구매</span>
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
            onChange={this.inputValueHandler("modifiedAt")}
          ></input>
        )}
        <button onClick={this.putCollection}> + </button>
        <button onClick={this.putDatabase}>냉장고에 넣기</button>
      </div>
    );
  }
}
export default withRouter(AddItem);
