import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch gyms nearby Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Test Gym Close',
      latitude: -25.4958868,
      longitude: -49.2686298,
      description: null,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Test Gym Far',
      latitude: -23.6814347,
      longitude: -46.9249394,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -25.5000668,
      userLongitude: -49.2740054,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Test Gym Close' })])
  })
})
