import React from "react";
import { EducationProps, Education } from "./Education";
import './index.css';

export type EducationType = {
  props: EducationProps
};

export interface EducationListProps {
  title?: string;
  children: EducationType | EducationType[];
}

export function EducationList(props: EducationListProps) {
  const children: React.ReactNode[] = [];

  if (props.children instanceof Array) {
    let key = 0;
    for (const child of props.children) {
      const element = <Education key={key++} {...child.props} />;

      children.push(element);
    }
  } else {
    children.push(<Education {...props.children.props} />);
  }

  return (
    <>
      <h2 className="education-list-title">{props.title ?? 'Formação'}</h2>
      <div className="education-list-body">
        <ul className="education-list-ul">{children}</ul>
      </div>
    </>
  )
}