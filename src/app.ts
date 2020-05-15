// app.ts
import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { viewEngine } from "../mod.ts";
const app = new Application();


app.use(viewEngine({
  view_root: './view',
  view_engine: 'ejs',
}));


app.use(async (ctx, next) => {
  const data = {
    name: 'Akashdeep',
    hobbies: ['playing football', 'playing chess', 'cycling']
  }
  ctx.render('index.ejs', { data })
});

await app.listen({ port: 8000 });