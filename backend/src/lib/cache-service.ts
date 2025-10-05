// lógica de Cache em Memória com Expiração (TTL):

type CacheItem = {
  data: unknown
  expiry: number
}

const cache = new Map<string, CacheItem>()

const CACHE_TTL = 5 * 60 * 1000 // 1 dia e 12h

export class CacheService {
  /**
   * Tenta recuperar um item do cache. Se o item estiver expirado, ele é removido.
   * @param key A chave única para buscar o dado (ex: 'nasa:eonet:lat,lon').
   * @returns O dado armazenado (unknown) se for válido, ou undefined.
   */
  get(key: string): unknown | undefined {
    const item = cache.get(key)

    if (!item) {
      return
    }

    if (Date.now() > item.expiry) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.log(`[CACHE MISS] Item expirado e removido: ${key}`)
      cache.delete(key)
      return
    }

    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(`[CACHE HIT] Dados válidos encontrados: ${key}`)
    return item.data
  }

  /**
   * Armazena um dado no cache com o TTL (5 minutos) a partir do momento da chamada.
   * @param key A chave única para armazenar o dado.
   * @param data O dado a ser armazenado (o JSON de resposta da API NASA).
   */
  set(key: string, data: unknown): void {
    const expiry = Date.now() + CACHE_TTL
    cache.set(key, { data, expiry })
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(`[CACHE SET] Dados armazenados para a chave: ${key}`)
  }

  /**
   * Função de Admin: Remove todo o cache forçadamente (útil para testes ou Admin).
   */
  clearAll(): void {
    cache.clear()
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log("[CACHE CLEAR] Todo o cache de dados da NASA foi limpo.")
  }
}
