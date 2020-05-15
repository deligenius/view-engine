
class Engine {
  constructor() {}

  // dynamic import at runtime
  async getDenjuckEngine() {
    return (await import("./engines/denjuck.ts")).renderDenjuck;
  }

  async getEjsEngine() {
    return (await import("./engines/ejs.ts")).renderEjs;
  }

  async getHandlebarsEngine() {
    return (await import("./engines/handlebars.ts")).renderHandlebars;
  }
}

export const engineFactory = new Engine();
