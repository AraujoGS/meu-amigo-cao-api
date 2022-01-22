import { AddAppointmentModel } from '@/domain/models'

export namespace AddAppointmentRepository {
  export type Params = AddAppointmentModel
}

export interface AddAppointmentRepository {
  add: (data: AddAppointmentRepository.Params) => Promise<void>
}
