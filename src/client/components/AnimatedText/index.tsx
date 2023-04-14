import React, { ComponentType } from 'react';
import useAnimatedText from '../../hooks/useAnimatedText';
import { formatText } from '../../utils/text';

export interface AnimatedTextComponentProps {
  children: string;
}

export interface AnimatedTextProps {
  texts?: string[];
  baseText?: string;
  Component: ComponentType<AnimatedTextComponentProps>;
}

export function AnimatedText({
  Component,
  texts,
  baseText = '%s',
}: AnimatedTextProps) {
  const animatedTexts = useAnimatedText(texts ?? []);

  return (
    <Component>
      {formatText(baseText, animatedTexts)}
    </Component>
  );
}