import type { Prisma, User } from "@prisma/client"

type UserAlertData = {
  email: string
  location: string
}

export type UsersRepository = {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findAllUsersWithLocation(): Promise<UserAlertData[]>
  create(data: Prisma.UserCreateInput): Promise<User>
  updateLocation(userId: string, locationName: string): Promise<void>
}
