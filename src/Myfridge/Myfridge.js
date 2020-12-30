import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RealFridge from "./RealFridge";

class Myfridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userData: [
        {
          id: "12",
          item: "brocolli",
          category: "seafood",
          part: "fridge",
          created_at: "2020-12-25",
          modifiedAt: "",
        },
        {
          id: "124",
          item: "brocolli",
          category: "eggs",
          part: "fridge",
          created_at: "2020-12-25",
          modifiedAt: "",
        },
      ],
      partFridge: [],
      partFrozen: [],
      partNormal: [],
    };
    this.getUserFridge = this.getUserFridge.bind(this);
    console.log(this.props.location.isLogin);
    console.log(this.props.location.userName);
  }

  async getUserFridge() {
    const userid = window.localStorage.getItem("userid");

    await axios
      // eslint-disable-next-line no-undef
      .get(`http://localhost:4000/myfridge/${userid}`)
      .then((res) => {
        console.log(res);
        if (res.data) {
          this.setState({ userData: res.data });
          for (let el of res.data) {
            if (el.part === "fridge") {
              this.setState((prev) => ({
                partFridge: prev.partFridge.concat(el),
              }));
            } else if (el.part === "frozen") {
              this.setState((prev) => ({
                partFrozen: prev.partFrozen.concat(el),
              }));
            } else {
              this.setState((prev) => ({
                partNormal: prev.partNormal.concat(el),
              }));
            }
          }
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getUserFridge();
    console.log("che merda2222222222222222222");
  }

  render() {
    const { logoutHandler, userName } = this.props.location;
    const { userData, partNormal, partFrozen, partFridge } = this.state;
    const name = window.localStorage.getItem("userName");

    return (
      <div className="Myfridge__container">
        <div className="Myfridge__userbox">
          <div className="username"> {name} 님의 냉장고입니다.</div>
          {/* {(세션로그인)? ():()} */}
          <button className="logout" onClick={logoutHandler}>
            로그아웃
          </button>
        </div>
        <RealFridge
          userData={userData}
          partNormal={partNormal}
          partFrozen={partFrozen}
          partFridge={partFridge}
          userName={userName}
        />
      </div>
    );
  }
}

export default withRouter(Myfridge);
