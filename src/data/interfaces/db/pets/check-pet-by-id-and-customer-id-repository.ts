export namespace CheckPetByIdAndCustomerIdRepository {
  export type Params = {
    id: string
    accountId: string
  }
  export type Result = boolean
}

export interface CheckPetByIdAndCustomerIdRepository {
  check: (data: CheckPetByIdAndCustomerIdRepository.Params) => Promise<CheckPetByIdAndCustomerIdRepository.Result>
}
