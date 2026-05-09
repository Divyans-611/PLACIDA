// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// export default function DashboardHome() {
//   return (
//     <main className="space-y-6">
//       <h1 className="text-2xl md:text-3xl font-semibold text-pink-400">
//         Welcome back
//       </h1>
//       <p className="text-muted-foreground">
//         Jump back into your well-being journey. Choose a section below.
//       </p>

//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {/* 🧠 Chatbot */}
//         <Card className="rounded-2xl bg-[#1E1E2A] border border-gray-800 hover:border-pink-500 transition-all">
//           <CardContent className="p-5">
//             <h3 className="font-semibold text-pink-300">Start a Reflection</h3>
//             <p className="text-sm text-gray-400 mt-1">
//               Talk to the AI companion for gentle guidance and emotional support.
//             </p>
//             <Button asChild className="mt-3 bg-pink-500 hover:bg-pink-600">
//               <Link href="/dashboard/chatbot">Open Chatbot</Link>
//             </Button>
//           </CardContent>
//         </Card>

//         {/* 😊 Mood Tracker */}
//         <Card className="rounded-2xl bg-[#1E1E2A] border border-gray-800 hover:border-pink-500 transition-all">
//           <CardContent className="p-5">
//             <h3 className="font-semibold text-pink-300">Log Today’s Mood</h3>
//             <p className="text-sm text-gray-400 mt-1">
//               Track your emotions and watch your progress over time.
//             </p>
//             <Button
//               asChild
//               className="mt-3 bg-pink-500 hover:bg-pink-600"
//               variant="secondary"
//             >
//               <Link href="/dashboard/mood-tracker">Open Mood Tracker</Link>
//             </Button>
//           </CardContent>
//         </Card>

//         {/* 🛍 Mindful Marketplace */}
//         <Card className="rounded-2xl bg-[#1E1E2A] border border-gray-800 hover:border-pink-500 transition-all">
//           <CardContent className="p-5">
//             <h3 className="font-semibold text-pink-300">Explore Mindful Toys</h3>
//             <p className="text-sm text-gray-400 mt-1">
//               Discover calming stress-relief and mindfulness products.
//             </p>
//             <Button asChild className="mt-3 bg-pink-500 hover:bg-pink-600">
//               <Link href="/dashboard/marketplace">Visit Marketplace</Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   );
// }


import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardHome() {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-pink-500 dark:text-pink-400">
        Welcome back
      </h1>
      <p className="text-muted-foreground">
        Jump back into your well-being journey. Choose a section below.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* 🧠 Chatbot */}
        <Card className="rounded-2xl border transition-all 
          bg-white border-gray-200 hover:border-pink-400 
          dark:bg-[#1E1E2A] dark:border-gray-800 dark:hover:border-pink-500 shadow-sm dark:shadow-none">
          <CardContent className="p-5">
            <h3 className="font-semibold text-pink-600 dark:text-pink-300">
              Start a Reflection
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Talk to the AI companion for gentle guidance and emotional support.
            </p>
            <Button
              asChild
              className="mt-3 bg-pink-500 hover:bg-pink-600 text-white"
            >
              <Link href="/dashboard/chatbot">Open Chatbot</Link>
            </Button>
          </CardContent>
        </Card>

        {/* 😊 Mood Tracker */}
        <Card className="rounded-2xl border transition-all 
          bg-white border-gray-200 hover:border-pink-400 
          dark:bg-[#1E1E2A] dark:border-gray-800 dark:hover:border-pink-500 shadow-sm dark:shadow-none">
          <CardContent className="p-5">
            <h3 className="font-semibold text-pink-600 dark:text-pink-300">
              Log Today’s Mood
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Track your emotions and watch your progress over time.
            </p>
            <Button
              asChild
              className="mt-3 bg-pink-500 hover:bg-pink-600 text-white"
            >
              <Link href="/dashboard/mood-tracker">Open Mood Tracker</Link>
            </Button>
          </CardContent>
        </Card>

        {/* 🛍 Mindful Marketplace */}
        <Card className="rounded-2xl border transition-all 
          bg-white border-gray-200 hover:border-pink-400 
          dark:bg-[#1E1E2A] dark:border-gray-800 dark:hover:border-pink-500 shadow-sm dark:shadow-none">
          <CardContent className="p-5">
            <h3 className="font-semibold text-pink-600 dark:text-pink-300">
              Explore Mindful Toys
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Discover calming stress-relief and mindfulness products.
            </p>
            <Button
              asChild
              className="mt-3 bg-pink-500 hover:bg-pink-600 text-white"
            >
              <Link href="/dashboard/marketplace">Visit Marketplace</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
