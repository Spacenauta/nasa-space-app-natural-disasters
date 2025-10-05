import type { FastifyReply, FastifyRequest } from "fastify"
import { makeNasaDataUseCase } from "@/use-cases/factories/make-data-nasa-use-case"

export async function nasaCategories(_: FastifyRequest, reply: FastifyReply) {
  try {
    const nasaDataUseCase = makeNasaDataUseCase()

    // Busca as categorias (com cache global)
    const categories = await nasaDataUseCase.fetchCategories()

    return reply.status(200).send({
      message: "Lista de categorias de desastres EONET.",
      count: categories.length,
      categories,
    })
  } catch (err) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Erro no Controller de Categorias NASA:", err)
    return reply.status(500).send({
      message: "Erro interno ao buscar categorias da NASA.",
    })
  }
}
