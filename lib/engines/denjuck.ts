// @deno-types="https://deno.land/x/denjucks/mod.d.ts"
import denjucks from "https://deno.land/x/denjucks@1.1.1/mod.js";
import type { Engine, ViewConfig } from "../types/index.ts";

export const renderDenjuck: Engine = (
  template: string,
  data: object = {},
  config: ViewConfig = {},
  filename: string = "",
) => {
  if (config.viewRoot) {
    denjucks.configure(config.viewRoot);
  }

  return denjucks.renderString(template, data);
};
