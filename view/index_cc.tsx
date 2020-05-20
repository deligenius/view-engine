// @deno-types="../node_modules/@types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";

interface Props{
  name: string
}

class el extends React.Component<{name: string}>{
  constructor(props: {name:string}) {
    super(props)
  }

  render(){
    return (
      <div> 
        <h1>Hello, world!</h1>
        <h3>{this.props.name}</h3>
        <h2>It is {this.props.name}</h2>
        <h5>This is class component</h5>
      </div>
    )
  }
}



export default el