import { cn } from "@/lib/utils"

export function Tooltip({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("relative", className)}>{children}</div>
}

export function TooltipTrigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("peer cursor-pointer", className)}>{children}</div>
}

export function TooltipContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "invisible inline-flex absolute w-96 bg-primary py-2 px-3 text-primary-foreground peer-hover:visible",
        className
      )}
    >
      {children}
    </div>
  )
}
