import { isAxiosError } from "axios"
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { api } from "@/lib/api"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  isLoggedIn: boolean
  signIn: (credentials: SignInCredentials) => Promise<void>
  signUp: (credentials: SignUpCredentials) => Promise<void>
  logout: () => void
  isLoading: boolean
}

type SignInCredentials = {
  email: string
  password: string
}

type SignUpCredentials = SignInCredentials & {
  name: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const JWT_TOKEN_KEY = "jwt_token"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const setAuthToken = (token: string | null) => {
    if (token) {
      localStorage.setItem(JWT_TOKEN_KEY, token)
      api.defaults.headers.Authorization = `Bearer ${token}`
    } else {
      localStorage.removeItem(JWT_TOKEN_KEY)
      api.defaults.headers.Authorization = ""
      setUser(null)
    }
  }

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await api.get("/me")
      const profile = response.data.user

      setUser({
        id: profile.id,
        name: profile.name,
        email: profile.email,
      })
      setIsLoggedIn(true)
      return true
    } catch (error) {
      console.error("Token inválido ou expirado. Sessão limpa.", error)
      setAuthToken(null)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem(JWT_TOKEN_KEY)
    if (token) {
      setAuthToken(token)
      fetchUserProfile(token)
    } else {
      setIsLoading(false)
    }
  }, [])

  const signIn = async ({ email, password }: SignInCredentials) => {
    setIsLoading(true)
    try {
      const response = await api.post("/sign-in", { email, password })
      const { token } = response.data

      setAuthToken(token)
      await fetchUserProfile(token)
    } catch (error) {
      setIsLoading(false)
      if (isAxiosError(error) && error.response?.status === 401) {
        throw new Error("E-mail ou senha inválidos.")
      }
      throw new Error("Falha no login. Tente novamente.")
    }
  }

  const signUp = async ({ name, email, password }: SignUpCredentials) => {
    try {
      await api.post("/sign-up", { name, email, password })
      await signIn({ email, password })
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) {
        throw new Error("Este e-mail já está em uso.")
      }
      throw new Error("Erro ao cadastrar. Tente novamente.")
    }
  }

  const logout = () => {
    setAuthToken(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, signIn, signUp, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
