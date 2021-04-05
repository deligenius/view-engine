// @deno-types="https://deno.land/x/denjucks/mod.d.ts"
import denjucks from "https://raw.githubusercontent.com/lumeland/denjucks/v2.0.0/mod.js";
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
