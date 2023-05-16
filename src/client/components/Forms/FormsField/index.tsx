import React, { ChangeEvent, HTMLInputTypeAttribute, ReactElement, isValidElement } from 'react';
import './index.css';
import { FormsSetter, FormsStoreType } from '../forms-data';

export interface FormsFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  name?: string;
  errorMessage?: string;
  formsSetter?: FormsSetter;
}

export function isFormsField(object: unknown): object is ReactElement<FormsFieldProps, typeof FormsField> {
  return isValidElement(object) && object.type === FormsField;
}

export function FormsField({
  errorMessage,
  formsSetter,
  title,
  ...rest
}: FormsFieldProps) {
  async function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    const { onChange, name } = rest;
    
    onChange?.(ev);
    
    if (formsSetter && name) {
      const { files, value } = ev.currentTarget;

      const input: FormsStoreType = files ?? value;

      formsSetter.set(name, input);
    } 
  }

  return (
    <div className='form-field'>
      <h3>{title}</h3>
      <input onChange={handleChange} {...rest} />
      {errorMessage && <p className='form-field-error'>{errorMessage}</p>}
    </div>
  );
}
