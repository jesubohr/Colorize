import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PreviewCards } from "@/components/preview-cards"
import type { ColorScale } from "@/lib/color"

interface PreviewSectionProps {
  scale: ColorScale
}

const PREVIEW_TABS = [
  "Cards",
  "Gradients",
  "Components",
  "Shadcn/ui",
  "Charts",
  "Headings",
] as const

function GradientsTab({ scale }: { scale: ColorScale }) {
  const gradients = [
    {
      label: "Diagonal",
      css: `linear-gradient(135deg, ${scale["300"]}, ${scale["600"]})`,
    },
    {
      label: "Horizontal",
      css: `linear-gradient(90deg, ${scale["100"]}, ${scale["500"]}, ${scale["900"]})`,
    },
    {
      label: "Radial",
      css: `radial-gradient(circle at 30% 30%, ${scale["200"]}, ${scale["700"]})`,
    },
    {
      label: "Full spectrum",
      css: `linear-gradient(90deg, ${scale["50"]}, ${scale["200"]}, ${scale["400"]}, ${scale["600"]}, ${scale["800"]}, ${scale["950"]})`,
    },
    {
      label: "Soft",
      css: `linear-gradient(180deg, ${scale["50"]}, ${scale["200"]})`,
    },
    {
      label: "Vibrant",
      css: `linear-gradient(135deg, ${scale["400"]}, ${scale["700"]})`,
    },
    {
      label: "Dark",
      css: `linear-gradient(135deg, ${scale["700"]}, ${scale["950"]})`,
    },
    {
      label: "Conic",
      css: `conic-gradient(from 0deg, ${scale["200"]}, ${scale["400"]}, ${scale["600"]}, ${scale["400"]}, ${scale["200"]})`,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {gradients.map((g) => (
        <div key={g.label} className="flex flex-col gap-2">
          <div className="h-32 rounded-xl" style={{ background: g.css }} />
          <span className="text-xs text-muted-foreground">{g.label}</span>
        </div>
      ))}
    </div>
  )
}

function ComponentsTab({ scale }: { scale: ColorScale }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {/* Buttons */}
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
        <span className="text-sm font-medium">Buttons</span>
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-lg px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: scale["500"] }}
          >
            Primary
          </button>
          <button
            className="rounded-lg border px-4 py-2 text-sm font-medium"
            style={{ borderColor: scale["300"], color: scale["600"] }}
          >
            Outline
          </button>
          <button
            className="rounded-lg px-4 py-2 text-sm font-medium"
            style={{ backgroundColor: scale["100"], color: scale["700"] }}
          >
            Ghost
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
        <span className="text-sm font-medium">Badges</span>
        <div className="flex flex-wrap gap-2">
          {(["100", "200", "300", "400", "500"] as const).map((shade) => (
            <span
              key={shade}
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: scale[shade],
                color: Number(shade) >= 400 ? "#fff" : scale["800"],
              }}
            >
              Shade {shade}
            </span>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
        <span className="text-sm font-medium">Alerts</span>
        <div
          className="rounded-lg border-l-4 p-3 text-sm"
          style={{
            backgroundColor: scale["50"],
            borderLeftColor: scale["500"],
            color: scale["800"],
          }}
        >
          This is an informational alert using your palette.
        </div>
      </div>

      {/* Input */}
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
        <span className="text-sm font-medium">Input</span>
        <input
          className="rounded-lg border px-3 py-2 text-sm outline-none"
          style={{
            borderColor: scale["300"],
          }}
          placeholder="Type something..."
          onFocus={(e) => {
            e.currentTarget.style.borderColor = scale["500"]
            e.currentTarget.style.boxShadow = `0 0 0 2px ${scale["200"]}`
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = scale["300"]
            e.currentTarget.style.boxShadow = "none"
          }}
        />
      </div>

      {/* Toggle */}
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
        <span className="text-sm font-medium">Progress</span>
        <div
          className="h-2 rounded-full"
          style={{ backgroundColor: scale["100"] }}
        >
          <div
            className="h-full w-2/3 rounded-full transition-all"
            style={{ backgroundColor: scale["500"] }}
          />
        </div>
        <div
          className="h-2 rounded-full"
          style={{ backgroundColor: scale["100"] }}
        >
          <div
            className="h-full w-1/3 rounded-full transition-all"
            style={{ backgroundColor: scale["400"] }}
          />
        </div>
      </div>

      {/* Avatar group */}
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
        <span className="text-sm font-medium">Avatars</span>
        <div className="flex -space-x-2">
          {(["300", "400", "500", "600", "700"] as const).map((shade) => (
            <div
              key={shade}
              className="flex size-9 items-center justify-center rounded-full border-2 border-card text-xs font-medium text-white"
              style={{ backgroundColor: scale[shade] }}
            >
              {shade[0]}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function HeadingsTab({ scale }: { scale: ColorScale }) {
  return (
    <div className="flex flex-col gap-6 rounded-xl border bg-card p-8">
      <h1 className="text-4xl font-bold" style={{ color: scale["900"] }}>
        The quick brown fox
      </h1>
      <h2 className="text-3xl font-semibold" style={{ color: scale["800"] }}>
        jumps over the lazy dog
      </h2>
      <h3 className="text-2xl font-medium" style={{ color: scale["700"] }}>
        Pack my box with five dozen liquor jugs
      </h3>
      <p className="text-lg" style={{ color: scale["600"] }}>
        How vexingly quick daft zebras jump! The five boxing wizards jump
        quickly. Sphinx of black quartz, judge my vow.
      </p>
      <p className="text-base" style={{ color: scale["500"] }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p className="text-sm" style={{ color: scale["400"] }}>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat.
      </p>
    </div>
  )
}

function ShadcnTab({ scale }: { scale: ColorScale }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {/* Card component */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-lg text-white"
            style={{ backgroundColor: scale["500"] }}
          >
            <span className="text-lg">&#9734;</span>
          </div>
          <div>
            <div className="font-medium">Card Title</div>
            <div className="text-sm text-muted-foreground">
              Card description text
            </div>
          </div>
        </div>
      </div>

      {/* Switch-like */}
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-6">
        <span className="text-sm font-medium">Toggles</span>
        <div className="flex items-center gap-3">
          <div
            className="flex h-6 w-11 items-center rounded-full px-0.5"
            style={{ backgroundColor: scale["500"] }}
          >
            <div className="size-5 translate-x-5 rounded-full bg-white shadow-sm transition-transform" />
          </div>
          <span className="text-sm">Enabled</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-11 items-center rounded-full bg-muted px-0.5">
            <div className="size-5 rounded-full bg-white shadow-sm transition-transform" />
          </div>
          <span className="text-sm">Disabled</span>
        </div>
      </div>

      {/* Table-like */}
      <div className="flex flex-col rounded-xl border bg-card">
        <div className="border-b px-4 py-3 text-sm font-medium">
          Transactions
        </div>
        {[
          { name: "Payment", amount: "-$250.00" },
          { name: "Deposit", amount: "+$1,200.00" },
          { name: "Transfer", amount: "-$89.00" },
        ].map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b px-4 py-3 text-sm last:border-0"
          >
            <div className="flex items-center gap-2">
              <div
                className="size-2 rounded-full"
                style={{
                  backgroundColor: row.amount.startsWith("+")
                    ? scale["400"]
                    : scale["200"],
                }}
              />
              {row.name}
            </div>
            <span className="font-mono">{row.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChartsTab({ scale }: { scale: ColorScale }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {/* Area chart */}
      <div className="flex flex-col gap-2 rounded-xl border bg-card p-6">
        <span className="text-sm font-medium">Area Chart</span>
        <svg viewBox="0 0 200 80" className="h-24 w-full">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={scale["400"]} stopOpacity="0.4" />
              <stop offset="100%" stopColor={scale["400"]} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,60 C30,50 50,20 80,30 C110,40 130,15 160,25 C180,30 195,20 200,15 L200,80 L0,80 Z"
            fill="url(#areaGrad)"
          />
          <path
            d="M0,60 C30,50 50,20 80,30 C110,40 130,15 160,25 C180,30 195,20 200,15"
            fill="none"
            stroke={scale["500"]}
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Pie chart */}
      <div className="flex flex-col items-center gap-2 rounded-xl border bg-card p-6">
        <span className="w-full text-sm font-medium">Pie Chart</span>
        <svg viewBox="0 0 100 100" className="size-28">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={scale["300"]}
            strokeWidth="20"
            strokeDasharray="75 251"
            strokeDashoffset="0"
            className="origin-center -rotate-90"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={scale["500"]}
            strokeWidth="20"
            strokeDasharray="100 251"
            strokeDashoffset="-75"
            className="origin-center -rotate-90"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={scale["700"]}
            strokeWidth="20"
            strokeDasharray="76 251"
            strokeDashoffset="-175"
            className="origin-center -rotate-90"
          />
        </svg>
      </div>

      {/* Horizontal bars */}
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
        <span className="text-sm font-medium">Horizontal Bars</span>
        {[
          { label: "React", value: 85, shade: "400" as const },
          { label: "Vue", value: 62, shade: "500" as const },
          { label: "Svelte", value: 45, shade: "600" as const },
          { label: "Angular", value: 38, shade: "700" as const },
        ].map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <div className="flex justify-between text-xs">
              <span>{item.label}</span>
              <span className="text-muted-foreground">{item.value}%</span>
            </div>
            <div
              className="h-2 rounded-full"
              style={{ backgroundColor: scale["100"] }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: scale[item.shade],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PreviewSection({ scale }: PreviewSectionProps) {
  return (
    <Tabs defaultValue="Cards">
      <TabsList className="bg-transparent">
        {PREVIEW_TABS.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="mt-4">
        <TabsContent value="Cards">
          <PreviewCards scale={scale} />
        </TabsContent>
        <TabsContent value="Gradients">
          <GradientsTab scale={scale} />
        </TabsContent>
        <TabsContent value="Components">
          <ComponentsTab scale={scale} />
        </TabsContent>
        <TabsContent value="Shadcn/ui">
          <ShadcnTab scale={scale} />
        </TabsContent>
        <TabsContent value="Charts">
          <ChartsTab scale={scale} />
        </TabsContent>
        <TabsContent value="Headings">
          <HeadingsTab scale={scale} />
        </TabsContent>
      </div>
    </Tabs>
  )
}
