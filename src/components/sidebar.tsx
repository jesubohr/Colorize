import {
  IconPlus,
  IconRefresh,
  IconSettings,
  IconSelector,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ColorInput } from "@/components/color-input"

interface SidebarProps {
  baseColor: string
  onColorChange: (hex: string) => void
  onRandomize: () => void
}

export function Sidebar({ baseColor, onColorChange, onRandomize }: SidebarProps) {
  return (
    <aside className="flex w-[360px] shrink-0 flex-col border-r bg-card">
      <div className="flex flex-col gap-6 p-6">
        <div>
          <h1 className="font-heading text-lg font-semibold">
            Tailwind CSS Color Generator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create and visualize Tailwind colors on all sorts of components
            and designs.
          </p>
        </div>

        <div className="flex gap-1">
          {(["Brand", "Neutral", "Status"] as const).map((tab, i) => (
            <button
              key={tab}
              className={`rounded-none px-3 py-1.5 text-sm font-medium transition-colors ${
                i === 0
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Primary</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>HEX</span>
              <IconSelector className="size-3" />
              <button className="ml-1">
                <IconSettings className="size-3.5" />
              </button>
            </div>
          </div>

          <ColorInput value={baseColor} onChange={onColorChange} />
        </div>

        <Button
          className="w-full"
          onClick={() => {
            /* secondary color scale - visual only */
          }}
        >
          <IconPlus className="size-4" />
          Add secondary color scale
        </Button>

        <Button variant="outline" className="w-full" onClick={onRandomize}>
          <IconRefresh className="size-4" />
          Generate random
          <kbd className="ml-auto rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            Spacebar
          </kbd>
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Color harmony scheme &middot; auto
        </p>
      </div>
    </aside>
  )
}
