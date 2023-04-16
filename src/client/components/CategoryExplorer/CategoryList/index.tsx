import React, { PropsWithChildren, ComponentType, MouseEventHandler, useState, useRef } from 'react';
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';
import { IconType } from 'react-icons';
import './index.css';

export type HorizontalDirection = 'left' | 'right';

export interface CategoryListButtonProps {
  type: HorizontalDirection;
  onClick?: (direction: HorizontalDirection) => void;
  enabled?: boolean,
}

export const ButtonIconsMap: { [K in HorizontalDirection]: IconType } = {
  left: AiOutlineLeftCircle,
  right: AiOutlineRightCircle,
}

export function CategoryListButton({
  type,
  onClick,
  enabled = true,
}: CategoryListButtonProps) {
  const Icon = ButtonIconsMap[type];

  return (
    <div onClick={ev => onClick?.(type)} className={`scroll-button ${type} ${enabled ? '' : 'disabled'}`}>
      <Icon size={40} />
    </div>
  );
}

export interface CategoryListProps extends PropsWithChildren { }

export function CategoryList({
  children
}: CategoryListProps) {
  const [scroll, setScroll] = useState(0);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLElement>(null);

  function getMaxScroll() {
    const body = bodyRef.current;
    const scrollable = scrollableRef.current;
    if (!body || !scrollable) return null;

    return scrollable.clientWidth - body.clientWidth;
  }

  function scrollHandler(direction: HorizontalDirection) {
    const maxScroll = getMaxScroll();

    if (!maxScroll) return;

    const sumedScroll = scroll + 600 * (direction === 'left' ? -1 : 1);

    const newScroll = Math.min(maxScroll, Math.max(0, sumedScroll));

    setScroll(newScroll);
  }

  const isLeftButtonEnabled = scroll !== 0;
  const isRightButtonEnabled = scroll !== getMaxScroll();

  return (
    <div className='category-layout'>
      <section ref={bodyRef} className='category-list'>
        <div className='category-scrollable' ref={scrollableRef} style={{ transform: `translateX(-${scroll}px)` }}>
          {children}
        </div>
      </section>
      <CategoryListButton type='left' enabled={isLeftButtonEnabled} onClick={scrollHandler} />
      <CategoryListButton type='right' enabled={isRightButtonEnabled} onClick={scrollHandler} />
    </div>
  );
}