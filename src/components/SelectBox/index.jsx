import React, { useState } from 'react';
import LANGUAGES from '../../constants/languages';
import './styles.css';

/**언어 선택 박스. */
function SelectBox({ onSubmit }) {
  const defaultLanguage = LANGUAGES[0];
  const [locale, setLocale] = useState('ko');
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage.en);

  function handleChangeLocale() {
    if (locale === 'ko') {
      setLocale('en');
    } else {
      setLocale('ko');
    }
  }
/**선택 언어 반환 함수 */
  function handleChangeLanguage(e) {
    setSelectedLanguage(e.target.value);
  }
 /**API 인수 전달을 위한 language 'en'변경 함수 */
  function getSendingLanguage(setLanguage) {
    const foundLanguage = LANGUAGES.find(
      (language) =>
        language.en === setLanguage 
        || language.ko === setLanguage
    );

    return foundLanguage.en;
  }
/**APP.js의 인기 저장소 요청API 함수에 선택 언어 전달 함수 */
  function handleSubmit(e) {
    e.preventDefault();
    const sendingLanguage = getSendingLanguage(selectedLanguage);
    onSubmit(sendingLanguage);
  }

  return (
    <form 
      className="Language-select-box"
      onSubmit={handleSubmit}
    >
      <select 
        value={selectedLanguage} 
        onChange={handleChangeLanguage}
      >
        {LANGUAGES.map((language, index) => {
          return (
            <option key={index}>
              {language[locale]}
            </option>
          );
        })}
      </select>
      <button 
        className="Language-button" 
        type="button" 
        onClick={handleChangeLocale}>
        KO/EN
      </button>
      <button className="Language-button">
        제출
      </button>
    </form>
  );
}

export default SelectBox;
