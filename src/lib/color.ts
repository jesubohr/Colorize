import {
  parse,
  formatHex,
  converter,
  differenceEuclidean,
  clampChroma,
} from "culori"
import type { Oklch } from "culori"
import { COLOR_NAMES } from "./color-names"

const toOklch = converter("oklch")
const toHsl = converter("hsl")
const toRgb = converter("rgb")
const oklchDistance = differenceEuclidean("oklch")

export const SHADES = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const

export type Shade = (typeof SHADES)[number]
export type ColorScale = Record<Shade, string>
export type ColorFormat = "hex" | "oklch" | "hsl" | "rgb"
export type ExportFormat =
  | "tailwind3"
  | "tailwind4"
  | "css"
  | "scss"
  | "svg"
  | "tokens-studio"
  | "w3c-tokens"

const SHADE_LIGHTNESS: Record<Shade, number> = {
  "50": 0.975,
  "100": 0.94,
  "200": 0.9,
  "300": 0.82,
  "400": 0.71,
  "500": 0.6,
  "600": 0.51,
  "700": 0.43,
  "800": 0.36,
  "900": 0.3,
  "950": 0.19,
}

const SHADE_CHROMA_SCALE: Record<Shade, number> = {
  "50": 0.09,
  "100": 0.18,
  "200": 0.35,
  "300": 0.65,
  "400": 0.9,
  "500": 1.0,
  "600": 0.92,
  "700": 0.78,
  "800": 0.62,
  "900": 0.5,
  "950": 0.35,
}

export function isValidHex(value: string): boolean {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)
}

function normalizeHex(hex: string): string {
  let h = hex.startsWith("#") ? hex.slice(1) : hex
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
  }
  return "#" + h.toLowerCase()
}

export function findClosestShade(hex: string): Shade {
  const color = toOklch(parse(normalizeHex(hex))!)
  if (!color) return "500"

  let closest: Shade = "500"
  let minDiff = Infinity
  for (const shade of SHADES) {
    const diff = Math.abs((color.l ?? 0) - SHADE_LIGHTNESS[shade])
    if (diff < minDiff) {
      minDiff = diff
      closest = shade
    }
  }
  return closest
}

export function generateColorScale(hex: string): ColorScale {
  const normalized = normalizeHex(hex)
  const color = toOklch(parse(normalized)!)
  if (!color) {
    return Object.fromEntries(SHADES.map((s) => [s, normalized])) as ColorScale
  }

  const inputL = color.l ?? 0.5
  const inputC = color.c ?? 0
  const inputH = color.h ?? 0

  // Find which shade the input maps to
  let closestShade: Shade = "500"
  let minDiff = Infinity
  for (const shade of SHADES) {
    const diff = Math.abs(inputL - SHADE_LIGHTNESS[shade])
    if (diff < minDiff) {
      minDiff = diff
      closestShade = shade
    }
  }

  // Calculate peak chroma from input
  const chromaScaleAtInput = SHADE_CHROMA_SCALE[closestShade]
  const peakChroma =
    chromaScaleAtInput > 0 ? inputC / chromaScaleAtInput : inputC

  const scale = {} as ColorScale
  for (const shade of SHADES) {
    const targetL = SHADE_LIGHTNESS[shade]
    const targetC = peakChroma * SHADE_CHROMA_SCALE[shade]

    const generated: Oklch = {
      mode: "oklch",
      l: targetL,
      c: targetC,
      h: inputH,
    }

    const clamped = clampChroma(generated, "oklch")
    scale[shade] = formatHex(clamped)
  }

  return scale
}

export function getColorName(hex: string): string {
  const normalized = normalizeHex(hex)
  const color = toOklch(parse(normalized)!)
  if (!color) return "Unknown"

  let bestName = "Unknown"
  let bestDist = Infinity

  for (const [name, namedHex] of COLOR_NAMES) {
    const namedColor = toOklch(parse(namedHex)!)
    if (!namedColor) continue
    const dist = oklchDistance(color, namedColor)
    if (dist < bestDist) {
      bestDist = dist
      bestName = name
    }
  }

  return bestName
}

export function getContrastColor(hex: string): "black" | "white" {
  const color = toOklch(parse(normalizeHex(hex))!)
  if (!color) return "black"
  return (color.l ?? 0) > 0.6 ? "black" : "white"
}

export function generateRandomColor(): string {
  const h = Math.random() * 360
  const c = 0.08 + Math.random() * 0.2
  const l = 0.4 + Math.random() * 0.4
  const color: Oklch = { mode: "oklch", l, c, h }
  const clamped = clampChroma(color, "oklch")
  return formatHex(clamped)
}

