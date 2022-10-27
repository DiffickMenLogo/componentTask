import React, { useState } from 'react';
import { IStateInput } from 'types/types';
import './MyInput.scss';

export function MyInput(props: IStateInput) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clear = () => {
    setInputValue('');
    localStorage.setItem('input', '');
  };

  const setLocalStorage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      localStorage.setItem('input', inputValue);
      props.setSearchName(inputValue);
    }
  };

  return (
    <div className="search__container">
      <input
        className={`${inputValue ? 'search__input_close' : 'search__input'}`}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search..."
        autoFocus
        data-testid="input-search"
        onKeyDown={(e) => setLocalStorage(e)}
      />
      <div
        className={`${inputValue ? 'search__croos' : ''}`}
        onClick={clear}
        data-testid="search__croos"
      ></div>
    </div>
  );
}
