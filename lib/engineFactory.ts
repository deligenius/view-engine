import { renderEjs } from "./engines/ejs.ts";
import { renderHandlebars } from "./engines/handlebars.ts";

class Engine {
  constructor() {}

  getDenjuckEngine() {
    import { renderDenjuck } from "./engines/denjuck.ts";
    return renderDenjuck;
  }

  getEjsEngine() {
    return renderEjs;
  }

  getHandlebarsEngine() {
    return renderHandlebars;
  }
}

export const engineFactory = new Engine();
