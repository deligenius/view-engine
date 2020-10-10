export type { Engine, Adapter, ViewConfig } from "./lib/types/index.ts"

export { engineFactory } from "./lib/engineFactory.ts";
export { adapterFactory } from "./lib/adapterFactory.ts";
export { viewEngine } from "./lib/viewEngine.ts";


// export { renderDenjuck } from "./lib/engines/denjuck.ts";
export { renderEjs } from "./lib/engines/ejs.ts";
export { renderHandlebars } from "./lib/engines/handlebars.ts";