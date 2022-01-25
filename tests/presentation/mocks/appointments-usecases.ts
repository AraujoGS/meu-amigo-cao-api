import { AddAppointment } from '@/domain/usecases'
import { ActionResult } from '@/domain/models'

export class AddAppointmentSpy implements AddAppointment {
  data: AddAppointment.Params
  result = ActionResult.SUCCESS
  async add (data: AddAppointment.Params): Promise<AddAppointment.Result> {
    this.data = data
    return this.result
  }
}
