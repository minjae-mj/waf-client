/**
 * /* eslint-disable jsx-a11y/alt-text
 *
 * @format
 */

import React, { Component } from "react";

export default class Playlist extends Component {
  render() {
    const { videoList, changeCurrentVideo } = this.props;
    return (
      <div className="recipes__playerListBox">
        <ul className="recipes__playerList">
          {videoList.map((video) => (
            <li
              key={video.id.videoId}
              className="recipes__playerList__video"
              onClick={() => changeCurrentVideo(video)}>
              <img src={video.snippet.thumbnails.default.url}></img>
              <div className="recipes__playerList_title">
                {video.snippet.title}
              </div>
              <div className="recipes__playerList_description">
                {video.snippet.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
