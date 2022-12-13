import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { LRU } from "https://deno.land/x/lru@1.0.2/mod.ts";
import {
  blobFromBase64String,
  blobToBase64String,
} from "https://esm.sh/@metapages/hash-query@0.3.12"; // 💕 u deno
import {
  MetaframeDefinitionV6,
  MetaframeVersionCurrent,
} from "https://esm.sh/@metapages/metapage@0.13.9";
import { convertMetaframeJsonToCurrentVersion } from "https://esm.sh/@metapages/metapage@0.13.9";

export interface ConfigOptions {
  // console
  c?: boolean;
}

export interface Config {
  modules: string[];
  definition?: MetaframeDefinitionV6;
  opt?: ConfigOptions;
}

interface UrlEncodedConfigV1 {
  modules: string[];
  definition?: MetaframeDefinitionV6;
}

export const urlToConfig = (url: URL): Config => {
  const version: string | null = url.searchParams.get("v");
  const encodedConfigString: string | null = url.searchParams.get("c");
  if (!encodedConfigString) {
    return { modules: [] };
  }
  switch (version) {
    case "1":
      return urlTokenV1ToConfig(encodedConfigString);
    default:
      try {
        return urlTokenV1ToConfig(encodedConfigString);
      } catch (e) {
        console.error(e);
        return { modules: [] };
      }
  }
};

export const configToUrl = (url: URL, config: Config): URL => {
  // On new versions, this will need conversion logic
  url.searchParams.set("v", "1");
  url.searchParams.set("c", blobToBase64String(config));
  return url;
};

const urlTokenV1ToConfig = (encoded: string): Config => {
  const configV1: UrlEncodedConfigV1 = blobFromBase64String(encoded);
  // No need to case because it's the same FOR NOW
  return configV1;
};

const DEFAULT_METAFRAME_DEFINITION: MetaframeDefinitionV6 = {
  version: MetaframeVersionCurrent, //VersionsMetaframe.V0_6,
  metadata: {
    name: "Javascript code runner",
    operations: {
      edit: {
        type: "url",
        url: "https://js-create.mtfm.io/",
        params: [
          {
            from: "js",
            to: "js",
          },
          {
            from: "v",
            to: "v",
            toType: "search",
          },
          {
            from: "c",
            to: "c",
            toType: "search",
          },
        ],
      },
    },
  },
  inputs: {},
  outputs: {},
};

const CACHE = new LRU<string>(500); // define your max amount of entries, in this example is 500

const OPTIONAL_DISPLAY_CONSOLE = `
<script>
var log = document.getElementById("root");
log.setAttribute("style", "display:flex;flex-direction:column;font-family: monospace;");
['log','debug','info','warn','error'].forEach(function (verb) {
    console[verb] = (function (method, verb, log) {
        return function () {
            method.apply(console, arguments);
            if (typeof(arguments[0]) === "string") {
                arguments[0].split("\\n").forEach(l => {
                    var msg = document.createElement('div');
                    msg.classList.add(verb);
                    msg.innerHTML = l.replaceAll(" ", "&#160;");
                    log.appendChild(msg);
                })
            } else {
                var msg = document.createElement('div');
                msg.classList.add(verb);
                msg.innerHTML = Array.prototype.slice.call(arguments).join(' ').replaceAll(" ", "&#160;");
                log.appendChild(msg);
            }
        };
    })(console[verb], verb, log);
});
</script>
`;

