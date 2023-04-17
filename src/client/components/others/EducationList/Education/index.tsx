import React from "react";
import defaultParser from "../../../../utils/react-node-parser";
import './index.css';
import { useLayoutEqualsTo } from "../../../../contexts/layout";
import { ScreenTypes } from "../../../../responsivity";

export enum EducationModalities {
  PRESENTIAL,
  ONLINE,
  SEMI_PRESENTIAL,
}

export type EducationModalitiesMap = {
  [k in EducationModalities]: string;
};

export const modalitiesMap: EducationModalitiesMap = {
  [EducationModalities.ONLINE]: 'Online',
  [EducationModalities.PRESENTIAL]: 'Presencial',
  [EducationModalities.SEMI_PRESENTIAL]: 'Semi Presencial',
};

export class MonthAndYear {
  private static _monthStrings = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  year: number;
  month: number;

  constructor(month: number = 0, year: number = 0) {
    this.month = month;
    this.year = year;
  }

  toString() {
    return `${MonthAndYear.monthToString(this.month)} de ${this.year}`
  }

  static monthToString(month: number) {
    return this._monthStrings[month % this._monthStrings.length];
  }
}

export interface EducationProps {
  title: string;
  desc: string;
  modality?: EducationModalities;
  start: MonthAndYear;
  finish?: MonthAndYear;
  imgSrc?: string;
  index?: string;
}

export function Education({
  desc,
  start,
  title,
  finish,
  imgSrc,
  index,
  modality,
}: EducationProps) {
  const pocket = useLayoutEqualsTo(ScreenTypes.POCKET);

  const classNames = ['education-li'];

  if (pocket) classNames.push('pocket');

  return (
    <li className={classNames.join(' ')}>
      <h3 className='education-title'>{title}</h3>
      <p>{defaultParser.parse(desc)}</p>
      <p>
        Modalidade: <strong>
          {
            modalitiesMap[modality ?? EducationModalities.ONLINE]
          }
        </strong>
      </p>
      <p>
        Inicado em <strong>
          {start.toString()}
        </strong>
      </p>
      {finish ? (
        <p>Finalizado em <strong>{finish.toString()}</strong></p>
      ) : (
        <p>
          <strong>
            [Em andamento]
          </strong>
        </p>
      )}
      {imgSrc && (
        <div className='education-instituition-img-div'>
          <img src={imgSrc} alt={`${title} - Image`} className='education-instituition-img' />
        </div>
      )}
    </li>
  )
}