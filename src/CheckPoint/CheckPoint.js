import React, { Component } from "react";
import Login from ".././Login/Login";
import Myfridge from "../Myfridge/Myfridge";
import axios from "axios";

class CheckPoint extends Component {
  constructor(props) {
    super();
    this.state = {
      isLogin: false,
      accessToken: "",
      userName: "",
      userData: null,
      path: null,
    };

    this.LoginHandler = this.LoginHandler.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.setUserName = this.setUserName.bind(this);
    // this.googleAccessToken = this.googleAccessToken.bind(this);
    // this.naverAccessToken = this.naverAccessToken.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
  }
  async getAccessToken(authorizationCode) {
    let resp = await axios.post("https://localhost:4000/callback", {
      authorizationCode: authorizationCode,
      path: this.state.path,
    });

    this.setState({
      isLogin: true,
      accessToken: resp.data.accessToken,
    });
  }

  // async googleAccessToken(authorizationCode) {
  //   let resp = await axios.post("https://localhost:4000/callback", {
  //     authorizationCode: authorizationCode,
  //     path: this.state.path,
  //   });

  //   this.setState({
  //     isLogin: true,
  //     accessToken: resp.data.accessToken,
  //   });
  // }

  // async naverAccessToken(authorizationCode) {
  //   let resp = await axios.post("https://localhost:4000/callback", {
  //     authorizationCode: authorizationCode,
  //   });

  //   this.setState({
  //     isLogin: true,
  //     accessToken: resp.data.accessToken,
  //   });
  // }

  LoginHandler = () => {
    this.setState({ isLogin: true });
  };

  setUserInfo(object) {
    this.setState({ userData: object });
  }
  setUserName(name) {
    this.setState({ userName: name });
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
    const { isLogin, accessToken } = this.state;

    return (
      <div className="CheckPoint">
        {!isLogin ? (
          <Login
            LoginHandle={this.LoginHandler}
            setUserInfo={this.setUserInfo}
            setUserName={this.setUserName}
          ></Login>
        ) : (
          <Myfridge accessToken={accessToken}></Myfridge>
        )}
      </div>
    );
  }
}
export default CheckPoint;
