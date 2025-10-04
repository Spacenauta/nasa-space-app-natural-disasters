import type { FastifyReply, FastifyRequest } from "fastify"

export function verifyUserRole(roleToVerify: "ADMIN" | "USER") {
  // biome-ignore lint/suspicious/useAwait: <explanation>
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: "Unauthorized." })
    }
  }
}
