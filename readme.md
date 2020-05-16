## 🚀 View Engine

> A Template View Engine for Deno frameworks

[![tag](https://img.shields.io/github/tag/gjuoun/view-engine.svg)](https://github.com/gjuoun/view-engine)
[![license](https://img.shields.io/github/license/gjuoun/view-engine.svg)](https://github.com/gjuoun/view-engine)
[![tag](https://img.shields.io/badge/deno-v1.0.0-green.svg)](https://github.com/denoland/deno)
[![tag](https://img.shields.io/badge/std-0.51.0-green.svg)](https://github.com/denoland/deno)

### Features: 
- Support **multiple templating engines**📰
  - Current support [Denjucks](https://github.com/denjucks/denjucks), [Ejs](https://github.com/mde/ejs) and [Handlebars](https://handlebarsjs.com/)
  - Engines can be used **standalone**🎙 - [Use standlone handlebar engine](#Use-standlone-handlebar-engine)
- **Framework neutral**🎨, it uses adapter to load engine
  - Current support [Oak](https://github.com/oakserver/oak)
- **Local file**⛱ loading
- **Ashychorous**⚡ remote file fetching (fetching template on the fly )
- Template **Caching**🔥
- **Dynamic module import**, uses `await` to load adapters and engines🌈

### Table of Contents
* [Usage](#Usage)

  * [🎛Adapter](#adapter)
  * [🚀Engine](#engine)
  * [⚙ViewConfig](#viewconfig)

* [Examples](#Examples)

  * [Use Oak to render Denjucks template at ./index.html](#use-oak-to-render-denjucks-template-at-indexhtml)
  * [Use Oak to render Ejs template at ./index.ejs](#use-oak-to-render-ejs-template-at-indexejs)
  * [Oak render Handlebars template at ./view/index.handlebars](#oak-render-handlebars-template-at-viewindexhandlebars)
  * [Asychronous fetching remote template](#asychronous-fetching-remote-template-viewconfigusecache--true-is-recommended)

* [Use standlone engine](#use-standlone-handlebar-engine)

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

To get a Adapter, use `adapterFactory.get[AdapterName]`

```ts
const oakAdapter = await adapterFactory.getOakAdapter();
```

#### 🚀Engine

To get a engine, use `engineFactory.get[EngineName]`

```ts
const ejsEngine = await engineFactory.getEjsEngine();
const handlebarsEngine = await engineFactory.getHandlebarsEngine();
const getDenjuckEngine = await engineFactory.getDenjuckEngine();
```

#### ⚙ViewConfig

```ts
const viewConfig: ViewConfig = {
  viewRoot: string = "./view"; // default: "", specify root path, it can be remote address
  viewExt: string = ".html";  // default: "", specify file extension
  useCache: boolean = false; // default: false, true if you want to cache template
}
```
 [![Foo](/docs/arrows.png)](#table-of-contents)
 
---

### Examples

#### Use [Oak](https://github.com/oakserver/oak) to render [Denjucks template](https://github.com/denjucks/denjucks) at ```./index.html```
```html
<--index.html-->
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
} from "https://raw.githubusercontent.com/gjuoun/view-engine/master/mod.ts";

const denjuckEngine = await engineFactory.getDenjuckEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const app = new Application();

app.use(
  viewEngine(oakAdapter,denjuckEngine)
);

app.use(async (ctx, next) => {
  ctx.render("index.html", { data: { name: "John" } });
});

await app.listen({ port: 8000 });
```
[![Foo](/docs/arrows.png)](#table-of-contents)

#### Use [Oak](https://github.com/oakserver/oak) to render [Ejs template](https://ejs.co/) at ```./index.ejs```

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
  ctx.render("index.ejs", { data: { name: "John" } });
});

await app.listen({ port: 8000 });
```
[![Foo](/docs/arrows.png)](#table-of-contents)

#### [Oak](https://github.com/oakserver/oak) render [Handlebars template](https://handlebarsjs.com/) at ```./view/index.handlebars```

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
[![Foo](/docs/arrows.png)](#table-of-contents)

#### Asychronous fetching remote template, ```viewConfig.useCache = true``` is recommended 
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
    {useCache: true}
  ));

app.use(async (ctx, next) => {
  const remoteTemplate =
    `https://raw.githubusercontent.com/gjuoun/view-engine/master/view/index.handlebars`

  // use 'await' for feting remote template
  await ctx.render(remoteTemplate, { data: { name: "John" } });
});

await app.listen({ port: 8000 });
```
[![Foo](/docs/arrows.png)](#table-of-contents)

---

### Use standlone handlebar engine
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
[![Foo](/docs/arrows.png)](#table-of-contents)

### Roadmap

- [x] Support [denjucks](https://github.com/denjucks/denjucks)
- [x] Support [ejs](https://github.com/mde/ejs)
- [x] Support [Handlebars](https://github.com/handlebars-lang/handlebars.js)
- [x] Cache strategy
- [x] Framework neutral
