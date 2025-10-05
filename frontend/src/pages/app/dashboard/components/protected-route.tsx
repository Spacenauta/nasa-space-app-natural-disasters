import { Navigate, Outlet } from "react-router"
import { useAuth } from "@/contexts/auth-context"

export function ProtectedRoute() {
  const { isLoggedIn, isLoading } = useAuth()

  if (isLoading) {
    return <div>Carregando autenticação...</div>
  }

  if (isLoggedIn) {
    return <Outlet />
  }

  return <Navigate replace to="/sign-in" />
}
