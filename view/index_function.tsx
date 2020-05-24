// @deno-types="https://deno.land/x/view_engine/node_modules/@types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";

interface Props {
  data: {
    name: string;
  };
}

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h3>{this.props.data.name}</h3>
      </div>
    );
  }
}

export default App;
