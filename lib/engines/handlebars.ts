import handlebars from "https://dev.jspm.io/handlebars@4.7.6";
import { Engine } from "../types/index.ts";

export const renderHandlebars: Engine = (
  template: string,
  data: object = {},
): string => {
  return handlebars.compile(template)(data);
};
