import { Globe } from "lucide-react"
import { Link } from "react-router"

import { useAuth } from "@/contexts/auth-context"
import { AccountMenu } from "./account-menu"
import { ToggleThem } from "./theme/toggle-theme"
import { Button } from "./ui/button"

export function Header() {
  const { isLoggedIn, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="mb-10 border-b px-6">
        <div className="flex h-16 items-center gap-6 px-6">
          <Globe className="h-6 w-6" />
          <h1 className="text-2xl">Natural Disaster</h1>
          <div className="ml-auto">Carregando...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-10 border-b px-6">
      <div className="flex h-16 items-center gap-6 px-6">
        <Globe className="h-6 w-6" />
        <h1 className="text-2xl">Natural Disaster</h1>

        <div className="ml-auto flex items-center gap-2">
          {isLoggedIn ? (
            <AccountMenu />
          ) : (
            <div className="flex gap-2">
              <Button asChild className="cursor-pointer" variant="outline">
                <Link to="/sign-in">Sign-in</Link>
              </Button>
              <Button asChild className="cursor-pointer" variant="secondary">
                <Link to="/sign-up">Sign-up</Link>
              </Button>
            </div>
          )}

          <ToggleThem />
        </div>
      </div>
    </div>
  )
}
