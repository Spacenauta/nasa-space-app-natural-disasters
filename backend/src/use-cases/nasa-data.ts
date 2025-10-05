// Integração externa
// Como sua aplicação interage com o mundo externo.
// Ele não apenas busca os dados, mas também garante que sua aplicação seja rápida e robusta por meio do Cache.

import { env } from "@/env"
import type { CacheService } from "@/lib/cache-service"

type NasaEventSource = {
  id: string
  url: string
}

export type NasaDisasterEvent = {
  id: string
  title: string
  description: string

  sources: NasaEventSource[]
  categories: Array<{ id: number; title: string }>

  geometries: Array<{
    date: string
    type: "Point" | "Polygon"
    // [longitude, latitude]
    coordinates: [number, number] | number[]
  }>
}

type NasaEventsApiResponse = {
  title: string
  description: string
  link: string
  events: NasaDisasterEvent[]
}

export type NasaCategory = {
  id: number
  title: string
  link: string
  description: string
  layers: string
}

type NasaCategoriesApiResponse = {
  title: string
  description: string
  link: string
  categories: NasaCategory[]
}

type NasaDataUseCaseRequest = {
  latitude: number
  longitude: number
}

export class NasaDataUseCase {
  constructor(
    private cacheService: CacheService,
    private nasaApiKey: string
  ) {}

  async execute({
    latitude,
    longitude,
  }: NasaDataUseCaseRequest): Promise<NasaDisasterEvent[]> {
    const cacheKey = `nasa:eonet:events:${latitude.toFixed(2)},${longitude.toFixed(2)}`

    const cachedData = this.cacheService.get(cacheKey) as
      | NasaEventsApiResponse
      | undefined

    if (cachedData) {
      return cachedData.events
    }

    const apiPath = "?status=open&limit=20&category=wildfires,floods"
    const apiUrl = `${env.BASE_URL_EONET_EVENTS}${apiPath}&api_key=${this.nasaApiKey}`

    try {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.log("Cache Miss - Events. Fazendo nova requisição à API EONET...")

      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(
          `Falha no serviço NASA Events (${response.status}): ${response.statusText}`
        )
      }

      const data = (await response.json()) as NasaEventsApiResponse

      this.cacheService.set(cacheKey, data)

      return data.events
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error("Erro CRÍTICO ao buscar dados de EVENTOS da NASA:", error)
      return []
    }
  }

  async fetchCategories(): Promise<NasaCategory[]> {
    const cacheKey = "nasa:eonet:categories:all"

    const cachedData = this.cacheService.get(cacheKey) as
      | NasaCategoriesApiResponse
      | undefined

    if (cachedData) {
      return cachedData.categories
    }

    const apiUrl = `${env.BASE_URL_EONET_CATEGORIES}?api_key=${this.nasaApiKey}`

    try {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.log(
        "Cache Miss - Categories. Fazendo nova requisição à API EONET Categories..."
      )

      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(
          `Falha no serviço NASA Categories (${response.status}): ${response.statusText}`
        )
      }

      const data = (await response.json()) as NasaCategoriesApiResponse

      this.cacheService.set(cacheKey, data)

      return data.categories
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error("Erro ao buscar CATEGORIAS da NASA:", error)
      return []
    }
  }
}
