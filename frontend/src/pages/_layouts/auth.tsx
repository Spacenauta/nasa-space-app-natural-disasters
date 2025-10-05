import { Outlet } from "react-router"
import { Globe } from "@/components/ui/globe"

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-foreground/5 border-r bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-foreground text-lg">
          <Globe className="relative" />
        </div>

        <footer className="-mt-20 text-sm">
          Natural Disaster - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
