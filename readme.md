## 🚀 View Engine

![View Engine Logo](./docs/icon.png)

> A Template View Engine for Deno frameworks

[![tag](https://img.shields.io/github/tag/deligenius/view-engine.svg)](https://github.com/gjuoun/view-engine)
[![license](https://img.shields.io/github/license/deligenius/view-engine.svg)](https://github.com/gjuoun/view-engine)
[![tag](https://img.shields.io/badge/deno-v1.0.2-green.svg)](https://github.com/denoland/deno)

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
    - [Render Denjucks template at ./index.html](#use-oak-to-render-denjucks-template-at-indexhtml)
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
const denjuckEngine = engineFactory.getDenjuckEngine();
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

#### Use [Oak](https://github.com/oakserver/oak) to render [Denjucks template](https://github.com/denjucks/denjucks) at `./index.html`

Suppose you have a folder like this: 
```
/index.html
/app.ts
```
```html
<!--index.html-->
<body>
  <h1>{{data.name}}</h1>
</body>
```

```ts
// app.ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";

const denjuckEngine = engineFactory.getDenjuckEngine();
const oakAdapter = adapterFactory.getOakAdapter();

const app = new Application();

app.use(viewEngine(oakAdapter, denjuckEngine));

app.use(async (ctx, next) => {
  ctx.render("index.html", { data: { name: "John" } });
});

await app.listen({ port: 8000 });
```
Then run
```ts
> deno run --allow-net --allow-read ./app.ts
```
Open any browser, type ```http://localhost:8000``` you should see the result.


## [🔝](#table-of-contents)

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
import { Application } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";

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
import { Application } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";

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
import { Application } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";

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
import { engineFactory } from "https://deno.land/x/view_engine/mod.ts";

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

## [🔝](#table-of-contents)

### Roadmap

- [x] Support [denjucks](https://github.com/denjucks/denjucks)
- [x] Support [ejs](https://github.com/mde/ejs)
- [x] Support [Handlebars](https://github.com/handlebars-lang/handlebars.js)
- [x] Cache strategy
- [x] Framework neutral

### Credit

Original work by [@gjuoun](https://github.com/gjuoun/)
