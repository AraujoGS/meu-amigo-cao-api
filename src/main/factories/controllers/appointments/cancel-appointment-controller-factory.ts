import { makeCancelAppointmentValidation } from '@/main/factories/validations'
import { makeDbCancelAppointment } from '@/main/factories/usecases'
import { CancelAppointmentController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'

export const makeCancelAppointmentController = (): Controller => {
  return new CancelAppointmentController(makeCancelAppointmentValidation(), makeDbCancelAppointment())
}
