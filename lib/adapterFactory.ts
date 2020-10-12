import type { Adapter } from "./types/index.ts";
import { oakAdapter } from "./adapters/oak.ts";

class AdapterFactory {
  
  getOakAdapter(): Adapter {
    return oakAdapter;
  }
}

export const adapterFactory = new AdapterFactory();
