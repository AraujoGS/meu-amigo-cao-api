import { CheckAddressByIdAndCustomerIdPostgresRepository, PostgresHelper } from '@/infra/db'
import { mockAddAddressParams } from '@/tests/domain/mocks'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount } from '@/tests/infra/mocks'
import faker from 'faker'
import { v4 as uuid } from 'uuid'

const makeSut = (): CheckAddressByIdAndCustomerIdPostgresRepository => {
  return new CheckAddressByIdAndCustomerIdPostgresRepository()
}

const mockAddress = async (accountId: string): Promise<string> => {
  const query = `
    INSERT INTO ENDERECOS(
      id_endereco,
      id_cliente, 
      cep, 
      logradouro, 
      cidade, 
      bairro,
      numero,
      uf,
      complemento  
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    `
  const { zipcode, address, city, district, number, state, complement } = mockAddAddressParams()
  const id = uuid()
  const params = [id, accountId, zipcode, address, city, district, number, state, complement]
  await PostgresHelper.execute(query, params)
  return id
}

describe('CheckAddressByIdAndCustomerIdPostgres Repository', () => {
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
  it('should CheckAddressByIdAndCustomerIdPostgresRepository return true if account exists', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const addressId = await mockAddress(params.id)
    const response = await sut.check({ id: addressId, accountId: params.id })
    expect(response).toBe(true)
  })
  it('should CheckAddressByIdAndCustomerIdPostgresRepository return false if account not exists', async () => {
    const sut = makeSut()
    const response = await sut.check({ id: faker.datatype.uuid(), accountId: faker.datatype.uuid() })
    expect(response).toBe(false)
  })
})
