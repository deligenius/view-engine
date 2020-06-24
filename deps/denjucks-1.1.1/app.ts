// @deno-types="./mod.d.ts"
import denjuck from "./mod.js";

// console.log(':haha')
let template = denjuck.renderString("hello {{ txt }}", {txt: "world"})

console.log(template)