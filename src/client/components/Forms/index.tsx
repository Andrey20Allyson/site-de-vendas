import React, { Children, PropsWithChildren, useRef } from 'react';
import { FormsField, FormsFieldProps, isFormsField } from './FormsField';
import { FormsGetter, FormsStore } from './forms-data';
import './index.css';

export type ArrayOrNot<T> = T | T[];

export interface FormsProps extends PropsWithChildren {
  onSubmit?: (data: FormsGetter) => void;
}

export function useBindedFields() {
  const sumbitHandlerRef = useRef<FormsProps['onSubmit']>();
  const formsStoreRef = useRef<FormsStore>(new FormsStore());

  function clickHandler() {
    sumbitHandlerRef.current?.(formsStoreRef.current)
  }

  function getClickHandler(props: FormsFieldProps) {
    return props.type === 'submit' ? clickHandler : undefined;
  }

  function setSubmitHandler(handler: FormsProps['onSubmit']) {
    sumbitHandlerRef.current = handler;
  }

  function getHandlers(props: FormsFieldProps) {
    const clickHandler = getClickHandler(props);
    
    return { clickHandler, formsStore: formsStoreRef.current };
  }

  return { getHandlers, setSubmitHandler }
}

export function Forms({
  children,
  onSubmit,
}: FormsProps) {
  const { getHandlers, setSubmitHandler } = useBindedFields();

  setSubmitHandler(onSubmit);

  const elements = Children.map(children, (child, index) => {
    if (!isFormsField(child)) return child;

    const { clickHandler, formsStore } = getHandlers(child.props);

    return <FormsField key={index} onClick={clickHandler} formsSetter={formsStore} {...child.props} />
  });

  return (
    <div className='form-body'>
      {elements}
    </div>
  );
}