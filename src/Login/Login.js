import React, { Component } from "react";
import "./Login.css";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super();

    this.state = {
      email: "",
      isEmailChecked: false,
      isPasswordChecked: false,
      password: "",
    };

    this.naverLoginHandler = this.naverLoginHandler.bind(this);
    this.googleLoginHandler = this.googleLoginHandler.bind(this);

    // OAuth 인증이 완료되면 authorization code와 함께 callback url로 리디렉션 합니다.
    // 참고: https://docs.github.com/en/free-pro-team@latest/developers/apps/identifying-and-authorizing-users-for-github-apps

    this.NAVER_LOGIN_URL =
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=Yn5blabiliLbi8Ed8Je4&state=waftest&redirect_uri=http://localhost:3000/users";

    this.GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=218828135580-63brp05lohg6jb7f58rgjhueorgtv9d6.apps.googleusercontent.com&redirect_uri=http://localhost:3000/users&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile`;
  }

  // let GOOGLE_LOGIN_URL = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  // let params = {
  //   scope: 'https%3A//www.googleapis.com/auth/drive.metadata.readonly',
  //   client_id: '218828135580-63brp05lohg6jb7f58rgjhueorgtv9d6.apps.googleusercontent.com',
  //   redirect_uri: 'http://localhost:3000',
  //   response_type: 'code'
  // }
  // GOOGLE_LOGIN_URL.search = new URLSearchParams(params).toString();

  naverLoginHandler() {
    window.location.assign(this.NAVER_LOGIN_URL);
  }

  googleLoginHandler(e) {
    window.location.assign(this.GOOGLE_LOGIN_URL);
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
      this.setState({ password: passwordInput });
    } else {
      this.setState({ isPasswordChecked: false });
    }
  };

  LoginHandler = (e) => {
    if (this.state.isEmailChecked && this.state.isPasswordChecked) {
      axios({
        method: "POST",
        url: "http://localhost:4000/users/signin",
        data: {
          email: this.state.email,
          password: this.state.password,
        },
        headers: { "Content-Type": "application/json", withCredentials: true },
      })
        .then((res) => {
          console.log(res);
          this.props.LoginHandler(true);
          this.props.setUserName(res.data.username, res.data.userid);
        })
        .then((res) => {
          console.log("done");
        })
        // .then((res) => {
        //   return axios.get("https://localhost:4000/myfridge/:userid", {
        //     withCredentials: true,
        //   });
        // })
        // .then((resp) => {
        //   let { item, category, part, created_at, modified_at } = resp.data;
        //   this.props.setUserInfo({
        //     item,
        //     category,
        //     part,
        //     created_at,
        //     modified_at,
        //   });
        // })
        .catch((err) => console.log(err));
    }
  };

  convertToSignup = () => {
    this.props.history.push("/signup");
  };

  render() {
    return (
      <div id="main">
        <div className="subContainer">
          <input
            placeholder="email"
            className="input__Email"
            onChange={this.EmailValidator.bind(this)}
          ></input>
          <input
            placeholder="password"
            className="input__Password"
            type="password"
            onChange={this.PasswordValidator.bind(this)}
          ></input>
          <button
            className="login__Button"
            onClick={this.LoginHandler.bind(this)}
          >
            로그인
          </button>
          {/* <Link to="/users/signup"> */}
          <button
            className="singUp__Button"
            onClick={this.convertToSignup.bind(this)}
          >
            회원가입
          </button>
          {/* </Link> */}
          <div className="naver__Oauth" onClick={this.naverLoginHandler}></div>
          <div
            name="google"
            className="google__Oauth"
            onClick={this.googleLoginHandler}
          ></div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
