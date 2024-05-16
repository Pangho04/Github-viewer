import React from "react";
import './styles.css'
import Card from "../Card";
import Loading from "../Loading";
import backImg from "../../assets/backImg.jpeg"

function CardContent ({
  name,
  location,
  public_repos,
  followers,
  following
}) {
  return (
    <>
      <p className="Children-name">- {name}</p>
      <p className="Children-location">{location}</p>
      <p className="Children-option">
        Repos/ {public_repos} 팔로워/{followers} 팔로잉/ {following}
      </p>
    </>
  );
}

export default function Battle({playersData, isLoading}) {
  if (isLoading) {
    return <Loading text="Loading" speed={300} />;
  }

  if (playersData.length > 0) {
    const [player1, player2] = playersData;
    const {
      profile : {
        avatar_url: avatar_url1,
        login: login1,
        repos_url: repos_url1,
        name: name1,
        location: location1,
        public_repos: public_repos1,
        followers: followers1,
        following: following1
      },
      score: score1
    } = player1;

    const {
      profile : {
        avatar_url: avatar_url2,
        login: login2,
        repos_url: repos_url2,
        name: name2,
        location: location2,
        public_repos: public_repos2,
        followers: followers2,
        following: following2
      },
      score: score2
    } = player2;

    return (
      <>
        <h1 className="center-text">This is Battle!</h1>
        <div className="Battle-board">
          <Card
            avatar={avatar_url1}
            name={login1}
            href={repos_url1}
            subheader={score1}
            isWinner={score1 > score2}
          >
            <CardContent
              name={name1}
              location={location1}
              public_repos={public_repos1}
              followers={followers1}
              following={following1}
            />
          </Card>
          <p>VS</p>
          <Card
            avatar={avatar_url2}
            name={login2}
            href={repos_url2}
            subheader={score2}
            isWinner={score2 > score1}
          >
            <CardContent
              name={name2}
              location={location2}
              public_repos={public_repos2}
              followers={followers2}
              following={following2}
            />
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="center-text">아이디를 입력해주세요!</h1>
      <div className="Battle-board">
        <img className="backImg" src={backImg} alt="battle 대기화면" />
          <p>vs</p>
        <img className="backImg" src={backImg} alt="battle 대기화면" />
      </div>
    </>
  );
}