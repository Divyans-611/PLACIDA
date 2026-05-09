import { Community } from "@/components/community"

export default function CommunityPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold">Anonymous Community</h1>
      <p className="text-muted-foreground">A safe space to share, listen, and support one another.</p>
      <Community />
    </main>
  )
}
