import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RealFridge from "./RealFridge";

class Myfridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userData: [],
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
            } else if (el.part === "normal") {
              this.setState((prev) => ({
                partNormal: prev.partNormal.concat(el),
              }));
              console.log(this.state.partNormal);
            }
          }
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getUserFridge();
    console.log("che merda2222222222222222222");
    console.log(this.props);
  }

  render() {
    const { logoutHandler, userName } = this.props.location;
    const { userData, partFridge, partFrozen, partNormal } = this.state;
    const name = window.localStorage.getItem("userName");
    // const logoutHandlerLocal = window.localStorage.getItem("logoutHandler");

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
          userName={userName}
          partFridge={partFridge}
          partFrozen={partFrozen}
          partNormal={partNormal}
        />
      </div>
    );
  }
}

export default withRouter(Myfridge);
