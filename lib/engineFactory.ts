import { Engine, ReactEngine } from "./types/index.ts";

class EngineFactory {
  constructor() {}

  // dynamic import at runtime
  async getDenjuckEngine(): Promise<Engine> {
    return (await import("./engines/denjuck.ts")).renderDenjuck;
  }

  async getEjsEngine(): Promise<Engine> {
    return (await import("./engines/ejs.ts")).renderEjs;
  }

  async getHandlebarsEngine(): Promise<Engine> {
    return (await import("./engines/handlebars.ts")).renderHandlebars;
  }

  async getReactEngine(): Promise<ReactEngine> {
    return (await import("./engines/react.ts")).renderReact;
  }
}

export const engineFactory = new EngineFactory();
