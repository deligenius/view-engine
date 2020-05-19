// app.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import { viewEngine, engineFactory, adapterFactory } from "https://raw.githubusercontent.com/gjuoun/view-engine/master/mod.ts";
// import { viewEngine, engineFactory, adapterFactory } from "../mod.ts";

const handlebarsEngine = await engineFactory.getHandlebarsEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const app = new Application();

app.use(
  viewEngine(
    oakAdapter,
    handlebarsEngine,
    {useCache: true}
  ));

app.use(async (ctx, next) => {
  console.log(ctx.app.view.cache)
  const remoteTemplate =
    `https://raw.githubusercontent.com/gjuoun/view-engine/master/view/index.handlebars`

  // use 'await' for feting remote template
  await ctx.render(remoteTemplate, { data: { name: "John" } });
});

await app.listen({ port: 8000 });