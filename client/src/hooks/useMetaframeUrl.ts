import {
  setHashValueInHashString,
  stringToBase64String,
  useHashParamBase64,
  useHashParamJson,
} from "@metapages/hash-query";
import { useEffect, useState } from "react";
import { Config, ConfigDefault, configToUrl } from "../shared/config";

export const useMetaframeUrl = () => {
  const [url, setUrl] = useState<string>();
  const [code] = useHashParamBase64("js");
  const [config] = useHashParamJson<Config>("c", ConfigDefault);
  // update the url
  useEffect(() => {
    const url = new URL(window.location.href);
    configToUrl(url, config);
    url.pathname = "";
    url.host = import.meta.env.VITE_SERVER_ORIGIN.split(":")[0];
    url.port = import.meta.env.VITE_SERVER_ORIGIN.split(":")[1];

    // WATCH THIS DIFFERENCE BETWEEN THIS AND BELOW
    // 1!
    if (code) {
      url.hash = setHashValueInHashString(
        url.hash,
        "js",
        stringToBase64String(code)
      );
    }
    // Remove the c and v hash params since they are set in the searchParams
    url.hash = setHashValueInHashString(url.hash, "c", null);
    url.hash = setHashValueInHashString(url.hash, "v", null);
    setUrl(url.href);
  }, [config, code, setUrl]);

  return { url };
};
