"use client"

import { Button } from "@/components/ui/button"
import { Home, MessageCircle, Newspaper, Globe, User, Crown, Plus } from "lucide-react"
import { useAuth } from "@/features/auth/useAuth"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const { user } = useAuth()
  const pathname = usePathname()
  const isCreator = user?.accountType === "creator"

  const navigation = [
    { name: "Home", href: "/world", icon: Home },
    { name: "Messages", href: "/messages", icon: MessageCircle },
    { name: "News", href: "/news", icon: Newspaper },
    { name: "World", href: "/world", icon: Globe, current: pathname === "/world" },
    { name: "Profile", href: "/profile", icon: User },
  ]

  return (
    <aside className="w-64 border-r bg-muted/30 min-h-screen p-4">
      <nav className="space-y-2">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant={item.current ? "default" : "ghost"}
              className={cn("w-full justify-start", item.current && "bg-primary text-primary-foreground")}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="mt-8 space-y-4">
        <Button className="w-full" size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Create Post
        </Button>

        {!isCreator && (
          <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">Upgrade to Creator</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Unlock analytics, boosts, shop links and more!</p>
            <Button size="sm" className="w-full">
              Learn More
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}
