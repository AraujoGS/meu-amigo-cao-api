import { AppointmentModel } from '@/domain/models'

export namespace LoadAppointmentsByCustomerIdRepository {
  export type Params = {
    accountId: string
    offset?: number
    limit?: number
  }
  export type Result = AppointmentModel[]
}

export interface LoadAppointmentsByCustomerIdRepository {
  load: (data: LoadAppointmentsByCustomerIdRepository.Params) => Promise<LoadAppointmentsByCustomerIdRepository.Result>
}
