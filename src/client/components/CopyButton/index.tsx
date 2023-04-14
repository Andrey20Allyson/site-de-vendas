import React, { useEffect, useState } from "react";
import { AiOutlineCopy, AiOutlineCheck } from 'react-icons/ai';
import './index.css'
import { useLayoutEqualsTo } from "../../contexts/layout";
import { ScreenTypes } from "../../responsivity";

export function CheckIcon() {
  return <AiOutlineCheck className="copybtn-icon" size='25' />
}

export function CopyIcon() {
  return <AiOutlineCopy className="copybtn-icon" size='25' />
}

export interface CopyButtonProps {
  data?: string;
  color?: string;
  className?: string;
}

export function CopyButton(props: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  
  const classNames = ["copybtn-body"];

  async function clickHandler(ev: React.MouseEvent<HTMLDivElement>) {
    try {
      await navigator.clipboard.writeText(props.data ?? '');
      if (!copied) setCopied(true);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (copied === true) { 
      setTimeout(() => setCopied(false), 2000);
    }
  }, [copied]);

  if (copied) classNames.push('copied');
  if (props.className) classNames.push(props.className);

  return (
    <div
      onClick={clickHandler}
      className={classNames.join(' ')}>
      {copied ? <CheckIcon /> : <CopyIcon />}
    </div>
  )
}