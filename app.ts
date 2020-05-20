// app.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";

const denjuckEngine = await engineFactory.getDenjuckEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const app = new Application();

app.use(viewEngine(oakAdapter, denjuckEngine));

app.use(async (ctx, next) => {
  ctx.render("./view/index.html", { data: { name: "John" } });
});

await app.listen({ port: 8000 });