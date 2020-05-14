import { Context } from "https://deno.land/x/oak/mod.ts";
import denjucks from "https://deno.land/x/denjucks/mod.js";


function renderDenjuck(viewOption: View, filename: string, data: object) {
  const file = Deno.readTextFileSync(`${viewOption.view_root}/${filename}.${viewOption.view_ext}`)
  return denjucks.renderString(file, data)
}

declare module "https://deno.land/x/oak/mod.ts" {
  interface Context {
    view: View;
    render: (fileName: string, data: object) => void
  }
}

interface View {
  view_root: string,
  view_engine?: string,
  view_ext?: string,
}


export function viewEngine(viewOption: View = <View>{}) {
  return async function (ctx: Context, next: Function) {
    ctx.view = {
      view_ext: viewOption.view_ext || "",
      view_engine: viewOption.view_engine || "html",
      view_root: viewOption.view_root || Deno.cwd()
    }

    ctx.render = function (fileName: string, data: object) {
      const html = renderDenjuck(ctx.view, fileName, data)
      ctx.response.body = html
      ctx.response.headers.set("Content-Type", "text/html; charset=utf-8")
    }

    next()
  }
}

