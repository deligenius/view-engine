// app.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "../mod.ts";
// import json parser
import { jsonParser } from "https://raw.githubusercontent.com/gjuoun/oak-json-parser/master/mod.ts"


const reactEngine = await engineFactory.getReactEngine();
const oakAdapter = await adapterFactory.getOakAdapter()

const app = new Application();

app.use(jsonParser())

app.use(viewEngine(oakAdapter, reactEngine));

app.use(async (ctx, next) => {
  // const people = ['geddy', 'neil', 'alex']
  // ctx.render("view/index.ejs", { data: { name: "John", people } });
  console.log(ctx.request.json)
  await ctx.render("./view/index.tsx", ctx.request.json)
});

await app.listen({ port: 3000 })