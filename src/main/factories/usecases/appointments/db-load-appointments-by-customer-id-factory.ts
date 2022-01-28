import { DbLoadAppointmentsByCustomerId } from '@/data/usecases'
import { LoadAppointmentsByCustomerId } from '@/domain/usecases'
import { LoadAppointmentsByCustomerIdPostgresRepository } from '@/infra/db'

export const makeDbLoadAppointmentsByCustomerId = (): LoadAppointmentsByCustomerId => {
  const loadAppointmentsByCustomerIdPostgresRepository = new LoadAppointmentsByCustomerIdPostgresRepository()
  return new DbLoadAppointmentsByCustomerId(loadAppointmentsByCustomerIdPostgresRepository)
}
