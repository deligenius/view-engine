import { Adapter } from "./types/index.ts";

class AdapterFactory {
  // dynamic import at runtime
  async getOakAdapter(): Promise<Adapter> {
    return (await import("./adapters/oak.ts")).oakAdapter;
  }
}

export const adapterFactory = new AdapterFactory();
