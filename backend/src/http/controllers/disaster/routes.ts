import type { FastifyInstance } from "fastify"
import { verifyJwt } from "@/http/middlewares/verify-jwt"

import { nasaCategories } from "./nasa-categories"
import { nasaEvents } from "./nasa-events"
import { prevision } from "./prevision"

export function disasterRoutes(app: FastifyInstance) {
  // Rota para TESTAR EVENTOS DE DESASTRE (Cache + API Key)
  // Exemplo de chamada: GET nasa/events/-8.9192154/13.1855707 (Angola)
  app.get("/nasa/events/:latitude/:longitude", nasaEvents)
  // Rota para TESTAR CATEGORIAS
  app.get("/nasa/categories", nasaCategories)

  // ROTAS DE VALOR (PREVISÃO) - Precisa estar autenticado
  app.get(
    "/prevision/:latitude/:longitude",
    { onRequest: [verifyJwt] },
    prevision
  )
}
