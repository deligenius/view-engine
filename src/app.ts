// app.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import { viewEngine, engineFactory, adapterFactory } from "../mod.ts";

const handlebarsEngine = await engineFactory.getDenjuckEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const app = new Application();

app.use(
  viewEngine(oakAdapter, handlebarsEngine, { view_root: "./view" })
);

app.use(async (ctx, next) => {
  ctx.render("index.html", { data: { name: "jun" } });
});

await app.listen({ port: 8000 });
