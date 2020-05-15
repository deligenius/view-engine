// @deno-types="../node_modules/@types/nunjucks/index.d.ts"
import denjucks from "https://deno.land/x/denjucks/mod.js";
import { ViewConfig } from "./viewEngine.ts";

export function renderDenjuck(viewOption: ViewConfig, filename: string, data: object = {}) {
  const file = Deno.readTextFileSync(`${viewOption.view_root}/${filename}.${viewOption.view_ext}`)
  return denjucks.renderString(file, data)
}

//