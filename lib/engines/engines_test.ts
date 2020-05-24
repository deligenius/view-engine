import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { blue } from "https://deno.land/std/fmt/colors.ts";

import { renderDenjuck } from "./denjuck.ts";
import { renderEjs } from "./ejs.ts";
import { renderHandlebars } from "./handlebars.ts";

Deno.test({
  name: "Testing renderDenjuck()",
  fn(): void {
    const template = `<h1>{{data.name}}</h1>`;

    const actual = renderDenjuck(template, { data: { name: "John" } });
    const expect = `<h1>John</h1>`;
    assertEquals(actual, expect);
  },
});

Deno.test({
  name: "Testing renderEjs()",
  fn(): void {
    const template = `Hobbies of <%=data.name%>`;

    const actual = renderEjs(template, { data: { name: "John" } });
    const expect = `Hobbies of John`;
    assertEquals(actual, expect);
  },
});

Deno.test({
  name: "Testing renderHandlebars()",
  fn(): void {
    const template = `<h1>{{data.name}}</h1>`;

    const actual = renderHandlebars(template, { data: { name: "John" } });
    const expect = `<h1>John</h1>`;
    assertEquals(actual, expect);
  },
});

// Deno.test({
//   name: "Testing renderReact() - function component",
//   async fn() {
//     const component = await getTemplate("./view/index_function.tsx")

//     const actual = renderReact(component, { data: { name: "John" } })
//     const expect = `<div data-reactroot=\"\"><h1>Hello, world!</h1><h3>John</h3></div>`
//     assertEquals(actual, expect)
//   },
// });

// Deno.test({
//   name: "Testing renderReact() - class component",
//   async fn() {
//     const component = await getTemplate("./view/index_class.tsx")

//     const actual = renderReact(component, { data: { name: "John" } })
//     const expect = `<div data-reactroot=\"\"><h1>Hello, world!</h1><h3>John</h3></div>`
//     assertEquals(actual, expect)
//   }
// });
