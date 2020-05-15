// @deno-types="../../node_modules/@types/ejs/index.d.ts"
import ejs from "https://dev.jspm.io/ejs";

export function renderEjs(template: string, data: object = {}):string {
  return ejs.render(template, data);
}
