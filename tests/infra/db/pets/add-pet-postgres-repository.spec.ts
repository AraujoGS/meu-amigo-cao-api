import { AddPetPostgresRepository, PostgresHelper } from '@/infra/db'
import { mockAddPetParams, mockAddAccountParams } from '@/tests/domain/mocks'
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
})
