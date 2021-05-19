## 🚀 View Engine

![View Engine Logo](./docs/icon.png)

> A Template View Engine for Deno frameworks

[![tag](https://img.shields.io/github/tag/deligenius/view-engine.svg)](https://github.com/gjuoun/view-engine)

### Features:

- Support **multiple templating engines**📰
  - Current support [Denjucks](https://github.com/denjucks/denjucks), [Ejs](https://github.com/mde/ejs) and [Handlebars](https://handlebarsjs.com/)
  - Engines can be used **standalone**🎙 - [Use standlone handlebar engine](#Use-standalone-handlebar-engine)
- **Framework neutral**🎨, it uses adapter to load engine
  - Current support [Oak](https://github.com/oakserver/oak)
- **Local file**⛱ loading
- **Ashychorous**⚡ remote file fetching (fetching template on the fly )
- Template **Caching**🔥
- **Dynamic module import**, uses `await` to load adapters and engines🌈

### Table of Contents

- [Usage](#Usage)

  - [🎛Adapter](#adapter)
  - [🚀Engine](#engine)
  - [⚙ViewConfig](#viewconfig)

- Examples
  - Use View Engine with Oak framework
    - [Render Ejs template at ./index.ejs](#use-oak-to-render-ejs-template-at-indexejs)
    - [Render Handlebars template at ./view/index.handlebars](#oak-render-handlebars-template-at-viewindexhandlebars)
    - [Asychronous fetching remote template](#asychronous-fetching-remote-template-viewconfigusecache--true-is-recommended)

- [Use standalone engine](#use-standalone-handlebar-engine)

---

### Usage

```ts
viewEngine(
  adapter: Adapter,
  engine:Engine,
  viewConfig?: ViewConfig
)
```

#### 🎛Adapter

To get an Adapter, use `adapterFactory.get[AdapterName]`

```ts
const oakAdapter = adapterFactory.getOakAdapter();
```

#### 🚀Engine

To get a Engine, use `engineFactory.get[EngineName]`

```ts
const ejsEngine = engineFactory.getEjsEngine();
const handlebarsEngine = engineFactory.getHandlebarsEngine();
```

#### ⚙ViewConfig

```ts
const viewConfig: ViewConfig = {
  viewRoot: <string>"./view", // default: "", specify root path, it can be remote address
  viewExt: <string>".html",  // default: "", specify file extension
  useCache: <boolean> false // default: false, true if you want to cache template
}
```

## [🔝](#table-of-contents)

### Examples

#### Use [Oak](https://github.com/oakserver/oak) to render [Ejs template](https://ejs.co/) at `./index.ejs`

Suppose you have a folder like this: 
```
/index.ejs
/app.ts
```

```html
<!--index.html-->
<body>
  Hobbies of <%=data.name%> 
</body>
```
```ts
// app.ts
import { Application } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine@v1.5.0/mod.ts";

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

const app = new Application();

app.use(viewEngine(oakAdapter, ejsEngine));

app.use(async (ctx, next) => {
  ctx.render("index.ejs", { data: { name: "John" } });
});

await app.listen({ port: 8000 });
```
Then run
```ts
> deno run --allow-net --allow-read ./app.ts
```
Open any browser, type ```http://localhost:8000``` you should see the result.


## [🔝](#table-of-contents)

#### [Oak](https://github.com/oakserver/oak) render [Handlebars template](https://handlebarsjs.com/) at `./view/index.handlebars`

Suppose you have a folder like this:
```
/view/index.handlebars
/app.ts
```

```html
<!--/view/index.handlebars-->
<body>
  <div>
    {{data.name}}
  </div>
</body>
```

```ts
// app.ts
import { Application } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine@v1.5.0/mod.ts";

const handlebarsEngine = engineFactory.getHandlebarsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

const app = new Application();

app.use(
  viewEngine(oakAdapter, handlebarsEngine, {
    viewRoot: "./view",
    viewExt: ".handlebars",
  })
);

app.use(async (ctx, next) => {
  ctx.render("index", { data: { name: "John" } });
});

await app.listen({ port: 8000 });
```
Open any browser, type ```http://localhost:8000``` you should see the result.


## [🔝](#table-of-contents)

#### Asychronous fetching remote template, `viewConfig.useCache = true` is recommended

```ts
// app.ts
import { Application } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine@v1.5.0/mod.ts";

const handlebarsEngine = engineFactory.getHandlebarsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

const app = new Application();

app.use(viewEngine(oakAdapter, handlebarsEngine, { useCache: true }));

app.use(async (ctx, next) => {
  const remoteTemplate = `https://deno.land/x/view_engine/view/index.handlebars`;

  // use 'await' for fetching remote template
  await ctx.render(remoteTemplate, { data: { name: "John" } });
});

await app.listen({ port: 8000 });
```
Open any browser, type ```http://localhost:8000``` you should see the result.


## [🔝](#table-of-contents)

### Use standalone handlebar engine

```ts
// app.ts
import { engineFactory } from "https://deno.land/x/view_engine@v1.5.0/mod.ts";

const handlebarsEngine = engineFactory.getHandlebarsEngine();

const template = `
<body>
  My name is {{data.name}}
</body>`;

const rendered = handlebarsEngine(template, { data: { name: "John" } });
console.log(rendered);
/*
<body>
  My name is John
</body>
 */
```

### Use `Handlebars.registerHelper()`

```ts
// app.ts
import { Application } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,  hbs
} from "https://deno.land/x/view_engine@v1.5.0/mod.ts";

const handlebarsEngine = engineFactory.getHandlebarsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

hbs.registerHelper('loud', (str:string) => {
  return str.toUpperCase()
})

const app = new Application();

app.use(
  viewEngine(oakAdapter, handlebarsEngine, {
    viewRoot: "./view",
    viewExt: ".handlebars",
  })
);

app.use(async (ctx, next) => {
  ctx.render("index", { data: { name: "John" } });
});

await app.listen({ port: 8000 });
```

Then you are able to include this in your handlebar template:

```hbs
{{loud "all in upper case"}}
```

## [🔝](#table-of-contents)

### Roadmap

- [x] Support [ejs](https://github.com/mde/ejs)
- [x] Support [Handlebars](https://github.com/handlebars-lang/handlebars.js)
- [x] Cache strategy
- [x] Framework neutral

### Credit

Original work by [@gjuoun](https://github.com/gjuoun/)

