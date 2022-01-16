export namespace CheckAddressByIdAndCustomerIdRepository {
  export type Params = {
    id: string
    accountId: string
  }
  export type Result = boolean
}

export interface CheckAddressByIdAndCustomerIdRepository {
  check: (data: CheckAddressByIdAndCustomerIdRepository.Params) => Promise<CheckAddressByIdAndCustomerIdRepository.Result>
}
