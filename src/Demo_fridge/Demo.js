import React from 'react';
import './Demo.css';
import logo from './Waf.png';
import AddItems from './AddItems';
import left_fridge from './img_fridge/left_fridge.png';
import mandu from './img_fridge/mandu.png';
import eggs from './img_fridge/eggs.png';
import dairy from './img_fridge/dairy.png';
import right_fridge from './img_fridge/right_fridge.png';
import fish from './img_fridge/fish.png';
import meat from './img_fridge/meat.png';
import veges from './img_fridge/veges.png';
import fruit from './img_fridge/fruit.png';
import { withRouter } from 'react-router-dom';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  changeItems = (obj) => {
    let newItem = obj;
    this.setState((state) => ({
      items: state.items.concat(newItem),
    }));
  };

  showImages = () => {
    for (let item of this.state.items) {
      let itemType = document.querySelector(`.${item.type}`);
      itemType.style.opacity = 1;
    }
  };

  goToSignup = () => {
    this.props.history.push('/signup');
  };

  componentDidMount() {
    this.showImages();
  }
  componentDidUpdate() {
    this.showImages();
  }

  render() {
    return (
      <>
        {/* <div id="demo"> */}
        {/* 왼쪽 화면 */}
        <div className='whiteBackground'>
          <div className='demoUserInfo'>
            <div className='name__section'>
              guest님의 냉장고입니다
              <span className='loggedOut' onClick={this.goToSignup}>
                회원가입
              </span>
            </div>
          </div>
          <div className='content'>
            <div className='left'>
              {/* 왼쪽 냉장고 */}
              <div className='fridge_leftside'>
                <div className='left_items'>
                  <img className='mandu' src={mandu}></img>
                  <img className='eggs' src={eggs}></img>
                  <img className='dairy' src={dairy}></img>
                </div>
              </div>

              <div className='fridge_rightside'>
                <div className='right_items'>
                  <img className='seafood' src={fish}></img>
                  <img className='meat' src={meat}></img>
                  <div className='freshSection'>
                    <img className='fruits' src={fruit}></img>
                    <img className='veges' src={veges}></img>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽 화면*/}
            <div className='right'>
              <AddItems
                changeItems={this.changeItems}
                changePart={this.changePart}
                items={this.state.items}
                currentPart={this.state.currentPart}
              />
            </div>
          </div>
        </div>
        {/* </div> */}
      </>
    );
  }
}

export default withRouter(Demo);
