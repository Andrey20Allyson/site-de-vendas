import React, { PropsWithChildren, useRef, useState, Children, ReactElement, ReactNode } from "react";
import { BsTriangleFill } from "react-icons/bs";
import './index.css';

export interface OptionsProps {
  title: string;
  children?: ReactNode;
  width?: number | string;
  bodyClassName?: string;
  titleClassName?: string;
  optionsClassName?: string;
  innerOptionsClassName?: string;
}

function isReactElement(node: ReactNode): node is ReactElement {
  return (typeof node === 'object' && node && 'type' in node) ?? false;
}

export function Options({
  innerOptionsClassName,
  optionsClassName,
  titleClassName,
  bodyClassName,
  children,
  title,
  width,
}: OptionsProps) {
  const [isOpen, setOpen] = useState(false);
  const innerOptionsRef = useRef<HTMLDivElement>(null);

  function handleHover() {
    setOpen(true);
  }

  function handleHoverEnd() {
    setOpen(false);
  }

  return (
    <div
      onPointerEnter={handleHover}
      onPointerLeave={handleHoverEnd}
      className={'options-body ' + (bodyClassName ?? '')}>
      <p className={'open-options ' + (titleClassName ?? '')}>
        {title}
        <BsTriangleFill size={11} className={'open-options-arrow' + (isOpen ? '' : ' down')} />
      </p>
      <div
        className={
          'options box-shadow ' +
          (isOpen ? '' : 'closed') + ' ' +
          (optionsClassName ?? '')
        }
        style={{ width, height: isOpen ? innerOptionsRef.current?.clientHeight ?? 0 : 0 }} >
        <div className={'inner-options ' + (innerOptionsClassName ?? '')} ref={innerOptionsRef}>
          {children}
        </div>
      </div>
    </div>
  );
}