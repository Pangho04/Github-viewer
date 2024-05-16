import React, { useState } from 'react';
import Popular from '../Popular';
import Battle from '../Battle';
import NavButton from '../NavButton';
import './styles.css';
import SelectBox from '../SelectBox';
import InputBox from '../InputBox';
import { getPopularRepos, battle } from '../../utils/api';

/*
1. app에 data state생성.
2. handleSubmit 선언.
    선언한 함수에서는 data변경(setData)
3. handleSubmit은 onSubmit으로 selectBox에 전달.
4. 영문 값 변환하는 함수 구현.
5. form에서 새로 함수 선언 후 form 태그의 onSubmit에 전달.
    사용자 선택값을 argumnet로 전달 후 실행.
6 창호님.

*/
export default function App() {
  const [showBattle, setShowBattle] = useState(false);
  const [popularReposData, setPopularReposData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playerData, setPlayerData] = useState([]);


/**인기 저장소 요청API에 선택 언어 전달 & 반환값 갱신 함수 */
  async function requestRepoData(selectedLanguage) {
    setIsLoading(true);
    const response = await getPopularRepos(selectedLanguage);
    setPopularReposData(response);
    setIsLoading(false);
  }

  async function requestPlayerData(usersIdData) {
    setIsLoading(true);
    const response = await battle(usersIdData);
    setPlayerData(response);
    setIsLoading(false);
  }
  console.log(playerData)
  function toggleView(showBattle) {
    setShowBattle(showBattle);
  }

  return (
    <div className="container">
      <div className="flex space-between">
        <NavButton
          isActive={!showBattle}
          text="인기 저장소"
          onClick={() => toggleView(false)}
        />
        {!showBattle && <SelectBox onSubmit={requestRepoData} />}
        {showBattle && <InputBox onSubmit={requestPlayerData}/>}
        <NavButton
          isActive={showBattle}
          text="Github 대결"
          onClick={() => toggleView(true)}
        />
      </div>
      {!showBattle && <Popular reposData={popularReposData} isLoading={isLoading} />}
      {showBattle && <Battle playersData={playerData} isLoading={isLoading}/>}
    </div>
  );
}
