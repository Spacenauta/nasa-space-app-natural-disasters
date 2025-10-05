import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UpdateUserLocationUseCase } from "../update-user-location"

export function makeUpdateUserLocationUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new UpdateUserLocationUseCase(usersRepository)
}
