import { useState, useCallback, useRef, useEffect } from "react"
import { IconColorPicker } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { isValidHex } from "@/lib/color"

interface ColorInputProps {
  value: string
  onChange: (hex: string) => void
}

export function ColorInput({ value, onChange }: ColorInputProps) {
  const [inputValue, setInputValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)
  const colorPickerRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleSubmit = useCallback(() => {
    const normalized = inputValue.startsWith("#")
      ? inputValue
      : "#" + inputValue
    if (isValidHex(normalized)) {
      onChange(normalized.toLowerCase())
    } else {
      setInputValue(value)
    }
  }, [inputValue, onChange, value])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  const handleEyeDropper = useCallback(async () => {
    if (!("EyeDropper" in window)) return
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const eyeDropper = new (window as any).EyeDropper()
      const result = await eyeDropper.open()
      onChange(result.sRGBHex.toLowerCase())
    } catch {
      // user cancelled
    }
  }, [onChange])

  return (
    <div className="relative flex items-center gap-2">
      {/* Hidden native color picker */}
      <input
        ref={colorPickerRef}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value.toLowerCase())}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />
      {/* Clickable color swatch */}
      <button
        type="button"
        className="size-5 shrink-0 cursor-pointer rounded-full border shadow-sm transition-transform hover:scale-110"
        style={{ backgroundColor: value }}
        onClick={() => colorPickerRef.current?.click()}
        aria-label="Open color picker"
      />
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleSubmit}
        onKeyDown={handleKeyDown}
        className="font-mono text-sm"
        placeholder="#000000"
      />
      {"EyeDropper" in window && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleEyeDropper}
          className="absolute right-1"
          aria-label="Pick color from screen"
        >
          <IconColorPicker className="size-4" />
        </Button>
      )}
    </div>
  )
}
