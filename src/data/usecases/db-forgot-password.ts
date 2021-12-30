import { ForgotPassword } from '@/domain/usecases'
import { LoadAccountByEmailAndPhoneRepository } from '@/data/interfaces/db'

export class DbForgotPassword implements ForgotPassword {
  constructor (
    private readonly loadAccountByEmailAndPhoneRepository: LoadAccountByEmailAndPhoneRepository
  ) {}

  async recover (params: ForgotPassword.Params): Promise<ForgotPassword.Result> {
    await this.loadAccountByEmailAndPhoneRepository.loadByEmailAndPhone(params)
    return null
  }
}
