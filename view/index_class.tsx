// @deno-types="https://deno.land/x/view_engine/node_modules/@types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";

interface Props{
  data: {
    name: string
  }
}

const App: React.FC<Props> = (props)=> {
  return (
  <div>
    <h1>Hello, world!</h1>
    <h3>{props.data.name}</h3>
  </div>
);
}


export default App