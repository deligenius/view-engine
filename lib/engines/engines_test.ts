import { assertEquals, blue } from "../../deps.ts";

import { denjuckEngine } from "./denjuck/denjuck.engine.ts";
import { ejsEngine } from "./ejs/ejs.engine.ts";
import { handlebarsEngine } from "./handlebars/handlebars.engine.ts";

Deno.test({
  name: blue("Testing renderDenjuck()"),
  fn(): void {
    const template = `<h1>{{data.name}}</h1>`;

    const actual = denjuckEngine(template, { data: { name: "John" } });
    const expect = `<h1>John</h1>`;
    assertEquals(actual, expect);
  },
});


Deno.test({
  name: blue("Testing renderEjs()"),
  fn(): void {
    const template = `Hobbies of <%=data.name%>`;

    const actual = ejsEngine(template, { data: { name: "John" } });
    const expect = `Hobbies of John`;
    assertEquals(actual, expect);
  },
});

Deno.test({
  name: blue("Testing renderHandlebars()"),
  fn(): void {
    const template = `<h1>{{data.name}}</h1>`;

    const actual = handlebarsEngine(template, { data: { name: "John" } });
    const expect = `<h1>John</h1>`;
    assertEquals(actual, expect);
  },
});
