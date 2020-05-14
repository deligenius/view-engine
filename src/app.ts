import { Application } from "https://deno.land/x/oak/mod.ts";
// import { viewEngine } from "https://raw.githubusercontent.com/gjuoun/oak-view-engine/master/mod.ts";
import { viewEngine } from "../mod.ts";

const app = new Application();

app.use(viewEngine())

// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (err) {
//     ctx.response.status = err.status
//   }
// });

app.use((ctx) => {
  ctx.state.user = {name: 'John'}
  ctx.render('index.html', { txt: "good day" })
});

await app.listen({ port: 8000 });