import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Test Gym 1',
      latitude: -25.5000668,
      longitude: -49.2740054,
      description: null,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Test Gym 2',
      latitude: -25.5000668,
      longitude: -49.2740054,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'Test Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Test Gym 1' }),
      expect.objectContaining({ title: 'Test Gym 2' }),
    ])
  })

  it('should be able to fetch paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Test Gym ${i}`,
        latitude: -25.5000668,
        longitude: -49.2740054,
        description: null,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Test Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Test Gym 21' }),
      expect.objectContaining({ title: 'Test Gym 22' }),
    ])
  })
})
