// @deno-types="../../node_modules/@types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
// @deno-types="../../node_modules/@types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";

import { Engine } from "../types/index.ts";

export const renderReact: Engine = (
  component: React.FC,
  data: any,
): string => {
  const element = React.createElement(component, data);
  return ReactDOMServer.renderToString(element)
};

