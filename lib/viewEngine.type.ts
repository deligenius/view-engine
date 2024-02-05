import {  MiddlewareOrMiddlewareObject } from "../deps.ts";

export interface ViewConfig {
  viewRoot?: string;
  viewEngine?: Engine | undefined;
}

export type AdapterMiddleware<T, TContext> = (
  context: TContext,
  next: () => Promise<unknown>,
) => Promise<T>;

export type Adapter<T = MiddlewareOrMiddlewareObject> = (
  renderEngine: Engine,
  config: ViewConfig,
) => T;

export type Engine = (
  template: string,
  data: object,
  config?: ViewConfig,
  filename?:string
) => Promise<string>;
