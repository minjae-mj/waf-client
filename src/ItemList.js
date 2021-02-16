import React, { Component } from 'react';

export default class Itemlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items } = this.props;
    console.log(items);
    return (
      <div className='demo__itemListBox'>
        <div className='demo__itemList__title'>나의 냉장고에 있는 재료들</div>
        <div className='demo__itemList__category'>
          <div className='fridge_Section'>
            <div>냉장 식품</div>
            <ul>
              {items.map((item) =>
                item.type !== 'mandu' ? (
                  <li>
                    {item.date
                      ? `${item.name} (만료 날짜 : ${item.date})`
                      : `${item.name} (만료 날짜 : 미정)`}
                  </li>
                ) : null
              )}
            </ul>
          </div>

          <div className='frozen_Section'>
            <div>냉동 식품</div>
            <ul>
              {items.map((item) =>
                item.type === 'mandu' ? (
                  <li>
                    {item.date
                      ? `${item.name} (만료 날짜 : ${item.date})`
                      : `${item.name} (만료 날짜 : 미정)`}
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
