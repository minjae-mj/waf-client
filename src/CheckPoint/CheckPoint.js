import React, { Component } from "react";
import Login from ".././Login/Login";
import Myfridge from ".././Myfridge/Myfridge";

class CheckPoint extends Component {
  constructor(props) {
    super();
    this.state = {
      isLogin: false,
      accessToken: "",
    };
  }
  render() {
    const { isLogin, accessToken } = this.state;

    return (
      <div>
        {!isLogin ? (
          <Login></Login>
        ) : (
          <Myfridge accessToken={accessToken}></Myfridge>
        )}
      </div>
    );
  }
}
export default CheckPoint;
