import "./App.css";
import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Main from "./Main";
import CheckPoint from "../CheckPoint/CheckPoint";
import Demo from "../Demo_fridge/Demo";
import Signup from "../Sign_up/Signup";
import AddItem from "../AddItem/AddItem";
import Myfridge from "../Myfridge/Myfridge";

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
          <Route exact path="/demofridge" render={() => <Demo />} />
          <Route exact path="/cart" render={() => <AddItem />} />
          <Route exact path="/users" render={() => <CheckPoint />} />
          <Route exact path="/myfridge" render={() => <Myfridge />} />
          <Route exact path="/signup" render={() => <Signup />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
