// app.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import { viewEngine, engineFactory, adapterFactory } from "../mod.ts";

const handlebarsEngine = await engineFactory.getDenjuckEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const app = new Application();

app.use(
  viewEngine(
    oakAdapter,
    handlebarsEngine,
    { useCache: true },
  ),
);

app.use(async (ctx, next) => {
  if (ctx.request.url.pathname === "/") {
    await ctx.render(
      "https://raw.githubusercontent.com/gjuoun/view-engine/master/view/index.html",
      { data: { name: "jun" } },
    );
  } else {
    ctx.render("./view/test.html", { data: { name: "jun" } });
  }
});

await app.listen({ port: 8000 });
