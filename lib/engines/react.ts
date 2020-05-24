import { ReactEngine } from "../types/index.ts";

export const renderReact: ReactEngine = (
  component: React.FC,
  data: any,
): string => {
  const element = React.createElement(component, data);
  return ReactDOMServer.renderToString(element)
};



/*
// @deno-types="../../node_modules/@types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom@16.13.1/server.js";
// @deno-types="../../node_modules/@types/react/index.d.ts"
import React from "https://dev.jspm.io/react@16.13.1/index.js";
*/