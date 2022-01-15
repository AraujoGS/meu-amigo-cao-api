export namespace LoadCustomerByPhoneRepository {
  export type Params = string
  export type Result = {
    id: string
  }
}

export interface LoadCustomerByPhoneRepository {
  load: (phone: LoadCustomerByPhoneRepository.Params) => Promise<LoadCustomerByPhoneRepository.Result>
}
