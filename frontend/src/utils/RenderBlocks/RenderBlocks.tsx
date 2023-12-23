import RenderBlockComponent from './RenderBlockComponent';

export default ({content}:{ content:any[]}) => {
  {  
    return content.map((el: any) => RenderBlockComponent(el));
  }
};
