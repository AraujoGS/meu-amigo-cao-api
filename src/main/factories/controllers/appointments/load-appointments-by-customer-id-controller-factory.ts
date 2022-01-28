import { makeDbLoadAppointmentsByCustomerId } from '@/main/factories/usecases'
import { LoadAppointmentsByCustomerIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'

export const makeLoadAppointmentsByCustomerIdController = (): Controller => {
  return new LoadAppointmentsByCustomerIdController(makeDbLoadAppointmentsByCustomerId())
}
