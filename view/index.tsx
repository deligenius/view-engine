// @deno-types="../node_modules/@types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";

interface Props{
  name: string
}

const el: React.FC<Props> = (props)=> {
  return (
  <div>
    <h1>Hello, world!</h1>
    <h3>{props.name}</h3>
    <h2>It is {props.name}</h2>
  </div>
);
}


export default el