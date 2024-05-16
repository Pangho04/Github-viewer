import Loading from "../Loading";
import React, { useEffect, useState } from "react";
import "./styles.css"
import gitCat from '../../assets/git_cat.png';

function RepoListItem ({repos, index}) {
  const [className, setClassName] = useState("hide-list");
  const DELAY = index * 100;

  useEffect(() => {
    setTimeout(() => {
      setClassName("show-list");
    }, DELAY);
  },[DELAY]);
  
  return (
    <div className={"RepoList " + className}>
      <h2 className="ReposRanking">{index + 1}위</h2>
      <hr/>
      <img src={repos?.owner?.avatar_url} alt="사용자 이미지" className="profile-image" />
      <p className="ReposName">{repos?.name}</p>
      <hr/>
      <p className="User-name">{repos?.owner.login}</p>
      <hr/>
      <a href={repos?.html_url} target="blank">저장소로<br/>이동</a>
      <hr/>
      <p>팔로워:<br/>{repos?.stargazers_count}명</p>
      <hr/>
      <p>포크:<br/>{repos?.forks_count}회</p>
    </div>
  );
}

export default function Popular({reposData, isLoading}) {
  if (isLoading) {
    return <Loading text="Loading" speed={300}/>
  }

  return (
    <div>
      <h1 className="center-text">
        인기 저장소 랭킹!
      </h1>
      {
        reposData.length === 0 && 
          <img className="Popular-backImg" alt="인기 저장소 대기화면" src={gitCat}/>
      }
      <div>
        {reposData?.map((repos, index) => {
          return(
            <RepoListItem 
              key={index} 
              index={index} 
              repos={repos} />
          );
        })}
      </div>
    </div>
  );
}
