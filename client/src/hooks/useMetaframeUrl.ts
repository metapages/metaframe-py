import {
  useEffect,
  useState,
} from 'react';

import {
  setHashValueInHashString,
  setHashValueJsonInUrl,
  stringToBase64String,
  useHashParamBase64,
  useHashParamJson,
} from '@metapages/hash-query';
import { MetaframeDefinitionV6 } from '@metapages/metapage';

import { ConfigOptions } from '../shared/config';

export const useMetaframeUrl = () => {
  const [url, setUrl] = useState<string>();
  const [code] = useHashParamBase64("py");
  const [config] = useHashParamJson<ConfigOptions>("c");
  const [metaframeDef] = useHashParamJson<MetaframeDefinitionV6>("mfjson");
  // const [modules] = useHashParamJson<string[]>("modules");
  // update the url
  useEffect(() => {
    // const url = new URL(window.location.href);

    let href = window.location.href;
    if (metaframeDef) {
      href = setHashValueJsonInUrl(href, "mfjson", metaframeDef);
    }
    // if (modules) {
    //   href = setHashValueJsonInUrl(href, "modules", modules);
    // }
    if (config) {
      href = setHashValueJsonInUrl(href, "c", config);
    }

    const url = new URL(href);

    // I am not sure about this anymore
    // We need this for the links and "copy URL" functionality to work
    // because in development the URLs are different
    url.pathname = "";
    url.host = import.meta.env.VITE_SERVER_ORIGIN.split(":")[0];
    url.port = import.meta.env.VITE_SERVER_ORIGIN.split(":")[1];

    // WATCH THIS DIFFERENCE BETWEEN THIS AND BELOW
    // 1!
    if (code) {
      url.hash = setHashValueInHashString(
        url.hash,
        "py",
        stringToBase64String(code)
      );
    }
    // Remove the c and v hash params since they are set in the searchParams
    // url.hash = setHashValueInHashString(url.hash, "c", null);
    // url.hash = setHashValueInHashString(url.hash, "v", null);
    setUrl(url.href);
  }, [config, code, metaframeDef, setUrl]);

  return { url };
};
