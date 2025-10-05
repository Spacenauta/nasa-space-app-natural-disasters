import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type SignInForm = z.infer<typeof signInSchema>

export function SignIn() {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    try {
      await signIn(data)

      toast.success("Login realizado com sucesso! Seja bem-vindo!")
      navigate("/dashboard", { replace: true })
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao autenticar-se! Tente novamente."
      toast.error(errorMessage)
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button asChild className="absolute top-8 right-8" variant="secondary">
          <Link to="/sign-up">Cadastrar-se</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-semibold text-2xl tracking-tight">
              Acessar painel
            </h1>
            <p className="text-muted-foreground text-sm">
              Fique alerta e receba notificacoes de catastrofes naturais!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">e-mail</Label>
              <Input
                id="email"
                placeholder="Seu e-mail"
                type="email"
                {...register("email")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
              Acessar painel
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
