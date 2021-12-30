import { UpdateAccessTokenPostgresRepository, PostgresHelper } from '@/infra/db'
import { throwError } from '@/tests/domain/mocks'
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
  it('should UpdateAccessTokenPostgresRepository update access token with success', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const response = await getAccessToken(params.id)
    expect(response.token_acesso).toBeFalsy()
    const accessToken = faker.datatype.uuid()
    await sut.updateAccessToken({ id: params.id, accessToken })
    const account = await getAccessToken(params.id)
    expect(account.token_acesso).toBeTruthy()
    expect(account.token_acesso).toBe(accessToken)
  })
  it('should UpdateAccessTokenPostgresRepository throw error if Postgres throws', async () => {
    const sut = makeSut()
    jest.spyOn(PostgresHelper, 'execute').mockImplementationOnce(throwError)
    const promise = sut.updateAccessToken({ id: faker.datatype.uuid(), accessToken: faker.random.alphaNumeric() })
    await expect(promise).rejects.toThrow()
  })
})
