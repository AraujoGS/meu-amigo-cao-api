import { UpdateAddressPostgresRepository, PostgresHelper } from '@/infra/db'
import { mockAddAddressParams, throwError } from '@/tests/domain/mocks'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount, mockAddress } from '@/tests/infra/mocks'
import faker from 'faker'

const makeSut = (): UpdateAddressPostgresRepository => new UpdateAddressPostgresRepository()

const mockGetAddress = async (id: string): Promise<any> => {
  const query = `
    SELECT 
      cep as zipcode, 
      logradouro as address, 
      cidade as city, 
      bairro as district,
      numero as number,
      uf as state,
      complemento as complement 
    FROM ENDERECOS
    WHERE id_cliente = $1
  `
  const params = [id]
  const result = await PostgresHelper.execute(query, params)
  return PostgresHelper.mapperOneResult(result)
}

describe('UpdateAddressPostgres Repository', () => {
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
  it('should UpdateAddressPostgresRepository update address with success', async () => {
    const sut = makeSut()
    const account = await mockAccount()
    const addressCustomer = await mockAddress(account.id)
    const addressBeforeUpdate = await mockGetAddress(account.id)
    expect(addressBeforeUpdate).toBeTruthy()
    expect(addressBeforeUpdate.address).toBe(addressCustomer.address)
    expect(addressBeforeUpdate.district).toBe(addressCustomer.district)
    expect(addressBeforeUpdate.city).toBe(addressCustomer.city)
    expect(addressBeforeUpdate.state).toBe(addressCustomer.state)
    expect(addressBeforeUpdate.number).toBe(addressCustomer.number)
    await sut.update({
      ...addressCustomer,
      number: -1
    })
    const addressAfterUpdate = await mockGetAddress(account.id)
    expect(addressBeforeUpdate).toBeTruthy()
    expect(addressAfterUpdate.address).toBe(addressCustomer.address)
    expect(addressAfterUpdate.district).toBe(addressCustomer.district)
    expect(addressAfterUpdate.city).toBe(addressCustomer.city)
    expect(addressAfterUpdate.state).toBe(addressCustomer.state)
    expect(addressAfterUpdate.number).not.toBe(addressCustomer.number)
    expect(addressAfterUpdate.number).toBe(-1)
  })
  it('should UpdateAddressPostgresRepository throw error if Postgres throws', async () => {
    const sut = makeSut()
    jest.spyOn(PostgresHelper, 'execute').mockImplementationOnce(throwError)
    const promise = sut.update({
      ...mockAddAddressParams(),
      id: faker.datatype.uuid()
    })
    await expect(promise).rejects.toThrow()
  })
})
