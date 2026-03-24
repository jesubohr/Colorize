import { IconCheck, IconInfoCircle, IconX } from "@tabler/icons-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/simple-tooltip"
import { SHADES, apcaContrast, formatColorValue } from "@/lib/color"
import type { ColorScale, Shade } from "@/lib/color"

interface ColorInfoDialogProps {
  scale: ColorScale
  colorName: string
  children: React.ReactNode
}

interface ApcaCellProps {
  shadeHex: string
  shade: Shade
  colorName: string
}

type ApcaButtonType =
  | "blackOnShade"
  | "whiteOnShade"
  | "shadeOnWhite"
  | "shadeOnBlack"

interface ApcaButtonProps {
  value: number
  bgColor: string
  textColor: string
  shade: Shade
  colorName: string
  type: ApcaButtonType
}

const APCA_THRESHOLDS = [
  { label: "Decorative text and dividers", min: 15 },
  { label: "Non-essential text (placeholder, disabled, copyright)", min: 30 },
  { label: "Large text, minimum of 24px (bold) or 36px (regular)", min: 45 },
  { label: "Small text (non-body), UI elements", min: 60 },
  { label: "Body text (minimum)", min: 75 },
  { label: "Body text (preferred)", min: 90 },
]

function getApcaTitle(
  type: ApcaButtonType,
  colorName: string,
  shade: Shade
): string {
  switch (type) {
    case "blackOnShade":
      return `Black text on ${colorName} ${shade}`
    case "whiteOnShade":
      return `White text on ${colorName} ${shade}`
    case "shadeOnWhite":
      return `${colorName} ${shade} on White background`
    case "shadeOnBlack":
      return `${colorName} ${shade} on Black background`
  }
}

function ApcaButton({
  value,
  bgColor,
  textColor,
  shade,
  colorName,
  type,
}: ApcaButtonProps) {
  const title = getApcaTitle(type, colorName, shade)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className="flex size-9 cursor-pointer items-center justify-center rounded-full font-semibold hover:opacity-80"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          {value}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-baseline justify-between border-b border-white/10 px-4 py-3">
          <span className="text-sm font-semibold text-balance">{title}</span>
          <span className="ml-3 shrink-0 text-sm font-semibold tabular-nums">
            L<sup>c</sup> {value}
          </span>
        </div>
        <ul className="px-2 py-2">
          {APCA_THRESHOLDS.map(({ label, min }) => {
            const passes = value >= min
            return (
              <li
                key={min}
                className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs"
              >
                <span className="flex items-center gap-2">
                  {passes ? (
                    <IconCheck className="size-3.5 shrink-0 text-emerald-400" />
                  ) : (
                    <IconX className="size-3.5 shrink-0 text-red-400" />
                  )}
                  <span className={passes ? "" : "text-white/40 line-through"}>
                    {label}
                  </span>
                </span>
                <span
                  className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] tabular-nums ${passes ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-white/40"}`}
                >
                  {min} +
                </span>
              </li>
            )
          })}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

function ApcaCell({ shadeHex, shade, colorName }: ApcaCellProps) {
  const blackOnShade = Math.round(Math.abs(apcaContrast("#000000", shadeHex)))
  const whiteOnShade = Math.round(Math.abs(apcaContrast("#ffffff", shadeHex)))
  const shadeOnWhite = Math.round(Math.abs(apcaContrast(shadeHex, "#ffffff")))
  const shadeOnBlack = Math.round(Math.abs(apcaContrast(shadeHex, "#000000")))

  return (
    <div className="flex items-center gap-1.5 text-[11px]">
      <ApcaButton
        value={blackOnShade}
        bgColor={shadeHex}
        textColor="#000000"
        shade={shade}
        colorName={colorName}
        type="blackOnShade"
      />
      <ApcaButton
        value={whiteOnShade}
        bgColor={shadeHex}
        textColor="#ffffff"
        shade={shade}
        colorName={colorName}
        type="whiteOnShade"
      />
      <ApcaButton
        value={shadeOnWhite}
        bgColor="#ffffff"
        textColor={shadeHex}
        shade={shade}
        colorName={colorName}
        type="shadeOnWhite"
      />
      <ApcaButton
        value={shadeOnBlack}
        bgColor="#000000"
        textColor={shadeHex}
        shade={shade}
        colorName={colorName}
        type="shadeOnBlack"
      />
    </div>
  )
}

export function ColorInfoDialog({
  scale,
  colorName,
  children,
}: ColorInfoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-fit gap-0 p-0 sm:max-w-5xl">
        <DialogHeader className="shrink-0 border-b px-6 py-4">
          <DialogTitle className="text-base">
            Color info{" "}
            <span className="text-muted-foreground">&middot; {colorName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-sm text-muted-foreground">
                <th className="px-6 py-3 text-left font-medium">#</th>
                <th className="flex items-center gap-1 px-6 py-3 text-left font-medium">
                  <span>
                    APCA L<sup>c</sup>
                  </span>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconInfoCircle className="size-3.5" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        APCA LC is a contrast score that shows how readable a
                        color is on a given background based on human
                        perception.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </th>
                <th className="px-6 py-3 text-left font-medium">OKLCH</th>
                <th className="px-6 py-3 text-left font-medium">Hexcode</th>
                <th className="px-6 py-3 text-left font-medium">HSL</th>
              </tr>
            </thead>
            <tbody>
              {SHADES.map((shade, i) => {
                const hex = scale[shade]
                return (
                  <tr
                    key={shade}
                    className={`border-b last:border-0 ${i % 2 === 0 ? "" : "bg-muted/30"}`}
                  >
                    <td className="px-6 py-2 text-xs">{shade}</td>
                    <td className="px-6 py-2">
                      <ApcaCell
                        shadeHex={hex}
                        shade={shade}
                        colorName={colorName}
                      />
                    </td>
                    <td className="px-6 py-2 font-mono text-sm">
                      {formatColorValue(hex, "oklch")}
                    </td>
                    <td className="px-6 py-2 font-mono text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block size-4 shrink-0 rounded-sm border"
                          style={{ backgroundColor: hex }}
                        />
                        <span>{hex}</span>
                      </div>
                    </td>
                    <td className="px-6 py-2 font-mono text-sm">
                      {formatColorValue(hex, "hsl")}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
