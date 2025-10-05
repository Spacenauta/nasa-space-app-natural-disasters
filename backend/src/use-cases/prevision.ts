import type { GeminiAIUseCase, GeminiPrevisionResult } from "./gemini-ai"
import type { NasaDataUseCase } from "./nasa-data"

type PrevisionUseCaseRequest = {
  latitude: number
  longitude: number
}

export class PrevisionUseCase {
  constructor(
    private nasaDataUseCase: NasaDataUseCase,
    private geminiAiUseCase: GeminiAIUseCase
  ) {}

  async execute({
    latitude,
    longitude,
  }: PrevisionUseCaseRequest): Promise<GeminiPrevisionResult> {
    const nasaEvents = await this.nasaDataUseCase.execute({
      latitude,
      longitude,
    })

    const prevision = await this.geminiAiUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
      nasaEvents,
    })

    return prevision
  }
}
