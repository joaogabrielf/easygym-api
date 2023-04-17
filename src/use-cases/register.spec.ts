import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash users password upon registration ', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'password123',
    })

    const isPasswordHashedCorrectly = await compare(
      'password123',
      user.password_hash,
    )

    expect(isPasswordHashedCorrectly).toBe(true)
  })

  it('should not be able to register with an already existing email ', async () => {
    const email = 'johndoe@test.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: 'password123',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
