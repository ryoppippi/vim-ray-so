import { Denops } from "jsr:@denops/std@7.1.1";
import { g } from "jsr:@denops/std@7.1.1/variable";
import * as helper from "jsr:@denops/std@7.1.1/helper";
import * as fn from "jsr:@denops/std@7.1.1/function";

import { systemopen } from "jsr:@lambdalisue/systemopen@1.0.0";
import * as U from "jsr:@core/unknownutil@3.18.1";

import { type ElementHandle, launch } from "jsr:@astral/astral";

import { isOptions } from "./types.ts";
import { getRaySoUrl } from "./ray-so.ts";

const isRange = U.isTupleOf([U.isNumber, U.isNumber] as const);

async function getURL(denops: Denops, args: unknown, range: unknown) {
  U.assert(args, U.isArrayOf(U.isString), { name: "args" });
  U.assert(range, U.isUnionOf([U.isUndefined, isRange]), {
    name: "range",
  });

  /** get selected text. if range is undefined, get all text */
  const codeArray = range === undefined
    ? await denops.call("getline", 1, "$")
    : await denops.call("getline", range[0], range[1]);
  U.assert(codeArray, U.isArrayOf(U.isString));
  const code = codeArray.join("\n");

  const path = args.at(0) ?? await fn.expand(denops, "%:t");

  const theme = await g.get(denops, "ray_so_theme");
  const padding = await g.get(denops, "ray_so_padding");
  const background = await g.get(denops, "ray_so_background");
  const darkmode = await g.get(denops, "ray_so_darkmode");

  const filetype = await denops.eval("&filetype");

  const options = {
    language: filetype,
    title: path,
    code,
    theme,
    padding,
    background,
    darkmode,
  };

  U.assert(options, isOptions);

  const url = getRaySoUrl(options);
  return url;
}

export function main(denops: Denops) {
  denops.dispatcher = {
    open: (args, range) =>
      helper.friendlyCall(denops, async () => {
        const url = await getURL(denops, args, range);
        await systemopen(url);
      }),
    clipboard: (args, range) =>
      helper.friendlyCall(denops, async () => {
        const url = await getURL(denops, args, range);

        const browser = await launch({ headless: false });

        const page = await browser.newPage(url);

        const button = await page.$(
          "button[aria-label='See other export options']",
        );
        await button!.click();

        await page.waitForNetworkIdle({ idleConnections: 0, idleTime: 1000 });
        const items = await page.$$("div[role='menuitem']");

        let copyUrlButton: ElementHandle | undefined;

        for (const item of items) {
          const text = await item.innerText();
          if (text === "Copy Image") {
            copyUrlButton = item;
            break;
          }
        }

        if (copyUrlButton == null) {
          throw new Error("Copy URL button not found");
        }

        await copyUrlButton.click();

        await page.waitForTimeout(2000);

        await browser.close();
      }),
  };
}
