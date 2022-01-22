import { ActionResult } from '@/domain/models'

export namespace AddAppointment {
  export type Params = {
    accountId: string
    service: number
    date: Date
    petId: string
    observations: string
  }
  export type Result = ActionResult
}

export interface AddAppointment {
  add: (data: AddAppointment.Params) => Promise<AddAppointment.Result>
}
