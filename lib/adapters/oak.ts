import { Context } from "https://deno.land/x/oak/mod.ts";
import { ViewConfig } from "../viewEngine.ts";

declare module "https://deno.land/x/oak/mod.ts" {
  interface Context {
    view: ViewConfig;
    render: (fileName: string, data?: object) => void;
  }
}

export function oakAdapter(
  renderEngine: (template: string, data: object) => string,
  config: ViewConfig = <ViewConfig> {},
) {
  return async function (ctx: Context, next: Function) {
    ctx.view = {
      view_ext: config.view_ext || "",
      view_engine: config.view_engine || "html",
      view_root: config.view_root || Deno.cwd(),
    };

    ctx.render = function (fileName: string, data?: object) {
      try {
        const template = Deno.readTextFileSync(
          `${ctx.view.view_root}/${fileName}.${ctx.view.view_ext}`,
        );
        const renderData = { ctx: { state: ctx.state }, ...data };

        ctx.response.body = renderEngine(template, renderData);

        ctx.response.headers.set("Content-Type", "text/html; charset=utf-8");
      } catch (e) {
        ctx.response.status = 404;
      }
    };

    await next();
  };
}
