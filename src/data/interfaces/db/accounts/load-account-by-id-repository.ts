export namespace LoadAccountByIdRepository {
  export type Params = string
  export type Result = {
    email: string
    password: string
  }
}

export interface LoadAccountByIdRepository {
  load: (id: LoadAccountByIdRepository.Params) => Promise<LoadAccountByIdRepository.Result>
}
