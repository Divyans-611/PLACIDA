"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// phase durations (seconds)
const PHASES = [
  { key: "Inhale", seconds: 4, bubbleScale: 1.2, outerScale: 1.03 },
  { key: "Hold", seconds: 2, bubbleScale: 1.2, outerScale: 1.03 },
  { key: "Exhale", seconds: 4, bubbleScale: 0.85, outerScale: 0.97 },
] as const

type PhaseKey = (typeof PHASES)[number]["key"]

export function GuidedBreathing() {
  const [running, setRunning] = useState(false)
  const [sessionSeconds, setSessionSeconds] = useState(60) // 1m default
  const [elapsed, setElapsed] = useState(0)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [phaseTime, setPhaseTime] = useState(0)
  const [chimeEnabled, setChimeEnabled] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const total = sessionSeconds
  const currentPhase = PHASES[phaseIndex]
  const remaining = Math.max(total - elapsed, 0)

  // tick timer
  useEffect(() => {
    if (!running) return
    const tick = () => {
      setElapsed((e) => e + 1)
      setPhaseTime((t) => t + 1)
    }
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [running])

  // phase change
  useEffect(() => {
    if (!running) return
    if (phaseTime >= currentPhase.seconds) {
      setPhaseIndex((i) => (i + 1) % PHASES.length)
      setPhaseTime(0)
    }
  }, [phaseTime, running, currentPhase.seconds])

  // stop at end
  useEffect(() => {
    if (!running) return
    if (elapsed >= total) {
      setRunning(false)
    }
  }, [elapsed, total, running])

  // chime sound effect
  useEffect(() => {
    if (!running || !chimeEnabled) return
    if (phaseTime === 0) {
      audioRef.current?.play()
    }
  }, [phaseTime, running, chimeEnabled])

  useEffect(() => {
    if (!running || !chimeEnabled) return
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      const ctx = audioCtxRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      // calming tone
      osc.frequency.value = currentPhase.key === "Hold" ? 440 : 528
      gain.gain.setValueAtTime(0.0001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35)
      osc.connect(gain).connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.4)
    } catch {
      // ignore audio errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseIndex])

  const outerStyle = useMemo<React.CSSProperties>(() => {
    return {
      transform: `scale(${currentPhase.outerScale})`,
      transition: `transform ${currentPhase.seconds * 1000}ms ease-in-out`,
    } as React.CSSProperties
  }, [currentPhase.outerScale, currentPhase.seconds])

  const bubbleStyle = useMemo<React.CSSProperties>(() => {
    return {
      transform: `scale(${currentPhase.bubbleScale})`,
      transition: `transform ${currentPhase.seconds * 1000}ms ease-in-out`,
    } as React.CSSProperties
  }, [currentPhase.bubbleScale, currentPhase.seconds])

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px] items-center">
      <div className="flex items-center justify-center">
        <div
          className="relative size-64 md:size-80 rounded-full border bg-gradient-to-b from-primary/15 to-secondary/15 shadow-inner flex items-center justify-center"
          style={outerStyle}
          aria-live="polite"
          aria-label={`Breathing phase: ${currentPhase.key}`}
        >
          {/* soft glow */}
          <div className="absolute inset-0 rounded-full bg-primary/15 blur-2xl pointer-events-none" />

          {/* inner floating bubble */}
          <div
            className="size-36 md:size-44 rounded-full bg-primary/30 backdrop-blur-sm shadow-sm ring-1 ring-primary/30"
            style={bubbleStyle}
          />

          {/* prompts */}
          <div className="absolute -bottom-12 md:-bottom-14 left-1/2 -translate-x-1/2 w-full text-center">
            <div className="h-8 md:h-9 relative">
              <span
                className={`absolute inset-0 transition-opacity duration-500 ${
                  currentPhase.key === "Inhale" ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-base md:text-lg font-medium">Inhale…</span>
              </span>
              <span
                className={`absolute inset-0 transition-opacity duration-500 ${
                  currentPhase.key === "Hold" ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-base md:text-lg font-medium">Hold…</span>
              </span>
              <span
                className={`absolute inset-0 transition-opacity duration-500 ${
                  currentPhase.key === "Exhale" ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-base md:text-lg font-medium">Exhale…</span>
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Follow the bubble’s rhythm</div>
          </div>
        </div>
      </div>

      {/* controls panel */}
      <div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setRunning((r) => !r)} className="rounded-full">
            {running ? "Pause" : "Start"}
          </Button>
          <Button
            onClick={() => {
              setRunning(false)
              setElapsed(0)
              setPhaseIndex(0)
              setPhaseTime(0)
            }}
            variant="secondary"
            className="rounded-full"
          >
            Reset
          </Button>
        </div>

        <div className="mt-4">
          <div className="text-sm font-medium">Session length</div>
          <div className="mt-2 flex gap-2">
            <Button
              variant={sessionSeconds === 60 ? "default" : "secondary"}
              onClick={() => {
                setSessionSeconds(60)
                setRunning(false)
                setElapsed(0)
                setPhaseIndex(0)
                setPhaseTime(0)
              }}
              className="rounded-full"
            >
              1 minute
            </Button>
            <Button
              variant={sessionSeconds === 180 ? "default" : "secondary"}
              onClick={() => {
                setSessionSeconds(180)
                setRunning(false)
                setElapsed(0)
                setPhaseIndex(0)
                setPhaseTime(0)
              }}
              className="rounded-full"
            >
              3 minutes
            </Button>
          </div>
        </div>

        {/* chime toggle */}
        <div className="mt-4 flex items-center gap-2">
          <Switch id="chime" checked={chimeEnabled} onCheckedChange={setChimeEnabled} />
          <Label htmlFor="chime" className="text-sm">
            Play soft chime on phase change
          </Label>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Time remaining</span>
            <span className="tabular-nums">{Math.max(sessionSeconds - elapsed, 0)}s</span>
          </div>
          <Progress value={(elapsed / sessionSeconds) * 100} />
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Inhale for 4s, hold 2s, exhale 4s. Soft colors, subtle glow, and smooth motion help you unwind.
        </p>
      </div>
    </div>
  )
}
