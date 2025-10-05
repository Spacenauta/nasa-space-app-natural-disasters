import { env } from "@/env"
import { CacheService } from "@/lib/cache-service"
import { NasaDataUseCase } from "@/use-cases/nasa-data"

const cacheService = new CacheService()

export function makeNasaDataUseCase() {
  const nasaApiKey = env.NASA_API_KEY

  return new NasaDataUseCase(cacheService, nasaApiKey)
}
