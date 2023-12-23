import { VNode } from 'vue';
import elements from './elements';

const render = (content: any): VNode => {
  const { children, type, ...props } = content;
  const childrenRendered = !!children  ? (children as any[]).map((el: any) => render(el)) : [];
  const block = elements.get(type);
  return block({ ...props, children: childrenRendered });
};

export default render;