import type { Adapter, Engine, ViewConfig } from "./viewEngine.type.ts";

export function viewEngine<TAdapterMiddleware>(
  adapter: Adapter<TAdapterMiddleware>,
  engine: Engine,
  config: ViewConfig = <ViewConfig>{}
): TAdapterMiddleware {
  return adapter(engine, config);
}
