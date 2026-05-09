import { Nav } from "@/components/nav"
import { AnimatedGradient } from "@/components/animated-gradient"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Smile, Users, Stethoscope } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Placida Chatbot", // Changed "Personalised Chatbot" to "Placida Chatbot" for branding
    desc: "Compassionate support and guided reflections tailored to you.",
    href: "/dashboard/chatbot",
  },
  {
    icon: Smile,
    title: "Daily Mood Tracker",
    desc: "Log your mood with ease and visualize progress over time.",
    href: "/dashboard/mood-tracker",
  },
  {
    icon: Users,
    title: "Anonymous Community Support",
    desc: "Share, listen, and connect in a safe, supportive space.",
    href: "/dashboard/community",
  },
  {
    icon: Stethoscope,
    title: "Therapist Gateway",
    desc: "Find verified professionals and book sessions confidently.",
    href: "/dashboard/therapists",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-dvh relative overflow-hidden">
      <Nav />
      <section className="relative">
        <AnimatedGradient />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28 font-mono">
          <h1 className="text-4xl text-balance leading-tight font-bold md:text-8xl text-left font-sans">
            Find Your Peace with <span className="text-primary">Placida</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-pretty text-muted-foreground font-medium font-sans">
            A gentle mental well-being platform that blends modern design with emotional support—mindfulness tools,
            community care, and access to therapists. <br /> <br /> NO SIGNUP/LOGIN. WE RESPECT YOU PRIVACY.
          </p>
          
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild className="rounded-full font-sans">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button asChild variant="secondary" className="rounded-full font-sans">
              <Link href="/dashboard/chatbot">Try the Chatbot</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-11">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">What you’ll find</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="transition-all hover:shadow-lg rounded-2xl">
              <CardContent className="p-5">
                <f.icon className="h-6 w-6 text-primary" aria-hidden />
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
                <div className="mt-4">
                  <Button asChild variant="link" className="px-0">
                    <Link href={f.href}>Explore</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Placida</p>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="#" className="hover:underline">
              About
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
            <Link href="#" className="hover:underline">
              Social
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}