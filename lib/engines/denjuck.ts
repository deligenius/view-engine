// @deno-types="https://raw.githubusercontent.com/denjucks/denjucks/master/mod.d.ts"
import denjucks from "https://deno.land/x/denjucks/mod.js";
import { Engine, ViewConfig } from "../types/index.ts";

export const renderDenjuck: Engine = (
  template: string,
  data: object = {},
  config: ViewConfig = {}
) => {
  if(config.viewRoot){
    denjucks.configure(config.viewRoot)
  }

  return denjucks.renderString(template, data);
};
