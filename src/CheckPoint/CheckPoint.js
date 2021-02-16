import React, { Component } from 'react';
import Login from '.././Login/Login';
import Myfridge from '../Myfridge/Myfridge';
import serverUrl from '../config/server';
import { withRouter } from 'react-router-dom';

class CheckPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      ourToken: '',
      userName: '',
    };

    this.LoginHandler = this.LoginHandler.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
  }

  async getAccessToken(authorizationCode) {
    await serverUrl
      .post('/callback', {
        authorizationCode: authorizationCode,
      })
      .then((res) => {
        if (res.data === 'Signup Succeeded') {
          this.props.history.push('/users');
        } else {
          this.setState({
            isLogin: true,
            userName: res.data.username,
            ourToken: res.data.ourToken,
          });
          window.localStorage.setItem('userName', `${res.data.username}`);
          window.localStorage.setItem('userid', `${res.data.userid}`);
          window.localStorage.setItem('isLogin', true);
          window.localStorage.setItem('logoutHandler', this.logoutHandler);
        }
      })
      .then((res) => {
        this.props.history.push({
          pathname: '/myfridge',
          isLogin: this.state.isLogin,
          userName: this.state.userName,
        });
      });
  }

  LoginHandler(name, userid, value) {
    this.setState({ userName: name, isLogin: value });
    window.localStorage.setItem('userName', name);
    window.localStorage.setItem('userid', userid);
    window.localStorage.setItem('isLogin', value);
    window.localStorage.setItem('logoutHandler', this.logoutHandler);
    this.props.history.push({
      pathname: '/myfridge',
      isLogin: this.state.isLogin,
      userName: this.state.userName,
    });
  }

  componentDidMount() {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      this.getAccessToken(authorizationCode);
    }
  }

  render() {
    const isLogged = window.localStorage.getItem('isLogin');
    const { isLogin, userName } = this.state;
    return (
      <div className='CheckPoint'>
        {!isLogged ? <Login LoginHandler={this.LoginHandler} /> : <Myfridge />}
      </div>
    );
  }
}
export default withRouter(CheckPoint);
