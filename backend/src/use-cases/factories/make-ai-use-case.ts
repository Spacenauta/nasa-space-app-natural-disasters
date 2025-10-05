import { env } from "@/env"
import { GeminiAIUseCase } from "../gemini-ai"

export function makeGeminiAIUseCase() {
  const apiKey = env.GEMINI_API_KEY

  return new GeminiAIUseCase(apiKey)
}
