import { AddAppointmentPostgresRepository } from '@/infra/db'
import { mockAddAppointments } from '@/tests/domain/mocks'
import { IdentifierGeneratorSpy } from '@/tests/infra/mocks'

type AppointmentModel = {
  id: string
  accountId: string
  service: string
  date: Date
  petId: string
  observations?: string
}

export const mockAppointment = async (accountId: string, petId: string): Promise<AppointmentModel> => {
  const params = mockAddAppointments()
  params.accountId = accountId
  params.petId = petId
  const identifierGeneratorSpy = new IdentifierGeneratorSpy()
  const addAppointmentPostgresRepository = new AddAppointmentPostgresRepository(identifierGeneratorSpy)
  await addAppointmentPostgresRepository.add(params)
  return {
    ...params,
    service: 'BANHO E TOSA',
    id: identifierGeneratorSpy.result
  }
}
