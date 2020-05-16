// app.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import { viewEngine, engineFactory, adapterFactory } from "../mod.ts";

const handlebarsEngine = await engineFactory.getHandlebarsEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const app = new Application();

app.use(
  viewEngine(oakAdapter, handlebarsEngine),
);

app.use(async (ctx, next) => {
  ctx.render("view/test.handlebars", { data: { name: "John" } });
});

await app.listen({ port: 8000 });
