import { makePrevisionUseCase } from "@/use-cases/factories/make-prevision-use-case"
import { makeUsersRepository } from "@/use-cases/factories/make-users-repository"

/**
 * função central de orquestração do seu sistema de alerta.
 * Sua responsabilidade é garantir que a verificação de risco seja realizada para todos os usuários que salvaram uma localização.
 */

export async function checkAllUsersForDisasterRisk() {
  console.log(
    "[Job Agendado] Iniciando verificação de risco para todos os usuários..."
  )

  const usersRepository = makeUsersRepository()
  const previsionUseCase = makePrevisionUseCase()

  const users = await usersRepository.findAllUsersWithLocation()

  if (users.length === 0) {
    console.log("[Agendado] Nenhuma localização de usuário para verificar.")
    return
  }

  for (const user of users) {
    try {
      const locationName = user.location

      if (!locationName || locationName.length < 3) {
        console.warn(
          `[Agendado] Nome de localização inválido ou vazio para ${user.email}. Pulando.`
        )
        continue
      }

      await previsionUseCase.execute({
        locationName,
        recipientEmail: user.email,
      })

      console.log(
        `[Agendado] Verificação de risco para ${user.email} enviada para análise.`
      )
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)

      console.error(
        `[Agendado] Falha ao verificar risco para ${user.email}. Erro:`,
        errorMessage
      )
    }
  }

  console.log(
    `[Agendado] Verificação de risco concluída para ${users.length} usuários.`
  )
}
