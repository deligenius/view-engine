// @deno-types="../../node_modules/@types/nunjucks/index.d.ts"
import denjucks from "https://deno.land/x/denjucks/mod.js";

export function renderDenjuck(template: string, data: object = {}) {
  return denjucks.renderString(template, data);
}

