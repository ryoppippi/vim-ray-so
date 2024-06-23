import * as ufo from "npm:ufo@1.5.3";
import * as uint from "npm:uint8array-extras@1.1.0";
import { uncapitalize } from "jsr:@ryoppippi/str-fns@0.0.15";

import type { Options } from "./types.ts";

const BASE_URL = `https://ray.so`;

export function getRaySoUrl(options: Options) {
  const base64Code = uint.stringToBase64(options.code ?? "");
  const hash = encodeHashItems(
    {
      ...options,
      code: base64Code,
      theme: options.theme ? uncapitalize(options.theme) : undefined,
    } as const satisfies Options,
  );
  const url = ufo.withFragment(BASE_URL, hash);
  return url;
}

function encodeHashItems(items: Options) {
  return Object.entries(items).map(([key, value]) =>
    ufo.encodeQueryItem(key, value)
  ).join("&");
}
