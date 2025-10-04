import "@fastify/jwt"

declare module "@fastify/jwt" {
  // biome-ignore lint/nursery/useConsistentTypeDefinitions: <explanation>
  export interface FastifyJWT {
    user: {
      sub: string
      role: "ADMIN" | "USER"
    }
  }
}
