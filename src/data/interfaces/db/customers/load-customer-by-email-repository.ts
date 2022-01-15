export namespace LoadCustomerByEmailRepository {
  export type Params = string
  export type Result = {
    id: string
  }
}

export interface LoadCustomerByEmailRepository {
  load: (email: LoadCustomerByEmailRepository.Params) => Promise<LoadCustomerByEmailRepository.Result>
}
