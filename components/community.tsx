"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Reply = { id: string; content: string; createdAt: string }
type Post = { id: string; content: string; createdAt: string; replies: Reply[] }

const KEY = "placida-community-posts"

export function Community() {
  const [posts, setPosts] = useState<Post[]>([])
  const [text, setText] = useState("")

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (raw) setPosts(JSON.parse(raw))
  }, [])
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(posts))
  }, [posts])

  function addPost() {
    if (!text.trim()) return
    setPosts((p) => [
      { id: crypto.randomUUID(), content: text.trim(), createdAt: new Date().toISOString(), replies: [] },
      ...p,
    ])
    setText("")
  }

  function addReply(id: string, content: string) {
    setPosts((p) =>
      p.map((post) =>
        post.id === id
          ? {
              ...post,
              replies: [...post.replies, { id: crypto.randomUUID(), content, createdAt: new Date().toISOString() }],
            }
          : post,
      ),
    )
  }

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl">
        <CardContent className="p-5 space-y-3">
          <Textarea
            placeholder="Share your thoughts anonymously..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex justify-end">
            <Button className="rounded-full" onClick={addPost}>
              Post
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} onReply={addReply} />
        ))}
        {posts.length === 0 && <p className="text-sm text-muted-foreground">No posts yet. Be the first to share.</p>}
      </div>
    </div>
  )
}

function PostItem({ post, onReply }: { post: Post; onReply: (id: string, content: string) => void }) {
  const [reply, setReply] = useState("")
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-5 space-y-3">
        <p>{post.content}</p>
        <p className="text-xs text-muted-foreground">Posted {new Date(post.createdAt).toLocaleString()}</p>
        <div className="space-y-2">
          {post.replies.map((r) => (
            <div key={r.id} className="rounded-lg bg-secondary px-3 py-2">
              <p className="text-sm">{r.content}</p>
              <p className="text-[10px] text-muted-foreground">{new Date(r.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write a reply..." />
          <Button
            variant="secondary"
            onClick={() => {
              if (!reply.trim()) return
              onReply(post.id, reply.trim())
              setReply("")
            }}
          >
            Reply
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
