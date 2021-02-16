import { Component } from 'react';

export default class Player extends Component {
  render() {
    const { currentVideo } = this.props;
    return (
      <div className='recipes__player'>
        <div className='recipes__current__VideoBox'>
          <iframe
            className='recipes__current__Video'
            src={`https://www.youtube.com/embed/${currentVideo.id.videoId}`}
            allowFullScreen
          ></iframe>
          <div className='recipes__current__title'>
            {currentVideo.snippet.title}
          </div>
        </div>
      </div>
    );
  }
}
