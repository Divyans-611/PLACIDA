"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AffirmationDeck } from "@/components/mindful-games/affirmation-deck"
import { GuidedBreathing } from "@/components/mindful-games/guided-breathing"
import { PixelGarden } from "@/components/mindful-games/pixel-garden"

export default function MindfulGamesPage() {
  return (
    <main className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-balance">Mindful Games</h1>
          <p className="text-muted-foreground mt-1">Gentle, playful tools to help you relax and reset.</p>
        </div>
      </div>

      <Tabs defaultValue="affirmations" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="affirmations">Flip Cards</TabsTrigger>
          <TabsTrigger value="breathing">Breathing</TabsTrigger>
          <TabsTrigger value="garden">Pixel Garden</TabsTrigger>
        </TabsList>

        <TabsContent value="affirmations" className="mt-4">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Flip Cards – Affirmation Deck</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <AffirmationDeck />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breathing" className="mt-4">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Guided Breathing</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <GuidedBreathing />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="garden" className="mt-4">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Pixel Garden</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <PixelGarden />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
