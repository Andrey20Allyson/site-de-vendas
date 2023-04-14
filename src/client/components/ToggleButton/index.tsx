import React, { useState } from "react";
import { useLayoutEqualsTo } from "../../contexts/layout";
import { ScreenTypes } from "../../responsivity";
import './index.css';

export interface ElementProp<P = {}> {
  node?: React.ReactNode;
  Component?: React.ComponentType<P>;
}

export interface CustomToggleElements { 
  toggleon?: ElementProp<any>;
  toggleoff?: ElementProp<any>;
}

export interface ToggleButtonProps extends CustomToggleElements, React.HTMLProps<HTMLDivElement> {
  startToggled?: boolean; 
  onToggle?: (value: boolean) => void;
}

export function getToggleElements(props: CustomToggleElements) {
  const {
    toggleoff: toggleOff,
    toggleon: toggleOn,
  } = props;

  const {
    Component: ToggledOnComponent,
    node: toggledOnNode,
  } = toggleOn ?? {};
  
  const {
    Component: ToggledOffComponent,
    node: toggledOffNode,
  } = toggleOff ?? {};

  const toggleOnElement = ToggledOnComponent ? <ToggledOnComponent/> : toggledOnNode ?? <p>On</p>;
  const toggleOffElement = ToggledOffComponent ? <ToggledOffComponent/> : toggledOffNode ?? <p>Off</p>;

  return {
    toggleOnElement,
    toggleOffElement,
  }
}

export function ToggleButton(props: ToggleButtonProps) {
  const {
    onToggle,
    startToggled,
    className,
    toggleoff,
    toggleon,
    ...rest
  } = props;

  const [toggled, setToggled] = useState(startToggled ?? false);
  const { toggleOffElement, toggleOnElement } = getToggleElements(props);
  const pocket = useLayoutEqualsTo(ScreenTypes.POCKET);

  const classNames = ['togglebtn-body'];

  if (pocket) classNames.push('pocket');
  if (className) classNames.push(className);

  function clickHandler() {
    const newToggledValue = !toggled;

    onToggle?.(newToggledValue);

    setToggled(newToggledValue);
  }

  return (
    <div
    className={classNames.join(' ')}
    onClick={clickHandler}
    {...rest}>
      {toggled ? toggleOnElement : toggleOffElement}
    </div>
  )
}