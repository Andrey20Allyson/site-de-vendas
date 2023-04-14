import { useState, useEffect } from 'react';

export interface Size {
  width: number;
  height: number;
}

export default function useResizeObserver(ref: React.RefObject<Element>, rerender?: (oldSize: Size, newSize: Size) => boolean) {
  const [size, setSize] = useState<Size>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const {
      current: element
    } = ref;

    if (!element) return setError('reference is null');

    let oldSize: Size = {
      height: element.clientHeight,
      width: element.clientWidth
    } 

    const observer = new ResizeObserver(entries => {
      for (const { target } of entries) {
        const newSize: Size = {
          height: target.clientHeight,
          width: target.clientWidth,
        };

        if (target === element && rerender?.(oldSize, newSize)) {
          oldSize = newSize;
          setSize(newSize);
        }
      }
    });

    observer.observe(element);

    setSize(oldSize);

    return () => observer.disconnect();
  }, [ref]);

  if (error) {
    console.warn(error);
  }

  return size;
}
