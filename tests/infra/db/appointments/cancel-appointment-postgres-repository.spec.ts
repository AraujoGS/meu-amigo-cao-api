import { PostgresHelper, CancelAppointmentRepositoryPostgresRepository } from '@/infra/db'
import { mockCancelAppointment, throwError } from '@/tests/domain/mocks'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount, mockPets, mockAppointment } from '@/tests/infra/mocks'

const makeSut = (): CancelAppointmentRepositoryPostgresRepository => new CancelAppointmentRepositoryPostgresRepository()

const getAppointment = async (id: string, accountId: string): Promise<any> => {
  const response = await PostgresHelper.execute(`
    SELECT 
      a.id_agendamento as id,
      a.cancelamento as cancellation
    FROM CLIENTES c
    JOIN PETS p ON (c.id_cliente = p.id_cliente)
    JOIN AGENDAMENTOS a ON (p.id_pet = a.id_pet)
    WHERE a.id_agendamento = $1 AND c.id_cliente = $2
  `, [id, accountId])
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

  it('should CancelAppointmentRepositoryPostgresRepository cancel appointment with success', async () => {
    const sut = makeSut()
    const account = await mockAccount()
    const pet = await mockPets(account.id)
    const appointment = await mockAppointment(account.id, pet.id)
    const appointmentBeforeCancellation = await getAppointment(appointment.id, account.id)
    expect(appointmentBeforeCancellation).toBeTruthy()
    expect(appointmentBeforeCancellation.cancellation).toBe(false)
    await sut.cancel(appointment.id)
    const appointmentAfterCancellation = await getAppointment(appointment.id, account.id)
    expect(appointmentAfterCancellation).toBeTruthy()
    expect(appointmentAfterCancellation.cancellation).toBe(true)
  })
  it('should CancelAppointmentRepositoryPostgresRepository throw error if Postgres throws', async () => {
    const sut = makeSut()
    jest.spyOn(PostgresHelper, 'execute').mockImplementationOnce(throwError)
    const promise = sut.cancel(mockCancelAppointment().id)
    await expect(promise).rejects.toThrow()
  })
})
