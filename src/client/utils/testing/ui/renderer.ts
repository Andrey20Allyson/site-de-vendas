import { Component, HTMLComponents, InferProps, Element, HTMLProps, ElementNode, ChildrenType, ElementProps } from "./elements";

export class Renderer {
  root: HTMLElement;
  private alternatives: Map<keyof HTMLProps, string>;

  constructor(root: HTMLElement) {
    this.root = root;
    this.alternatives = new Map([
      ['onClick', 'onclick'],
    ]);
  }

  parseNode(node: ElementNode): Node {
    const fragment = document.createDocumentFragment();

    fragment.append(typeof node === 'string' ? node : this.parse(node))

    return fragment;
  }

  parseNodes(nodes: ElementNode[]): Node {
    const fragment = document.createDocumentFragment();

    for (const node of nodes) {
      fragment.append(this.parseNode(node));
    }

    return fragment;
  }

  parseChildren(children?: ChildrenType): Node {
    if (!children)
      return document.createDocumentFragment();

    if (children instanceof Array)
      return this.parseNodes(children);

    return this.parseNode(children)
  }

  setProps(element: HTMLElement, props: HTMLProps) {

  }

  parseElement(type: keyof HTMLComponents, props: ElementProps): HTMLElement {
    const {
      children,
      style = {},
      ref,
      ...rest
    } = props;

    let element = document.createElement(type);

    const parsedChildren = this.parseChildren(children);

    element.append(parsedChildren);

    for (const key in rest) {
      // @ts-ignore
      const elementKey = this.alternatives.get(key) ?? key
      // @ts-ignore
      element[elementKey] = rest[key];
    }

    for (const [key, value] of Object.entries(style)) {
      if (typeof value === 'string') {
        element.style[key as any] = value;
      }
    }

    // @ts-ignore
    if (ref) ref.current = element as HTMLElement;

    return element;
  }

  parse(element: Element): HTMLElement {
    const { props, type } = element;

    return typeof type === 'string'
      ? this.parseElement(type, props)
      : this.parse(type(props));
  }

  render(element: Element) {
    const children = this.parse(element);

    this.root.replaceChildren(children);
  }

  static createElement<T extends Component<any> | keyof HTMLComponents>(factory: T, props: InferProps<T>) {
    return new Element(factory, props);
  }
}