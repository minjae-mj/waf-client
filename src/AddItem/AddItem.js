import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./addItem.css";
import logo from "./Waf.png";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        "선택 필수",
        "dairy",
        "fruits",
        "veges",
        "meat",
        "seafood",
        "mandu",
        "eggs",
      ],
      collection: [],
      item: "",
      category: "",
      part: "",
      created_at: `${new Date().toISOString().split("T")[0]}`,
      modifiedAt: "",
      boughtToday: false,
    };
  }

  inputValueHandler = (key) => (e) => {
    this.setState((prevState) => ({
      [key]: e.target.value,
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
    const { item, category, part } = this.state;

    if (!item || !category || !part || category === "선택 필수") {
      alert("필수사항을 입력해주세요");
    } else {
      const userid = window.localStorage.getItem("userid");
      await axios
        .post("http://localhost:4000/myfridge/cart", {
          collection: collection,
          userid: userid,
        })
        .then((response) => {
          this.props.history.push({
            pathname: "/myfridge",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

    if (!item || !category || !part || category === "선택 필수") {
      alert("필수사항을 입력해주세요");
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
  goBackToFridge = () => {
    this.props.history.push("/myfridge");
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
        <img className="logo" src={logo} />
        <div className="greenBox">
          <div className="userInfo">
            <div className="username">{name}님의 카트입니다.</div>
            <div className="backBtn" onClick={this.goBackToFridge}>
              냉장고로 돌아가기
            </div>
          </div>
          <div className="inputArea">
            <div className="Item__btn  input" onClick={this.deleteCollection}>
              -
            </div>
            <select
              name="categories"
              type="category"
              className="input"
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
              className="input"
              onChange={this.inputValueHandler("item")}
            ></input>
            <select
              type="part"
              className="input"
              onChange={this.inputValueHandler("part")}
            >
              <option value="options">선택필수</option>
              <option value="normal">상온</option>
              <option value="fridge">냉장</option>
              <option value="frozen">냉동</option>
            </select>
            <span>오늘 구매</span>
            <input
              type="checkbox"
              className="input"
              name="오늘구매"
              onClick={this.boughtToday.bind(this)}
            ></input>
            {this.state.boughtToday ? (
              <></>
            ) : (
              <input
                type="date"
                className="calendar"
                className="input"
                onChange={this.inputValueHandler("modifiedAt")}
              ></input>
            )}
            <div className="Item__btn input" onClick={this.putCollection}>
              +
            </div>
          </div>

          <div className="listBox">
            <ul>
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
          </div>
          <button className="addItemBtn" onClick={this.putDatabase}>
            냉장고에 넣기
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(AddItem);
