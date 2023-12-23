import { h } from 'vue';

export default ({
  text,
  bold,
  italic,
  underline,
  strikethrough,
  code,
}: {
  text: String;
  bold?: Boolean;
  italic?: Boolean;
  underline?: Boolean;
  strikethrough?: Boolean;
  code?: Boolean;
}) => {
  let el = h('el', text as any);
  if (underline) el = h('u', el);
  if (bold) el = h('strong', el);
  if (italic) el = h('i', el);
  if (strikethrough) el = h('s', el);
  if (code) el = h('code', el);
  return el;
};
