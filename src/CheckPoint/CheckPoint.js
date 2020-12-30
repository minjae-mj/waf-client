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
      ourToken: "",
      userName: "",
    };

    this.LoginHandler = this.LoginHandler.bind(this);
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
          console.log("&&&&", res);
          console.log(res.data.userid);
          this.setState({
            isLogin: true,
            userName: res.data.username,
            ourToken: res.data.ourToken,
          });
          window.localStorage.setItem("userName", `${res.data.username}`);
          window.localStorage.setItem("userid", `${res.data.userid}`);
          window.localStorage.setItem("isLogin", true);
          window.localStorage.setItem("logoutHandler", this.logoutHandler);
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

  LoginHandler(name, userid, value) {
    this.setState({ userName: name, isLogin: value });
    window.localStorage.setItem("userName", name);
    window.localStorage.setItem("userid", userid);
    window.localStorage.setItem("isLogin", value);
    window.localStorage.setItem("logoutHandler", this.logoutHandler);
    this.props.history.push({
      pathname: "/myfridge",
      isLogin: this.state.isLogin,
      userName: this.state.userName,
      logoutHandler: this.logoutHandler,
    });
  }

  logoutHandler = async () => {
    const { ourToken } = this.state;

    if (!{ ourToken }) {
      await axios.post("http://localhost:4000/users/signout").then((res) => {
        console.log("loggedout");
        this.setState({ isLogin: false, userName: "" });
        window.localStorage.removeItem("userName");
        window.localStorage.removeItem("isLogin");
        window.localStorage.removeItem("userid");
        this.props.history.push("/");
      });
    } else {
      console.log("logoutauth");
      console.log({ ourToken });
      this.setState({ isLogin: false, userName: "" });
      window.localStorage.removeItem("userName");
      window.localStorage.removeItem("isLogin");
      window.localStorage.removeItem("userid");
      this.props.history.push("/");
    }
  };

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
          <Login LoginHandler={this.LoginHandler} />
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
