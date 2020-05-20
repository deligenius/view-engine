// app.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";

const handlebarsEngine = await engineFactory.getHandlebarsEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const app = new Application();

app.use(viewEngine(oakAdapter, handlebarsEngine, { useCache: true }));

app.use(async (ctx, next) => {
  const remoteTemplate = `https://deno.land/x/view_engine/view/index.handlebars`;

  // use 'await' for fetching remote template
  await ctx.render(remoteTemplate, { data: { name: "John" } });
});

await app.listen({ port: 8000 });