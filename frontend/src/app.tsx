import { Helmet, HelmetProvider } from "react-helmet-async"
import { RouterProvider } from "react-router"
import { Toaster } from "sonner"

import { ThemeProvider } from "./components/theme/theme-provider"
import { AuthProvider } from "./contexts/auth-context"
import { router } from "./router"

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="natural.disaster">
        <AuthProvider>
          <Helmet titleTemplate="%s | natural.disaster" />
          <Toaster richColors />
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
