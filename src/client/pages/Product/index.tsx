import React from 'react';
import { useParams } from 'react-router-dom';
import { FeedbackStars } from '../../components/FeedbackStars';
import { formatCurrency } from '../../utils/text';
import './index.css';
import Layout from '../../layout';

export interface ProductProps { }

const imgUrl = "https://images.kabum.com.br/produtos/fotos/sync_mirakl/271803/PC-Gamer-F-cil-Intel-Core-I7-16GB-RAM-Nvidia-GeForce-Gtx-1050ti-4GB-SSD-480GB-Fonte-500w-Windows-10-Preto_1680809907_gg.jpg";

export default function Product({ }: ProductProps) {
  const { id } = useParams();

  if (!id) throw new Error('Can\'t find "id" param!');

  return (
    <Layout>
      <div className='product-page'>
        <div className='header'>
          <section className='left-section'>
            <h2 className='product-name'>{'Produto'}</h2>
            <p className='seller-name'>Vendedor: {'alguem'}</p>
            <img className='product-img' src={imgUrl} alt="" />
            <section className='rate-section'>
              <FeedbackStars />
            </section>
          </section>
          <section className='right-section'>
            <div className='place-to-cart'>
              <p>Quantidade</p>
              <div className='inputs'>
                <div className='quantity'>
                  <input type="number" className='input' />
                  <p className='label'>unidades</p>
                </div>
                <input type="button" className='confirm' value="Adicionar ao carrinho" />
              </div>
            </div>
            <div className='prices'>
              <p className='base-price'>Preço unitário: {formatCurrency(40)}</p>
              <p className='label'>Valor da compra:</p>
              <p className='total'>{formatCurrency(40 * 1)}</p>
            </div>
          </section>
        </div>
        <div className='body'>
          <div className='description'>
            <h3>Descrição do produto</h3>
          </div>
          <div className='comments'>
            <h3>Comentários</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
}