import { DbAddAppointment } from '@/data/usecases'
import { AddAppointment } from '@/domain/usecases'
import { CheckPetByIdAndCustomerIdPostgresRepository, CheckServiceByIdPostgresRepository, AddAppointmentPostgresRepository } from '@/infra/db'
import { UuidAdapter } from '@/infra/utils'

export const makeDbAddAppointment = (): AddAppointment => {
  const checkPetByIdAndCustomerIdPostgresRepository = new CheckPetByIdAndCustomerIdPostgresRepository()
  const checkServiceByIdPostgresRepository = new CheckServiceByIdPostgresRepository()
  const uuidAdapter = new UuidAdapter()
  const addAppointmentPostgresRepository = new AddAppointmentPostgresRepository(uuidAdapter)
  return new DbAddAppointment(checkPetByIdAndCustomerIdPostgresRepository, checkServiceByIdPostgresRepository, addAppointmentPostgresRepository)
}
