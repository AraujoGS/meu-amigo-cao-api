import { ForgotPasswordModel } from '@/domain/models'

export namespace LoadAccountByEmailAndPhoneRepository {
  export type Params = ForgotPasswordModel
  export type Result = {
    name: string
    email: string
  }
}

export interface LoadAccountByEmailAndPhoneRepository {
  loadByEmailAndPhone: (params: LoadAccountByEmailAndPhoneRepository.Params) => Promise<LoadAccountByEmailAndPhoneRepository.Result>
}
