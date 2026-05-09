import { Chatbot } from "@/components/chatbot"

export default function ChatbotPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold">Chatbot</h1>
      <p className="text-muted-foreground">Compassionate support and gentle reflections.</p>
      <Chatbot />
    </main>
  )
}
