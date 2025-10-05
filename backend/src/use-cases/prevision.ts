import type { GeminiAIUseCase, GeminiPrevisionResult } from "./gemini-ai"
import type { NasaDataUseCase } from "./nasa-data"

type PrevisionUseCaseRequest = {
  latitude: number
  longitude: number
}

// O PrevisionUseCase é o único ponto de entrada para a lógica de negócio
export class PrevisionUseCase {
  constructor(
    private nasaDataUseCase: NasaDataUseCase,
    private geminiAiUseCase: GeminiAIUseCase
  ) {}

  async execute({
    latitude,
    longitude,
  }: PrevisionUseCaseRequest): Promise<GeminiPrevisionResult> {
    // OBTENÇÃO DE DADOS (COM CACHE)
    // O NasaDataUseCase irá buscar os eventos e cuidar do cache automaticamente.
    const nasaEvents = await this.nasaDataUseCase.execute({
      latitude,
      longitude,
    })

    // ANÁLISE E GERAÇÃO DE RISCO (COM GEMINI AI)
    // O GeminiAIUseCase irá interpretar os dados e gerar o resultado em JSON.
    const prevision = await this.geminiAiUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
      nasaEvents,
    })

    return prevision
  }
}
