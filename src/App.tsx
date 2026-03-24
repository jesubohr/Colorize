import { useState, useMemo, useCallback, useEffect } from "react"
import { IconHeart } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ColorScale } from "@/components/color-scale"
import { PreviewSection } from "@/components/preview-section"
import { ExportDialog } from "@/components/export-dialog"
import { ColorInfoDialog } from "@/components/color-info-dialog"
import {
  generateColorScale,
  findClosestShade,
  getColorName,
  generateRandomColor,
} from "@/lib/color"

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  return !!target.closest("input, textarea, select, [contenteditable='true']")
}

export default function App() {
  const [baseColor, setBaseColor] = useState("#8adb8f")

  const scale = useMemo(() => generateColorScale(baseColor), [baseColor])
  const colorName = useMemo(() => getColorName(baseColor), [baseColor])
  const baseShade = useMemo(() => findClosestShade(baseColor), [baseColor])

  const handleRandomize = useCallback(() => {
    setBaseColor(generateRandomColor())
  }, [])

  // Spacebar shortcut to generate random color
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (isEditableTarget(e.target)) return
      if (e.code !== "Space") return
      e.preventDefault()
      handleRandomize()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleRandomize])

  return (
    <div className="flex h-svh flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          baseColor={baseColor}
          onColorChange={setBaseColor}
          onRandomize={handleRandomize}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-6">
            {/* Palette header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-sm text-muted-foreground">Palette 1</span>
              </div>
              <Button variant="outline" size="sm">
                <IconHeart className="size-3.5" />
                Save palette
              </Button>
            </div>

            {/* Color name + actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="font-heading text-xl font-semibold">
                  {colorName}
                </h2>
                <Badge variant="secondary">Primary</Badge>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Button variant="ghost" size="sm">
                  Contrast grid
                </Button>
                <ColorInfoDialog scale={scale} colorName={colorName}>
                  <Button variant="ghost" size="sm">
                    Color info
                  </Button>
                </ColorInfoDialog>
                <ExportDialog scale={scale} colorName={colorName}>
                  <Button variant="ghost" size="sm">
                    Export
                  </Button>
                </ExportDialog>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>

            {/* Color scale strip */}
            <ColorScale scale={scale} baseShade={baseShade} />

            <Separator />

            {/* Preview section */}
            <PreviewSection scale={scale} />
          </div>
        </main>
      </div>
    </div>
  )
}
