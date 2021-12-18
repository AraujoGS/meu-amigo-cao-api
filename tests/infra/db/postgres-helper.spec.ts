import { PostgresClient, PostgresHelper } from '@/infra/db'
import { Pool } from 'pg'

const makeSut = (): Pool => {
  return PostgresClient('any_uri')
}
describe('Postgres Connect', () => {
  test('should PostgresConnect return Pool connection', async () => {
    const sut = makeSut()
    await PostgresHelper.connect(sut)
    expect(PostgresHelper.client).toBeTruthy()
  })
})
