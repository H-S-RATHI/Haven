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
  user: User | null;
  isLoading: boolean;
  sendOtp: (phoneNumber: string) => Promise<{ success: boolean; message: string }>;
  login: (phone: string, otp: string) => Promise<{ success: boolean; message: string }>;
  signup: (userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  upgradeToCreator: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Handle logout event from anywhere in the app
  useEffect(() => {
    const handleLogoutEvent = () => {
      // Clear user data
      setUser(null)
      localStorage.removeItem("user")
      // Redirect to home page
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }

    // Add event listener for logout
    window.addEventListener('logout', handleLogoutEvent)

    // Check for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)

    // Cleanup
    return () => {
      window.removeEventListener('logout', handleLogoutEvent)
    }
  }, [])

  const sendOtp = async (phoneNumber: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      return { success: true, message: data.message };
    } catch (error) {
      console.error('Error sending OTP:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to send OTP' 
      };
    }
  };

  const login = async (phone: string, otp: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phone, otp }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Login failed');
      }

      // For now, we'll use mock user data since our backend returns a simple success message
      // In a real app, you would use the user data from the response
      const mockUser: User = {
        id: "1",
        fullName: "John Doe",
        username: phone.replace(/\D/g, ''), // Use phone as username for now
        phone,
        email: `${phone.replace(/\D/g, '')}@example.com`,
        location: "New York, NY",
        bio: "Just a regular user exploring the platform",
        accountType: "normal",
        verified: true,
        joinedDate: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      return { success: true, message: 'Login successful' };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  };

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
    // Dispatch logout event which will be handled by the event listener
    const event = new CustomEvent('logout');
    window.dispatchEvent(event);
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
        sendOtp,
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
