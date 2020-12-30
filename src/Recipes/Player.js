import { Component } from "react";

export default class Player extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    console.log("this.props.currentVideo");
  }
  componentDidMount() {
    console.log(this.props.currentVideo);
  }
  componentDidUpdate() {
    console.log(this.props.currentVideo);
  }

  render() {
    const { currentVideo } = this.props;
    return (
      <div>
        {/* <div className="embed-responsive embed-responsive-16by9">
          <iframe
            className="recipes__current__Video"
            src={`https://www.youtube.com/embed/${currentVideo.id.videoId}`}
            allowFullScreen
          ></iframe>
        </div>
        <div className="recipes__current__Videoname">
          {currentVideo.snippet.title}
        </div> */}
        <div>되나요 ?</div>
        <iframe></iframe>
      </div>
    );
  }
}
