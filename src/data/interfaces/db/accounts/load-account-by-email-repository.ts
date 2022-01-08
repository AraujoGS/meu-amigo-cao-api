export namespace LoadAccountByEmailRepository {
  export type Params = string
  export type Result = {
    id: string
    name: string
    password: string
  }
}

export interface LoadAccountByEmailRepository {
  load: (email: LoadAccountByEmailRepository.Params) => Promise<LoadAccountByEmailRepository.Result>
}
