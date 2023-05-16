import { useRef } from "react";

export type EventListener<E> = (event: E) => void;

export interface RefObject<T> {
  readonly current: T | null;
}

export interface MutableRefObject<T> {
  current: T;
}

export function createRef<E = undefined>(): MutableRefObject<E | undefined>;
export function createRef<E>(initialValue: E): MutableRefObject<E>
export function createRef<E>(initialValue: E | null): RefObject<E>;

export function createRef<E>(initialValue: E | null = null) {
  return {
    current: initialValue,
  };
}

export interface HTMLProps<E extends HTMLElement = HTMLElement> {
  className?: string;
  id?: string;
  style?: Partial<CSSStyleDeclaration>;
  onClick?: EventListener<MouseEvent>;
  ref?: RefObject<E | null>;
}

export interface PropsWithChildren {
  children?: ChildrenType;
}

export interface ElementProps<E extends HTMLElement = HTMLElement> extends HTMLProps<E>, PropsWithChildren { }

export interface HTMLComponents {
  'p': ElementProps<HTMLParagraphElement>;
  'div': ElementProps<HTMLDivElement>;
  'br': ElementProps<HTMLBRElement>;
  'h1': ElementProps<HTMLHeadingElement>;
  'h2': ElementProps<HTMLHeadingElement>;
  'h3': ElementProps<HTMLHeadingElement>;
  'h4': ElementProps<HTMLHeadingElement>;
  'h5': ElementProps<HTMLHeadingElement>;
  'h6': ElementProps<HTMLHeadingElement>;
  'img': ElementProps<HTMLImageElement>;
  'canvas': ElementProps<HTMLCanvasElement>;
}

export type Component<P> = (props: P) => Element<any, any>;

export class Element<P = any, T extends Component<P> | keyof HTMLComponents = Component<P> | keyof HTMLComponents> {
  type: T;
  props: P;

  constructor(type: T, props: P) {
    this.props = props;
    this.type = type;
  }
}

export type ElementNode = Element | string | undefined;
export type ChildrenType = ElementNode | ElementNode[];

export type InferProps<C extends Component<any> | keyof HTMLComponents> = C extends Component<any> ? Parameters<C>[0] : C extends keyof HTMLComponents ? HTMLComponents[C] : unknown;

export type ElementStringfier<P> = (props: P) => string;