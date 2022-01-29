import { DbCancelAppointment } from '@/data/usecases'
import { CancelAppointment } from '@/domain/usecases'
import { CancelAppointmentPostgresRepository, CheckAppointmentByIdAndCustomerIdPostgresRepository } from '@/infra/db'

export const makeDbCancelAppointment = (): CancelAppointment => {
  const checkAppointmentByIdAndCustomerIdPostgresRepository = new CheckAppointmentByIdAndCustomerIdPostgresRepository()
  const cancelAppointmentPostgresRepository = new CancelAppointmentPostgresRepository()
  return new DbCancelAppointment(checkAppointmentByIdAndCustomerIdPostgresRepository, cancelAppointmentPostgresRepository)
}
