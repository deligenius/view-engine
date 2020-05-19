// app.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";

const ejsEngine = await engineFactory.getEjsEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const app = new Application();

app.use(viewEngine(oakAdapter, ejsEngine, {useCache: true}));

app.use(async (ctx, next) => {
  const people = ['geddy', 'neil', 'alex']
  ctx.render("view/index.ejs", { data: { name: "John", people } });
});

await app.listen({ port: 8000 });

const viewConfig = {
  viewRoot: <string>"./view", // default: "", specify root path, it can be remote address
  viewExt: <string>".html",  // default: "", specify file extension
  useCache: <boolean> false // default: false, true if you want to cache template
}