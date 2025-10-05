import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

import { makeNasaDataUseCase } from "@/use-cases/factories/make-data-nasa-use-case"

export async function nasaEvents(request: FastifyRequest, reply: FastifyReply) {
  const paramsBodySchema = z.object({
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const { latitude, longitude } = paramsBodySchema.parse(request.params)

  try {
    const nasaDataUseCase = makeNasaDataUseCase()

    const events = await nasaDataUseCase.execute({
      latitude,
      longitude,
    })

    // Retorna a lista de eventos brutos da NASA

    return reply.status(200).send({
      message: "Eventos ativos da NASA (EONET) encontrados.",
      count: events.length,
      events,
    })
  } catch (err) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Erro no Controller de Eventos NASA:", err)
    return reply.status(500).send({
      message:
        "Erro interno ao buscar dados da NASA. Verifique a chave da API e o log do servidor.",
    })
  }
}
