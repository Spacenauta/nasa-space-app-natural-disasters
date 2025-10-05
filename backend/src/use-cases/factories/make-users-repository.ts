import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import type { UsersRepository } from "@/repositories/users-repository"

export function makeUsersRepository(): UsersRepository {
  return new PrismaUsersRepository()
}
