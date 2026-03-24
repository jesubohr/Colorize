import { useCallback } from "react"
import { toast } from "sonner"
import { SHADES, getContrastColor } from "@/lib/color"
import type { ColorScale as ColorScaleType, Shade } from "@/lib/color"

interface ColorScaleProps {
  scale: ColorScaleType
  baseShade: Shade
}

export function ColorScale({ scale, baseShade }: ColorScaleProps) {
  const handleCopy = useCallback((hex: string) => {
    navigator.clipboard.writeText(hex)
    toast(`Copied ${hex.toUpperCase()}`, {
      icon: (
        <span
          className="inline-block size-4 shrink-0 rounded-full"
          style={{ backgroundColor: hex }}
        />
      ),
    })
  }, [])

  return (
    <div className="flex overflow-hidden rounded-lg">
      {SHADES.map((shade) => {
        const hex = scale[shade]
        const textColor = getContrastColor(hex)
        const isBase = shade === baseShade

        return (
          <button
            key={shade}
            className="relative flex flex-1 cursor-pointer flex-col items-start justify-end gap-1 p-3 transition-opacity hover:opacity-90"
            style={{
              backgroundColor: hex,
              color: textColor === "white" ? "#fff" : "#000",
              minHeight: "5.5rem",
            }}
            onClick={() => handleCopy(hex)}
            title={`Click to copy ${hex}`}
          >
            {isBase && (
              <div className="absolute top-4 left-4">
                <div
                  className="size-1.5 rounded-full"
                  style={{
                    backgroundColor: textColor === "white" ? "#fff" : "#000",
                  }}
                />
              </div>
            )}
            <span className="text-sm font-medium">{shade}</span>
            <span className="text-sm uppercase">{hex.replace("#", "")}</span>
          </button>
        )
      })}
    </div>
  )
}
