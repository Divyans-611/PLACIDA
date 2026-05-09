"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"

type Plant = {
  id: string
  index: number // grid index
  stage: number // 0..3
  createdAt: number
}

const STORAGE_KEY = "placida_pixel_garden_v1"
const COLS_MD = 16
const COLS_SM = 12
const ROWS = 12 // fixed rows for simplicity
const MAX_STAGE = 3

export function PixelGarden() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [isMd, setIsMd] = useState(false)

  // responsive columns
  useEffect(() => {
    const handle = () => setIsMd(window.matchMedia("(min-width: 768px)").matches)
    handle()
    window.addEventListener("resize", handle)
    return () => window.removeEventListener("resize", handle)
  }, [])

  const cols = isMd ? COLS_MD : COLS_SM
  const totalCells = cols * ROWS

  // load/save
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Plant[]
        setPlants(parsed)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plants))
    } catch {}
  }, [plants])

  // growth loop
  useEffect(() => {
    const id = window.setInterval(() => {
      setPlants((prev) => prev.map((p) => (p.stage < MAX_STAGE ? { ...p, stage: p.stage + 1 } : p)))
    }, 5000) // grow every 5s
    return () => window.clearInterval(id)
  }, [])

  const plantMap = useMemo(() => {
    const m = new Map<number, Plant>()
    for (const p of plants) m.set(p.index, p)
    return m
  }, [plants])

  const onCellClick = (idx: number) => {
    if (plantMap.has(idx)) return
    setPlants((prev) => [...prev, { id: crypto.randomUUID(), index: idx, stage: 0, createdAt: Date.now() }])
  }

  const reset = () => setPlants([])

  return (
    <div className="space-y-4">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
        role="grid"
        aria-label="Pixel Garden"
      >
        {Array.from({ length: totalCells }).map((_, i) => {
          const planted = plantMap.get(i)
          return (
            <button
              key={i}
              role="gridcell"
              aria-label={planted ? `Plant stage ${planted.stage}` : "Empty plot"}
              onClick={() => onCellClick(i)}
              className="bg-secondary/60 hover:bg-secondary rounded-[4px] aspect-square relative border transition-colors"
            >
              {planted && <Flower stage={planted.stage} />}
            </button>
          )
        })}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" onClick={reset} className="rounded-full">
          Reset Garden
        </Button>
        <span className="text-sm text-muted-foreground">
          Tap an empty plot to plant a flower. They’ll grow gradually and remain here next time.
        </span>
      </div>
    </div>
  )
}

function Flower({ stage }: { stage: number }) {
  // Render a tiny pixel-style flower using token colors.
  // Stages: 0 bud, 1 sprout, 2 bloom, 3 full bloom
  const petal = "bg-accent"
  const center = "bg-primary"
  const stem = "bg-chart-3" // uses a token mapped greenish tone

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative size-4 md:size-5">
        {/* stem */}
        <div className={`absolute left-1/2 -translate-x-1/2 bottom-0 ${stem} w-0.5 h-3 rounded-sm`} />
        {/* bud/flower */}
        {stage >= 0 && <div className={`absolute left-1/2 -translate-x-1/2 bottom-2 ${center} size-1.5 rounded-sm`} />}
        {stage >= 1 && (
          <>
            <div className={`absolute left-1/2 -translate-x-1/2 bottom-3 ${petal} size-1 rounded-sm`} />
            <div className={`absolute left-[calc(50%-4px)] bottom-2.5 ${petal} size-1 rounded-sm`} />
            <div className={`absolute left-[calc(50%+4px)] bottom-2.5 ${petal} size-1 rounded-sm`} />
          </>
        )}
        {stage >= 2 && (
          <>
            <div className={`absolute left-[calc(50%-4px)] bottom-3.5 ${petal} size-1 rounded-sm`} />
            <div className={`absolute left-[calc(50%+4px)] bottom-3.5 ${petal} size-1 rounded-sm`} />
          </>
        )}
        {stage >= 3 && (
          <>
            <div className={`absolute left-1/2 -translate-x-1/2 bottom-4 ${petal} size-1 rounded-sm`} />
          </>
        )}
      </div>
    </div>
  )
}
