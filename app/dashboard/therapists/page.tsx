import { TherapistList } from "@/components/therapist-list"

export default function TherapistsPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold">Therapist Gateway</h1>
      <p className="text-muted-foreground">Browse verified therapists and request a session.</p>
      <TherapistList />
    </main>
  )
}
