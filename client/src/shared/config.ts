// Shared between client and server

import { MetaframeDefinition } from "@metapages/metapage";

export interface Config {
    modules: string[];
    definition?: MetaframeDefinition;
}

interface UrlEncodedConfigV1 {
    modules: string[];
    definition?: MetaframeDefinition;
}

export const urlToConfig = (url: URL) : Config => {
    const version :string | null = url.searchParams.get("v");
    const encodedConfigString :string | null = url.searchParams.get("c");
    if (!version || !encodedConfigString) {
        return {modules: []};
    }
    switch(version) {
        case "1":
            return urlTokenV1ToConfig(encodedConfigString);
        default:
            return {modules: []};
    }
}

export const configToUrl = (url:URL, config: Config) : URL => {
    // On new versions, this will need conversion logic
    url.searchParams.set("v", "1");
    url.searchParams.set("c", btoa(JSON.stringify(config)));
    return url;
}

const urlTokenV1ToConfig = (encoded: string) : Config => {
    const configV1: UrlEncodedConfigV1 = JSON.parse(atob(encoded));
    // No need to case because it's the same FOR NOW
    return configV1;
}
