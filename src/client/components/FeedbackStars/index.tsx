import React from 'react';
import './index.css';
import { AiOutlineStar } from 'react-icons/ai';

export interface FeedbackStarsProps { }

export function FeedbackStars({ }: FeedbackStarsProps) {
  return (
    <div className=''>
      {new Array(5).fill(0).map((v, i) => <AiOutlineStar key={i} size={30} />)}
    </div>
  );
}