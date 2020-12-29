import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RealFridge from "./RealFridge";

class Myfridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userData: [
        {
          id: "12",
          item: "brocolli",
          category: "seafood",
          part: "fridge",
          created_at: "2020-12-25",
          modifiedAt: "",
        },
        {
          id: "126",
          item: "brocolli",
          category: "dairy",
          part: "fridge",
          created_at: "2020-12-25",
          modifiedAt: "",
        },
        {
          id: "124",
          item: "brocolli",
          category: "eggs",
          part: "fridge",
          created_at: "2020-12-25",
          modifiedAt: "",
        },
      ],
    };
    this.getUserFridge = this.getUserFridge.bind(this);
    console.log(this.props.location.isLogin);
    console.log(this.props.location.userName);
  }

  async getUserFridge() {
    const userid = window.localStorage.getItem("userid");
    let data = await axios
      // eslint-disable-next-line no-undef
      .get(`http://localhost:4000/myfridge/:${userid}`)
      .then((res) => console.log(res));
    this.setState({ userData: data });
  }

  componentDidUpdate() {
    this.getUserFridge();
  }

  componentDidMount() {
    this.getUserFridge();
  }

  render() {
    const { logoutHandler, userName } = this.props.location;
    const { userData } = this.state;
    const name = window.localStorage.getItem("userName");

    return (
      <div className="Myfridge__container">
        <div className="Myfridge__userbox">
          <div className="username"> {name} 님의 냉장고입니다.</div>
          {/* {(세션로그인)? ():()} */}
          <button className="logout" onClick={logoutHandler}>
            로그아웃
          </button>
        </div>
        <RealFridge userData={userData} userName={userName} />
        {/* <ul className="sidebar">
          {userData.map((item) => {
            <li key={item.id}>{item.category}</li>;
          })}
        </ul> */}
        {/* <Link to="/cart">
          <button> 냉장고에 넣기 </button>
        </Link> */}
      </div>
    );
  }
}

export default withRouter(Myfridge);
