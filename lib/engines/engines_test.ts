import { assertEquals, blue } from "../../deps.ts";

import { denjuckEngine } from "./denjuck/denjuck.engine.ts";
import { etaEngine } from "./eta/eta.engine.ts";
import { handlebarsEngine } from "./handlebars/handlebars.engine.ts";

Deno.test({
  name: blue("Testing renderDenjuck()"),
  async fn() {
    const template = `<h1>{{data.name}}</h1>`;

    const actual = await denjuckEngine(template, { data: { name: "John" } });
    const expect = `<h1>John</h1>`;
    assertEquals(actual, expect);
  },
});


Deno.test({
  name: blue("Testing renderHandlebars()"),
  async fn() {
    const template = `<h1>{{data.name}}</h1>`;

    const actual =await handlebarsEngine(template, { data: { name: "John" } });
    const expect = `<h1>John</h1>`;
    assertEquals(actual, expect);
  },
});

Deno.test({
  name: blue("Testing eta"),
  async fn() {
    const template = `<h1><%= it.name %></h1>`;

    const actual =await etaEngine(template,  { name: "John" } );
    const expect = `<h1>John</h1>`;
    assertEquals(actual, expect);
  },
});
