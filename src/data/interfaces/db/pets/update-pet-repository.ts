export namespace UpdatePetRepository {
  export type Params = {
    id: string
    accountId: string
    name: string
    breed: number
    color: string
    type: number
    considerations: string
  }
}

export interface UpdatePetRepository {
  update: (data: UpdatePetRepository.Params) => Promise<void>
}
