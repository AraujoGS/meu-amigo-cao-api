import { PostgresHelper, UpdateCustomerPostgresRepository } from '@/infra/db'
import { mockChangeCustomerParams, throwError } from '@/tests/domain/mocks'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount } from '@/tests/infra/mocks'

const makeSut = (): UpdateCustomerPostgresRepository => new UpdateCustomerPostgresRepository()

const getAccount = async (id: string): Promise<any> => {
  const response = await PostgresHelper.execute('SELECT id_cliente as id, email_cliente as email FROM CLIENTES WHERE id_cliente = $1', [id])
  return PostgresHelper.mapperOneResult(response)
}

describe('UpdatePasswordPostgres Repository', () => {
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

  it('should UpdateCustomerPostgresRepository update customer with success', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const accountBeforeUpdate = await getAccount(params.id)
    expect(accountBeforeUpdate).toBeTruthy()
    expect(accountBeforeUpdate.email).toBe(params.email)
    const { password, ...data } = params
    await sut.update({
      ...data,
      email: 'guilhermearaujo421Alterado@gmail.com'
    })
    const accountAfterUpdate = await getAccount(params.id)
    expect(accountAfterUpdate).toBeTruthy()
    expect(accountAfterUpdate.email).toBe('guilhermearaujo421Alterado@gmail.com')
  })
  it('should UpdateCustomerPostgresRepository throw error if Postgres throws', async () => {
    const sut = makeSut()
    jest.spyOn(PostgresHelper, 'execute').mockImplementationOnce(throwError)
    const promise = sut.update(mockChangeCustomerParams())
    await expect(promise).rejects.toThrow()
  })
})
