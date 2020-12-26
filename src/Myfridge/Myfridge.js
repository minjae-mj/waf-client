import axios from "axios";
import React, { Component } from "react";

class Myfridge extends Component {
  signOut = () => {
    axios({
      method: "POST",
    });
  };

  render() {
    const { accessToken, userName, userData } = this.props;

    if (!{ accessToken }) {
      return <div className="need__Login">로그인이 필요합니다</div>;
    }

    return (
      <div>
        <div className="username">{userName}</div>
        <button onClick={this.signOut}>로그아웃</button>
        <ul>
          {/* eslint-disable-next-line array-callback-return */}
          {userData.map((item) => {
            <li key={item.id} src={item.image}>
              {item.category}
            </li>;
          })}
          {/* 카테고리랑 카테고리 이미지를 데이터에 저장 및 참조? 왜래키 지정? 조인해서(?) 카테고리에 해당하는 이미지 불러오기 (src={item.image}) 하면 어떨까요? */}
        </ul>
      </div>
    );
  }
}

export default Myfridge;
