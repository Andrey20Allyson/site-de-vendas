import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import { FormsField, FormsFieldProps } from './FormsField';
import './index.css';

export type FormsData = Record<string, string | undefined>;

export interface FormsProps {
  itens?: FormsFieldProps[];
  onSubmit?: (data: FormsData) => void;
}

export function Forms({
  itens,
  onSubmit,
}: FormsProps) {
  const fieldsData = useMemo<FormsData>(() => ({}),  []);

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
    return (ev: ChangeEvent<HTMLInputElement>) => {
      const { name } = value;
      if (name) fieldsData[name] = ev.currentTarget?.value;
    }
  }

  function sumbitHandler() {
    onSubmit?.(fieldsData);
  }

  return (
    <div className='form-body'>
      {fieldElements}
    </div>
  );
}