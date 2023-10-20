import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import {
  Application,
  Context,
  Router,
} from 'https://deno.land/x/oak@v10.2.0/mod.ts';
import staticFiles from 'https://deno.land/x/static_files@1.1.6/mod.ts';

const port: number = parseInt(Deno.env.get("PORT") || "3000");

// const certFile = "../.certs/server1.localhost.pem",
//   keyFile = "../.certs/server1.localhost-key.pem";

const router = new Router();

const serveIndex = async (ctx: Context) => {
  const indexHtml = await Deno.readTextFile("./index.html");
  ctx.response.body = indexHtml;
};

router.get("/", serveIndex);
router.get("/index.html", serveIndex);
// After creating the router, we can add it to the app.

const app = new Application();
app.use(oakCors({ origin: "*" }));
app.use(
  staticFiles("editor", {
    prefix: "/editor",
    setHeaders: (headers: Headers) => {
      headers.set("Access-Control-Allow-Origin", "*");
    },
  })
);
app.use(router.routes());
app.use(router.allowedMethods());

// await app.listen({ port, certFile, keyFile });
await app.listen({ port });
