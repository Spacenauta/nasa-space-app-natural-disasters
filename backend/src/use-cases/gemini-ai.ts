import { GoogleGenAI, Type } from "@google/genai"
import type { NasaDisasterEvent } from "./nasa-data"

export type GeminiPrevisionResult = {
  risk: "BAIXO" | "MÉDIO" | "ALTO"
  disasterType: "INCÊNDIO" | "INUNDAÇÃO" | "GERAL" | "NENHUM"
  analysis: string
  safetyAdvice: string
}

type AIUseCaseRequest = {
  userLatitude: number
  userLongitude: number
  nasaEvents: NasaDisasterEvent[]
}

export class GeminiAIUseCase {
  private ai: GoogleGenAI

  constructor(geminiApiKey: string) {
    this.ai = new GoogleGenAI({ apiKey: geminiApiKey })
  }

  async execute({
    userLatitude,
    userLongitude,
    nasaEvents,
  }: AIUseCaseRequest): Promise<GeminiPrevisionResult> {
    const eventsWithGeometry = nasaEvents.filter(
      (e) =>
        e.geometries && e.geometries.length > 0 && e.geometries[0].coordinates
    )

    const cleanEvents = eventsWithGeometry.map((e) => ({
      id: e.id,
      title: e.title,
      categories: e.categories.map((c) => c.title),
      // [longitude, latitude]
      coordinates: e.geometries[0].coordinates,
    }))

    const prompt = `
      AGENTE DE PROTEÇÃO E ANÁLISE DE RISCO

      Você é um **Agente Especializado em Proteção contra Desastres Naturais**, com a missão crítica de interpretar dados da Agência Espacial (NASA) para determinar o risco e fornecer orientações de segurança.

      Seu papel é ser **claro, objetivo e empático**. Em situações de emergência (risco ALTO), priorize instruções imediatas de segurança.

      DADOS DE ENTRADA
        LOCALIZAÇÃO DO USUÁRIO: Latitude ${userLatitude}, Longitude ${userLongitude}.
        EVENTOS ATIVOS (NASA EONET): ${JSON.stringify(cleanEvents)}

      ANÁLISE E INSTRUÇÕES
        1. Análise de Risco: Calcule a distância de cada evento até o usuário. Se um evento estiver a menos de 50 km, ele é considerado de alto impacto.
        2. Classificação: Classifique o risco de forma rigorosa em BAIXO, MÉDIO ou ALTO.
        3. Geração de Conteúdo:
          - A 'analysis' deve ser uma explicação detalhada da ameaça mais próxima, incluindo a distância estimada.
          - A 'safetyAdvice' (Conselho de Segurança) deve ser uma instrução clara e imediata, com tom de Defesa Civil, baseada no tipo de desastre (ex: Rotas de fuga, Checklists).

      FORMATO DE SAÍDA (CRÍTICO)
        Retorne a análise **EXATAMENTE** no formato JSON fornecido no esquema. Não inclua nenhum texto introdutório ou explicativo fora da estrutura JSON.
    `

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              risk: { type: Type.STRING, enum: ["BAIXO", "MÉDIO", "ALTO"] },
              disasterType: {
                type: Type.STRING,
                enum: ["INCÊNDIO", "INUNDAÇÃO", "GERAL", "NENHUM"],
              },
              analysis: {
                type: Type.STRING,
                description:
                  "Análise detalhada sobre a ameaça mais próxima e sua distância.",
              },
              safetyAdvice: {
                type: Type.STRING,
                description: "Conselho de segurança direto e acionável.",
              },
            },
          },
        },
      })

      const jsonText = response.text.trim()
      return JSON.parse(jsonText) as GeminiPrevisionResult
    } catch (error) {
      console.error("Erro CRÍTICO na chamada à API Gemini:", error)

      return {
        risk: "BAIXO",
        disasterType: "NENHUM",
        analysis:
          "Falha crítica no sistema de IA. Retornando risco BAIXO por segurança. Verifique a chave da API Gemini.",
        safetyAdvice: "Mantenha-se informado através dos canais oficiais.",
      }
    }
  }
}
