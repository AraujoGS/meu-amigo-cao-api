export namespace LoadAccountByToken {
  export type Params = string
  export type Result = {
    id: string
  }
}

export interface LoadAccountByToken {
  load: (token: LoadAccountByToken.Params) => Promise<LoadAccountByToken.Result>
}
