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

  const inputClasses = new ClassNames()
  .useTheme()
  .add('search-input')
  .add('bg-color-1')
  .toString();

  const buttonClasses = new ClassNames()
  .useTheme()
  .add('search-button')
  .add('terciary-bg-color')
  .toString();

  return (
    <div className='search-bar'>
      <input onSubmit={submitHandler} onKeyDown={keyHandler} type="text" className={inputClasses} placeholder='Insira a sua busca' ref={searchRef} />
      <div className={buttonClasses} onClick={submitHandler} >
        <AiOutlineSearch size={25} />
      </div>
    </div>
  )
}