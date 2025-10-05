import { PrevisionUseCase } from "../prevision"
import { makeGeminiAIUseCase } from "./make-ai-use-case"
import { makeNasaDataUseCase } from "./make-data-nasa-use-case"

export function makePrevisionUseCase() {
  const nasaDataUseCase = makeNasaDataUseCase()

  const geminiAiUseCase = makeGeminiAIUseCase()

  return new PrevisionUseCase(nasaDataUseCase, geminiAiUseCase)
}
