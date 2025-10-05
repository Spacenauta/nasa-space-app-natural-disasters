import { PrevisionUseCase } from "../prevision"
import { makeGeminiAIUseCase } from "./make-ai-use-case"
import { makeNasaDataUseCase } from "./make-data-nasa-use-case"

export function makePrevisionUseCase() {
  // Cria a dependência de Dados (que já carrega Cache e Chave NASA)
  const nasaDataUseCase = makeNasaDataUseCase()

  // Cria a dependência de AI (que já carrega a Chave GEMINI)
  const geminiAiUseCase = makeGeminiAIUseCase()

  // Cria o Orquestrador, injetando as duas dependências
  return new PrevisionUseCase(nasaDataUseCase, geminiAiUseCase)
}
