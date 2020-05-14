## View Engine

> A View Engine middleware for oka framework

- Current support [Denjucks](https://github.com/denjucks/denjucks)
- Template Language reference: [Nunjucks](https://mozilla.github.io/nunjucks/)

### Usage

- ### Render ./index.html

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

---

- ### Render ./static/index.html

```ts
// app.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import { viewEngine } from "https://raw.githubusercontent.com/gjuoun/oak-view-engine/master/mod.ts";

const app = new Application();

app.use(viewEngine({
  view_root: './static'
}))

app.use((ctx) => {
  ctx.render('index.html', { txt: "good day" })
});

await app.listen({ port: 8000 });
```

---
- ### Render by file name only(ignore file extension)
```ts
// app.ts
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
```

### Roadmap 
- [x] Support [denjucks](https://github.com/denjucks/denjucks)
- [ ] Support [ejs]()