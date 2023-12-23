import { Component } from "vue";
import { BlocksComponents, DefaultInlineNode, ModifiersComponents, Node, RootNode } from "../types/Blocks";
import { TextInlineNode } from "./Text";

export interface LinkInlineNode {
    type: 'link';
    url: string;
    children: TextInlineNode[];
  }
  
  export interface ListItemInlineNode {
    type: 'list-item';
    children: DefaultInlineNode[];
  }


export interface ParagraphBlockNode {
    type: 'paragraph';
    children: DefaultInlineNode[];
  }
  
  export interface QuoteBlockNode {
    type: 'quote';
    children: DefaultInlineNode[];
  }
  
  export interface CodeBlockNode {
    type: 'code';
    children: DefaultInlineNode[];
  }
  
  export interface HeadingBlockNode {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: DefaultInlineNode[];
  }
  
  export interface ListBlockNode {
    type: 'list';
    format: 'ordered' | 'unordered';
    children: (ListItemInlineNode | ListBlockNode)[];
  }
  
  export interface ImageBlockNode {
    type: 'image';
    image: {
      name: string;
      alternativeText?: string | null;
      url: string;
      caption?: string | null;
      width: number;
      height: number;
      formats?: Record<string, unknown>;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      previewUrl?: string | null;
      provider: string;
      provider_metadata?: unknown | null;
      createdAt: string;
      updatedAt: string;
    };
    children: [{ type: 'text'; text: '' }];
  }

export interface ComponentsContextValue {
    blocks: BlocksComponents;
    modifiers: ModifiersComponents;
    missingBlockTypes: string[];
    missingModifierTypes: string[];
  }

  export interface ComponentsProviderProps {
    children: Component;
    value?: ComponentsContextValue;
  }

  export interface BlocksRendererProps {
    content: RootNode[];
    blocks?: Partial<BlocksComponents>;
    modifiers?: Partial<ModifiersComponents>;
  }
  
  export interface BlockProps {
    content: Node;
  }
  