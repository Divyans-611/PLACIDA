"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

type Msg = { role: "user" | "assistant"; content: string }

const fetcher = (url: string, body: any) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((r) => r.json())

export function Chatbot() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi, I’m Placida. How are you feeling today?" },
  ])
  const [typing, setTyping] = useState(false)

  async function send() {
    if (!input.trim()) return
    const next: Msg = { role: "user", content: input.trim() }

    // keep local history visible immediately
    setMessages((m) => [...m, next])
    setInput("")
    setTyping(true)

    try {
      // Include the full conversation context (including the new user message)
      const history = [...messages, next]

      // Send the full conversation to the server route; server proxies to Grok
      const res = await fetcher("/api/chat", { messages: history })

      // try common response shapes, then fall back
      const replyText = res?.reply ?? "Hmm... I’m having trouble connecting right now. Please try again."

      if (replyText) {
        setMessages((m) => [...m, { role: "assistant", content: replyText }])
      } else {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: "Hmm... I’m having trouble connecting right now. Please try again.",
          },
        ])
      }
    } catch (err) {
      // friendly error handling message
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Hmm... I’m having trouble connecting right now. Please try again.",
        },
      ])
    } finally {
      setTyping(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl">
        <CardContent className="p-4 space-y-3">
          <div className="max-h-[50vh] overflow-y-auto space-y-3 pr-1">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={
                    m.role === "user"
                      ? "inline-block max-w-xl rounded-2xl bg-primary text-primary-foreground px-3 py-2"
                      : "inline-block max-w-xl rounded-2xl bg-secondary px-3 py-2"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {typing && (
              <div className="inline-flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-muted-foreground">
                <span className="sr-only">Thinking</span>
                <span className="inline-flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:120ms]" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:240ms]" />
                </span>
                <span className="text-sm">Thinking...</span>
              </div>
            )}
          </div>
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share what’s on your mind..."
              className="min-h-[72px]"
            />
            <Button onClick={send} className="rounded-full">
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">
        Placida does not provide medical advice. If you’re in crisis, please contact local emergency services.
      </p>
    </div>
  )
}

