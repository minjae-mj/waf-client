/* eslint-disable jsx-a11y/iframe-has-title */
import { Component } from "react";

export default class Player extends Component {
  render() {
    const { currentVideo } = this.props;
    return (
      <div className="recipes__player">
        <div className="recipes__current__VideoBox">
          <iframe
            className="recipes__current__Video"
            src={`https://www.youtube.com/embed/${currentVideo.id.videoId}`}
            allowFullScreen
          ></iframe>
          <div className="recipes__current__title">
            {currentVideo.snippet.title}
          </div>
        </div>



        {/* 아래 코드는 youtube api key 소진시..... */}
        {/* <div className="recipes__current__VideoBox">
          <iframe
            className="recipes__current__Video"
            src={`https://www.youtube.com/embed/t4Es8mwdYlE`}
            allowFullScreen
          ></iframe>
          <div className="recipes__current__title">
            {" "}
            드디어! 집에서 해먹는 떡볶이 레시피를 공개합니다! 황금비율 양념장
            떡볶이 맛은 추억의 바로 그 맛! 비밀의 맛(?) 튀김 레시피는 다음에
            알려드릴게요~{" "}
          </div>
        </div> */}

      </div>
    );
  }
}
