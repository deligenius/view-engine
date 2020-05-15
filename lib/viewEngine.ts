import { Context } from "https://deno.land/x/oak/mod.ts";
import { renderDenjuck } from './denjuck.ts'
import { renderEjs } from "./ejs.ts";

declare module "https://deno.land/x/oak/mod.ts" {
  interface Context {
    view: ViewConfig;
    render: (fileName: string, data?: object) => void
  }
}

export interface ViewConfig {
  view_root: string,
  view_engine?: string,
  view_ext?: string,
}


export function viewEngine(config: ViewConfig = <ViewConfig>{}) {
  return async function (ctx: Context, next: Function) {
    ctx.view = {
      view_ext: config.view_ext || "",
      view_engine: config.view_engine || "html",
      view_root: config.view_root || Deno.cwd()
    }

    ctx.render = function (fileName: string, data?: object) {
      try {
        const renderData = { ctx: { state: ctx.state }, ...data, }

        if (ctx.view.view_engine === 'ejs') {
          ctx.response.body = renderEjs(ctx.view, fileName, renderData)
        }
        else {
          ctx.response.body = renderDenjuck(ctx.view, fileName, renderData)
        }

        ctx.response.headers.set("Content-Type", "text/html; charset=utf-8")
      } catch (e) {
        ctx.response.status = 404
      }
    }

    await next()
  }
}

