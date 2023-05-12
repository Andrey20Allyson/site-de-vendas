import React, { HTMLInputTypeAttribute, HTMLProps } from 'react';
import './index.css';

export interface FormsFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  name?: string;
  errorMessage?: string;
  type?: HTMLInputTypeAttribute;
}

export function FormsField({
  title,
  errorMessage,
  ...rest
}: FormsFieldProps) {
  return (
    <div className='form-field'>
      <h3>{title}</h3>
      <input {...rest} />
      {errorMessage && <p className='form-field-error'>{errorMessage}</p>}
    </div>
  );
}
