// // @deno-types="../../node_modules/@types/ejs/index.d.ts"
// import ejs from "https://dev.jspm.io/ejs@3.1.3";
// import { Engine,ViewConfig } from "../types/index.ts";

// export const renderEjs: Engine = (
//   template: string,
//   data: object = {},
//   config: ViewConfig = {}
// ): string => {
//   return ejs.render(template, data);
// };

import { ejs, EjsOptions } from "./ejs/mod.ts";
import { Engine, ViewConfig } from "../types/index.ts";
import { join } from "../../deps.ts";

export const renderEjs: Engine = (
  template: string,
  data: object = {},
  config: ViewConfig = {},
  filename: string = "",
): string => {
  if (config.viewRoot) {
    let option: EjsOptions = { filename: join(config.viewRoot, filename) };
    return ejs.render(template, data, option) as string;
  } else {
    return ejs.render(template, data, { filename }) as string;
  }
};
