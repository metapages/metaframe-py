import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import {
  Application,
  Context,
  Router,
} from 'https://deno.land/x/oak@v10.2.0/mod.ts';
import staticFiles from 'https://deno.land/x/static_files@1.1.6/mod.ts';
import {
  MetaframeDefinitionV6,
  MetaframeVersionCurrent,
} from 'https://esm.sh/@metapages/metapage@0.13.9';

const port: number = parseInt(Deno.env.get("PORT") || "3000");
const EDITOR_DEV_URL = Deno.env.get("EDITOR_DEV_URL")

const DEFAULT_METAFRAME_DEFINITION: MetaframeDefinitionV6 = {
  version: MetaframeVersionCurrent,
  metadata: {
    name: "Python code runner",
    operations: {
      edit: {
        type: "url",
        url: "https://pyiodide.mtfm.io/#?edit=1",
        params: [
          {
            from: "py",
            to: "py",
          },
          {
            from: "c",
            to: "c",
          },
        ],
      },
    },
  },
  inputs: {},
  outputs: {},
};

const DEFAULT_METAFRAME_DEFINITION_STRING = JSON.stringify(DEFAULT_METAFRAME_DEFINITION, null, 2);

const router = new Router();

const serveIndex = async (ctx: Context) => {
  let indexHtml = await Deno.readTextFile("./assets/index.html");
  if (EDITOR_DEV_URL) {
    indexHtml = indexHtml.replace(
      'const EDITOR_DEV_URL = "";',
      `const EDITOR_DEV_URL = "${EDITOR_DEV_URL}";`
    );
  }
  ctx.response.body = indexHtml;
};

router.get("/", serveIndex);
router.get("/index.html", serveIndex);
router.get("/metaframe.json", (ctx: Context) => {
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = DEFAULT_METAFRAME_DEFINITION_STRING;
});

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

await app.listen({ port });
