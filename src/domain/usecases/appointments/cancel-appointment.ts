export namespace CancelAppointment {
  export type Params = {
    accountId: string
    id: string
  }
  export type Result = boolean
}

export interface CancelAppointment {
  cancel: (data: CancelAppointment.Params) => Promise<CancelAppointment.Result>
}
