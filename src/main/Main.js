import React from "react";
import { Link, Switch, Route, Redirect, withRouter } from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id="main">
        {/* 상단 이미지와 한줄글 파트 */}
        <div className="main__img">
          <div className="main__description">냉장고 관리가 필요할땐, waf</div>
        </div>

        {/* 로그인과 시작하기 버튼  */}
        <div className="main__buttonBox">
          <Link to="/myfridge">
            <button className="main__btn">waf 시작해보기</button>
          </Link>

          <Link to="/users">
            <button className="main__btn">기존 유저 로그인</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Main;
