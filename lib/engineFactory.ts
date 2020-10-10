import type { Engine } from "./types/index.ts";

// import { renderDenjuck } from "./engines/denjuck.ts";
import { renderEjs } from "./engines/ejs.ts";
import { renderHandlebars } from "./engines/handlebars.ts";

class EngineFactory {
  constructor() {}

  // getDenjuckEngine() {
    // return renderDenjuck;
  // }

  getEjsEngine() {
    return renderEjs;
  }

  getHandlebarsEngine() {
    return renderHandlebars;
  }

}

export const engineFactory = new EngineFactory();
