"use client"

import { createContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  fullName: string
  username: string
  phone: string
  email?: string
  location: string
  bio?: string
  accountType: "normal" | "creator"
  verified: boolean
  joinedDate: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (phone: string, otp: string) => Promise<void>
  signup: (userData: Partial<User>) => Promise<void>
  logout: () => Promise<void>
  upgradeToCreator: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (phone: string, otp: string) => {
    // Mock login - in real app, this would call your API
    const mockUser: User = {
      id: "1",
      fullName: "John Doe",
      username: "johndoe",
      phone,
      email: "john@example.com",
      location: "New York, NY",
      bio: "Just a regular user exploring the platform",
      accountType: "normal",
      verified: false,
      joinedDate: new Date().toISOString(),
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const signup = async (userData: Partial<User>) => {
    // Mock signup
    const newUser: User = {
      id: Date.now().toString(),
      fullName: userData.fullName || "",
      username: userData.username || "",
      phone: userData.phone || "",
      email: userData.email,
      location: userData.location || "",
      bio: userData.bio,
      accountType: "normal",
      verified: false,
      joinedDate: new Date().toISOString(),
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const upgradeToCreator = async () => {
    if (user) {
      const updatedUser = { ...user, accountType: "creator" as const, verified: true }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        upgradeToCreator,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
