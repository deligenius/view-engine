import { Application } from "https://deno.land/x/oak/mod.ts";
import { viewEngine } from "https://raw.githubusercontent.com/gjuoun/oak-view-engine/master/mod.ts";

const app = new Application();

app.use(viewEngine())

app.use((ctx) => {
  console.log(ctx.view)
  ctx.render('index', { txt: "good day" })
});

await app.listen({ port: 8000 });