import { oakAdapter } from "./adapters/oak.ts";

class Adapter {
  getOakAdapter() {
    return oakAdapter;
  }
}

export const adapterFactory = new Adapter();
