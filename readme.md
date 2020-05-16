## 🚀 View Engine

> A Template View Engine for Deno frameworks

- Support **multiple templating engines**📰
  - Current support [Denjucks](https://github.com/denjucks/denjucks), [Ejs](https://github.com/mde/ejs) and [Handlebars](https://handlebarsjs.com/)
  - Engines can be used **standalone**🎙 - [Use standlone handlebar engine](#Use-standlone-handlebar-engine)
- **Framework neutral**🎨, it uses adapter to load engine
  - Current support [Oak](https://github.com/oakserver/oak)
- **Local file**⛱ loading
- **Ashychorous**⚡ remote file fetching (fetching template on the fly )
- Template **Caching**🔥
- **Dynamic module import**, uses `await` to load adapters and engines🌈

### Usage

```ts
viewEngine(
  adapter: Adapter, 
  engine:Engine, 
  viewConfig?: ViewConfig
)
```

#### Adapter

To get a Adapter, use `adapterFactory.get[AdapterName]`

```ts
const oakAdapter = await adapterFactory.getOakAdapter();
```

#### Engine

To get a engine, use `engineFactory.get[EngineName]`

```ts
const ejsEngine = await engineFactory.getEjsEngine();
const handlebarsEngine = await engineFactory.getHandlebarsEngine();
const getDenjuckEngine = await engineFactory.getDenjuckEngine();
```

#### ViewConfig

```ts
const viewConfig: ViewConfig = {
  viewRoot: string = "./view"; // default: "", specify root path, it can be remote address
  viewExt: string = ".html";  // default: "", specify file extension
  useCache: boolean = false; // default: false, true if you want to cache template
}
```

### Examples
> 
- Use [Oak](https://github.com/oakserver/oak) to render [Ejs template](https://ejs.co/) at ```./index.ejs```

```ts
// app.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://raw.githubusercontent.com/gjuoun/view-engine/master/mod.ts";

const ejsEngine = await engineFactory.getEjsEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const app = new Application();

app.use(viewEngine(oakAdapter, ejsEngine));

app.use(async (ctx, next) => {
  ctx.render("./view/index.ejs", { data: { name: "John" } });
});

await app.listen({ port: 8000 });
```

- [Oak](https://github.com/oakserver/oak) render [Handlebars template](https://handlebarsjs.com/) at ```./view/index.handlebars```

```ts
// app.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import { viewEngine, engineFactory, adapterFactory } from "https://raw.githubusercontent.com/gjuoun/view-engine/master/mod.ts";

const handlebarsEngine = await engineFactory.getHandlebarsEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const app = new Application();

app.use(
  viewEngine(
    oakAdapter,
    handlebarsEngine,
    {
      viewRoot: "./view",
      viewExt: ".handlebars"
    }),
);

app.use(async (ctx, next) => {
  ctx.render("index", { data: { name: "John" } });
});

await app.listen({ port: 8000 });
```

* Asychronous fetching remote template, ```viewConfig.useCache = true``` is recommended
```ts
// app.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import { viewEngine, engineFactory, adapterFactory } from "https://raw.githubusercontent.com/gjuoun/view-engine/master/mod.ts";

const handlebarsEngine = await engineFactory.getHandlebarsEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const app = new Application();

app.use(
  viewEngine(
    oakAdapter,
    handlebarsEngine
  ));

app.use(async (ctx, next) => {
  const remoteTemplate =
    `https://raw.githubusercontent.com/gjuoun/view-engine/master/view/index.handlebars`

  // use 'await' for feting remote template
  await ctx.render(remoteTemplate, { data: { name: "John" } });
});

await app.listen({ port: 8000 });
```
---
#### Use standlone handlebar engine
```ts
// app.ts
import {engineFactory } from "https://raw.githubusercontent.com/gjuoun/view-engine/master/mod.ts";

const handlebarsEngine = await engineFactory.getHandlebarsEngine();

const template = `
<body>
  My name is {{data.name}}
</body>`

const rendered = handlebarsEngine(template, {data: {name: "John"}})
console.log(rendered)
/*
<body>
  My name is John
</body>
 */
```
### Roadmap

- [x] Support [denjucks](https://github.com/denjucks/denjucks)
- [x] Support [ejs](https://github.com/mde/ejs)
- [x] Support [Handlebars](https://github.com/handlebars-lang/handlebars.js)
- [x] Cache strategy
- [x] Framework neutral
