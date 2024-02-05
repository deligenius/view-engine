// app.ts
import { Application, green, assert } from "../../../deps.ts";

import {
  viewEngine,
  oakAdapter,
  dejsEngine
} from "../../../mod.ts";
//import declaration from the oak.adapter.ts file
// const removeRegex = /\r?\n|\r|\s/g;

Deno.test({
  name: green("Testing Oak - dejsEngine"),
  async fn() {
    const controller = new AbortController();
    const { signal } = controller;
    const app = new Application();
    app.use(viewEngine(oakAdapter, dejsEngine, { viewRoot: "./views/ejs" }));

    app.use((ctx, _) => {
      ctx.render("index.ejs", { data: { name: "John" } });
    });
    setTimeout(async () => {
      const actual = await fetch("http://localhost:8000").then((res) =>
        res.text()
      );

      assert(actual.includes("John"));
      controller.abort();
    }, 500);

    await app.listen({ port: 8000, signal });
  },
});
