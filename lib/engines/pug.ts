import { pug } from '../../deps.ts';
import type { Engine, ViewConfig } from "../types/index.ts";
import * as path from "https://deno.land/std/path/mod.ts";

export const renderPug: Engine = (
  template: string,
  data: object = {},
  config: ViewConfig = {},
  filename: string = "",
): string => {
  if (config.viewRoot) {
    return pug.compile(template , { filename: path.join(config.viewRoot, filename) })(data) as string;
  } else {
    return pug.compile(template, { filename: filename })(data) as string;
  }
};