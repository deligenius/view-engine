import { Context, Application } from "https://deno.land/x/oak/mod.ts";
import { Adapter, ViewConfig, Engine } from "../types/index.ts";
import { getTemplate } from "../utils/utils.ts";

declare module "https://deno.land/x/oak/mod.ts" {
  interface Context {
    render: (fileName: string, data?: object) => void;
  }
  interface Application {
    view: ViewConfig;
  }
}

export const oakAdapter: Adapter = (
  renderEngine: Engine,
  config: ViewConfig = <ViewConfig> {},
) => {
  return async function (ctx: Context, next: Function) {
    // load default view setting
    if (!ctx.app.view) {
      ctx.app.view = {
        viewExt: config.viewExt || "",
        viewEngine: config.viewEngine,
        viewRoot: config.viewRoot || "",
        useCache: config.useCache || false,
        cache: config.cache || undefined,
      };
    }

    ctx.render = async function (fileName: string, data?: object) {
      try {
        let template: any;
        const view = ctx.app.view;

        // use cache
        if (view.useCache && view.cache?.has(fileName)) {
          template = view.cache.get(fileName)!;
        } else {
          const filePath = view.viewRoot + fileName + view.viewExt;
          template = await getTemplate(filePath);
          // cache template
          if (view.useCache) {
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
