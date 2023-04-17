import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

export interface CategoryItemProps {
  title?: string;
  imgSrc?: string;
  desc?: string;
  category?: string;
}

export function CategoryItem({
  desc,
  imgSrc,
  category,
  title = 'N/A',
}: CategoryItemProps) {
  const navigate = useNavigate();

  function clickHandler() {
    const params = new URLSearchParams(window.location.search);

    if (category) params.set('category', category);

    const paramsString = params.toString();
    
    const path = 'search' + (paramsString.length > 0 ? `?${paramsString}` : '');
    
    navigate(path);
  }

  return (
    <section className='category-container' onClick={clickHandler}>
      <div>
        <img className='category-container-img' src={imgSrc} alt="not found" />
      </div>
      <div className='category-container-content primary-bg-color'>
        <h3 className='category-container-title'>{title}</h3>
      </div>
    </section>
  )
}