const HTML_TEMPLATE = [
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Metaframe JS</title>
    <script src="https://cdn.jsdelivr.net/npm/@metapages/metapage@0.13.9/dist/browser/metaframe/index.js"></script>
`,
  `
  <script>
  var metaframe = new metapage.Metaframe();

  const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor

  const execJsCode = (code, context) => {
    let exec = null
    let args = Object.keys(context)
    try {
        exec = AsyncFunction('exports', \`"use strict"; return (async function(\${args.join(', ')}){\${code}})\`)({})
    } catch (e) {
        return Promise.resolve({ failure: { error: e, phase: 'compile' } })
    }

    if (exec) {
        var phase = 'exec'
        let values = Object.values(context);
        if (exec.apply) {
            return exec.apply(null, values)
            .then((r) => ({ result: r }))
            .catch((e) => ({ failure: { error: e, phase } }))
        } else {
            return exec.then((a) => {
                return a.apply(null, values);
            })
            .then((r) => ({ result: r,  }))
            .catch((e) => ({ failure: { error: e, phase } }))
        }
    }

    return Promise.resolve({ failure: { error: 'compile failed', phase: 'compile' } })
  }

  const getUrlHashParamsFromHashString = (
    hash
  ) => {
    let hashString = hash;
    while (hashString.startsWith("#")) {
      hashString = hashString.substring(1);
    }

    const queryIndex = hashString.indexOf("?");
    if (queryIndex === -1) {
      return [hashString, {}];
    }
    const preHashString = hashString.substring(0, queryIndex);
    hashString = hashString.substring(queryIndex + 1);
    const hashObject = {};
    hashString
      .split("&")
      .filter((s) => s.length > 0)
      .map((s) => {
        const dividerIndex = s.indexOf("=");
        if (dividerIndex === -1) {
          return [s, ""];
        }
        const key = s.substring(0, dividerIndex);
        const value = s.substring(dividerIndex + 1);
        return [key, value];
      })
      .forEach(([key, value]) => {
        hashObject[key] = value;
      });

    Object.keys(hashObject).forEach(
      (key) => (hashObject[key] = decodeURI(hashObject[key]))
    );
    return [preHashString, hashObject];
  }

  const isIframe = () => {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }
  </script>
  </head>
  <body>
    <div id="root"></div>

`,
  `    <script>
      document.addEventListener("DOMContentLoaded", async (event) => {
        const [prefix, hashParams] = getUrlHashParamsFromHashString(window.location.hash);
        if (hashParams.js) {
          if (isIframe()) {
            await metaframe.connected();
          }
          const js = atob(hashParams.js);
          const result = await execJsCode(js, {});
          if (result.failure) {
            document.getElementById("root").innerHTML = \`<div>Error running code:\n\n\${result.failure.error}\n</div>\`;
          }
        }
      });
    </script>`,
  `
</body>

</html>
`,
];

const handler = (request: Request): Response => {
  const url = new URL(request.url);
  if (url.pathname === "/healthz") {
    return new Response("OK", { status: 200 });
  }

  if (url.pathname.endsWith("/metaframe.json")) {
    if (CACHE.get(url.href)) {
      const cachedBody: string = CACHE.get(url.href)!;
      const response = new Response(cachedBody, { status: 200 });
      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set("Content-Type", "application/json");
      return response;
    }

    const config: Config = urlToConfig(url);
    const metaframeDefinition: MetaframeDefinitionV6 =
      convertMetaframeJsonToCurrentVersion(
        config.definition || DEFAULT_METAFRAME_DEFINITION
      );

    // metaframeDefinition.metadata = metaframeDefinition.metadata
    //   ? metaframeDefinition.metadata
    //   : {};
    //   metaframeDefinition.metadata.operations = metaframeDefinition.metadata.operations
    //   ? metaframeDefinition.metadata.operations
    //   : {};
    // metaframeDefinition.metadata.operations.create = {
    //   type: "url",
    //   value: {
    //     url: "https://metapages.github.io/metaframe-js/",
    //     params: [
    //       {
    //         from: "js",
    //         to: "js",
    //       },
    //       {
    //         from: "v",
    //         to: "v",
    //         toType: "search",
    //       },
    //       {
    //         from: "c",
    //         to: "c",
    //         toType: "search",
    //       },
    //     ],
    //   },
    // };

    // metaframeDefinition.metadata.operations.create = {
    //   type: "url",
    //   value: {
    //     url: "https://metapages.github.io/metaframe-js/",
    //     params: [
    //       {
    //         from: "js",
    //         to: "js",
    //       },
    //       {
    //         from: "v",
    //         to: "v",
    //         toType: "search",
    //       },
    //       {
    //         from: "c",
    //         to: "c",
    //         toType: "search",
    //       },
    //     ],
    //   },
    // };

    const body = JSON.stringify(metaframeDefinition, null, "  ");
    CACHE.set(url.href, body);

    const response = new Response(body, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Content-Type", "application/json");
    return response;
  }

  if (CACHE.get(url.href)) {
    const cachedBody: string = CACHE.get(url.href)!;
    const response = new Response(cachedBody, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Content-Type", "text/html");
    return response;
  }

  const template = [...HTML_TEMPLATE];
  try {
    const config: Config = urlToConfig(url);
    template[0] =
      template[0] +
      config.modules
        .filter((m) => !(m.startsWith("<") && m.includes("onload")))
        .map((m) =>
          m.startsWith("<")
            ? m
            : m.endsWith(".css")
            ? `    <link rel="stylesheet" type="text/css" href="${m}" crossorigin="anonymous">`
            : `    <script src="${m}" crossorigin="anonymous"></script>`
        );

    template[2] =
      template[2] +
      (config?.opt?.c ? OPTIONAL_DISPLAY_CONSOLE : "") +
      config.modules
        .filter((m) => m.startsWith("<") && m.includes("onload"))
        .map((m) => m)
        .join("\n");
  } catch (err) {
    // err
    template[2] = `<div>Error parsing URL config:\n\n${err}\n</div>`;
  }

  const body = template.join("\n");
  CACHE.set(url.href, body);

  const response = new Response(body, { status: 200 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Content-Type", "text/html");
  return response;
};

console.log(`HTTP webserver running: http://localhost:8000/`);
await serve(handler, { port: 8000 });
