import { ActionResult, AddAppointmentModel } from '@/domain/models'

export namespace AddAppointment {
  export type Params = AddAppointmentModel
  export type Result = ActionResult
}

export interface AddAppointment {
  add: (data: AddAppointment.Params) => Promise<AddAppointment.Result>
}
