import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { makePrevisionUseCase } from "@/use-cases/factories/make-prevision-use-case"

export async function prevision(request: FastifyRequest, reply: FastifyReply) {
  const previsionParamsSchema = z.object({
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
  })

  const { latitude, longitude } = previsionParamsSchema.parse(request.params)

  try {
    const previsionUseCase = makePrevisionUseCase()

    const result = await previsionUseCase.execute({
      latitude,
      longitude,
    })

    return reply.status(200).send({
      message: "Previsão de risco gerada com sucesso.",
      data: result,
    })
  } catch (err) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(err)
    return reply
      .status(500)
      .send({ message: "Erro interno ao gerar a previsão de risco." })
  }
}
