import React, { PropsWithChildren, createContext, useContext } from "react";
import { ScreenTypes } from "../responsivity";
import { useEffect, useState } from 'react';
import { classifyScreen } from '../responsivity';

export function useScreenType() {
  const [screenType, setScreenType] = useState(classifyScreen(innerWidth));

  useEffect(() => {
    function resizeListener(this: Window) {
      const newScreenType = classifyScreen(this.innerWidth);

      setScreenType(newScreenType);
    }

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, []);

  return screenType;
}

const LayoutContext = createContext(ScreenTypes.NORMAL);

export function LayoutProvider({
  children,
}: PropsWithChildren) {
  const screenType = useScreenType();

  return (
    <LayoutContext.Provider value={screenType}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  return useContext(LayoutContext);
}

export function useLayoutEqualsTo(screenType: ScreenTypes) {
  return useLayout() === screenType;
}