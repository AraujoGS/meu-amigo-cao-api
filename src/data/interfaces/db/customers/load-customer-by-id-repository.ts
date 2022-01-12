export namespace LoadCustomerByIdRepository {
  export type Params = string
  export type Result = {
    id: string
    name: string
    email: string
    phone: string
    birthDate: Date
  }
}

export interface LoadCustomerByIdRepository {
  load: (id: LoadCustomerByIdRepository.Params) => Promise<LoadCustomerByIdRepository.Result>
}
