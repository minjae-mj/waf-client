import axios from "axios";
import React, { Component } from "react";
import "./Signup.css";

export default class Signup extends Component {
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
    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.state.username);
    console.log(this.state.mobile);
    axios.post("http://localhost:4000/signup", this.state);
  };

  render() {
    return (
      <div id="signup">
        <input
          placeholder="이름을 작성해주세요"
          type="username"
          onChange={this.handleInputValue("username")}
        ></input>
        <input
          placeholder="비밀번호를 작성해주세요"
          type="password"
          onChange={this.handleInputValue("password")}
        ></input>
        <input
          placeholder="이메일을 작성해주세요"
          type="email"
          onChange={this.handleInputValue("email")}
        ></input>
        <input
          placeholder="모바일 넘버를 작성해주세요."
          type="mobile"
          onChange={this.handleInputValue("mobile")}
        ></input>
        <button onClick={() => this.clickBtn()}>회원 가입하기</button>
      </div>
    );
  }
}
