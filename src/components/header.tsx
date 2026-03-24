import { IconMoon, IconSun } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b px-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 font-heading text-base font-semibold tracking-tight">
          <span className="rounded bg-foreground px-1.5 py-0.5 text-xs font-bold text-background">
            Co
          </span>
          Colorize
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <span className="font-medium text-foreground">Generate</span>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <IconSun className="size-4" />
          ) : (
            <IconMoon className="size-4" />
          )}
        </Button>
      </div>
    </header>
  )
}
