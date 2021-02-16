import './Main.css';
import React from 'react';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends React.Component {
  render() {
    return (
      <div>
        {/* 상단 이미지와 한줄글 파트 */}
        <div className='main__img'>
          <div className='main__description'>
            냉장고 관리가 <br></br>필요할 때 <br></br>W<span>h</span>a
            <span>t's in my</span>f<span>ridge</span> <br></br>
          </div>
        </div>

        {/* 로그인과 시작하기 버튼  */}
        <div className='main__buttonBox'>
          <Link to='/demofridge'>
            <button className='main__btn'>waf 시작해보기</button>
          </Link>

          <Link to='/users'>
            <button className='main__btn'>기존 유저 로그인</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
