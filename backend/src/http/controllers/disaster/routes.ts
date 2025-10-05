import type { FastifyInstance } from "fastify"
import { nasaCategories } from "./nasa-categories"
import { nasaEvents } from "./nasa-events"

export function disasterRoutes(app: FastifyInstance) {
  // Rota para TESTAR EVENTOS DE DESASTRE (Cache + API Key)
  // Exemplo de chamada: GET nasa/events/-8.9192154/13.1855707 (Angola)
  app.get("/nasa/events/:latitude/:longitude", nasaEvents)
  // Rota para TESTAR CATEGORIAS
  app.get("/nasa/categories", nasaCategories)
}
