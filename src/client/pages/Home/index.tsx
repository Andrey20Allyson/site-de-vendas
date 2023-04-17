import React from 'react';
import { CategoryItem, CategoryList } from '../../components/CategoryExplorer';
import './index.css';

export default function Home() {
  return (
    <>
      <h2 className='home-title'>Categorias</h2>
      <CategoryList>
        <CategoryItem
          category='placa de video'
          imgSrc='https://cdn.dooca.store/37656/products/new-new-placa-de-video-galax-geforce-gtx-1660-ti-oc-6gb-60irl7dsy91c-gddr6-pci-exp-68124_640x640+fill_ffffff.jpg?v=1663263347&webp=0'
          title='Placas De Vídeo'
        />
        <CategoryItem
          imgSrc='https://dlcdnwebimgs.asus.com/gain/9d601d77-b11d-4396-9df6-e426524317d0/'
          title='Placas Mâe'
          category='placa mae'
        />
        <CategoryItem
          category='processador'
          title='Processador'
          imgSrc='https://cdn.awsli.com.br/600x450/995/995689/produto/140408189/26423688bf.jpg'
        />
        <CategoryItem
          category='memoria ram'
          title='Memória RAM'
          imgSrc='https://cdn.awsli.com.br/600x450/1718/1718332/produto/114424568/a443fa9869-ozllul.jpg'
        />
        <CategoryItem
          category='fonte'
          title='Fonte'
          imgSrc='https://m.media-amazon.com/images/I/81M6QkUHVUL._AC_SX466_.jpg'
        />
        <CategoryItem
          category='armazenamento'
          imgSrc='https://5.imimg.com/data5/SELLER/Default/2020/8/WZ/IM/NF/112308381/hard-disk-drive-500x500.jpg'
          title='Armazenamento'
        />
        <CategoryItem
          category='perifericos'
          imgSrc='https://a-static.mlcdn.com.br/800x560/kit-perifericos-gamer-rgb-teclado-mouse-headset-onikuma/marceloagusutodasilvaeletronicos/15979982725/2fba8a449930677a6ad9286e2e324c06.jpeg'
          title='Perifericos'
        />
      </CategoryList>
      <h2 className='home-title'>Promoções</h2>
    </>
  )
}