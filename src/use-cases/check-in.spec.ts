import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Test gym',
      description: 'Test gym',
      latitude: new Decimal(-25.5000668),
      longitude: new Decimal(-49.2740054),
      phone: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    gymsRepository.items.pop()
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -25.5000668,
      userLongitude: -49.2740054,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 10, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -25.5000668,
      userLongitude: -49.2740054,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -25.5000668,
        userLongitude: -49.2740054,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 10, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -25.5000668,
      userLongitude: -49.2740054,
    })

    vi.setSystemTime(new Date(2023, 0, 2, 10, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -25.5000668,
      userLongitude: -49.2740054,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in far gyms', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Test gym',
      description: 'Test gym',
      latitude: new Decimal(-25.4608996),
      longitude: new Decimal(-49.2172284),
      phone: '',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -25.5000668,
        userLongitude: -49.2740054,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
