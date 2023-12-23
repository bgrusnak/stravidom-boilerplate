import { VNode, h } from 'vue';
import textElement from './textElement';

const elements = new Map();
elements.set(
  'heading',
  ({ level, children }: { level: string | number; children: VNode[] }) =>
    h(`h${level}`, children)
);
elements.set('paragraph', ({ children }: { children: VNode[] }) =>
  h('p', children)
); 
elements.set('quote', ({ children }: { children: VNode[] }) =>
  h('blockquote', children)
);
elements.set('code', ({ plainText }: { plainText: any }) =>
  h('pre', h('code', plainText))
);
elements.set('link', ({ url, children }: { children: VNode[]; url: any }) =>
  h('a', { href: url }, children)
);
elements.set('list', ({ format, children }: { children: VNode[]; format: any }) =>
  h(format === 'ordered' ? 'ol' : 'ul', children)
);
elements.set('list-item', ({ children }: { children: VNode[] }) =>
  h('li', children)
);
elements.set(
  'image',
  ({ image }: { image: { url: any; alternativeText: any } }) =>
    h('img', { src: image.url, alt: image.alternativeText }, undefined)
);  
elements.set('text', (props: any) => textElement(props));

export default elements;
