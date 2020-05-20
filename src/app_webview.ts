import { WebView } from "https://deno.land/x/webview/mod.ts";


await new WebView({
  title: "Remote deno_webview example",
  url: `http://localhost:8899`,
  width: 800,
  height: 600,
  resizable: true,
  debug: true,
  frameless: false,
}).run();