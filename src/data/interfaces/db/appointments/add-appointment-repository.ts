export namespace AddAppointmentRepository {
  export type Params = {
    service: number
    date: Date
    petId: string
    observations?: string
  }
}

export interface AddAppointmentRepository {
  add: (data: AddAppointmentRepository.Params) => Promise<void>
}
