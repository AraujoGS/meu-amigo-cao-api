export namespace LoadAccountByIdRepository {
  export type Params = string
  export type Result = {
    email: string
    password: string
  }
}

export interface LoadAccountByIdRepository {
  loadById: (id: LoadAccountByIdRepository.Params) => Promise<LoadAccountByIdRepository.Result>
}
