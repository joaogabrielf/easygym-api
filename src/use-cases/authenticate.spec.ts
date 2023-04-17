import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password_hash: await hash('password123', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@test.com',
      password: 'password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email ', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@test.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password ', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password_hash: await hash('password123', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@test.com',
        password: 'password124',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
