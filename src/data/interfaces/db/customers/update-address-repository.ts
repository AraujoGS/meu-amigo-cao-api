export namespace UpdateAddressRepository {
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
}

export interface UpdateAddressRepository {
  update: (data: UpdateAddressRepository.Params) => Promise<void>
}
