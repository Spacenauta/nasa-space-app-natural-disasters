import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { makeUpdateUserLocationUseCase } from "@/use-cases/factories/make-update-user-location-use-case"

export async function updateLocation(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateLocationBody = z.object({
    location: z.string().min(3),
  })

  const { location } = updateLocationBody.parse(request.body)
  const { sub: userId } = request.user

  try {
    const updateUserLocationUseCase = makeUpdateUserLocationUseCase()

    await updateUserLocationUseCase.execute({
      userId,
      locationName: location,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
