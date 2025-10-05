import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { api } from "@/lib/api"

const signUpSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("E-mail inválido."),
  location: z.string().optional(),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
})

type SignUpForm = z.infer<typeof signUpSchema>

export function SignUp() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<SignUpForm>()

  async function handleSignUp(data: SignUpForm) {
    const { location, ...authData } = data

    try {
      await signUp(authData)

      if (location) {
        await api.put("/users/location", { location })
      }

      toast.success("Cadastro e login realizados com sucesso!")
      navigate("/dashboard", { replace: true })
    } catch (error) {
      let errorMessage = "Erro ao cadastrar-se! Tente novamente."
      if (error instanceof Error) {
        errorMessage = error.message
      }

      if (errorMessage.includes("e-mail já está em uso")) {
        setError("email", { message: "Este e-mail já está em uso." })
      }

      toast.error(errorMessage)
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button asChild className="absolute top-8 right-8" variant="secondary">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-semibold text-2xl tracking-tight">
              Criar conta
            </h1>
            <p className="text-muted-foreground text-sm">
              Fique alerta e receba notificacoes de catastrofes naturais!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Seu nome completo"
                type="text"
                {...register("name")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                placeholder="Cidade, País (Ex: Luanda, Angola)"
                type="text"
                {...register("location")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="Seu e-mail"
                type="email"
                {...register("email")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                placeholder="Sua palavra chave"
                type="password"
                {...register("password")}
              />
            </div>

            <Button
              className="w-full cursor-pointer"
              disabled={isSubmitting}
              type="submit"
            >
              Cadastrar e Acessar
            </Button>
          </form>

          <Button asChild variant="link">
            <Link to="/">Voltar a pagina inicial</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
