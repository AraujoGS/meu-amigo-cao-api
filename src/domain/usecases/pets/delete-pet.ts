export namespace DeletePet {
  export type Params = {
    id: string
    accountId: string
  }
  export type Result = boolean
}

export interface DeletePet {
  delete: (data: DeletePet.Params) => Promise<DeletePet.Result>
}
