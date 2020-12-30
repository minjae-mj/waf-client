import { Component } from "react";
import axios from "axios";
import { YOUTUBE_API_KEY } from "../config/mytube";
import { withRouter } from "react-router-dom";
import "./Recipes.css";
import Player from "./Player";
import PlayList from "./PlayList";

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: null,
      currentVideo: null,
      item: "돼지고기",
    };
  }
  goBack = () => {
    this.props.history.push("/myfridge");
  };

  searchYoutube = async (item) => {
    let params = {
      q: item, // (수정 필요)props로 내려오는 재료 이름을 넣을것.
      part: "snippet",
      maxResults: 5,
      key: YOUTUBE_API_KEY,
      type: "video",
    };
    let url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.search = new URLSearchParams(params).toString();

    axios
      .get(url)
      .then((res) => {
        // console.log(res);
        this.setState({
          videoList: res.data.items,
          currentVideo: res.data.items[0],
        });
        // console.log(this.state.videoList);
        // console.log(this.state.currentVideo);
      })
      .catch((err) => console.log(err));
    // async사용하기.....가 안되네용....... 힝....
    // try {
    //   let videoSendRequest = await axios.get(url);
    //   let iGotData = await videoSendRequest.then((res) => {
    //     console.log(res);
    //     console.log(res.data);
    //     this.setState({
    //       videoList: res.data.items,
    //       currentVideo: res.data.items[0],
    //     });
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  componentDidMount() {
    this.searchYoutube(this.state.item);
  }

  render() {
    const { videoList, currentVideo } = this.state;
    return (
      <div id="recipes">
        <div className="recipes__navbar">
          <div>떙떙떙님의 레시피 플레이어 입니다.</div>
          <div className="recipes__navbar__btn" onClick={() => this.goBack()}>
            나의 냉장고로 돌아가기
          </div>
        </div>
        {currentVideo ? <Player currentVideo={currentVideo} /> : "Loading"}
        {videoList ? <PlayList videoList={videoList} /> : "Loading"}
      </div>
    );
  }
}

export default withRouter(Recipes);
