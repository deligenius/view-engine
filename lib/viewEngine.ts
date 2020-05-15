export interface ViewConfig {
  view_root: string;
  view_engine?: string;
  view_ext?: string;
}

export type Adapter = (
  renderEngine: Engine,
  config: ViewConfig,
) => void;

export type Engine = (template: string, data: object) => string;

export function viewEngine(
  adapter: any,
  engine: any,
  config: ViewConfig = <ViewConfig> {},
) {
  return adapter(engine, config);
}




