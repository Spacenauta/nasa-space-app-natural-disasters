import type { GeocodingService } from "@/utils/geocoding-service"

import type { NotificationServices } from "../utils/notification"
import type { GeminiAIUseCase, GeminiPrevisionResult } from "./gemini-ai"
import type { NasaDataUseCase } from "./nasa-data"

type PrevisionUseCaseRequest = {
  locationName: string
  recipientEmail?: string
}

export class PrevisionUseCase {
  constructor(
    private nasaDataUseCase: NasaDataUseCase,
    private geminiAiUseCase: GeminiAIUseCase,
    private notificationServices: NotificationServices,
    private geocodingService: GeocodingService
  ) {}

  async execute({
    locationName,
    recipientEmail = "usuario_alerta@app.com",
  }: PrevisionUseCaseRequest): Promise<GeminiPrevisionResult> {
    const { latitude, longitude } =
      await this.geocodingService.getCoordinates(locationName)

    console.log(
      `[PrevisionUseCase] Análise iniciando com Latitude: ${latitude}, Longitude: ${longitude} (Traduzido de: ${locationName})`
    )

    const nasaEvents = await this.nasaDataUseCase.execute({
      latitude,
      longitude,
    })

    const prevision = await this.geminiAiUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
      nasaEvents,
    })

    if (prevision.risk === "ALTO" || prevision.risk === "MÉDIO") {
      const subject = `⚠️ ALERTA DE RISCO - Nível ${prevision.risk} por ${prevision.disasterType}`
      const body = `
        Localização: ${locationName} (Lat ${latitude}, Lon ${longitude})
        Análise da IA: ${prevision.analysis}
        Instruções de Segurança: ${prevision.safetyAdvice}
      `

      await this.notificationServices.sendNotification(
        recipientEmail,
        subject,
        body
      )
    }

    return prevision
  }
}
