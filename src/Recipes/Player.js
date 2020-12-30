import { Component } from "react";

export default class Player extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    // console.log("this.props.currentVideo");
  }
  // componentDidMount() {
  //   console.log(this.props.currentVideo);
  // }
  // componentDidUpdate() {
  //   console.log(this.props.currentVideo);
  // }

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
          <iframe className="recipes__current__Video"></iframe>
          <div className="recipes__current__title">
            {" "}
            e마트를 압도한 신개념 장보기앱 waf !{" "}
          </div>
        </div> */}
      </div>
    );
  }
}
