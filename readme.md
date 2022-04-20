## 🚀 View Engine

![View Engine Logo](./docs/icon.png)

> A Template View Engine for Deno frameworks
## View Engine is now matching the version of Oak


[![tag](https://img.shields.io/github/tag/deligenius/view-engine.svg)](https://github.com/gjuoun/view-engine)

### Features:


- Support **multiple templating engines**📰
  - Current support [Denjucks](https://github.com/denjucks/denjucks), [Ejs](https://github.com/mde/ejs) and [Handlebars](https://handlebarsjs.com/)
  - Engines can be used **standalone**🎙 - [Use standlone handlebar engine](#Use-standalone-handlebar-engine)
- **Framework neutral**🎨, it uses adapter to load engine
  - Current support [Oak](https://github.com/oakserver/oak)
- **Local file**⛱ loading
- **Ashychorous**⚡ remote file fetching (fetching template on the fly )
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
import { oakAdapter } from "https://deno.land/x/view_engine@v10.5.1/mod.ts"

```

#### 🚀Engine

To get a Engine, use `engineFactory.get[EngineName]`

```ts
import { ejsEngine, denjuckEngine, handlebarsEngine } from "https://deno.land/x/view_engine@v10.5.1/mod.ts"
```

#### ⚙ViewConfig

```ts
const viewConfig: ViewConfig = {
  viewRoot: <string>"./views", // default: "", specify the root path, it can be remote address
}
```

## [🔝](#table-of-contents)

### Examples

#### Use [Oak](https://github.com/oakserver/oak) to render [Ejs template](https://ejs.co/) at `./views/index.ejs`

Suppose you have a folder like this: 
```
/views/index.ejs
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
import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { viewEngine, ejsEngine, oakAdapter } from "https://deno.land/x/view_engine@v10.5.1/mod.ts"

const app = new Application();

app.use(
  viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views",
  })
);

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


### Roadmap

- [x] Support [ejs](https://github.com/mde/ejs)
- [x] Support [Handlebars](https://github.com/handlebars-lang/handlebars.js)
- [x] Cache strategy
- [x] Framework neutral

### Credit

Original work by [@gjuoun](https://github.com/gjuoun/)

