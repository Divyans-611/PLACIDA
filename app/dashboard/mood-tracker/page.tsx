import { MoodTracker } from "@/components/mood-tracker"

export default function MoodTrackerPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold">Daily Mood Tracker</h1>
      <p className="text-muted-foreground">Record how you feel and watch your progress.</p>
      <MoodTracker />
    </main>
  )
}
