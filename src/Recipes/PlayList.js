import React, { Component } from "react";

export default class Playlist extends Component {
  constructor(props) {
    super(props);
  }
  // fakeData = [
  //   {
  //     thumbnails: { default: { url: "33333" } },
  //     snippet: { title: "titleeeeee" },
  //   },
  //   {
  //     thumbnails: { default: { url: "33333" } },
  //     snippet: { title: "titleeeeee123213" },
  //   },
  //   {
  //     thumbnails: { default: { url: "33333" } },
  //     snippet: { title: "titleee21312312eee" },
  //   },
  //   {
  //     thumbnails: { default: { url: "33333" } },
  //     snippet: { title: "titlee21321312eeee" },
  //   },
  // ];

  render() {
    const { videoList } = this.props;
    return (
      <div className="recipes__playerListBox">
        {/* {console.log(videoList)} */}
        <ul className="recipes__playerList">
          {videoList.map((video) => (
            <li key={video.id.videoId} className="recipes__playerList__video">
              <img src={video.snippet.thumbnails.default.url}></img>
              <div className="recipes__playerList_words">
                {video.snippet.title}
              </div>
              <div className="recipes__playerList_words">
                {video.snippet.description}
              </div>
            </li>
          ))}
        </ul>

        {/* 아래 코드는 youtube api key 소진시..... */}
        {/* <ul>
          {this.fakeData.map((video) => (
            <li>
              <div>{video.thumbnails.default.url}</div>
              <div>{video.snippet.title}</div>
              <img src={video.snippet.thumbnails.default.url}></img>
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}
