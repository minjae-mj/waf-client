import React, { Component } from "react";
import "./Login.css";
import { BrowserRouter as Router, Link, Switch } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super();

    this.state = {
      email: "",
      isEmailChecked: false,
      isPasswordChecked: false,
    };
  }

  EmailValidator = (e) => {
    console.log(e.target.value);
    const emailInput = e.target.value;
    if (
      emailInput.length > 4 &&
      emailInput.includes("@") &&
      emailInput.includes(".")
    ) {
      this.setState({ isEmailChecked: true });
      this.setState({ email: emailInput });
    } else {
      this.setState({ isEmailChecked: false });
    }
  };

  

  PasswordValidator = (e) => {
    console.log(e.target.value);
    const passwordInput = e.target.value;
    if (passwordInput.length >= 8) {
      this.setState({ isPasswordChecked: true });
    } else {
      this.setState({ isPasswordChecked: false });
    }
  };

  LoginHandler = (e) => {
    if (this.state.isEmailChecked && this.state.isPasswordChecked) {
      console.log(e);
      axios.post();
    }
  };

  convertToSignup = () => {
    console.log("회원가입하고시포요");
  };

  render() {
    return (
      <div id="main">
        <div className="subContainer">
          <input
            placeholder="email"
            className="inputEmail"
            onChange={this.EmailValidator.bind(this)}
          ></input>
          <input
            placeholder="password"
            className="inputPassword"
            type="password"
            onChange={this.PasswordValidator.bind(this)}
          ></input>
          <button
            className="loginButton"
            onClick={this.LoginHandler.bind(this)}
          >
            로그인
          </button>
          <Link to="/signup">
            <button
              className="singUpButton"
              onClick={this.convertToSignup.bind(this)}
            >
              회원가입
            </button>
          </Link>
          <div className="naverOauth"></div>
          <div className="googleOauth"></div>
        </div>
      </div>
    );
  }
}

export default Login;
