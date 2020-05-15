// app.ts
import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { viewEngine } from "../mod.ts";
const app = new Application();


app.use(viewEngine());



app.use(async (ctx, next) => {

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/1`)
  .then((res) => res.json())

  // ctx.response.body = response
  // ctx.render('index.html', { response: [{ title: "haha" }] })
  console.log(response)
  ctx.render('index.html', { response })
  // next()
});

await app.listen({ port: 8000 });