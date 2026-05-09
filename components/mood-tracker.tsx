"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts"

type Entry = { date: string; mood: number }

const KEY = "placida-mood-entries"

function useEntries() {
  const [entries, setEntries] = useState<Entry[]>([])
  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (raw) setEntries(JSON.parse(raw))
  }, [])
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(entries))
  }, [entries])
  return { entries, setEntries }
}

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10)
}

export function MoodTracker() {
  const today = useMemo(() => new Date(), [])
  const [mood, setMood] = useState<number>(5)
  const { entries, setEntries } = useEntries()

  function saveToday() {
    const date = formatDate(today)
    setEntries((prev) => {
      const rest = prev.filter((e) => e.date !== date)
      return [...rest, { date, mood }].sort((a, b) => a.date.localeCompare(b.date))
    })
  }

  const chartData = useMemo(() => {
    const all = [...entries]
    all.sort((a, b) => a.date.localeCompare(b.date))
    return all.slice(-14)
  }, [entries])

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="rounded-2xl">
        <CardContent className="p-5 space-y-4">
          <div>
            <h3 className="font-semibold">Today’s Mood</h3>
            <p className="text-sm text-muted-foreground">Slide to record how you feel (1 = low, 10 = great).</p>
          </div>
          <div className="pt-2">
            <Slider min={1} max={10} step={1} defaultValue={[mood]} onValueChange={(v) => setMood(v[0] ?? 5)} />
            <div className="mt-2 text-sm">Current: {mood}/10</div>
          </div>
          <Button onClick={saveToday} className="rounded-full">
            Save today
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardContent className="p-5">
          <h3 className="font-semibold">Recent Trend</h3>
          <div className="h-64 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis domain={[1, 10]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="hsl(var(--color-primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
