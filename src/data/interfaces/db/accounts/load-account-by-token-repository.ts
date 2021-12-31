import { LoadAccountByTokenModel } from '@/domain/models'

export namespace LoadAccountByTokenRepository {
  export type Params = LoadAccountByTokenModel
  export type Result = {
    id: string
  }
}

export interface LoadAccountByTokenRepository {
  loadByToken: (data: LoadAccountByTokenRepository.Params) => Promise<LoadAccountByTokenRepository.Result>
}