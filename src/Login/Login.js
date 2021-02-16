import React from 'react';
import './Login.css';
import btn_google from './btn_google.png';
import btn_naver from './btn_naver.png';
import { withRouter } from 'react-router-dom';
import serverUrl from '../config/server';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isEmailChecked: false,
      isPasswordChecked: false,
      password: '',
    };

    this.naverLoginHandler = this.naverLoginHandler.bind(this);
    this.googleLoginHandler = this.googleLoginHandler.bind(this);

    this.NAVER_LOGIN_URL =
      'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=Yn5blabiliLbi8Ed8Je4&state=waftest&redirect_uri=http://waf-client.s3-website.ap-northeast-2.amazonaws.com/users';

    this.GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=218828135580-63brp05lohg6jb7f58rgjhueorgtv9d6.apps.googleusercontent.com&redirect_uri=http://waf-client.s3-website.ap-northeast-2.amazonaws.com/users&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile`;
  }

  naverLoginHandler() {
    window.location.assign(this.NAVER_LOGIN_URL);
  }

  googleLoginHandler(e) {
    window.location.assign(this.GOOGLE_LOGIN_URL);
  }

  EmailValidator = (e) => {
    const emailInput = e.target.value;
    if (
      emailInput.length > 4 &&
      emailInput.includes('@') &&
      emailInput.includes('.')
    ) {
      this.setState({ isEmailChecked: true });
      this.setState({ email: emailInput });
    } else {
      this.setState({ isEmailChecked: false });
    }
  };

  PasswordValidator = (e) => {
    const passwordInput = e.target.value;
    if (passwordInput.length >= 8) {
      this.setState({ isPasswordChecked: true });
      this.setState({ password: passwordInput });
    } else {
      this.setState({ isPasswordChecked: false });
    }
  };

  LoginHandler = async () => {
    if (this.state.isEmailChecked && this.state.isPasswordChecked) {
      await serverUrl
        .post(
          '/users/signin',
          {
            data: {
              email: this.state.email,
              password: this.state.password,
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              withCredentials: true,
            },
          }
        )
        .then((res) => {
          this.props.LoginHandler(res.data.username, res.data.userid, true);
        })
        .catch((err) => console.log(err));
    }
  };

  convertToSignup = () => {
    this.props.history.push('/signup');
  };

  render() {
    return (
      <div class='register__wrapper'>
        <input
          placeholder='이메일'
          className='input__email'
          onChange={this.EmailValidator.bind(this)}
        />
        <input
          placeholder='비밀번호'
          className='input__password'
          type='password'
          onChange={this.PasswordValidator.bind(this)}
        />

        <div id='oauth__box'>
          <img
            src={btn_google}
            alt='google__signin'
            className='btn__google'
            onClick={this.googleLoginHandler}
          />
          <img
            src={btn_naver}
            alt='naver__signin'
            className='btn__naver'
            onClick={this.naverLoginHandler}
          />
        </div>

        <button
          className='btn__register'
          onClick={this.LoginHandler.bind(this)}
        >
          로그인
        </button>
        <button
          className='btn__signup'
          onClick={this.convertToSignup.bind(this)}
        >
          회원가입
        </button>
      </div>
    );
  }
}

export default withRouter(Login);
