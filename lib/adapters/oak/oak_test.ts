// app.ts
import { Application, green, assertEquals, assert } from "../../../deps.ts";
import {
  viewEngine,
  oakAdapter,
  ejsEngine,
  handlebarsEngine,
} from "../../../mod.ts";

const removeRegex = /\r?\n|\r|\s/g;

Deno.test({
  name: green("Testing Oak - EjsEngine"),
  async fn() {
    const controller = new AbortController();
    const { signal } = controller;
    const app = new Application();
    app.use(viewEngine(oakAdapter, ejsEngine, { viewRoot: "./views/ejs" }));

    app.use(async (ctx, next) => {
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
