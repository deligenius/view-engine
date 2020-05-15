## View Engine

> A View Engine middleware for [oka framework](https://github.com/oakserver/oak)

- Current support [Denjucks](https://github.com/denjucks/denjucks) and [Ejs](https://github.com/mde/ejs)
- As simple as examples :
  1. [Denjucks examples](#Denjucks/Nunjucks-examples) (default engine)
  2. [Ejs examples](#Ejs-Examples)

### Usage

> remember to give `--allow-read` permission

```js
> deno run --allow-net --allow-read <Your Program>
```

---

### Denjucks/Nunjucks examples

> Read more about [Nunjucks language](https://mozilla.github.io/nunjucks/)

- #### Render ./index.html

```html
<-- index.html -->
<body>
  hello {{ txt }}
</body>
```

```ts
// app.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import { viewEngine } from "https://raw.githubusercontent.com/gjuoun/oak-view-engine/master/mod.ts";

const app = new Application();

app.use(viewEngine());

app.use((ctx) => {
  ctx.render("index.html", { txt: "good day" });
});

await app.listen({ port: 8000 });
```

- #### Render ./static/index.html

```ts
// app.ts
...

app.use(viewEngine({
  view_root: './static'
}))

app.use((ctx) => {
  ctx.render('index.html', { txt: "good day" })
});

...
```

- #### Render by file name only(ignore file extension)

```ts
// app.ts
...

app.use(viewEngine({
  view_root: './static',
  view_ext: 'html'
}))

app.use((ctx) => {
  ctx.render('index', { txt: "good day" })
});

...
```

- #### Use with `ctx.state`

```html
<body>
  user : {{ctx.state.user.name}} <--John--> 
  hello {{ txt }} <--good day-->
</body>
```

```ts
// app.ts
...

app.use((ctx) => {
  ctx.state.user = {name: 'John'}
  ctx.render('index', { txt: "good day" })
});

...
```



---

### Ejs Examples

> Read more about [Ejs syntax](https://ejs.co/)

```html
<--./view/index.ejs-->
<body>
  Hobbies of <%=data.name%> are:<br />

  <ul>
    <% data.hobbies.forEach((item)=>{ %>
    <li><%=item%></li>
    <% }); %>
  </ul>
</body>
```

```ts
//app.js
...
app.use(
  viewEngine({
    view_root: "./view",
    view_engine: "ejs",
  })
);

app.use(async (ctx, next) => {
  const data = {
    name: "Akashdeep",
    hobbies: ["playing football", "playing chess", "cycling"],
  };
  ctx.render("index.ejs", { data });
});
...
```

### Roadmap

- [x] Support [denjucks](https://github.com/denjucks/denjucks)
- [x] Support [ejs](https://github.com/mde/ejs)
- [ ] Support [Handlebars](https://github.com/handlebars-lang/handlebars.js)
- [ ] Pre-render/cache strategy
