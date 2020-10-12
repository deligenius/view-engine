import type { Adapter, Engine, ViewConfig } from "./types/index.ts";


export function viewEngine(
  adapter: Adapter,
  engine: Engine,
  config: ViewConfig = <ViewConfig> {},
): any {
  try {
    if (config.useCache) {
      config.cache = new Map<string, string>();
    }
    return adapter(engine, config);
  } catch (e) {
    throw new Error("View-Engine: Wrong Engine or View type");
  }
}
