import React, { useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './index.css';

export function SearchBar() {
  const searchRef = useRef<HTMLInputElement>(null);

  function submitHandler() {
    console.log(searchRef.current?.value)
  }

  return (
    <div className='search-bar'>
      <input type="text" className='search-bar-input' placeholder='Insira a sua busca' ref={searchRef} />
      <div className='search-bar-btn' onClick={submitHandler} >
        <AiOutlineSearch size={25} />
      </div>
    </div>
  )
}