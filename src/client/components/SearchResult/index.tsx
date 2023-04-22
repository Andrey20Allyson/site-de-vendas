import React from 'react';
import './index.css';
import { ClassNames } from '../../utils/css-class-names';
import { AiFillStar } from 'react-icons/ai';
import { formatCurrency } from '../../utils/text';
import { useNavigate } from 'react-router-dom';

export interface SearchResultProps {
  discount?: number;
  imgSrc?: string;
  title?: string;
  price?: number;
  rate?: number;
  desc?: string;
  sold?: number;
  id?: string;
}

export function SearchResult({
  id,
  sold = 0,
  rate = 0,
  imgSrc = 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/271803/PC-Gamer-F-cil-Intel-Core-I7-16GB-RAM-Nvidia-GeForce-Gtx-1050ti-4GB-SSD-480GB-Fonte-500w-Windows-10-Preto_1680809907_gg.jpg',
  price = 0,
  discount = 0,
  desc = 'N/A',
  title = 'N/A',
}: SearchResultProps) {
  const navigate = useNavigate();

  function clickHander() {
    if (id) {
      navigate(`/product/${id}`);
    }
  }

  const bodyClassNames = new ClassNames()
    .add('search-result-body')
    .add('scale-with-hover')
    .useTheme()
    .toString();

  const contentClassNames = new ClassNames()
    .add('search-result-content')
    .useTheme()
    .toString();

  const rateClasses = new ClassNames()
    .add('flex-row')
    .useTheme();

  const rateName = rate > 3.5 ? 'good' : rate < 2 ? 'bad' : 'midle';
  const className = `search-result-${rateName}-rate`;

  rateClasses.add(className);

  const priceText = formatCurrency(price * (1 - discount / 100));

  return (
    <div onClick={clickHander} className={bodyClassNames}>
      <img draggable='false' src={imgSrc} alt="not found" />
      <div className={contentClassNames}>
        <h4 className='search-result-title' >{title}</h4>
        <p className='search-result-price'>{priceText}</p>
        <div className='flex-row'>
          <p className='search-result-sold-text'>{sold} vendidos</p>
          <div className={rateClasses.toString()}>
            <AiFillStar size={12} />
            <p className='search-result-rate-text'>{rate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}