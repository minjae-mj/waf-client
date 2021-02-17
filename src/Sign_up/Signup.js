/** @format */

import serverUrl from "../config/server";
import React, { Component } from "react";
import "./Signup.css";
import { withRouter } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      mobile: "",
    };
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  clickBtn = () => {
    const { email, password, mobile } = this.state;

    if (
      password.length >= 8 &&
      mobile[0] + mobile[1] + mobile[2] === "010" &&
      mobile.length === 11 &&
      email.includes("@") &&
      email.includes(".")
    ) {
      serverUrl
        .post("/users/signup", this.state)
        .then((res) => {
          this.props.history.push("/users");
        })
        .catch((err) => {
          if (err) {
            alert("이미 동일한 이메일이 존재합니다");
          }
        });
    } else {
      alert("유효한 정보가 아닙니다. 다시 작성해주세요");
    }
  };

  render() {
    return (
      <div className="register__wrapper">
        <p className="register__text">회원 정보를 입력해주세요</p>
        <input
          placeholder="이메일"
          type="email"
          className="input__email"
          onChange={this.handleInputValue("email")}
        />
        <input
          placeholder="비밀번호 (영문 및 숫자 8자리)"
          type="password"
          className="input__password"
          onChange={this.handleInputValue("password")}
        />
        <input
          placeholder="닉네임"
          type="username"
          className="input__username"
          onChange={this.handleInputValue("username")}
        />
        <input
          placeholder="휴대폰 번호"
          type="mobile"
          className="input__mobile"
          onChange={this.handleInputValue("mobile")}
        />
        <button
          className="btn__register btn__register__go"
          onClick={() => this.clickBtn()}
        >
          회원 가입하기
        </button>
      </div>
    );
  }
}

export default withRouter(Signup);
