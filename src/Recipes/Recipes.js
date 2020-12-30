import { Component } from "react";
import axios from "axios";
import { YOUTUBE_API_KEY } from "../config/youtube";

import "./Recipes.css";
import Player from "./Player";
// import PlayLists from "./PlayLists";

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: [{ id: { videoId: "h" } }],
      currentVideo: "",
      item: "돼지고기",
    };
  }

  searchYoutube = async () => {
    let params = {
      query: this.state.item, // (수정 필요)props로 내려오는 재료 이름을 넣을것.
      part: "snippet",
      maxResults: 5,
      key: YOUTUBE_API_KEY,
      type: "video",
    };
    let url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.search = new URLSearchParams(params).toString();

    // axios.get(url).then((res) => {
    //   // console.log(res);
    //   this.setState({
    //     videoList: res.data.items,
    //     currentVideo: res.data.items[0],
    //   });
    //   // console.log(this.state.videoList);
    //   // console.log(this.state.currentVideo);
    // });

    let videoSendRequest = await axios.get(url);
    let iGotData = await videoSendRequest.then((res) => {
      console.log(res);
      console.log(res.data);
      this.setState({
        videoList: res.data.items,
        currentVideo: res.data.items[0],
      });
    });
  };

  componentDidMount() {
    this.searchYoutube();
  }
  // componentDidUpdate() {
  //   this.searchYoutube();
  // }
  // componentWillUnmount() {
  //   this.searchYoutube();
  // }

  render() {
    const { videoList, currentVideo } = this.state;
    return (
      <div id="recipes">
        <div className="recipes__navbar">
          <div>떙떙떙님의 레시피 플레이어 입니다.</div>
          <div className="recipes__navbar__btn">나의 냉장고로 돌아가기</div>
        </div>

        <Player currentVideo={currentVideo} />
        {/* <PlayLists videoList={videoList} /> */}
      </div>
    );
  }
}

export default Recipes;
