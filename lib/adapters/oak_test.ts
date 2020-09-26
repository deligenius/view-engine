// app.ts
import { Application } from "../../deps.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "../../mod.ts";

import { green } from "https://deno.land/std/fmt/colors.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const oakAdapter = adapterFactory.getOakAdapter();

const removeRegex = /\r?\n|\r|\s/g;

// Deno.test({
//   name: green("Testing Oak - DenjuckEngine"),
//   async fn() {
//     const controller = new AbortController();
//     const { signal } = controller;

//     const app = new Application();
//     const denjuckEngine = engineFactory.getDenjuckEngine();

//     app.use(viewEngine(oakAdapter, denjuckEngine));

//     app.use(async (ctx, next) => {
//       if (ctx.request.url.pathname === "/denjuck") {
//         ctx.render("./view/index.html", { data: { name: "John" } });
//       }
//     });

//     setTimeout(async () => {
//       const actual = await fetch("http://localhost:8000/denjuck").then((res) =>
//         res.text()
//       );
//       const expect = `<!--index.html--><body><h1>John</h1></body>`;
//       assertEquals(
//         actual.replace(removeRegex, ""),
//         expect.replace(removeRegex, ""),
//       );
//       controller.abort();
//     }, 500);

//     await app.listen({ port: 8000, signal });
//   },
// });

Deno.test({
  name: green("Testing Oak - EjsEngine"),
  async fn() {
    const controller = new AbortController();
    const { signal } = controller;
    const app = new Application();
    const ejsEngine = engineFactory.getEjsEngine();
    app.use(viewEngine(oakAdapter, ejsEngine));

    app.use(async (ctx, next) => {
      if (ctx.request.url.pathname === "/ejs") {
        ctx.render("./view/index.ejs", { data: { name: "John" } });
      }
    });
    setTimeout(async () => {
      const actual = await fetch("http://localhost:8000/ejs").then((res) =>
        res.text()
      );
      const expect = `<!--index.ejs--><body><h1>John</h1></body>`;
      assertEquals(
        actual.replace(removeRegex, ""),
        expect.replace(removeRegex, ""),
      );
      controller.abort();
    }, 500);

    await app.listen({ port: 8000, signal });
  },
});

Deno.test({
  name: green("Testing Oak - Ejs include"),
  async fn() {
    const controller = new AbortController();
    const { signal } = controller;
    const app = new Application();
    const ejsEngine = engineFactory.getEjsEngine();
    app.use(viewEngine(oakAdapter, ejsEngine, {viewRoot: "./view/ejs"}));

    app.use(async (ctx, next) => {
      if (ctx.request.url.pathname === "/ejs") {
        ctx.render("index.ejs", { data: { name: "John" } });
      }
    });
    setTimeout(async () => {
      const actual = await fetch("http://localhost:8000/ejs").then(
        (res) => res.text()
      );
      const expect = `<h3>User Info</h3>Hobbies of John`;

      assertEquals(
        actual.replace(removeRegex, ""),
        expect.replace(removeRegex, ""),
      );
      controller.abort();
    }, 500);

    await app.listen({ port: 8000, signal });
  },
});


Deno.test({
  name: green("Testing Oak - HandlebarsEngine"),
  async fn() {
    const controller = new AbortController();
    const { signal } = controller;
    const app = new Application();
    const ejsEngine = engineFactory.getHandlebarsEngine();
    app.use(viewEngine(oakAdapter, ejsEngine));

    app.use(async (ctx, next) => {
      if (ctx.request.url.pathname === "/handlebars") {
        ctx.render("./view/index.handlebars", { data: { name: "John" } });
      }
    });
    setTimeout(async () => {
      const actual = await fetch("http://localhost:8000/handlebars").then(
        (res) => res.text()
      );
      const expect = `<!--index.handlebars--><body><h1>John</h1></body>`;
      assertEquals(
        actual.replace(removeRegex, ""),
        expect.replace(removeRegex, ""),
      );
      controller.abort();
    }, 500);

    await app.listen({ port: 8000, signal });
  },
});

Deno.test({
  name: green("Testing Oak - remote HandlebarsEngine"),
  async fn() {
    const controller = new AbortController();
    const { signal } = controller;
    const app = new Application();
    const handlebarsEngine = engineFactory.getHandlebarsEngine();
    app.use(viewEngine(oakAdapter, handlebarsEngine));

    app.use(async (ctx, next) => {
      if (ctx.request.url.pathname === "/handlebars") {
        const remoteTemplate =
          `https://deno.land/x/view_engine/view/index.handlebars`;
        // use 'await' for fetching remote template
        await ctx.render(remoteTemplate, { data: { name: "John" } });
      }
    });
    setTimeout(async () => {
      const actual = await fetch("http://localhost:8000/handlebars").then(
        (res) => res.text()
      );
      const expect = `<!--index.handlebars--><body><h1>John</h1></body>`;

      assertEquals(
        actual.replace(removeRegex, ""),
        expect.replace(removeRegex, ""),
      );
      controller.abort();
    }, 500);

    await app.listen({ port: 8000, signal });
  },
});



