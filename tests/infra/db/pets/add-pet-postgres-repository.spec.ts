import { AddPetPostgresRepository, PostgresHelper } from '@/infra/db'
import { mockAddPetParams, mockAddAccountParams, throwError } from '@/tests/domain/mocks'
import { IdentifierGeneratorSpy, createDbTest, sqlClearDb, sqlCreateDb } from '@/tests/infra/mocks'

type SutTypes = {
  sut: AddPetPostgresRepository
  identifierGeneratorSpy: IdentifierGeneratorSpy
}

const makeSut = (): SutTypes => {
  const identifierGeneratorSpy = new IdentifierGeneratorSpy()
  const sut = new AddPetPostgresRepository(identifierGeneratorSpy)
  return {
    sut,
    identifierGeneratorSpy
  }
}

const mockAddAccount = async (id: string): Promise<void> => {
  const data = mockAddAccountParams()
  const query = `
    INSERT INTO CLIENTES(id_cliente, nome_cliente, senha_cliente, email_cliente, telefone_cliente, data_nascimento_cliente)
    VALUES ($1,$2,$3,$4,$5,$6)
  `
  const { name, password, email, phone, birthDate } = data
  const params = [id, name, password, email, phone, birthDate]
  await PostgresHelper.execute(query, params)
}

const mockGetAccount = async (id: string): Promise<any> => {
  const query = `
    SELECT c.id_cliente as id, c.nome_cliente as name, p.id_pet as id_pet FROM CLIENTES c
    LEFT JOIN PETS p ON c.id_cliente = p.id_cliente
    WHERE c.id_cliente = $1
  `
  const params = [id]
  const result = await PostgresHelper.execute(query, params)
  return PostgresHelper.mapperOneResult(result)
}

describe('AddPetPostgres Repository', () => {
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

  it('should AddPetPostgresRepository call IdentifierGenerator correctly', async () => {
    const { sut, identifierGeneratorSpy } = makeSut()
    const params = mockAddPetParams()
    await mockAddAccount(params.accountId)
    await sut.add(params)
    expect(identifierGeneratorSpy.callNumber).toBe(1)
  })
  it('should AddPetPostgresRepository throw error if IdentifierGenerator throws', async () => {
    const { sut, identifierGeneratorSpy } = makeSut()
    jest.spyOn(identifierGeneratorSpy, 'generate').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddPetParams())
    await expect(promise).rejects.toThrow()
  })
  it('should AddPetPostgresRepository add pet with success', async () => {
    const { sut } = makeSut()
    const params = mockAddPetParams()
    await mockAddAccount(params.accountId)
    const resultBeforeAddPet = await mockGetAccount(params.accountId)
    expect(resultBeforeAddPet).toBeTruthy()
    expect(resultBeforeAddPet.id_pet).toBeFalsy()
    await sut.add(params)
    const resultAfterAddPet = await mockGetAccount(params.accountId)
    expect(resultAfterAddPet.id_pet).toBeTruthy()
  })
  it('should AddPetPostgresRepository throw error if Postgres throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(PostgresHelper, 'execute').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddPetParams())
    await expect(promise).rejects.toThrow()
  })
})
