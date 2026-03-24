import { useState, useCallback } from "react"
import { IconCopy, IconCheck } from "@tabler/icons-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { generateExportCode } from "@/lib/color"
import type { ColorScale, ExportFormat, ColorFormat } from "@/lib/color"

interface ExportDialogProps {
  scale: ColorScale
  colorName: string
  children: React.ReactNode
}

const EXPORT_FORMATS: Array<{
  id: ExportFormat
  label: string
  free?: boolean
}> = [
  { id: "tailwind3", label: "Tailwind 3" },
  { id: "tailwind4", label: "Tailwind 4" },
  { id: "css", label: "CSS" },
  { id: "scss", label: "SCSS" },
  { id: "svg", label: "SVG" },
  { id: "tokens-studio", label: "Tokens Studio (Figma)" },
  { id: "w3c-tokens", label: "W3C Design Tokens" },
]

const COLOR_FORMATS: Array<{ id: ColorFormat; label: string; free?: boolean }> =
  [
    { id: "hex", label: "Hex code" },
    { id: "oklch", label: "OKLCH" },
    { id: "hsl", label: "HSL" },
    { id: "rgb", label: "RGB" },
  ]

export function ExportDialog({
  scale,
  colorName,
  children,
}: ExportDialogProps) {
  const [exportFormat, setExportFormat] = useState<ExportFormat>("tailwind3")
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex")
  const [copied, setCopied] = useState(false)

  const code = generateExportCode(scale, colorName, exportFormat, colorFormat)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-fit gap-0 p-0 sm:max-w-5xl">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-base">
            Export &middot;{" "}
            <span className="text-muted-foreground">{colorName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex">
          {/* Format selector */}
          <div className="flex w-48 shrink-0 flex-col overflow-y-auto border-r p-4">
            {EXPORT_FORMATS.map((f) => (
              <button
                key={f.id}
                onClick={() => setExportFormat(f.id)}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  exportFormat === f.id
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Color format selector */}
          <div className="flex w-40 shrink-0 flex-col border-r p-4">
            {COLOR_FORMATS.map((f) => (
              <button
                key={f.id}
                onClick={() => setColorFormat(f.id)}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  colorFormat === f.id
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
                {f.free && (
                  <span className="rounded border px-1 text-[10px] text-muted-foreground">
                    free
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Code preview */}
          <div className="relative max-h-96 min-w-96">
            <Button
              size="sm"
              className="absolute top-4 right-6 z-10 bg-neutral-700"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <IconCheck className="size-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <IconCopy className="size-3.5" />
                  Copy to clipboard
                </>
              )}
            </Button>
            <pre className="size-full overflow-auto bg-neutral-900 p-6 pt-8 pr-12 font-mono text-sm leading-relaxed text-neutral-100">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
