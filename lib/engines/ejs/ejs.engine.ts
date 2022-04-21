import { ejs, EjsOptions } from "./lib/mod.ts";
import { path } from "../../../deps.ts";
import type { Engine, ViewConfig } from "../../viewEngine.type.ts";

export const ejsEngine: Engine = (
  template: string,
  data: object = {},
  config: ViewConfig = {},
  filename: string = ""
) => {
  return new Promise<string>((resolve, reject) => {
    try {
      if (config.viewRoot) {
        let option: EjsOptions = { filename: path.join(config.viewRoot, filename) };
        const result =  ejs.render(template, data, option) as string;
        resolve(result);
      } else {
        const result =  ejs.render(template, data, { filename }) as string;
        resolve(result);
      }
    }
    catch (e) {
      reject(e);
    }
  });
};
