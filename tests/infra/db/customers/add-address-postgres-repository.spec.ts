import { AddAddressPostgresRepository, PostgresHelper } from '@/infra/db'
import { mockAddAddressParams, throwError, mockAddAccountParams } from '@/tests/domain/mocks'
import { IdentifierGeneratorSpy, createDbTest, sqlClearDb, sqlCreateDb } from '@/tests/infra/mocks'

type SutTypes = {
  sut: AddAddressPostgresRepository
  identifierGeneratorSpy: IdentifierGeneratorSpy
}

const makeSut = (): SutTypes => {
  const identifierGeneratorSpy = new IdentifierGeneratorSpy()
  const sut = new AddAddressPostgresRepository(identifierGeneratorSpy)
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
    SELECT c.id_cliente as id, c.nome_cliente as name, e.logradouro as address FROM CLIENTES c
    LEFT JOIN ENDERECOS e ON c.id_cliente = e.id_cliente
    WHERE c.id_cliente = $1
  `
  const params = [id]
  const result = await PostgresHelper.execute(query, params)
  return PostgresHelper.mapperOneResult(result)
}

describe('AddAddressPostgres Repository', () => {
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

  it('should AddAddressPostgresRepository call IdentifierGenerator correctly', async () => {
    const { sut, identifierGeneratorSpy } = makeSut()
    const params = mockAddAddressParams()
    await mockAddAccount(params.accountId)
    await sut.add(params)
    expect(identifierGeneratorSpy.callNumber).toBe(1)
  })
  it('should AddAddressPostgresRepository throw error if IdentifierGenerator throws', async () => {
    const { sut, identifierGeneratorSpy } = makeSut()
    jest.spyOn(identifierGeneratorSpy, 'generate').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAddressParams())
    await expect(promise).rejects.toThrow()
  })
  it('should AddAddressPostgresRepository add address with success', async () => {
    const { sut } = makeSut()
    const params = mockAddAddressParams()
    await mockAddAccount(params.accountId)
    const result = await mockGetAccount(params.accountId)
    expect(result).toBeTruthy()
    expect(result.address).toBeFalsy()
    await sut.add(params)
    const beforeAddResult = await mockGetAccount(params.accountId)
    expect(beforeAddResult.address).toBeTruthy()
  })
})
