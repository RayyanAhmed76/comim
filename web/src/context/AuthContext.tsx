import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { demoUsers, type Role, type User } from '@/data/mock'

interface AuthState {
  user: User | null
  loginAs: (role: Role) => void
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const value = useMemo<AuthState>(
    () => ({
      user,
      loginAs: (role) => {
        const found = demoUsers.find((u) => u.role === role) ?? null
        setUser(found)
      },
      login: (email, _password) => {
        const found = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
        if (found) {
          setUser(found)
          return true
        }
        return false
      },
      logout: () => setUser(null),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
