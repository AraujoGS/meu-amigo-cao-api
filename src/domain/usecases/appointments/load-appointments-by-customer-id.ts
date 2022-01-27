import { AppointmentModel } from '@/domain/models'

export namespace LoadAppointmentsByCustomerId {
  export type Params = {
    accountId: string
    offset?: number
    limit?: number
  }
  export type Result = AppointmentModel[]
}

export interface LoadAppointmentsByCustomerId {
  load: (data: LoadAppointmentsByCustomerId.Params) => Promise<LoadAppointmentsByCustomerId.Result>
}
