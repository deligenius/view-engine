// @deno-types="https://deno.land/x/view_engine/node_modules/@types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";

interface Props{
  item: string
}

const Item: React.FC<Props> = (props)=> {
  return (
  <div>
    <h4>Items here - {props.item}</h4>
  </div>
);
}


export default Item