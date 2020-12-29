import axios from "axios";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import RealFridge from "./RealFridge";

class Myfridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userData: [
        {
          id: 1,
          item: "brocolli",
          category: "vegitable",
          part: "fridge",
          created_at: "2020-12-25",
          modified_at: "",
        },
        {
          id: 1,
          item: "brocolli",
          category: "vegitable",
          part: "fridge",
          created_at: "2020-12-25",
          modified_at: "",
        },
        {
          id: 1,
          item: "brocolli",
          category: "vegitable",
          part: "fridge",
          created_at: "2020-12-25",
          modified_at: "",
        },
      ],
    };
    this.getUserFridge = this.getUserFridge.bind(this);
    console.log(this.props.location.isLogin);
    console.log(this.props.location.userName);
  }

  async getUserFridge() {
    let data = await axios
      .get("http://localhost:4000//myfridge/:userid")
      .then((res) => console.log(res));
    this.setState({ userData: data });
  }

  componentDidUpdate() {
    this.getUserFridge();
  }

  render() {
    const { logoutHandler } = this.props.location;
    const { userData } = this.state;

    return (
      <div className="Myfridge__container">
        <div className="Myfridge__userbox">
          <div className="username">
            {this.props.location.userName}의 냉장고입니다.
          </div>
          {/* {(세션로그인)? ():()} */}
          <button className="logout" onClick={logoutHandler}>
            로그아웃
          </button>
        </div>
        <RealFridge userData={userData} />
        {/* <ul className="sidebar">
          {userData.map((item) => {
            <li key={item.id}>{item.category}</li>;
          })}
        </ul> */}
        {/* <Link to="/cart">
          <button> 냉장고에 넣기 </button>
        </Link> */}
      </div>
    );
  }
}

export default withRouter(Myfridge);
