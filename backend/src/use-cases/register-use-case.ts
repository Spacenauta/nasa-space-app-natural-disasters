import type { User } from "@prisma/client"
import { hash } from "bcryptjs"

import type { UsersRepository } from "@/repositories/users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

// biome-ignore lint/nursery/useConsistentTypeDefinitions: <explanation>
interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  location: string
}

// biome-ignore lint/nursery/useConsistentTypeDefinitions: <explanation>
interface RegisterUseCaseResponse {
  user: Omit<User, "password_hash">
}

export class RegisterUseCase {
  // biome-ignore lint/style/noParameterProperties: <explanation>
  // biome-ignore lint/style/useReadonlyClassProperties: <explanation>
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    location,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 10)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      location,
    })

    return {
      user,
    }
  }
}
