import { useEffect, useState } from 'react';

export default function useAnimatedText(texts: string[]) {
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    let textsIndex = 0;
    let stringEnd = 0;
    let increment = 1;

    const changeDelay = 4;
    let timeLeftToChange = changeDelay;
    
    const timer = setInterval(() => {
      if (!texts) return;

      if (textsIndex < texts.length) {
        const text = texts[textsIndex];

        if (stringEnd === text.length && timeLeftToChange > 0) {
          timeLeftToChange--;
          return;
        }

        if (stringEnd >= text.length) increment = -1;

        stringEnd += increment;

        if (stringEnd === 0) {
          textsIndex++;
          increment = 1;
          timeLeftToChange = changeDelay;
        }

        setCurrentText(text.slice(0, stringEnd));
      } else {
        textsIndex = 0;
      }
    }, 100);

    return () => {
      clearInterval(timer);
    }
  }, []);

  return currentText;
}