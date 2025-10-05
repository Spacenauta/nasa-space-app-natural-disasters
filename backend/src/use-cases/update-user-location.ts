import type { UsersRepository } from "@/repositories/users-repository"

type UpdateUserLocationRequest = {
  userId: string
  locationName: string
}

export class UpdateUserLocationUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    locationName,
  }: UpdateUserLocationRequest): Promise<void> {
    if (!locationName || locationName.trim().length < 3) {
      throw new Error("Localização inválida.")
    }

    await this.usersRepository.updateLocation(userId, locationName.trim())

    console.log(
      `Localização atualizada para o usuário ${userId}: ${locationName}`
    )
  }
}
