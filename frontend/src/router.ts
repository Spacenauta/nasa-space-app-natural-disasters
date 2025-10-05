import { createBrowserRouter } from "react-router"

import { ProtectedRoute } from "@/pages/app/dashboard/components/protected-route"

import { AuthLayout } from "./pages/_layouts/auth"
import { LayoutDashboard } from "./pages/_layouts/dashboard"
import { Dashboard } from "./pages/app/dashboard"
import { SignIn } from "./pages/auth/sign-in"
import { SignUp } from "./pages/auth/sign-up"
import { Home } from "./pages/home"

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: Home },

      {
        Component: AuthLayout,
        children: [
          { path: "sign-in", Component: SignIn },
          { path: "sign-up", Component: SignUp },
        ],
      },

      {
        Component: ProtectedRoute,
        children: [
          {
            Component: LayoutDashboard,
            children: [{ path: "dashboard", Component: Dashboard }],
          },
        ],
      },
    ],
  },
])
