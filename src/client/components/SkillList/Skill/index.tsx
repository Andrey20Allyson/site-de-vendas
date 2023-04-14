import React, { useMemo, useRef, useState } from "react";
import defaultParser from "../../../utils/react-node-parser";
import { ToggleButton } from "../../ToggleButton";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import './index.css';
import useResizeObserver, { Size } from "../../../hooks/useResizeObserver";
import useRenders from "../../../hooks/useRenders";

export interface SkillProps {
  title: string;
  paragraphs?: string[];
  startsVisible?: boolean;
}

export function OpenIcon() {
  return <AiOutlinePlusCircle size={25} />
}

export function CloseIcon() {
  return <AiOutlineMinusCircle size={25} />
}

export function stringToParsedJSX(paragraph: string, key: number) {
  return (
    <p key={key}>
      {defaultParser.parse(paragraph)}
    </p>
  )
}

function paragraphsFactory(paragraphs?: string[]) {
  return () => {
    return paragraphs
      ?.map(stringToParsedJSX)
      .flat()
  };
}

const heightRerenderHandler = (oldSize: Size, newSize: Size) => newSize.height !== oldSize.height;

export function Skill({
  title,
  paragraphs,
  startsVisible = false,
}: SkillProps) {
  const [isBodyVisible, setBodyVisible] = useState(startsVisible);
  const innerBodyRef = useRef<HTMLUListElement>(null);
  const bodyMaxHeight = useResizeObserver(innerBodyRef, heightRerenderHandler)?.height ?? 0;
  const disableTransition = useRenders(innerBodyRef.current !== null, 2) === 1;
  const memoParagrapElements = useMemo(paragraphsFactory(paragraphs), [paragraphs]);

  function toggleHandler(visible: boolean) {
    setBodyVisible(visible);
  }

  return (
    <li className='skill-container'>
      <div className='skill-header'>
        <h3>{title}</h3>
        <ToggleButton
          startToggled={startsVisible}
          onToggle={toggleHandler}
          toggleoff={{
            Component: OpenIcon,
          }}
          toggleon={{
            Component: CloseIcon,
          }}
        />
      </div>
      <div
        style={{
          height: isBodyVisible ? bodyMaxHeight : 0,
          transition: disableTransition ? 'height 0s' : undefined,
        }}
        className='skill-body'>
        <ul ref={innerBodyRef} >
          {memoParagrapElements}
        </ul>
      </div>
    </li>
  )
}