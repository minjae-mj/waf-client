import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Myfridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userData: [],
    };

    this.getNaverUserInfo = this.getNaverUserInfo.bind(this);
    this.getGoogleUserInfo = this.getGoogleUserInfo.bind(this);
  }

  getUserFridge = () => {};

  async getNaverUserInfo() {
    const { accessToken } = this.props;
    console.log(accessToken);
    let response = await axios.get("네이버주소", {
      headers: {
        authorization: `token ${accessToken}`,
      },
    });

    this.setState({ username: response.data });
  }

  async getGoogleUserInfo() {
    const { accessToken } = this.props;
    console.log(accessToken);
    let response = await axios.get("구글", {
      headers: {
        authorization: `token ${accessToken}`,
      },
    });
    this.setState({ username: response.data });
  }

  render() {
    const { accessToken, userName } = this.props;
    const { userData, username } = this.state;

    if (!{ accessToken }) {
      return <div className="need__Login">로그인이 필요합니다</div>;
    }

    return (
      <div>
        {/* ------------------------유저네임-------------------------- */}
        {userName ? (
          <div className="username">{userName}의 냉장고입니다. </div>
        ) : (
          <div className="username">{username}의 냉장고입니다. </div>
        )}
        {/* ------------------------유저네임-------------------------- */}

        <button onClick={this.props.logoutHandler}>로그아웃</button>
        {/* ------------------------냉장고 리스트업-------------------------- */}

        <ul>
          {/* eslint-disable-next-line array-callback-return */}
          {userData.map((item) => {
            <li key={item.id}>{item.category}</li>;
          })}
        </ul>
        {/* ------------------------냉장고 리스트업-------------------------- */}
        <Link to="/cart">
          <button> 냉장고에 넣기 </button>
        </Link>
      </div>
    );
  }
}

export default Myfridge;
