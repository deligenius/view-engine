import type {
  Context,
  RouteParams,
  State,
} from "https://deno.land/x/oak@v10.5.1/mod.ts";

import type { ViewConfig,Adapter,Engine } from "../../viewEngine.type.ts";
import { getTemplate } from "./oak.utils.ts";

declare module "https://deno.land/x/oak@v10.5.1/mod.ts" {
  // App level Context
  interface Context {
    render: (fileName: string, data?: object) => void;
  }

  // Router level Context
  interface RouterContext<
    R extends string,
    P extends RouteParams<R> = RouteParams<R>,
    // deno-lint-ignore no-explicit-any
    S extends State = Record<string, any>
  > {
    render: (fileName: string, data?: object) => void;
  }

  // add viewConfig to Application interface
  interface Application {
    viewConcig: ViewConfig;
  }
}

//! Add `render` function to Context
export const oakAdapter: Adapter = (
  renderEngine: Engine,
  config: ViewConfig = <ViewConfig>{}
) => {
  return async function (ctx: Context, next: Function) {
    // load default view setting
    if (!ctx.app.viewConcig) {
      ctx.app.viewConcig = {
        viewEngine: config.viewEngine,
        viewRoot: config.viewRoot ?? "./",
      };
    }

    ctx.render = async function (fileName: string, data?: object) {
      try {
        const viewConfig = ctx.app.viewConcig;

        // find template file path, either on internet or in local file system
        let template = await getTemplate(viewConfig.viewRoot!, fileName);

        ctx.response.headers.set("Content-Type", "text/html; charset=utf-8");
        
        ctx.response.body = async () => {
          return renderEngine(
            template,
            data ?? {},
            ctx.app.viewConcig,
            fileName
          );
        }

      } catch (e) {
        ctx.response.status = 404;
        console.error("View-Engine: ", e.message);
      }
    };

    await next();
  };
};
