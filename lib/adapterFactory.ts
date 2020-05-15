class Adapter {

  // dynamic import at runtime
  async getOakAdapter() {
    return (await import("./adapters/oak.ts")).oakAdapter;
  }
}

export const adapterFactory = new Adapter();
