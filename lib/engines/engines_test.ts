import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { blue } from "https://deno.land/std/fmt/colors.ts";

import { renderDenjuck } from "./denjuck.ts";
import { renderEjs } from "./ejs.ts";
import { renderHandlebars } from "./handlebars.ts";

// Deno.test({
//   name: blue("Testing renderDenjuck()"),
//   fn(): void {
//     const template = `<h1>{{data.name}}</h1>`;

//     const actual = renderDenjuck(template, { data: { name: "John" } });
//     const expect = `<h1>John</h1>`;
//     assertEquals(actual, expect);
//   },
// });

// Deno.test({
//   name: blue("Testing renderDenjuck() - extends"),
//   fn(): void {
//     const template = `
//     {% extends "./layout/parent.html" %}

//     {% block left %}
//     This is the left side!
//     {% endblock %}
  
//     {% block right %}
//     This is the right side!
//     {% endblock %}
//     `;

//     const actual = renderDenjuck(template, {}, {viewRoot: "./view"}).replace(/\r|\s/g, "");
//     const expect = `Thisisthedefaultcontent<sectionclass="left">Thisistheleftside!</section><sectionclass="right">Thisistherightside!</section>`;
//     assertEquals(actual, expect);
//   },
// });

Deno.test({
  name: blue("Testing renderEjs()"),
  fn(): void {
    const template = `Hobbies of <%=data.name%>`;

    const actual = renderEjs(template, { data: { name: "John" } });
    const expect = `Hobbies of John`;
    assertEquals(actual, expect);
  },
});

Deno.test({
  name: blue("Testing renderHandlebars()"),
  fn(): void {
    const template = `<h1>{{data.name}}</h1>`;

    const actual = renderHandlebars(template, { data: { name: "John" } });
    const expect = `<h1>John</h1>`;
    assertEquals(actual, expect);
  },
});
