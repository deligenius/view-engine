import { ejs, EjsOptions } from "./lib/mod.ts";
import { path } from "../../../deps.ts";
import type { Engine, ViewConfig } from "../../viewEngine.type.ts";

export const ejsEngine: Engine = (
  template: string,
  data: object = {},
  config: ViewConfig = {},
  filename: string = ""
): string => {
  if (config.viewRoot) {
    let option: EjsOptions = { filename: path.join(config.viewRoot, filename) };
    return ejs.render(template, data, option) as string;
  } else {
    return ejs.render(template, data, { filename }) as string;
  }
};
