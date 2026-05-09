"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("placida-theme")
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialDark = stored ? stored === "dark" : prefers
    setIsDark(initialDark)
    document.documentElement.classList.toggle("dark", initialDark)
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("placida-theme", next ? "dark" : "light")
  }

  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle} className="rounded-full">
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
