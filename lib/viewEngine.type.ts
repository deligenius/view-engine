export interface ViewConfig {
  viewRoot?: string;
  viewEngine?: Engine | undefined;
}

export type Adapter = (
  renderEngine: Engine,
  config: ViewConfig,
) => void;

export type Engine = (
  template: string,
  data: object,
  config?: ViewConfig,
  filename?:string
) => string;
