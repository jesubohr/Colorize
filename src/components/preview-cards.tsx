import type { ColorScale } from "@/lib/color"

interface PreviewCardsProps {
  scale: ColorScale
}

function BarChartCard({ scale }: { scale: ColorScale }) {
  const data = [65, 45, 80, 55, 70, 40]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const maxVal = Math.max(...data)

  return (
    <div className="flex flex-col rounded-xl border bg-card p-6">
      <span className="text-sm font-medium text-muted-foreground">
        Expenses
      </span>
      <span className="mt-1 text-2xl font-bold">$12,543</span>
      <div className="mt-6 flex flex-1 items-end gap-2">
        {data.map((val, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-sm transition-all"
              style={{
                height: `${(val / maxVal) * 100}px`,
                backgroundColor: scale[i < 3 ? "400" : "500"],
                opacity: 0.6 + (val / maxVal) * 0.4,
              }}
            />
            <span className="text-[10px] text-muted-foreground">
              {months[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DonutChartCard({ scale }: { scale: ColorScale }) {
  const size = 120
  const strokeWidth = 16
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const segments = [
    { label: "Groceries", value: 4973, shade: "400" as const },
    { label: "Household", value: 4973, shade: "500" as const },
    { label: "Travel", value: 4973, shade: "600" as const },
  ]
  const total = segments.reduce((s, seg) => s + seg.value, 0)

  let offset = 0
  const segmentElements = segments.map((seg, i) => {
    const pct = seg.value / total
    const dashLength = circumference * pct
    const dashOffset = -offset
    offset += dashLength
    return (
      <circle
        key={i}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={scale[seg.shade]}
        strokeWidth={strokeWidth}
        strokeDasharray={`${dashLength} ${circumference - dashLength}`}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        className="transition-all"
      />
    )
  })

  return (
    <div className="flex flex-col rounded-xl border bg-card p-6">
      <span className="text-sm font-medium text-muted-foreground">
        Expenses
      </span>
      <div className="mt-4 flex items-center justify-center">
        <div className="relative">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="-rotate-90"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-muted/30"
            />
            {segmentElements}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold">
              $ {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="size-2.5 rounded-full"
                style={{ backgroundColor: scale[seg.shade] }}
              />
              <span className="text-sm">{seg.label}</span>
            </div>
            <span className="text-sm font-medium">
              $ {seg.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HeroCard({ scale }: { scale: ColorScale }) {
  return (
    <div
      className="relative flex flex-col justify-end overflow-hidden rounded-xl p-6"
      style={{ backgroundColor: scale["200"], minHeight: "240px" }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, ${scale["100"]} 0%, ${scale["300"]} 50%, ${scale["500"]} 100%)`,
        }}
      />
      <div className="relative">
        <h3
          className="text-3xl leading-tight font-bold"
          style={{ color: scale["900"] }}
        >
          Track your
          <br />
          expenses
        </h3>
      </div>
    </div>
  )
}

function FeatureCard({ scale }: { scale: ColorScale }) {
  return (
    <div
      className="relative flex flex-col justify-end overflow-hidden rounded-xl p-6"
      style={{ backgroundColor: scale["100"], minHeight: "240px" }}
    >
      <div
        className="absolute top-4 right-4 size-24 rounded-full opacity-50"
        style={{ backgroundColor: scale["300"] }}
      />
      <div
        className="absolute top-10 right-10 size-16 rounded-full opacity-30"
        style={{ backgroundColor: scale["500"] }}
      />
      <div className="relative">
        <h3
          className="text-3xl leading-tight font-bold"
          style={{ color: scale["800"] }}
        >
          Gain
          <br />
          control
        </h3>
      </div>
    </div>
  )
}

function BlogCard({ scale }: { scale: ColorScale }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-6">
      <span className="text-lg font-semibold">Blog</span>
      {[
        { title: "Productivity Hacks for Life on the Road", tag: "Work" },
        { title: "The Ultimate Digital Nomad Guide", tag: "Travel" },
      ].map((post, i) => (
        <div key={i} className="flex items-start gap-3">
          <div
            className="size-12 shrink-0 rounded-lg"
            style={{ backgroundColor: scale[i === 0 ? "200" : "300"] }}
          />
          <div className="flex flex-col gap-1">
            <span className="text-sm leading-snug font-medium">
              {post.title}
            </span>
            <span
              className="w-fit rounded px-1.5 py-0.5 text-[10px] font-medium"
              style={{
                backgroundColor: scale["500"],
                color: "#fff",
              }}
            >
              {post.tag}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function StatsCard({ scale }: { scale: ColorScale }) {
  return (
    <div className="flex flex-col rounded-xl border bg-card p-6">
      <span className="text-sm font-medium text-muted-foreground">Income</span>
      <span className="mt-1 text-2xl font-bold">$15,989</span>
      <span className="mt-1 text-xs text-muted-foreground">
        $18,871 last period
      </span>
      <div className="mt-4">
        <svg
          viewBox="0 0 200 40"
          className="h-10 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,35 C20,30 40,20 60,22 C80,24 100,15 120,10 C140,5 160,12 180,8 L200,5"
            fill="none"
            stroke={scale["500"]}
            strokeWidth="2"
          />
          <path
            d="M0,35 C20,30 40,20 60,22 C80,24 100,15 120,10 C140,5 160,12 180,8 L200,5 L200,40 L0,40 Z"
            fill={scale["200"]}
            opacity="0.3"
          />
        </svg>
      </div>
    </div>
  )
}

function GradientShowcase({ scale }: { scale: ColorScale }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
      <span className="text-sm font-medium">Gradients</span>
      <div
        className="h-16 rounded-lg"
        style={{
          background: `linear-gradient(135deg, ${scale["300"]}, ${scale["600"]})`,
        }}
      />
      <div
        className="h-16 rounded-lg"
        style={{
          background: `linear-gradient(90deg, ${scale["100"]}, ${scale["400"]}, ${scale["700"]})`,
        }}
      />
      <div
        className="h-16 rounded-lg"
        style={{
          background: `linear-gradient(to right, ${scale["50"]}, ${scale["950"]})`,
        }}
      />
    </div>
  )
}

function PricingCard({ scale }: { scale: ColorScale }) {
  return (
    <div className="flex flex-col items-center rounded-xl border bg-card p-6 text-center">
      <span
        className="rounded-full px-3 py-1 text-xs font-medium"
        style={{ backgroundColor: scale["100"], color: scale["700"] }}
      >
        Pro Plan
      </span>
      <span className="mt-3 text-3xl font-bold">$29</span>
      <span className="text-sm text-muted-foreground">/month</span>
      <div className="mt-4 flex w-full flex-col gap-2 text-left text-sm">
        {["Unlimited palettes", "Export all formats", "Priority support"].map(
          (feature) => (
            <div key={feature} className="flex items-center gap-2">
              <div
                className="flex size-4 items-center justify-center rounded-full"
                style={{ backgroundColor: scale["500"] }}
              >
                <span className="text-[8px] text-white">&#10003;</span>
              </div>
              {feature}
            </div>
          )
        )}
      </div>
      <button
        className="mt-6 w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: scale["500"] }}
      >
        Get Started
      </button>
    </div>
  )
}

export function PreviewCards({ scale }: PreviewCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <HeroCard scale={scale} />
      <BarChartCard scale={scale} />
      <FeatureCard scale={scale} />
      <DonutChartCard scale={scale} />
      <BlogCard scale={scale} />
      <StatsCard scale={scale} />
      <GradientShowcase scale={scale} />
      <PricingCard scale={scale} />
    </div>
  )
}
