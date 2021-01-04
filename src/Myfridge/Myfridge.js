/** @format */

import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RealFridge from "./RealFridge";
import "./Myfridge.css";
import logo from "./waf.png";

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
  }

  async getUserFridge() {
    const userid = window.localStorage.getItem("userid");

    await axios
      // eslint-disable-next-line no-undef
      .get(`http://13.209.19.135:4000/myfridge/${userid}`)
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
            }
          }
        }
      })
      .catch((err) => console.log(err));
  }

  logoutHandler = () => {
    window.location.replace("/");
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("isLogin");
    window.localStorage.removeItem("userid");
  };

  componentDidMount() {
    this.getUserFridge();
  }

  render() {
    const { userName } = this.props.location;
    const { userData, partFridge, partFrozen, partNormal } = this.state;
    const name = window.localStorage.getItem("userName");

    return (
      <div className="Myfridge__container">
        <img className="logo_" src={logo}></img>
        <div className="whiteBackground_myfridge">
          <div className="Myfridge__userbox">
            <div className="username__myfridge"> {name} 님의 냉장고입니다</div>
            <div className="spaceMaker"></div>
            <div className="logoutContainer">
              <button className="logout" onClick={this.logoutHandler}>
                로그아웃
              </button>
            </div>
          </div>

          <div className="myfridge__maincontent">
            <RealFridge
              userData={userData}
              userName={userName}
              partFridge={partFridge}
              partFrozen={partFrozen}
              partNormal={partNormal}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Myfridge);
