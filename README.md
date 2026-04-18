# Colorize

Color palette generator based on Tailwind colors using OKLCH. Pick any color, get a full 50–950 shade range, copy it straight into your config.

## What it does

- Generates 11 shades (50–950) from any input color
- Uses OKLCH color space for perceptually uniform lightness scaling
- Auto-detects closest color name from input
- Spacebar shortcut to randomize
- Light/dark mode with system preference detection

## Export formats

| Format | Output |
|---|---|
| Tailwind 3 | JS config object |
| Tailwind 4 | `@theme` CSS block |
| CSS | `:root` custom properties |
| SCSS | Sass variables |
| SVG | Color swatch strip |
| Tokens Studio | Figma plugin JSON |
| W3C Design Tokens | W3C format JSON |

Color values exportable as: Hex, OKLCH, HSL, RGB.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- shadcn/ui + Radix UI
- [culori](https://culorijs.org) — OKLCH math and color conversion

## Dev

```bash
pnpm install
pnpm dev
```

## Adding shadcn components

```bash
pnpm dlx shadcn@latest add button
```
