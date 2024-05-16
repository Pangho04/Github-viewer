import PROFILE from './profile.json';
import PERSONAL_REPOS from './personalRepositories.json';
import POPULAR_REPOS from './popularRepositories.json';

/*

  TODO: Enter your own Github client id and secret id below

  1. Visit Github.com
  2. Visit User Settings (https://github.com/settings/profile)
  3. Select "Developer Settings"
  4. Select "Oauth Apps"
  5. Select "New Oauth App"
  6. Enter "http://localhost:5173" for homepage & callback URL
  7. Enter your Client ID and Secret ID below

 */

const GITHUB_CLIENT_ID = 'Ov23li31QEdAGQAb4OkC';
const GITHUB_SECRET_ID = '625a588c411c69cb707889e9f94f003995ed59f6';
// const GITHUB_CLIENT_ID = 'Ov23liT2xlHG669CmvA3';
// const GITHUB_SECRET_ID = '643c2842973de641c9aG49becff484bcc5cc31002';

const defaultParams = `?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_SECRET_ID}`;

function getErrorMsg(message, username) {
  if (message === 'Not Found') {
    return `"${username}"는 존재하지 않는 사용자입니다`;
  }

  return message;
}

async function getProfile(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}${defaultParams}`
    );
    if (response.status === 404) throw new Error('Not Found');
    const userProfile = await response.json();

    return userProfile;
  } catch (e) {
    alert(getErrorMsg(e.message, username));
  }
}

async function getRepos(username) {
  try {
    const response = await fetch(
      `https://pi.github.com/users/${username}/repos${defaultParams}&per_page=100`
    );
    const userRepos = await response.json();

    return userRepos;
  } catch (e) {
    console.log('데이터 요청에 실패하여, MOCK데이터로 대체합니다.');
  }
}

function getStarCount(repos) {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

async function getUserData(player) {
  let profile;
  let repos;

  try {
    profile = await getProfile(player);
    repos = await getRepos(player);

    if (!profile.followers || !repos) throw new Error;
  } catch (e) {
    console.log('데이터 요청에 실패하여, MOCK데이터로 대체합니다.');
    profile = PROFILE;
    repos = PERSONAL_REPOS;
  }

  return {
    profile,
    score: calculateScore(profile.followers, repos),
  };
}

export async function battle([player1, player2]) {
  const playerOne = await getUserData(player1);
  const playerTwo = await getUserData(player2);
  
  return [playerOne, playerTwo];
}

/**인기 저장소 요청 API */
export async function getPopularRepos(language) {
  let items;

  try {
    const endpoint = window.encodeURI(
      `https://api.github.com/search/repositories${defaultParams}&q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );
    const response = await fetch(endpoint);

    if (!response.ok) throw new Error;

    const data = await response.json();
    items = data.items;
  } catch (e) {
    alert('데이터 요청에 실패하여, MOCK데이터로 대체합니다.');
    items = POPULAR_REPOS;
  }

  return items;
}
