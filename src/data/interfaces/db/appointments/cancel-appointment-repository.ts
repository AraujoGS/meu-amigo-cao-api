export namespace CancelAppointmentRepository {
  export type Params = {
    accountId: string
    id: string
  }
}

export interface CancelAppointmentRepository {
  cancel: (data: CancelAppointmentRepository.Params) => Promise<void>
}
