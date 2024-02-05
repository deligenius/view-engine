import type {
  Context,
  RouteParams,
  State,
} from "https://deno.land/x/oak@v13.0.0/mod.ts";

import type { ViewConfig,Adapter,Engine } from "../../viewEngine.type.ts";
import { getTemplate } from "./oak.utils.ts";
import { path } from "../../../deps.ts";

declare module "https://deno.land/x/oak@v13.0.0/mod.ts" {
  // App level Context
  export interface Context {
    render: (fileName: string, data?: object) => void;
  }

  // Router level Context
  export interface RouterContext<
    R extends string,
    P extends RouteParams<R> = RouteParams<R>,
    // deno-lint-ignore no-explicit-any
    S extends State = Record<string, any>
  > {
    render: (fileName: string, data?: object) => void;
  }

  // add viewConfig to Application interface
  export interface Application {
    viewConfig: ViewConfig;
  }
}
export type { Context, ViewConfig, Adapter, Engine };
//! Add `render` function to Context
export const oakAdapter: Adapter = (
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
        const viewConfig = ctx.app.viewConfig;

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
  };
};
