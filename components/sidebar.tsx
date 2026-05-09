"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain,
  Smile,
  Users,
  Stethoscope,
  Home,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/chatbot", label: "Chatbot", icon: Brain },
  { href: "/dashboard/mood-tracker", label: "Mood Tracker", icon: Smile },
  { href: "/dashboard/community", label: "Community", icon: Users },
  { href: "/dashboard/therapists", label: "Therapists", icon: Stethoscope },
  { href: "/dashboard/mindful-games", label: "Mindful Games", icon: Sparkles },
  { href: "/dashboard/marketplace", label: "Marketplace", icon: ShoppingBag },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full border-r bg-sidebar text-gray-500">
      {/* Logo / Brand */}
      <div className="p-4 text-xl font-semibold">
        <Link href="/" className="text-primary">
          Placida
        </Link>
      </div>

      {/* Navigation */}
      <nav className="px-2 pb-4">
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;

            // ✅ Fix: only mark /dashboard as active when it’s EXACTLY that path
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
