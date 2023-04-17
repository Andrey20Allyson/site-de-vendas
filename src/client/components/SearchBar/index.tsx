import React, { useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './index.css';
import { ClassNames } from '../../utils/css-class-names';
import { useNavigate, useParams } from 'react-router-dom';

export function SearchBar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function submitHandler() {
    const searchElement = searchRef.current;
    if (!searchElement) return;

    const query = searchElement.value;
    if (query.length === 0) return;

    const params = new URLSearchParams();
    params.set('query', searchElement.value);

    const path = `/search?${params.toString()}`;

    navigate(path);
  }

  function keyHandler(ev: React.KeyboardEvent) {
    if (ev.key === 'Enter') {
      submitHandler();
    }
  }

  const inputClasses = new ClassNames();

  inputClasses.add('search-input');
  inputClasses.add('bg-color-1');

  inputClasses.useTheme();

  const buttonClasses = new ClassNames();

  buttonClasses.add('search-button');
  buttonClasses.add('terciary-bg-color');

  buttonClasses.useTheme();

  return (
    <div className='search-bar'>
      <input onSubmit={submitHandler} onKeyDown={keyHandler} type="text" className={inputClasses.toString()} placeholder='Insira a sua busca' ref={searchRef} />
      <div className={buttonClasses.toString()} onClick={submitHandler} >
        <AiOutlineSearch size={25} />
      </div>
    </div>
  )
}