"use client"

import { createContext, useContext, type ReactNode } from "react"
import { toast } from "@/hooks/use-toast"

interface NotificationContextType {
  showNotification: (message: string, type?: "success" | "error" | "info") => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const showNotification = (message: string, type: "success" | "error" | "info" = "info") => {
    toast({
      title: type === "error" ? "Error" : type === "success" ? "Success" : "Info",
      description: message,
      variant: type === "error" ? "destructive" : "default",
    })
  }

  return <NotificationContext.Provider value={{ showNotification }}>{children}</NotificationContext.Provider>
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
