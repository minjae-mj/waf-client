import React, { Component } from "react";
import Login from ".././Login/Login";
import Myfridge from "../Myfridge/Myfridge";
import axios from "axios";
import { withRouter } from "react-router-dom";

class CheckPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      // accessToken: "",
      userName: "",
    };

    this.LoginHandler = this.LoginHandler.bind(this);
    this.setUserName = this.setUserName.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  async getAccessToken(authorizationCode) {
    await axios
      .post("http://localhost:4000/callback", {
        authorizationCode: authorizationCode,
      })
      .then((res) => {
        if (res.data === "Signup Succeeded") {
          this.props.history.push("/users");
        } else {
          console.log(res);
          this.setState({ isLogin: true, userName: res.data.username });
          window.localStorage.setItem("userName", `${res.data.username}`);
          window.localStorage.setItem("userid", res.data.userid);
        }
      })
      .then((res) => {
        this.props.history.push({
          pathname: "/myfridge",
          isLogin: this.state.isLogin,
          userName: this.state.userName,
          logoutHandler: this.logoutHandler,
        });
      });
  }

  LoginHandler = (v) => {
    //세션로그인
    this.setState({ isLogin: v });
  };

  setUserName(name) {
    this.setState({ userName: name });
    window.localStorage.setItem({ userName: name });
    this.props.history.push({
      pathname: "/myfridge",
      isLogin: this.state.isLogin,
      userName: this.state.userName,
      logoutHandler: this.logoutHandler,
    });
  }

  async logoutHandler() {
    //세션로그아웃
    await axios.post("http://localhost:4000/users/signout").then((res) => {
      console.log("logedout");
      this.setState({ isLogin: false });
      delete window.localStorage.userName;
      window.localStorage.isLogin = false;
      // delete window.localStorage.userName;
      this.props.history.push("/");
    });
  }

  componentDidMount() {
    // authorization server로부터 클라이언트로 리디렉션된 경우, authorization code가 함께 전달됩니다.
    // ex) http://localhost:3000/?code=5e52fb85d6a1ed46a51f
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");

    if (authorizationCode) {
      this.getAccessToken(authorizationCode);
    }
  }

  render() {
    const { isLogin, userName } = this.state;
    console.log({ userName });
    console.log({ isLogin });

    return (
      <div className="CheckPoint">
        {!isLogin ? (
          <Login
            LoginHandler={this.LoginHandler}
            setUserName={this.setUserName}
          />
        ) : (
          <Myfridge logoutHandler={this.logoutHandler} />
        )}
        {/* <Switch>
          <Route
            path="/users"
            render={(props) => (
              <Login
                LoginHandler={this.LoginHandler}
                setUserName={this.setUserName}
              />
            )}
          />
          <Route
            path="/myfridge"
            render={(props) => (
              <Myfridge
                {...props}
                userName={this.state.userName}
                logoutHandler={this.logoutHandler}
              />
            )}
          />
          <Route
            path="/"
            render={(props) => {
              if (isLogin) {
                return <Redirect to="/myfridge" />;
              }
              return <Redirect to="/users" />;
            }}
          />
          //{" "}
        </Switch> */}
      </div>
    );
  }
}
export default withRouter(CheckPoint);
