import { UpdateAccessTokenPostgresRepository, PostgresHelper } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount } from '@/tests/infra/mocks'
import faker from 'faker'

const makeSut = (): UpdateAccessTokenPostgresRepository => {
  return new UpdateAccessTokenPostgresRepository()
}

const getAccessToken = async (id: string): Promise<any> => {
  const response = await PostgresHelper.execute('SELECT token_acesso FROM CLIENTES WHERE id_cliente = $1', [id])
  return response?.rows[0]
}

describe('Update Access Token Postgres Repository', () => {
  beforeAll(async () => {
    await PostgresHelper.connect(createDbTest())
    await PostgresHelper.execute(sqlCreateDb)
  })

  beforeEach(async () => {
    await PostgresHelper.execute(sqlClearDb)
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
  })
  test('should UpdateAccessTokenPostgresRepository update access token with success', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const response = await getAccessToken(params.id)
    expect(response.token_acesso).toBeFalsy()
    const accessToken = faker.datatype.uuid()
    await sut.updateAccessToken({ id: params.id, accessToken: accessToken })
    const account = await getAccessToken(params.id)
    expect(account.token_acesso).toBeTruthy()
    expect(account.token_acesso).toBe(accessToken)
  })
})
