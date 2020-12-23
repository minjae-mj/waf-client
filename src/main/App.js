import "./App.css";
import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Main from "./Main";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  render() {
    return (
      <div id="main">
        <Switch>
          <Route exact path="/" render={() => <Main />} />
          <Route exact path="/users" render={() => <div>users</div>} />
          <Route exact path="/myfridge" render={() => <div>myfridge</div>} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

// 시작하기 버튼
// 기존유저 로그인 버튼
