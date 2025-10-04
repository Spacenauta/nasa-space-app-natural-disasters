import type { FastifyInstance } from "fastify"
import { verifyJwt } from "@/http/middlewares/verify-jwt"

import { authenticate } from "./authenticate"
import { profile } from "./profile"
import { refresh } from "./refresh"
import { register } from "./register"

export function usersRoutes(app: FastifyInstance) {
  app.post("/sign-up", register)
  app.post("/sign-in", authenticate)

  app.patch("/token/refresh", refresh)

  /** Authenticated */
  app.get("/me", { onRequest: [verifyJwt] }, profile)
}
