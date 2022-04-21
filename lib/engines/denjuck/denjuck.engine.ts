// @deno-types="https://deno.land/x/denjucks/mod.d.ts"
import denjucks from "https://raw.githubusercontent.com/lumeland/denjucks/v2.0.0/mod.js";
import type { Engine,ViewConfig } from "../../viewEngine.type.ts";

export const denjuckEngine: Engine = (
  template: string,
  data: object = {},
  config: ViewConfig = {},
  filename: string = "",
) => {

  if (config.viewRoot) {
    denjucks.configure(config.viewRoot);
  }

  return new Promise<string>((resolve, reject) => {
    try {
      const result = denjucks.render(template, data) as string;
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });

};
