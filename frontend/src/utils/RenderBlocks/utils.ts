import { ListBlockNode, ListItemInlineNode } from "./interfaces/Blocks";
import { Node } from "./types/Blocks";

let childrenNodes: any[] | (ListBlockNode | ListItemInlineNode)[] | [{
    type: "text";
    text: "";
  }]
  
  const getPlainText = (children: typeof childrenNodes): string => {
    return (children as any[]).reduce((currentPlainText: any, node:any) => {
      if (node.type === 'text') {
        return currentPlainText.concat(node.text);
      }
      if (node.type === 'link') {
        return currentPlainText.concat(getPlainText(node.children));
      }
      return currentPlainText;
    }, '');
  };
  
 export const augmentProps = (content: Node) => {
    const { children: childrenNodes, type, ...props } = content;
  
    if (type === 'code') {
      return {
        ...props,
        plainText: getPlainText(content.children),
      };
    }
  
    return props;
  };
  