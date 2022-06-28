## 🚀 View Engine

![View Engine Logo](./docs/icon.png)

> A Template View Engine for Deno frameworks
## View Engine is now matching the version of Oak


[![tag](https://img.shields.io/github/tag/deligenius/view-engine.svg)](https://github.com/gjuoun/view-engine)

### Features:


- Support **multiple templating engines**📰
  - Current support [Denjucks](https://github.com/denjucks/denjucks), [Eta](https://github.com/eta-dev/eta), [Handlebars](https://handlebarsjs.com/), and [dejs](https://github.com/syumai/dejs),
  - Engines can be used **standalone**🎙 - [Use standlone handlebar engine](#Use-standalone-handlebar-engine)
- **Framework neutral**🎨, it uses adapter to load engine
  - Current support [Oak](https://github.com/oakserver/oak)
- **Local file**⛱ loading
- ~~Ashychorous⚡ remote file fetching (fetching template on the fly )~~
- **Dynamic module import**, uses `await` to load adapters and engines🌈

### Table of Contents

- [Usage](#Usage)

  - [🎛Adapter](#adapter)
  - [🚀Engine](#engine)
  - [⚙ViewConfig](#viewconfig)

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


```ts
import { oakAdapter } from "https://deno.land/x/view_engine@v10.6.0/mod.ts"

```

#### 🚀Engine

```ts
import { ejsEngine, denjuckEngine, handlebarsEngine } from "https://deno.land/x/view_engine@v10.6.0/mod.ts"
```

#### ⚙ViewConfig

```ts
const viewConfig: ViewConfig = {
  viewRoot: <string>"./views", // default: "", specify the root path, it can be remote address
}
```

## [🔝](#table-of-contents)

### Examples

#### Use [Oak](https://github.com/oakserver/oak) to render `eta` template at `./views/eta/index.eta`

Suppose you have a folder like this: 
```
/views/index.ejs
/app.ts
```

```html
<!--index.html-->
<body>
  Hobbies of <%=it.name%> 
</body>
```
```ts
// app.ts
import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { viewEngine, ejsEngine, oakAdapter } from "https://deno.land/x/view_engine@v10.5.1c/mod.ts"

const app = new Application();

app.use(
  viewEngine(oakAdapter, etaEngine, {
    viewRoot: "./views/eta",
  })
);

app.use(async (ctx, next) => {
  ctx.render("index.eta", { name: "John" } );
});

await app.listen({ port: 8000 });
```
Then run
```ts
> deno run --allow-net --allow-read ./app.ts
```
Open any browser, url: ```http://localhost:8000``` you should see the result.


## [🔝](#table-of-contents)


### Credit

Original work by [@gjuoun](https://github.com/gjuoun/)

