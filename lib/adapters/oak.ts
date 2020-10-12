import type { Context } from "https://deno.land/x/oak@v6.2.0/mod.ts";
import type { Adapter, ViewConfig, Engine } from "../types/index.ts";
import { getTemplate } from "../utils/utils.ts";

declare module "https://deno.land/x/oak@v6.2.0/mod.ts" {
  interface Context {
    render: (fileName: string, data?: object) => void;
  }

  interface RouterContext{
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

    ctx.render = async function (file: string, data?: object) {
      try {
        let template: any;
        const view = ctx.app.view;
        const filename = file + view.viewExt;

        // use cache
        if (view.useCache && view.cache?.has(file)) {
          template = view.cache.get(file)!;
        } else {
          template = await getTemplate(view.viewRoot!, filename);
          // cache template
          if (view.useCache) {
            view.cache?.set(file, template);
          }
        }

        // remove state
        // const renderData = { ctx: { state: ctx.state }, ...data };

        ctx.response.body = await renderEngine(
          template,
          data ?? {},
          ctx.app.view,
          filename,
        );
        ctx.response.headers.set("Content-Type", "text/html; charset=utf-8");
      } catch (e) {
        ctx.response.status = 404;
        console.log(e.message);
      }
    };

    await next();
  };
};
