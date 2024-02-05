import type {
  Context,
  MiddlewareOrMiddlewareObject,
  RouteParams,
  State,
} from "https://deno.land/x/oak@v13.0.0/mod.ts";

import type { ViewConfig,Engine } from "../../viewEngine.type.ts";

declare module "https://deno.land/x/oak@v13.0.0/mod.ts" {
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
    viewConfig: ViewConfig;
  }
}
//! Add `render` function to Context
export const oakAdapter = <T extends MiddlewareOrMiddlewareObject>(
  renderEngine: Engine,
  config: ViewConfig = <ViewConfig>{}
) => {
  return async function (ctx: Context, next: () => Promise<unknown>) {
    // load default view setting
    if (!ctx.app.viewConfig) {
      ctx.app.viewConfig = {
        viewEngine: config.viewEngine,
        viewRoot: config.viewRoot ?? "./",
      };
    }

    ctx.render = (fileName: string, data?: object) =>{
      try {
        ctx.response.headers.set("Content-Type", "text/html; charset=utf-8");
        
        ctx.response.body = () => {
          return renderEngine(
            fileName,
            data ?? {},
            ctx.app.viewConfig,
            fileName
          );
        }

      } catch (e) {
        ctx.response.status = 404;
        console.error("View-Engine: ", e.message);
      }
    };

    await next();
  } as T;
};
