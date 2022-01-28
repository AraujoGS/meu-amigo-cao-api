export namespace CancelAppointmentRepository {
  export type Params = string
}

export interface CancelAppointmentRepository {
  cancel: (id: CancelAppointmentRepository.Params) => Promise<void>
}
