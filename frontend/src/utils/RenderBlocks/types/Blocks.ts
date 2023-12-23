import { TextInlineNode } from 'src/interfaces/Text';
import {
  CodeBlockNode,
  HeadingBlockNode,
  ImageBlockNode,
  LinkInlineNode,
  ListBlockNode,
  ListItemInlineNode,
  ParagraphBlockNode,
  QuoteBlockNode,
} from '../interfaces/Blocks';
import { Component } from 'vue';
import { Modifier } from './Text';

// Inline node types
export type DefaultInlineNode = TextInlineNode | LinkInlineNode;
export type NonTextInlineNode =
  | Exclude<DefaultInlineNode, TextInlineNode>
  | ListItemInlineNode;

// Block node types
export type RootNode =
  | ParagraphBlockNode
  | QuoteBlockNode
  | CodeBlockNode
  | HeadingBlockNode
  | ListBlockNode
  | ImageBlockNode;
export type Node = RootNode | NonTextInlineNode;

// Util to convert a node to the props of the corresponding React component
export type GetPropsFromNode<T> = Omit<T, 'type' | 'children'> & {
  children?: Component;
  // For code blocks, add a plainText property that is created by this renderer
  plainText?: T extends { type: 'code' } ? string : never;
};

// Map of all block types to their matching React component
export type BlocksComponents = {
  [K in Node['type']]: Component<
    // Find the BlockProps in the union that match the export type key of the current BlockNode
    // and use it as the component props
    GetPropsFromNode<Extract<Node, { type: K }>>
  >;
};

// Map of all inline types to their matching React component
export type ModifiersComponents = {
  [K in Modifier]: Component<{ children: Component }>;
};

export type BlockComponentProps = GetPropsFromNode<Node>;

export type BlocksContent = RootNode[];
 