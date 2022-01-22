import { AddAppointment } from '@/domain/usecases'
import faker from 'faker'

export const mockAddAppointments = (): AddAppointment.Params => ({
  accountId: faker.datatype.uuid(),
  service: 3,
  date: new Date(),
  petId: faker.datatype.uuid(),
  observations: faker.random.words()
})
