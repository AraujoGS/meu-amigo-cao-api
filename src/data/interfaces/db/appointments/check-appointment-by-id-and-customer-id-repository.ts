export namespace CheckAppointmentByIdAndCustomerIdRepository {
  export type Params = {
    accountId: string
    id: string
  }
  export type Result = boolean
}

export interface CheckAppointmentByIdAndCustomerIdRepository {
  check: (data: CheckAppointmentByIdAndCustomerIdRepository.Params) => Promise<CheckAppointmentByIdAndCustomerIdRepository.Result>
}
