import { Context } from "https://deno.land/x/oak/mod.ts";
import { Adapter, ViewConfig, Engine } from "../types/index.ts";

declare module "https://deno.land/x/oak/mod.ts" {
  interface Context {
    view: ViewConfig;
    render: (fileName: string, data?: object) => void;
  }
}

export const oakAdapter: Adapter = (
  renderEngine: Engine,
  config: ViewConfig = <ViewConfig> {},
) => {
  return async function (ctx: Context, next: Function) {
    // load default view setting
    ctx.view = {
      view_ext: config.view_ext || "",
      view_engine: config.view_engine,
      view_root: config.view_root || Deno.cwd(),
      use_cache: config.use_cache || false,
      cache: config.cache || undefined,
    };

    ctx.render = function (fileName: string, data?: object) {
      try {
        let template: string;
        const view = ctx.view;
        // use cache
        if (view.use_cache && view.cache?.has(fileName)) {
          template = view.cache.get(fileName)!;
        } else {
          // no cache, read from file
          template = Deno.readTextFileSync(
            `${view.view_root}/${fileName}.${view.view_ext}`,
          );
          // set cache
          if (view.use_cache) {
            view.cache?.set(fileName, template);
          }
        }

        const renderData = { ctx: { state: ctx.state }, ...data };

        ctx.response.body = renderEngine(template, renderData);
        ctx.response.headers.set("Content-Type", "text/html; charset=utf-8");
      } catch (e) {
        ctx.response.status = 404;
      }
    };

    await next();
  };
};
