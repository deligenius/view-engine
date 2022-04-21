import handlebars from "https://dev.jspm.io/handlebars@4.7.6";
import type { Engine,ViewConfig } from "../../viewEngine.type.ts";

export const hbs = <any> handlebars;

export const handlebarsEngine: Engine = (
  template: string,
  data: object = {},
  config: ViewConfig = {},
  filename: string = "",

) => {
  return new Promise<string>((resolve, reject) => {
    try {
      const result = hbs.compile(template)(data) as string;
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });

};
