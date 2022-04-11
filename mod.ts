//! engines
export { ejsEngine } from "./lib/engines/ejs/ejs.engine.ts";
export { denjuckEngine } from "./lib/engines/denjuck/denjuck.engine.ts";
export { handlebarsEngine } from "./lib/engines/handlebars/handlebars.engine.ts";

//! type
export type { Engine, Adapter, ViewConfig } from "./lib/viewEngine.type.ts"


//! adapters
export { oakAdapter } from "./lib/adapters/oak/oak.adapter.ts";

//! viewEngine entry
export { viewEngine } from "./lib/viewEngine.ts";

