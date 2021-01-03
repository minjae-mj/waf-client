/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";

export default class Playlist extends Component {
  fakeData = [
    {
      thumbnails: {
        default: {
          url: "https://www.youtube.com/watch?v=DnQ09ZZCjCs",
        },
      },
      snippet: {
        url: "https://img.youtube.com/vi/DnQ09ZZCjCs/sddefault.jpg",
        title: "초간단 김치찌개 ㅣ 백종원의 백종원 레시피",
        description:
          "정말로 다양한 김치찌개 레시피, 오늘 소개할 레시피는 집밥 백선생 시즌1 2화 김치편에 소개되었던 김치찌개입니다. 미리 볶을 필요 없이 바로 끓이는 간단 버전 레시피를 소개합니다. ",
      },
    },
    {
      thumbnails: {
        default: { url: "https://www.youtube.com/watch?v=ffuakdFmuh4" },
      },
      snippet: {
        url: "https://img.youtube.com/vi/ffuakdFmuh4/sddefault.jpg",
        title: "된장찌개 '1' (제일 쉬운 버전)",
        description:
          "김치찌개보다 끓이기 쉬운 된장찌개! 한식의 기본인 된장찌개 레시피입니다.",
      },
    },
    {
      thumbnails: {
        default: { url: "https://www.youtube.com/watch?v=j7s9VRsrm9o" },
      },
      snippet: {
        url: "https://img.youtube.com/vi/j7s9VRsrm9o/sddefault.jpg",
        title: "대파 듬뿍! 삼겹살로 만든 '대파 제육볶음'",
        description:
          "맛남의 광장 진도 편에서 보여드렸던 대파제육볶음입니다. 고기에선 불맛이 파에선 단맛! 설명이 따로 필요 없는 맛입니다.",
      },
    },
    {
      thumbnails: {
        default: { url: "https://www.youtube.com/watch?v=t4Es8mwdYlE" },
      },
      snippet: {
        url: "https://img.youtube.com/vi/t4Es8mwdYlE/sddefault.jpg",
        title: "분식집st 떡 볶 이🎉",
        description:
          "드디어! 집에서 해먹는 떡볶이 레시피를 공개합니다! 황금비율 양념장 떡볶이 맛은 추억의 바로 그 맛! 비밀의 맛(?) 튀김 레시피는 다음에 알려드릴게요~",
      },
    },
  ];

  render() {
    const { videoList } = this.props;
    return (
      <div className="recipes__playerListBox">
        <ul className="recipes__playerList">
          {videoList.map((video) => (
            <li key={video.id.videoId} className="recipes__playerList__video">
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

        {/* 아래 코드는 youtube api key 소진시..... */}
        {/* <ul className="recipes__playerList">
          {this.fakeData.map((video) => (
            <li className="recipes__playerList__video"> */}
        {/* <img src={video.snippet.url}></img> */}
        {/* <div className="recipes__playerList_title">
                {video.snippet.title}
              </div>
              <div className="recipes__playerList_description">
                {video.snippet.description}
              </div>
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}
