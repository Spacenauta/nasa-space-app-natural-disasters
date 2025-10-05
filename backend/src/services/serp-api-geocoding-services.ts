import axios from "axios"
import { env } from "@/env"
import type { Coordinates, GeocodingService } from "@/utils/geocoding-service"

const SERPAPI_URL = "https://serpapi.com/search"

// Essa base de código vai converter as localizações por extenso "Angola" em coordenadas

export class SerpApiGeocodingService implements GeocodingService {
  async getCoordinates(locationName: string): Promise<Coordinates> {
    console.log(
      `[SerpApiGeocodingService] Buscando coordenadas para: "${locationName}"...`
    )

    try {
      const response = await axios.get(SERPAPI_URL, {
        params: {
          api_key: env.SERPAPI_API_KEY,
          engine: "google_maps",
          q: locationName,
          type: "search",
        },
      })

      const data = response.data

      if (data.error) {
        throw new Error(`SerpApi Erro: ${data.error}`)
      }

      const result = data.place_results || data.local_results?.[0]

      if (!(result && result.gps_coordinates)) {
        console.error(
          `[SerpApiGeocodingService] Não encontrou coordenadas para: ${locationName}`
        )

        throw new Error(`Não foi possível geocodificar "${locationName}".`)
      }

      const { latitude, longitude } = result.gps_coordinates

      return { latitude, longitude }
    } catch (error) {
      console.error(
        "[SerpApiGeocodingService] Falha na requisição com SerpApi:",
        error
      )
      throw new Error("Falha na comunicação com o SerpApi.")
    }
  }
}
