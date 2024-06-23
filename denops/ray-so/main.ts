import { Denops } from "https://deno.land/x/denops_std@v6.5.0/mod.ts";
import { g } from "https://deno.land/x/denops_std@v6.5.0/variable/variable.ts";
import * as helper from "https://deno.land/x/denops_std@v6.5.0/helper/mod.ts";

import { systemopen } from "jsr:@lambdalisue/systemopen@1.0.0";
import * as U from "jsr:@core/unknownutil@3.18.1";

import { isOptions } from "./types.ts";
import { getRaySoUrl } from "./ray-so.ts";

const isRange = U.isTupleOf([U.isNumber, U.isNumber] as const);

export function main(denops: Denops) {
  denops.dispatcher = {
    open: (args, range) =>
      helper.friendlyCall(denops, async () => {
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

        const path = args.at(0) ?? await denops.eval("expand('%:t')");

        const theme = await g.get(denops, "ray_so_theme");
        const padding = await g.get(denops, "ray_so_padding");
        const background = await g.get(denops, "ray_so_background");
        const darkmode = await g.get(denops, "ray_so_darkmode");

        const filetype = await denops.eval("&filetype");

        const options = U.ensure(
          {
            code,
            title: path,
            theme,
            padding,
            background,
            darkmode,
            language: filetype,
          } as const,
          isOptions,
        );

        const url = getRaySoUrl({ ...options, code });
        await systemopen(url);
      }),
  };
}
