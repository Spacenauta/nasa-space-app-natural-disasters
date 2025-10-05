import { Outlet } from "react-router"

import { Header } from "@/components/header"

export function LayoutDashboard() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
