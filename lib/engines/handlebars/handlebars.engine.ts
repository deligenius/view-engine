import handlebars from "npm:handlebars";
import type { Engine,ViewConfig } from "../../viewEngine.type.ts";

export const hbs = handlebars;

export const handlebarsEngine: Engine = (
  template: string,
  data: object = {},
  _config: ViewConfig = {},
  _filename = "",

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
