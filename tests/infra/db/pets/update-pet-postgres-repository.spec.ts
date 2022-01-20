import { UpdatePetPostgresRepository, PostgresHelper } from '@/infra/db'
import { mockAddPetParams, throwError } from '@/tests/domain/mocks'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount, mockPets } from '@/tests/infra/mocks'
import faker from 'faker'

const makeSut = (): UpdatePetPostgresRepository => new UpdatePetPostgresRepository()

const mockGetPet = async (id: string): Promise<any> => {
  const query = `
    SELECT 
      p.nome_pet as name, 
      p.cor_pet as color, 
      p.consideracoes as considerations, 
      rp.nome_raca as breed,
      pp.titulo_porte as type
    FROM PETS p
    JOIN RACA_PET rp ON (rp.id_raca = p.id_raca)
    JOIN PORTE_PET pp ON (pp.id_porte = p.id_porte)
    WHERE id_cliente = $1
  `
  const params = [id]
  const result = await PostgresHelper.execute(query, params)
  return PostgresHelper.mapperOneResult(result)
}

describe('UpdatePetPostgres Repository', () => {
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
  it('should UpdatePetPostgresRepository update pet with success', async () => {
    const sut = makeSut()
    const account = await mockAccount()
    const petCustomer = await mockPets(account.id)
    const petBeforeUpdate = await mockGetPet(account.id)
    expect(petBeforeUpdate).toBeTruthy()
    expect(petBeforeUpdate.name).toBe(petCustomer.name)
    expect(petBeforeUpdate.color).toBe(petCustomer.color)
    expect(petBeforeUpdate.breed).toBe(petCustomer.breed)
    expect(petBeforeUpdate.type).toBe(petCustomer.type)
    expect(petBeforeUpdate.considerations).toBe(petCustomer.considerations)
    await sut.update({
      ...petCustomer,
      breed: 47,
      type: 2
    })
    const petAfterUpdate = await mockGetPet(account.id)
    expect(petAfterUpdate.name).toBe(petCustomer.name)
    expect(petAfterUpdate.color).toBe(petCustomer.color)
    expect(petAfterUpdate.breed).toBe('Yorkshire')
    expect(petAfterUpdate.type).toBe('PEQUENO')
    expect(petAfterUpdate.considerations).toBe(petCustomer.considerations)
  })
  it('should UpdatePetPostgresRepository throw error if Postgres throws', async () => {
    const sut = makeSut()
    jest.spyOn(PostgresHelper, 'execute').mockImplementationOnce(throwError)
    const promise = sut.update({
      ...mockAddPetParams(),
      id: faker.datatype.uuid()
    })
    await expect(promise).rejects.toThrow()
  })
})
