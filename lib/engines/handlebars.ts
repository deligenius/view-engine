import handlebars from "https://dev.jspm.io/handlebars@4.7.6";
import type { Engine,ViewConfig } from "../types/index.ts";

export const hbs = <any> handlebars;

export const renderHandlebars: Engine = (
  template: string,
  data: object = {},
  config: ViewConfig = {},
  filename: string = "",

): string => {
  return hbs.compile(template)(data);
};
