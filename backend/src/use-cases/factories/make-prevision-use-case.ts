import { SerpApiGeocodingService } from "@/services/serp-api-geocoding-services"

import { SmtpNotificationService } from "../../services/smpt-notification-service"
import { PrevisionUseCase } from "../prevision"
import { makeGeminiAIUseCase } from "./make-ai-use-case"
import { makeNasaDataUseCase } from "./make-data-nasa-use-case"

export function makePrevisionUseCase() {
  const nasaDataUseCase = makeNasaDataUseCase()
  const geminiAiUseCase = makeGeminiAIUseCase()

  const notificationService = new SmtpNotificationService()

  const geocodingService = new SerpApiGeocodingService()

  return new PrevisionUseCase(
    nasaDataUseCase,
    geminiAiUseCase,
    notificationService,
    geocodingService
  )
}
