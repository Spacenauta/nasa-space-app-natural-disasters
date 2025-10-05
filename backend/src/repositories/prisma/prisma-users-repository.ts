import type { Prisma, User } from "@prisma/client"
import { prisma } from "@/lib/prisma"

import type { UsersRepository } from "../users-repository"

export class PrismaUsersRepository implements UsersRepository {
  async updateLocation(userId: string, locationName: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { location: locationName },
    })
  }

  async findAllUsersWithLocation(): Promise<
    { email: string; location: string }[]
  > {
    const users = await prisma.user.findMany({
      where: {
        // Busca apenas usuários onde a coluna 'location' não é nula
        location: {
          not: null,
        },
      },
      // Seleciona apenas as colunas que o Job precisa para otimizar o DB
      select: {
        email: true,
        location: true,
      },
    })

    return users
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
