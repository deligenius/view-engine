import { createApp } from "https://servestjs.org/@v1.0.0/mod.ts";
const router = createApp();

router.get("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/plain",
      "Access-Control-Allow-Origin": "*",
    }),
    body: "goodjob"
  });
});
router.listen({ port: 8899 });