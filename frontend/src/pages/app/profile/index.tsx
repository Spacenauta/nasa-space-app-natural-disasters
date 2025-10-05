import { MapPin, User } from "lucide-react"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { api } from "@/lib/api"

const locationSchema = z.object({
  location: z
    .string()
    .min(3, "A localização deve ter pelo menos 3 caracteres."),
})

type LocationForm = z.infer<typeof locationSchema>

export function Profile() {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LocationForm>({
    values: {
      location: user?.location || "",
    },
  })

  async function handleUpdateLocation(data: LocationForm) {
    if (data.location === user?.location) {
      toast.info("A localização não foi alterada.")
      return
    }

    try {
      await api.put("/users/location", {
        location: data.location,
      })

      if (updateUser) {
        updateUser({ location: data.location })
      }

      toast.success("Localização de alerta atualizada!")
    } catch (err) {
      toast.error("Erro ao atualizar a localização.")
    }
  }

  return (
    <>
      <Helmet title="Meu Perfil" />
      <div className="flex flex-col gap-6 p-8">
        <h1 className="font-bold text-3xl tracking-tight">
          Configurações de Perfil
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2 font-medium text-xl">
                <User className="h-5 w-5" />
                Minha Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>Nome:</strong> {user?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2 font-medium text-xl">
                <MapPin className="h-5 w-5" />
                Localização de Alerta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={handleSubmit(handleUpdateLocation)}
              >
                <div className="space-y-2">
                  <Label htmlFor="location">Sua Localização Atual</Label>
                  <Input
                    id="location"
                    placeholder="Ex: Luanda, Angola"
                    type="text"
                    {...register("location")}
                  />
                </div>

                <Button
                  className="w-full cursor-pointer"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Salvando..." : "Salvar Localização"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
