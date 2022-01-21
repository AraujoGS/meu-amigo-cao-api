import { DeletePetPostgresRepository, PostgresHelper } from '@/infra/db'
import { mockDeletePetParams, throwError } from '@/tests/domain/mocks'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount, mockPets } from '@/tests/infra/mocks'

const makeSut = (): DeletePetPostgresRepository => new DeletePetPostgresRepository()

const mockGetPet = async (id: string): Promise<any> => {
  const query = 'SELECT id_pet as id FROM PETS p WHERE id_cliente = $1'
  const params = [id]
  const result = await PostgresHelper.execute(query, params)
  return PostgresHelper.mapperOneResult(result)
}

describe('DeletePetPostgres Repository', () => {
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
  it('should DeletePetPostgresRepository update pet with success', async () => {
    const sut = makeSut()
    const account = await mockAccount()
    const petCustomer = await mockPets(account.id)
    const petBeforeUpdate = await mockGetPet(account.id)
    expect(petBeforeUpdate).toBeTruthy()
    await sut.delete({
      id: petCustomer.id,
      accountId: account.id
    })
    const petAfterUpdate = await mockGetPet(account.id)
    expect(petAfterUpdate).toBeFalsy()
  })
  it('should DeletePetPostgresRepository throw error if Postgres throws', async () => {
    const sut = makeSut()
    jest.spyOn(PostgresHelper, 'execute').mockImplementationOnce(throwError)
    const promise = sut.delete(mockDeletePetParams())
    await expect(promise).rejects.toThrow()
  })
})
