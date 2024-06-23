import * as U from "jsr:@core/unknownutil@3.18.1";

export const Themes = [
  "vercel",
  "supabase",
  "tailwind",
  "bitmap",
  "noir",
  "ice",
  "sand",
  "forest",
  "mono",
  "breeze",
  "candy",
  "crimson",
  "falcon",
  "meadow",
  "midnight",
  "raindrop",
  "sunset",
] as const;

export const PaddingValues = [16, 32, 64, 128] as const;

export const isOptions = U.isObjectOf({
  code: U.isString,
  title: U.isOptionalOf(U.isString),
  theme: U.isOptionalOf(U.isLiteralOneOf(Themes)),
  padding: U.isOptionalOf(U.isLiteralOneOf(PaddingValues)),
  background: U.isOptionalOf(U.isBoolean),
  darkMode: U.isOptionalOf(U.isBoolean),
  language: U.isOptionalOf(U.isString),
});

export type Options = U.PredicateType<typeof isOptions>;
