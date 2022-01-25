import { makeAddAppointmentValidation, makeAddAppointmentRulesValidation } from '@/main/factories/validations'
import { makeDbAddAppointment } from '@/main/factories/usecases'
import { AddAppointmentController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'

export const makeAddAppointmentController = (): Controller => {
  return new AddAppointmentController(makeAddAppointmentValidation(), makeDbAddAppointment(), makeAddAppointmentRulesValidation())
}
