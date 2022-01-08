import { ForgotPasswordModel } from '@/domain/models'

export namespace LoadAccountByEmailAndPhoneRepository {
  export type Params = ForgotPasswordModel
  export type Result = {
    name: string
    email: string
  }
}

export interface LoadAccountByEmailAndPhoneRepository {
  load: (data: LoadAccountByEmailAndPhoneRepository.Params) => Promise<LoadAccountByEmailAndPhoneRepository.Result>
}