export function formatColorValue(hex: string, format: ColorFormat): string {
  const normalized = normalizeHex(hex)
  const color = parse(normalized)
  if (!color) return hex

  switch (format) {
    case "hex":
      return formatHex(color)
    case "oklch": {
      const o = toOklch(color)
      return `oklch(${(o.l ?? 0).toFixed(3)} ${(o.c ?? 0).toFixed(3)} ${((o.h ?? 0) % 360).toFixed(1)})`
    }
    case "hsl": {
      const h = toHsl(color)
      return `hsl(${Math.round(h.h ?? 0)} ${Math.round((h.s ?? 0) * 100)}% ${Math.round((h.l ?? 0) * 100)}%)`
    }
    case "rgb": {
      const r = toRgb(color)
      return `rgb(${Math.round((r.r ?? 0) * 255)} ${Math.round((r.g ?? 0) * 255)} ${Math.round((r.b ?? 0) * 255)})`
    }
  }
}

// ─── APCA contrast ──────────────────────────────────────────────────────────

function sRGBtoLinear(channel: number): number {
  const c = channel / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function getLuminance(r: number, g: number, b: number): number {
  return (
    0.2126 * sRGBtoLinear(r) +
    0.7152 * sRGBtoLinear(g) +
    0.0722 * sRGBtoLinear(b)
  )
}

function calcSAPC(txtLum: number, bgLum: number): number {
  const Ytxt = txtLum > 0.022 ? txtLum : txtLum + (0.022 - txtLum) ** 1.414
  const Ybg = bgLum > 0.022 ? bgLum : bgLum + (0.022 - bgLum) ** 1.414
  if (Ybg >= Ytxt) {
    const s = (Ybg ** 0.56 - Ytxt ** 0.57) * 1.14
    return s < 0.001 ? 0 : (s - 0.027) * 100
  } else {
    const s = (Ybg ** 0.65 - Ytxt ** 0.62) * 1.14
    return s > -0.001 ? 0 : (s + 0.027) * 100
  }
}

function hexToLum(hex: string): number {
  const color = toRgb(parse(normalizeHex(hex))!)
  if (!color) return 0
  return getLuminance(
    Math.round((color.r ?? 0) * 255),
    Math.round((color.g ?? 0) * 255),
    Math.round((color.b ?? 0) * 255)
  )
}

/** Returns APCA Lc value (positive = dark-on-light, negative = light-on-dark) */
export function apcaContrast(textHex: string, bgHex: string): number {
  return calcSAPC(hexToLum(textHex), hexToLum(bgHex))
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function generateExportCode(
  scale: ColorScale,
  name: string,
  format: ExportFormat,
  colorFormat: ColorFormat
): string {
  const slug = slugify(name)
  const entries = SHADES.map(
    (s) => [s, formatColorValue(scale[s], colorFormat)] as const
  )

  switch (format) {
    case "tailwind3": {
      const lines = entries.map(([s, v]) => `  '${s}': '${v}',`)
      return `'${slug}': {\n${lines.join("\n")}\n},`
    }
    case "tailwind4": {
      const lines = entries.map(
        ([s, v]) => `  --color-${slug}-${s}: ${v};`
      )
      return `@theme {\n${lines.join("\n")}\n}`
    }
    case "css": {
      const lines = entries.map(([s, v]) => `  --${slug}-${s}: ${v};`)
      return `:root {\n${lines.join("\n")}\n}`
    }
    case "scss": {
      const lines = entries.map(([s, v]) => `$${slug}-${s}: ${v};`)
      return lines.join("\n")
    }
    case "svg": {
      const rects = entries.map(
        ([, v], i) =>
          `  <rect x="${i * 80}" y="0" width="80" height="100" fill="${v}"/>`
      )
      return `<svg width="${entries.length * 80}" height="100" xmlns="http://www.w3.org/2000/svg">\n${rects.join("\n")}\n</svg>`
    }
    case "tokens-studio": {
      const tokens = Object.fromEntries(
        entries.map(([s, v]) => [s, { value: v, type: "color" }])
      )
      return JSON.stringify({ [slug]: tokens }, null, 2)
    }
    case "w3c-tokens": {
      const tokens = Object.fromEntries(
        entries.map(([s, v]) => [s, { $value: v, $type: "color" }])
      )
      return JSON.stringify({ [slug]: tokens }, null, 2)
    }
  }
}
