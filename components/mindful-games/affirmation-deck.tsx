"use client"

import type React from "react"

import { useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const AFFIRMATIONS = [
  "You are enough, exactly as you are.",
  "Each breath grounds you in calm.",
  "Progress, not perfection.",
  "You deserve compassion—from yourself first.",
  "Your feelings are valid.",
  "Small steps create lasting change.",
  "You can do hard things.",
  "Peace begins with a single deep breath.",
  "Let go of what you can’t control.",
  "You are safe in this moment.",
  "Growth is already happening within you.",
  "You are worthy of kindness.",
]

export function AffirmationDeck() {
  const [current, setCurrent] = useState(() => AFFIRMATIONS[0])
  const [flipping, setFlipping] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const next = () => {
    setFlipping(true)
    // swap content halfway through the flip
    window.setTimeout(() => {
      const nextAffirmation = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]
      setCurrent(nextAffirmation)
    }, 250)
    // complete flip
    window.setTimeout(() => setFlipping(false), 550)
  }

  const cardStyle = useMemo<React.CSSProperties>(() => {
    return {
      transform: `rotateY(${flipping ? 180 : 0}deg)`,
      transformStyle: "preserve-3d",
      transition: "transform 550ms ease",
    } as React.CSSProperties
  }, [flipping])

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="w-full md:w-1/2">
        <div ref={containerRef} className="relative mx-auto max-w-sm perspective-[1000px]" aria-live="polite">
          <div
            className={cn(
              "rounded-2xl p-6 min-h-[200px] flex items-center justify-center text-center text-lg md:text-xl font-medium",
              "shadow-sm border",
              // soft gradient using tokens only
              "bg-gradient-to-br from-primary/10 via-accent/20 to-primary/30",
            )}
            style={cardStyle}
          >
            <span className="block text-pretty">{current}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Button onClick={next} className="rounded-full">
            Next Card
          </Button>
          <Button onClick={next} variant="secondary" className="rounded-full">
            Shuffle
          </Button>
        </div>
      </div>

      <div className="w-full md:w-1/2 text-sm text-muted-foreground">
        Flip through gentle affirmations on soft gradient cards. Tap “Next” or “Shuffle” to reveal a new one. These are
        here to nudge your mind toward hope, calm, and self-kindness.
      </div>
    </div>
  )
}
