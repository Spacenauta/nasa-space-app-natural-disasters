import type { User } from "@prisma/client"
import { compare } from "bcryptjs"
import type { UsersRepository } from "@/repositories/users-repository"

import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

// biome-ignore lint/nursery/useConsistentTypeDefinitions: <explanation>
interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

// biome-ignore lint/nursery/useConsistentTypeDefinitions: <explanation>
interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  // biome-ignore lint/style/noParameterProperties: <explanation>
  // biome-ignore lint/style/useReadonlyClassProperties: <explanation>
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
