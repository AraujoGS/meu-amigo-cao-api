export namespace UpdateCustomerRepository {
  export type Params = {
    id: string
    name: string
    email: string
    phone: string
    birthDate: Date
  }
}

export interface UpdateCustomerRepository {
  update: (data: UpdateCustomerRepository.Params) => Promise<void>
}
