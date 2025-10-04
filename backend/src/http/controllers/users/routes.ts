import type { FastifyInstance } from "fastify"
import { verifyJwt } from "@/http/middlewares/verify-jwt"

import { authenticate } from "./authenticate"
import { profile } from "./profile"
import { register } from "./register"

export function usersRoutes(app: FastifyInstance) {
  app.post("/sign-up", register)
  app.post("/sign-in", authenticate)

  /** Authenticated */
  app.get("/me", { onRequest: [verifyJwt] }, profile)
}
