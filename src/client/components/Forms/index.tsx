import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import { FormsField, FormsFieldProps } from './FormsField';
import './index.css';

export type FormData = Record<string, string>;

export interface FormsProps {
  itens?: FormsFieldProps[];
  onSubmit?: (data: FormData) => void;
}

export function Forms({
  itens
}: FormsProps) {
  const fieldsData = useMemo<FormData>(() => ({}), [itens]);

  const fieldElements = itens?.map((entry, index) => {
    const changeHandler = bindChangeHandler(entry);

    return (
      <FormsField
        key={index}
        onChange={changeHandler}
        onClick={entry.type === 'submit' ? sumbitHandler : undefined}
        {...entry}
      />
    );
  });

  function bindChangeHandler(value: FormsFieldProps) {
    console.log('criou')

    return (ev: ChangeEvent<HTMLInputElement>) => {
      const { name } = value;
      if (name) fieldsData[name] = ev.currentTarget?.value;
    }
  }

  function sumbitHandler() {
    console.log(fieldsData);
  }

  return (
    <div className='form-body'>
      {fieldElements}
    </div>
  );
}