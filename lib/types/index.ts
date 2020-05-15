export interface ViewConfig {
  view_root?: string;
  view_ext?: string;
  use_cache?: boolean;
  view_engine?: Engine | undefined;
  cache?: Map<string, string>;
}

export type Adapter = (
  renderEngine: Engine,
  config: ViewConfig,
) => void;

export type Engine = (template: string, data: object) => string;