import type { User } from "@prisma/client"
import type { UsersRepository } from "@/repositories/users-repository"

import { ResourceNotFoundError } from "./errors/resource-not-found-error"

// biome-ignore lint/nursery/useConsistentTypeDefinitions: <explanation>
interface GetUserProfileUseCaseRequest {
  userId: string
}

// biome-ignore lint/nursery/useConsistentTypeDefinitions: <explanation>
interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  // biome-ignore lint/style/noParameterProperties: <explanation>
  // biome-ignore lint/style/useReadonlyClassProperties: <explanation>
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
