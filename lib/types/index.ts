export interface ViewConfig {
  viewRoot?: string;
  viewExt?: string;
  useCache?: boolean;
  viewEngine?: Engine | undefined;
  cache?: Map<string, string>;
}

export type Adapter = (
  renderEngine: Engine,
  config: ViewConfig,
) => void;

export type Engine =
  ((template: string, data: object) => string) |
  ((reactComponent: React.FC<any>, data: object) => string)


