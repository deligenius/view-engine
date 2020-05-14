import { Application } from "https://deno.land/x/oak/mod.ts";
import { viewEngine } from "./viewEngine.ts";

const app = new Application();

app.use(viewEngine())

app.use((ctx) => {
  ctx.render('index.html', { title: "good day" })
});

await app.listen({ port: 8000 });