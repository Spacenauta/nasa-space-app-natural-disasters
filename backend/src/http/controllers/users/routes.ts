import type { FastifyInstance } from "fastify"

import { register } from "./register"

export function usersRoutes(app: FastifyInstance) {
  app.post("/sign-up", register)
}
