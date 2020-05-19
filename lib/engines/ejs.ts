// @deno-types="../../node_modules/@types/ejs/index.d.ts"
import ejs from "https://dev.jspm.io/ejs@3.1.3";
import { Engine } from "../types/index.ts";

export const renderEjs: Engine = (
  template: string,
  data: object = {},
): string => {
  return ejs.render(template, data);
};
