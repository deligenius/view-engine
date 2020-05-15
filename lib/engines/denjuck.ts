// @deno-types="../../node_modules/@types/nunjucks/index.d.ts"
import denjucks from "https://deno.land/x/denjucks/mod.js";
import { Engine } from "../types/index.ts";

export const renderDenjuck: Engine = (
  template: string,
  data: object = {},
) => {
  return denjucks.renderString(template, data);
};
