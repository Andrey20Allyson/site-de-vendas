import React from 'react';
import { SkillProps } from './Skill';

export interface SkillListProps {
  title?: string;
  children?: React.ReactElement<SkillProps>[];
}

export function SkillList(props: SkillListProps) {
  return (
    <article>
      <h2>{props.title ?? 'Skills'}</h2>
      <ul>
        {props.children}
      </ul>
    </article>
  )
} 