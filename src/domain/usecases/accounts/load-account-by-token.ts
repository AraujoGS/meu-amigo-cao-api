import { LoadAccountByTokenModel } from '@/domain/models'

export namespace LoadAccountByToken {
  export type Params = LoadAccountByTokenModel
  export type Result = {
    id: string
  }
}

export interface LoadAccountByToken {
  load: (data: LoadAccountByToken.Params) => Promise<LoadAccountByToken.Result>
}
