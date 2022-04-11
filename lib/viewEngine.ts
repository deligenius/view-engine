import type { Adapter, Engine, ViewConfig } from "./viewEngine.type.ts";

export function viewEngine(
  adapter: Adapter,
  engine: Engine,
  config: ViewConfig = <ViewConfig>{}
): any {
  return adapter(engine, config);
}
