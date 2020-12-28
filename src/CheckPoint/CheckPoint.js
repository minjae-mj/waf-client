import React, { Component } from "react";
import Login from ".././Login/Login";
import Myfridge from "../Myfridge/Myfridge";
import axios from "axios";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

class CheckPoint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      accessToken: "",
      userName: "",
    };

    this.LoginHandler = this.LoginHandler.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.signoutHandler = this.signoutHandler.bind(this);
    this.setUserName = this.setUserName.bind(this);
  }

  async getAccessToken(authorizationCode) {
    let resp = await axios.post("http://localhost:4000/callback", {
      authorizationCode: authorizationCode,
    });

    this.setState({
      isLogin: true,
      accessToken: resp.data.accessToken,
    });

    this.props.history.push({
      pathname: "/myfridge",
      state: { accessToken: this.state.accessToken },
    });
  }

  LoginHandler = () => {
    this.setState({ isLogin: true });
  };

  setUserName(name) {
    this.setState({ userName: name });
  }

  signoutHandler() {
    this.setState({ isLogin: false });
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
    const { isLogin, accessToken, userName } = this.state;

    return (
      <div className="CheckPoint">
        <Switch>
          <Route
            path="/users"
            render={() => (
              <Login
                LoginHandle={this.LoginHandler}
                setUserInfo={this.setUserInfo}
                setUserName={this.setUserName}
              />
            )}
          />
          <Route
            exact
            path="/myfridge"
            render={() => (
              <Myfridge
                accessToken={accessToken}
                signoutHandler={this.signoutHandler}
                userName={userName}
              />
            )}
          />
          <Route
            path="/"
            render={() => {
              if (isLogin) {
                return <Redirect to="/myfridge" />;
              }
              return <Redirect to="/users" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(CheckPoint);
