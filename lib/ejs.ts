// @deno-types="../node_modules/@types/ejs/index.d.ts"
import ejs from "https://dev.jspm.io/ejs";
import { ViewConfig } from "./viewEngine.ts";


export function renderEjs(viewOption: ViewConfig, filename: string, data: object = {}) {
  const file = Deno.readTextFileSync(`${viewOption.view_root}/${filename}.${viewOption.view_ext}`)
  return ejs.render(file, data)
}
