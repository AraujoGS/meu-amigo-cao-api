export namespace DeletePetRepository {
  export type Params = {
    id: string
    accountId: string
  }
}

export interface DeletePetRepository {
  delete: (data: DeletePetRepository.Params) => Promise<void>
}
