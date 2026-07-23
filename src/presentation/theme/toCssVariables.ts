import type { CSSProperties } from "react";
import type { WeddingTheme } from "@/src/domain/wedding/types";

type ThemeStyle = CSSProperties & Record<`--${string}`, string>;

export function toCssVariables(theme: WeddingTheme): ThemeStyle {
  return {
    "--ivory": theme.ivory,
    "--paper": theme.paper,
    "--ink": theme.ink,
    "--sage": theme.sage,
    "--moss": theme.moss,
    "--gold": theme.gold,
    "--blush": theme.blush,
    "--envelope-paper": theme.envelopePaper,
    "--envelope-front": theme.envelopeFront,
    "--envelope-back": theme.envelopeBack,
    "--wax": theme.wax,
  };
}
