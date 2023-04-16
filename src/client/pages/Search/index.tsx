import React from 'react';
import './index.css';

export interface SearchProps { }

export default function Search({ }: SearchProps) {
  const params = new URLSearchParams(window.location.search);

  const category = params.get('category');
  const search = params.get('search');

  return (
    <>
      {category}
    </>
  );
}