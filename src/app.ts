import { Application } from "https://deno.land/x/oak/mod.ts";
import { viewEngine } from "https://raw.githubusercontent.com/gjuoun/oak-view-engine/master/mod.ts";

const app = new Application();

app.use(viewEngine({
  view_root: './static',
  view_ext: 'html'
}))

app.use((ctx) => {
  ctx.render('index', { txt: "good day" })
});

await app.listen({ port: 8000 });