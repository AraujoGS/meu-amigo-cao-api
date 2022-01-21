export namespace LoadAccountByTokenRepository {
  export type Params = string
  export type Result = {
    id: string
  }
}

export interface LoadAccountByTokenRepository {
  load: (token: LoadAccountByTokenRepository.Params) => Promise<LoadAccountByTokenRepository.Result>
}
