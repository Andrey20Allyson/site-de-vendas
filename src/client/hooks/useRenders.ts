import { useRef } from "react";

export default function useRenders(valid?: boolean, max?: number) {
  const rendersRef = useRef(0);

  if (!valid) return rendersRef.current;

  if (max) {
    if (rendersRef.current < max) rendersRef.current++;
  } else {
    rendersRef.current++;
  }

  return rendersRef.current;
}
