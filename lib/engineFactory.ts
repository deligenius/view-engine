import { Engine, ReactEngine } from "./types/index.ts";

import { renderDenjuck } from "./engines/denjuck.ts";
import { renderEjs } from "./engines/ejs.ts";
import { renderHandlebars } from "./engines/handlebars.ts";
import { renderReact } from "./engines/react.ts";

class EngineFactory {
  constructor() {}

  // dynamic import at runtime
  getDenjuckEngine() {
    return renderDenjuck;
  }

  getEjsEngine() {
    return renderEjs;
  }

  getHandlebarsEngine() {
    return renderHandlebars;
  }

}

export const engineFactory = new EngineFactory();
