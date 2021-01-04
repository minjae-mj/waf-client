/** @format */

import { Component } from "react";
import axios from "axios";
import { YOUTUBE_API_KEY } from "../config/youtube";
import { withRouter } from "react-router-dom";
import "./Recipes.css";
import Player from "./Player";
import PlayList from "./PlayList";
import logo from "./Waf.png";

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: null,
      currentVideo: null,
    };
  }
  goBack = () => {
    this.props.history.push("/myfridge");
  };

  searchYoutube = async (item) => {
    let params = {
      q: `${item} 레시피`,
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
        this.setState({
          videoList: res.data.items,
          currentVideo: res.data.items[0],
        });
      })
      .catch((err) => console.log(err));
  };

  changeCurrentVideo = (video) => {
    this.setState({ currentVideo: video });
  };

  componentDidMount() {
    const ingredient = window.localStorage.getItem("ingredient");
    this.searchYoutube(ingredient);
  }

  render() {
    const { videoList, currentVideo } = this.state;
    const ingredient = window.localStorage.getItem("ingredient");
    return (
      <div>
        <img className="logo__recipes" src={logo} />
        <div className="recipes__navbar"></div>
        <div id="playerAndList">
          <div className="recipeAndButton">
            <div className="recommandRecipe">
              {ingredient}를 이용한 레시피 추천!
            </div>
            <button
              className="recipes__navbar__btn"
              onClick={() => this.goBack()}
            >
              냉장고로 돌아가기
            </button>
          </div>
          {currentVideo ? <Player currentVideo={currentVideo} /> : <></>}

          {videoList ? (
            <PlayList
              videoList={videoList}
              changeCurrentVideo={this.changeCurrentVideo}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Recipes);
