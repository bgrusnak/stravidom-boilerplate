import { TextInlineNode } from 'src/interfaces/Text';

export type Modifier = Exclude<keyof TextInlineNode, 'type' | 'text'>;

export type TextInlineProps = Omit<TextInlineNode, 'type'>;
