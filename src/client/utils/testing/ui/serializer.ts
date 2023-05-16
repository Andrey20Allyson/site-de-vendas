import { ChildrenType, ElementNode, Element, HTMLComponents, HTMLProps, ElementProps } from "./elements";

export class Serializer {
  root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  serializeNode(node: ElementNode) {
    return typeof node === 'string' ? node : this.serialize(node);
  }

  serializeNodes(nodes: ElementNode[]) {
    let text = '';

    for (const node of nodes) {
      text += this.serializeNode(node);
    }

    return text;
  }

  serializeChildren(children?: ChildrenType) {
    if (!children)
      return '';

    if (children instanceof Array)
      return this.serializeNodes(children);

    return this.serializeNode(children);
  }

  serializeElement(type: keyof HTMLComponents, props: ElementProps) {
    const {
      children,
      className,
      ...rest
    } = props;

    let textProps = '';

    if (className) {
      textProps += ` class="${className}"`;
    }

    for (const [key, value] of Object.entries(rest)) {
      textProps += ` ${key}="${value}"`;
    }

    let htmlChildren = this.serializeChildren(children);

    return `<${type}${textProps}>${htmlChildren}</${type}>`;
  }

  serialize(element: Element): string {
    const { props, type } = element;

    return typeof type === 'string'
      ? this.serializeElement(type, props)
      : this.serialize(type(props));
  }

  render(element: Element) {
    this.root.innerHTML = this.serialize(element);
  }
}