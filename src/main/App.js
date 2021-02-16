import './App.css';
import React from 'react';
import { Switch, Link, Route, withRouter } from 'react-router-dom';
import Main from './Main';
import CheckPoint from '../CheckPoint/CheckPoint';
import Signup from '../Sign_up/Signup';
import AddItem from '../AddItem/AddItem';
import Demo from '../Demo_fridge/Demo';
import Myfridge from '../Myfridge/Myfridge';
import Recipes from '../Recipes/Recipes';
import Logo from '../AddItem/Waf.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  render() {
    return (
      <div id='main'>
        <Link to='/'>
          <img className='logo' src={Logo} />
        </Link>
        <Switch>
          <Route exact path='/' render={() => <Main />} />
          <Route exact path='/demofridge' render={() => <Demo />} />
          <Route exact path='/cart' render={() => <AddItem />} />
          <Route exact path='/users' render={() => <CheckPoint />} />
          <Route exact path='/myfridge' render={() => <Myfridge />} />
          <Route exact path='/signup' render={() => <Signup />} />
          <Route exact path='/recipes' render={() => <Recipes />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
