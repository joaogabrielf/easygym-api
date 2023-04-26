import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('POST /gyms/:gymId/check-ins', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const createdGym = await prisma.gym.create({
      data: {
        title: 'Test Gym',
        description: 'Description Test Gym',
        phone: '41984342211',
        latitude: -25.5000668,
        longitude: -49.2740054,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${createdGym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -25.5000668,
        longitude: -49.2740054,
      })

    expect(response.statusCode).toBe(201)
  })
})
