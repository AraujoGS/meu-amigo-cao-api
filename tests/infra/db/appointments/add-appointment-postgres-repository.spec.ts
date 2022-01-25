import { AddAppointmentPostgresRepository, PostgresHelper } from '@/infra/db'
import { throwError, mockAddAppointments } from '@/tests/domain/mocks'
import { IdentifierGeneratorSpy, createDbTest, sqlClearDb, sqlCreateDb, mockAccount, mockPets } from '@/tests/infra/mocks'

type SutTypes = {
  sut: AddAppointmentPostgresRepository
  identifierGeneratorSpy: IdentifierGeneratorSpy
}

const makeSut = (): SutTypes => {
  const identifierGeneratorSpy = new IdentifierGeneratorSpy()
  const sut = new AddAppointmentPostgresRepository(identifierGeneratorSpy)
  return {
    sut,
    identifierGeneratorSpy
  }
}

const mockGetAppointments = async (id: string): Promise<any> => {
  const query = `
    SELECT c.id_cliente as id, p.id_pet as petId, a.id_agendamento as appointment FROM CLIENTES c
    JOIN PETS p ON c.id_cliente = p.id_cliente
    LEFT JOIN AGENDAMENTOS a ON p.id_pet = a.id_pet
    WHERE c.id_cliente = $1
  `
  const params = [id]
  const result = await PostgresHelper.execute(query, params)
  return PostgresHelper.mapperOneResult(result)
}

describe('AddAppointmentPostgres Repository', () => {
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

  it('should AddAppointmentPostgresRepository call IdentifierGenerator correctly', async () => {
    const { sut, identifierGeneratorSpy } = makeSut()
    const params = mockAddAppointments()
    const { accountId, ...data } = params
    const resultAccount = await mockAccount()
    const resultPet = await mockPets(resultAccount.id)
    await sut.add({ ...data, petId: resultPet.id })
    expect(identifierGeneratorSpy.callNumber).toBe(1)
  })
  it('should AddAppointmentPostgresRepository throw error if IdentifierGenerator throws', async () => {
    const { sut, identifierGeneratorSpy } = makeSut()
    jest.spyOn(identifierGeneratorSpy, 'generate').mockImplementationOnce(throwError)
    const params = mockAddAppointments()
    const { accountId, ...data } = params
    const promise = sut.add(data)
    await expect(promise).rejects.toThrow()
  })
  it('should AddAppointmentPostgresRepository add appointment with success', async () => {
    const { sut } = makeSut()
    const params = mockAddAppointments()
    const { accountId, ...data } = params
    const resultAccount = await mockAccount()
    const resultPet = await mockPets(resultAccount.id)
    const result = await mockGetAppointments(resultAccount.id)
    expect(result).toBeTruthy()
    expect(result.appointment).toBeFalsy()
    await sut.add({
      ...data,
      petId: resultPet.id
    })
    const beforeAddResult = await mockGetAppointments(resultAccount.id)
    expect(beforeAddResult.appointment).toBeTruthy()
  })
  it('should AddAppointmentPostgresRepository throw error if Postgres throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(PostgresHelper, 'execute').mockImplementationOnce(throwError)
    const params = mockAddAppointments()
    const { accountId, ...data } = params
    const promise = sut.add(data)
    await expect(promise).rejects.toThrow()
  })
})
