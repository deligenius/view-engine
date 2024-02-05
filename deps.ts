export { existsSync } from "https://deno.land/std@0.214.0/fs/exists.ts";
export * as path from "https://deno.land/std@0.214.0/path/mod.ts";

// test dependencies
export { green, blue } from "https://deno.land/std@0.214.0/fmt/colors.ts";
export {
  assertEquals,
  assert,
} from "https://deno.land/std@0.214.0/testing/asserts.ts";

export { Application, Context, type MiddlewareOrMiddlewareObject } from "https://deno.land/x/oak@v13.0.0/mod.ts";

import { Eta } from "npm:eta";
export const eta = new Eta();
export * as dejs from "https://deno.land/x/dejs@0.10.3/mod.ts";
export * as pug from "npm:pug";
