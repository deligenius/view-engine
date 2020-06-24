import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {
viewEngine,
engineFactory,
adapterFactory,
} from "https://deno.land/x/view_engine@v1.1.1/mod.ts";
const app = new Application();
const router = new Router();
const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(router.routes());
app.use(router.allowedMethods());
app.use(viewEngine(oakAdapter, ejsEngine));

router
.get("/", (context, next) => {
context.render("index.ejs");
});