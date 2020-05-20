export interface ViewConfig {
  viewRoot?: string;
  viewExt?: string;
  useCache?: boolean;
  viewEngine?: Engine | undefined;
  cache?: Map<string, string>;
}

export type Adapter = (
  renderEngine: Engine | ReactEngine,
  config: ViewConfig,
) => void;

export type Engine = (template: string, data: object) => string


export type ReactEngine = (template: React.FC, data: object) => string

