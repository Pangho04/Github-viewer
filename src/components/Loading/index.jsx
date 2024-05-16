import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

/*

  TODO: 아래 Loading 컴포넌트를 함수형 컴포넌트로 수정하고, `/spec/Loading.spec.js`에 테스트 내용을 보강하세요.

 */
/**API 응답 대기 중 Loading 문구 출력 함수*/
function Loading({ text = 'Loading', speed = 300 }) {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const timerId = setInterval(() => {
      setContent((prevContent) => {
        if (prevContent === text + '...') {
          return text;
        } 
        return (prevContent += '.');
      });
    }, speed);
    return () => {
      clearInterval(timerId);
    };
  }, [text, speed]);

  return <p className="content">{content}</p>;
}

export default Loading;

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};
