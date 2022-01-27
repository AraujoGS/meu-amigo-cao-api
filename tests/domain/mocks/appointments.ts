import { AddAppointment, LoadAppointmentsByCustomerId } from '@/domain/usecases'
import faker from 'faker'

export const mockAddAppointments = (): AddAppointment.Params => ({
  accountId: faker.datatype.uuid(),
  service: 3,
  date: faker.date.future(),
  petId: faker.datatype.uuid(),
  observations: faker.random.words()
})

export const mockLoadAppointmentsByCustomerId = (): LoadAppointmentsByCustomerId.Params => ({
  accountId: faker.datatype.uuid(),
  offset: 1,
  limit: 10
})
