import * as cron from "node-cron"
import { checkAllUsersForDisasterRisk } from "@/jobs/check-risk"

// Define a frequência de execução para duas vezes por dia (meia-noite e meio-dia)
const CRON_SCHEDULE = "0 0,12 * * *"

export function startScheduler() {
  console.log(
    "Iniciando o sistema de alerta agendado. Frequência: 12 horas (00:00h e 12:00h)."
  )

  cron.schedule(CRON_SCHEDULE, async () => {
    console.log(
      `Executando Verificação de Risco (Ciclo: ${new Date().toLocaleTimeString()})...`
    )

    // Chama o motor de orquestração
    await checkAllUsersForDisasterRisk()

    console.log("Verificação de Risco concluído.")
  })

  // Opcional: Para testar o Job imediatamente após iniciar o servidor
  // console.log("[Scheduler] Execução de Teste Imediata...")
  // checkAllUsersForDisasterRisk()
}
