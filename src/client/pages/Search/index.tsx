import React from 'react';
import './index.css';
import { ClassNames } from '../../utils/css-class-names';
import { SearchResult } from '../../components/SearchResult';
import Layout from '../../layout';

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export interface SearchProps { }

export default function Search({ }: SearchProps) {
  const params = new URLSearchParams(window.location.search);

  const category = params.get('category');
  const query = params.get('query');

  const bodyClassNames = new ClassNames()
    .add('search-page-body')
    .useTheme()
    .toString();

  const categoriesSectionClassNames = new ClassNames()
    .add('search-page-categories-section')
    .add('bg-color-2')
    .useTheme()
    .toString();

  const resultSectionClassNames = new ClassNames()
    .add('search-page-result-section')
    .useTheme()
    .toString();

  const resultsClassNames = new ClassNames()
    .add('search-page-results')
    .useTheme()
    .toString();

  return (
    <Layout>
      <div className={bodyClassNames}>
        <section className={categoriesSectionClassNames}>
          <h3>Categorias</h3>
        </section>
        <section className={resultSectionClassNames}>
          <h2>Resultados de "{query}"</h2>
          <div className={resultsClassNames}>
            {new Array(23).fill(0).map((v, i) => <SearchResult
              rate={randomIntFromInterval(0, 50) / 10}
              key={i}
              sold={434}
              price={200}
              id={i.toString()}
              discount={40}
              title='PC Gamer - RTX 20054 RYZEN 5433U'
            />)}
          </div>
        </section>
      </div>
    </Layout>
  );
}
