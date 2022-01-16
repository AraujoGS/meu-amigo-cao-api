export namespace ChangeAddress {
  export type Params = {
    id: string
    accountId: string
    zipcode: string
    address: string
    number: number
    district: string
    city: string
    state: string
    complement?: string
  }
  export type Result = boolean
}

export interface ChangeAddress {
  change: (data: ChangeAddress.Params) => Promise<ChangeAddress.Result>
}
