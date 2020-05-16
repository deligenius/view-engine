import { join } from "https://deno.land/std@0.51.0/path/mod.ts";
import { Context } from "https://deno.land/x/oak/mod.ts";
import { Adapter, ViewConfig, Engine } from "../types/index.ts";
import { getTemplate } from "../utils/utils.ts";

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
      viewExt: config.viewExt || "",
      viewEngine: config.viewEngine,
      viewRoot: config.viewRoot || "",
      useCache: config.useCache || false,
      cache: config.useCache ? new Map() : undefined,
    };

    ctx.render = async function (fileName: string, data?: object) {
      try {
        let template: string;
        const view = ctx.view;

        // use cache
        if (view.useCache && view.cache?.has(fileName)) {
          template = view.cache.get(fileName)!;
        } else {
          const filePath = join(view.viewRoot!, fileName + view.viewExt);
          template = await getTemplate(filePath);
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
