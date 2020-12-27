import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Myfridge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameOauth: "kimcoding",
      userData: [
        {
          id: 1,
          item: "brocolli",
          category: "vegitable",
          part: "fridge",
          created_at: "2020-12-25",
          modified_at: "",
        },
        {
          id: 2,
          item: "carrot",
          category: "vegitable",
          part: "fridge",
          created_at: "2020-12-25",
          modified_at: "",
        },
      ],
    };

    this.setDataSession = this.setDataSession.bind(this);
    this.setDataOauth = this.setDataOauth.bind(this);
    this.setUsernameGoogle = this.setUsernameGoogle.bind(this);
    this.setUsernameNaver = this.setUsernameNaver.bind(this);
  }

  async setDataSession() {
    let itemsOnCart = await axios.get(
      "https://localhost:4000/myfridge/:userid"
    );
    console.log(itemsOnCart);
    this.setState({ userData: itemsOnCart });
  }

  async setDataOauth() {
    const { accessToken } = this.props.accessToken;
    // const accessToken = this.props.location.state.accessToken;
    let contentsOnCart = await axios.get(
      "https://localhost:4000/myfridge/:userid",
      {
        headers: {
          authorization: `token ${accessToken}`,
        },
      }
    );
    console.log(contentsOnCart);
    this.setState({ userData: contentsOnCart });
  }

  async setUsernameGoogle() {
    if (!this.props.userName) {
      const { accessToken } = this.props.accessToken;

      // const accessToken = this.props.location.state.accessToken;
      console.log(accessToken);
      let response = await axios.get("구글주소", {
        headers: {
          authorization: `token ${accessToken}`,
        },
      });
      const { name } = response.data;
      this.setState({ usernameOauth: name });
    }
  }

  async setUsernameNaver() {
    if (!this.props.userName) {
      const { accessToken } = this.props.accessToken;

      // const accessToken = this.props.location.state.accessToken;
      console.log(accessToken);
      let response = await axios.get("네이버", {
        headers: {
          authorization: `token ${accessToken}`,
        },
      });
      const { name } = response.data;
      this.setState({ usernameOauth: name });
    }
  }

  signOut = () => {
    axios
      .post("https://localhost:4000/users/signout", null, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then(() => this.props.signoutHandler())
      .catch((e) => alert(e));
  };

  // componentDidUpdate() {
  //   this.setUsernameGoogle();
  //   this.setUsernameNaver();
  //   this.setUserData();
  // }

  render() {
    // const accessToken = this.props.location.state.accessToken;
    const { userName } = this.props;
    const { accessToken } = this.props;

    // const userName = this.props.location.state.userName;
    // 세션로그인은 로그인 페이지에서 유저네임, 유저냉장고를 다 받아와서 프랍스로 전달만함.
    const { usernameOauth, userData } = this.state; //오어스 로그인은 여기서 유저네임, 유저냉장고를 받아와서 상태값으로 전달
    console.log({ userData });
    console.log({ accessToken });
    console.log({ userName });
    console.log(this.props);

    // 그래서 아래 세션로그인 혹은 오어스로그인에 따른 렌더링이 달라짐
    return (
      <div>
        {/* -----------------------------유저네임------------------------------------ */}

        {userName ? (
          <div className="username">
            {this.props.location.state.userName}의 냉장고입니다.
          </div>
        ) : (
          <div className="username">{usernameOauth}의 냉장고입니다.</div>
        )}
        {/* -----------------------------유저네임------------------------------------ */}

        <button onClick={this.signOut.bind(this)}>로그아웃</button>

        {/* -----------------------------냉장고 리스트업------------------------------- */}
        <ul className="myfridge__ul">
          {userData.map((item) => {
            return (
              <li className="myfridge__li" key={item.id}>
                {item.item}
              </li>
            );
          })}
        </ul>
        {/* -----------------------------냉장고 리스트업------------------------------- */}

        <Link to="/cart">
          <button> 냉장고에 넣기 </button>
        </Link>
      </div>
    );
  }
}

export default Myfridge;
