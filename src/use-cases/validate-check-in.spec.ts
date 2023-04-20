import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFound } from './errors/resource-not-found-error'
import { LateCheckInValidateError } from './errors/late-check-in-validate-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const checkIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await sut.execute({
      checkInId: checkIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate a non existent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('should not be able to validate a check-in 20 minutes after its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 2, 12, 0))

    const checkIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: checkIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidateError)
  })
})
