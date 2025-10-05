import { ChevronDown, LogOut, MapPin } from "lucide-react"
import { useNavigate } from "react-router"
import { useAuth } from "@/contexts/auth-context"

import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function AccountMenu() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/sign-in")
  }

  const handleNavigateToProfile = () => {
    navigate("/profile")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex select-none items-center gap-2"
          variant="outline"
        >
          {user?.name || "Meu Perfil"}
          <ChevronDown className="h-4 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>{user?.name || "Usuário"}</span>
          <span className="font-normal text-muted-foreground text-xs">
            {user?.email || "email@exemplo.com"}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleNavigateToProfile}>
          <MapPin className="mr-2 h-4 w-4" />
          <span>Configurar Localização</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-rose-500 dark:text-rose-400"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
